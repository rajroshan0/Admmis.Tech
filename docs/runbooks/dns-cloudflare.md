# DNS: put admmis.org on Cloudflare Free (T-504)

Owner: raj · Version: v0.1 DRAFT · 2026-11-07 (MSK) · Reviewer: hritik · Executor: Roshan
Cost: USD 0 (Cloudflare Free, ADR-037). Time for Roshan: about 45 min of work plus up to 24 h waiting for the switch.

**Purpose.** Let Cloudflare answer DNS for `admmis.org` so `tech.admmis.org` gets the CDN, WAF, Turnstile and R2, while every existing record keeps working (email MX, SPF, DKIM, DMARC, the current website).
**Prerequisites.** Login to the registrar (or wherever DNS is edited now), a free Cloudflare account with 2FA on (you create it; Raj never does), 45 minutes, a quiet hour (not during an event or a big email campaign).
**Raj changes no DNS.** Roshan manages DNS himself (ADR-037, Q17).

## 0. Recommendation (read first)

| Option | What it is | Available on Free? | Risk to email and current site | Recommended |
|---|---|---|---|---|
| A. Full move (nameservers) | Cloudflare becomes DNS for all of admmis.org | Yes, the only Free setup | Low if every record is copied first (steps 1-4) | **Yes** |
| B. Delegate only `tech.admmis.org` via NS records to Cloudflare | Parent DNS keeps the zone, hands the `tech` sub-zone over | **No.** "Subdomain setup is only available for Enterprise accounts." Source: https://developers.cloudflare.com/dns/zone-setups/subdomain-setup/ (read 2026-11-07) | Lowest | No (paid) |
| C. CNAME ("partial") setup | Keep DNS where it is, add a CNAME `tech` to Cloudflare | **No.** Cloudflare docs: "A CNAME setup (partial) is only available to customers on a Business or Enterprise plan." Source: https://developers.cloudflare.com/dns/zone-setups/partial-setup/ (read 2026-11-07) | Low | No (paid) |
| D. Plain records at the current DNS (A or CNAME to the host, no Cloudflare proxy) | Just point `tech` at the server | Yes | None, but we lose the proxy: no WAF, no rate limit, no CDN cache, no Turnstile benefit from the edge, origin IP visible | Fallback only |

**Why A:** Free, standard, and our security design (WAF, rate limit on `/api/leads`, caching, hidden origin IP) needs the proxy. The risk is a forgotten record. Steps 1-4 remove it.
If Roshan prefers zero risk to the main domain, use D (a plain A/CNAME record for `tech`, no proxy) temporarily for staging tests and do A before launch.

## 1. Find out who runs DNS today (5 min)
1. Run in Terminal:
   ```
   dig NS admmis.org +short
   whois admmis.org | grep -i -E "registrar:|name server"
   ```
   (`whois` shows the registrar; `dig NS` shows who answers DNS. They can be different companies.)
2. Open the DNS panel at the company that owns the **name servers** from the dig output. That is where records are edited. The registrar is where nameservers are changed. Write both names in `docs/open-questions.md` request to PM (Q17).
3. At the registrar, check and note: is DNSSEC turned on? Is there a registrar lock? Is the login email one you can read? Is 2FA on?

## 2. Export the current records (10 min, do not skip)
1. If the DNS panel has "Export zone file" or "Download BIND file", use it and save the file in Bitwarden (secure note) and in a private folder. Do not commit it to the repo.
2. If not, copy every row by screenshot or by hand into a table: type, name, value, TTL, priority. Include hidden-looking records (`_dmarc`, `selector._domainkey`, `_acme-challenge`, `autodiscover`, `mail`, `www`, `@`).
3. Cross-check from outside with dig. These must all match the panel:
   ```
   for t in A AAAA CNAME MX TXT NS CAA; do echo "== $t"; dig $t admmis.org +short; done
   dig TXT _dmarc.admmis.org +short
   dig TXT google._domainkey.admmis.org +short   # selector name varies, check your mail provider
   dig A www.admmis.org +short
   ```
4. Save this output too. It is your "before" snapshot and your rollback list.
5. Write down which mail provider is used (Google Workspace, Zoho, host mailbox ...). Its setup page lists the exact MX, SPF and DKIM values to compare against.

## 3. Add the site to Cloudflare (10 min)
1. Log in to https://dash.cloudflare.com , "Add a domain", enter `admmis.org`, choose **Free**.
2. Cloudflare scans and imports records, but its quick scan "is not guaranteed to find all existing DNS records". Review manually, especially MX, SPF and DKIM. Compare the imported list with your step 2 snapshot line by line. Add anything missing, fix anything wrong.
3. For **every record that serves email** (MX, `mail`, `smtp`, `imap`, `autodiscover`, `_domainkey`), make sure the cloud icon is **grey (DNS only)**. Email records must never be proxied.
4. Records for the existing website (`@`, `www`): keep exactly as today. Orange (proxied) is normally fine for a normal website, but to change the least, set them to grey (DNS only) first and switch to orange later after testing.
5. Do not add `tech` yet.
6. Cloudflare shows two nameservers (for example `xxx.ns.cloudflare.com`). Copy both.

## 4. Pre-flight checks (5 min)
- Record count in Cloudflare equals the snapshot (plus nothing missing).
- MX, SPF (`v=spf1 ...`), DKIM and DMARC TXT records are present and identical to the snapshot.
- TTLs do not matter on Cloudflare for grey records; ignore.
- If DNSSEC is on at the registrar: **turn it off first** at the registrar, wait for the old DS record TTL (check the TTL, often 1 h to 24 h), then change nameservers. A DS record left behind makes the domain fail validation and look dead. After the switch you can turn DNSSEC on in Cloudflare. (Source: https://developers.cloudflare.com/dns/zone-setups/full-setup/setup/ , read 2026-11-07.)

## 5. Change nameservers (5 min)
1. At the **registrar**, open the domain, "Nameservers" or "DNS servers", choose Custom, replace the existing entries with the two Cloudflare ones. Save. Write the old nameserver names down first (this is your rollback).
2. Back in Cloudflare click "Done, check nameservers". Activation can take up to 24 h. Cloudflare emails you when it is active.
3. Do not edit DNS records at the old provider while waiting (they are ignored once the switch lands and you would be confused).

## 6. Verify after the switch (15 min)
1. `dig NS admmis.org +short` shows the Cloudflare names.
2. Re-run the step 2 dig loop. Output must equal the "before" snapshot (except NS).
3. Send a test email to and from an admmis.org mailbox (to a Gmail address, and reply). Check headers show `spf=pass dkim=pass`.
4. Open https://admmis.org and https://www.admmis.org in a private window. The current site loads.
5. Check https://dnschecker.org for `admmis.org` MX and A from several countries.
6. Tell Raj "DNS is on Cloudflare". Raj then gives the exact `tech` record (section 4 of `docs/runbooks/infra-setup.md`) and verifies.
7. SSL/TLS mode in Cloudflare: set to "Full" for now. Switch to "Full (strict)" only when the origin has a valid certificate (Raj will say when).

## 7. Roll back
Note: the rollback is Raj's procedure ("restore the old nameservers at the registrar"). It is NOT taken from Cloudflare's troubleshooting pages, which were not read.
- Within 24 h of the switch: at the registrar put back the old nameservers you wrote down in step 5. DNS returns to the old provider within the TTL. Old records are still there unless you deleted them. Do not delete the old zone for at least 7 days.
- If only one record is wrong: fix that record in Cloudflare. No rollback needed.
- If email breaks: first suspect a proxied (orange) mail record or a missing MX or TXT. Set mail records grey, compare with the snapshot.
- If DNSSEC was on and the site is dead: remove the DS record at the registrar.

## 8. Time estimate for Roshan
| Part | Time |
|---|---|
| Steps 1-2 find provider and export | 15 min |
| Steps 3-4 add to Cloudflare, compare | 20 min |
| Step 5 change nameservers | 5 min |
| Waiting | minutes to 24 h (no work) |
| Step 6 verify | 15 min |
| Total hands-on | about 1 h |

## Open items
- TODO(roshan): registrar name, name server company, whether DNSSEC is on (Q17).

## Sources (read 2026-11-07, all HTTP 200, pages modified 2026-04 to 2026-10)
- https://developers.cloudflare.com/dns/zone-setups/partial-setup/ : Business or Enterprise only.
- https://developers.cloudflare.com/dns/zone-setups/subdomain-setup/ : Enterprise only.
- https://developers.cloudflare.com/dns/zone-setups/full-setup/ and /setup/ : only option on Free; two nameservers; DNSSEC off first; activation up to 24 h.
- Not read: full-setup troubleshooting and pending-nameservers pages.
