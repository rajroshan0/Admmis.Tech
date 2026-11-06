# How to run the AI team — guide for Roshan

Your team: **PM (lead) + 8 senior AI employees**, each with their own role file in `.claude/agents/`,
one shared rulebook (`CLAUDE.md`), one task board (`team/BOARD.md`), and an inbox per person (`team/inbox/`).

```
            Roshan (Founder + CTO) — approves
                         │
                   PM (lead session)  ── team/BOARD.md, standups, gate packs
       ┌────────┬────────┼────────┬────────┬────────┬────────┬────────┐
     hritik   satish  mahendra   neha     raj    sharwan   sudip   rajaros
       └──────── message each other directly + team/inbox/*.md ────────┘
```

---

## 1. One-time setup (5 minutes)

1. Update Claude Code: `claude update` (agent teams need a recent version).
2. Agent teams are already switched on for this folder in `.claude/settings.json`
   (`CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1`). It is an **experimental** feature.
3. Commit this setup: `git add CLAUDE.md .claude team docs README.md && git commit -m "chore: AI team setup"`.

## 2. Start the team (each working day)

```bash
cd ~/Desktop/ADMMIS.TECH
claude
```

Then paste this into the chat:

> You are the PM and team lead of the ADMMIS.TECH website project. Read `CLAUDE.md` and `.claude/agents/pm.md`
> and follow them exactly. Then read `team/BOARD.md`, `team/inbox/pm.md` and `team/inbox/roshan.md`, and give me
> the 5-line situation summary. After that, create an agent team and spawn the next wave of teammates (max 4 at a
> time) with their exact names and the spawn prompt from pm.md, give each their tasks from the board, and
> coordinate them until their tasks are done or blocked. Ask me for anything that needs my approval.

The PM spawns the teammates; each one reads its role file, plans, works, messages the others, and reports back.
You can talk to the PM at any time ("ask Neha why T-402 is late", "show me Sharwan's brand directions").
You can also switch to a teammate and talk to them directly.

## 3. Daily prompts you can paste to the PM

- **Standup:** `Run the standup: collect every active teammate's section in team/standups/<today>.md and summarise for me.`
- **Status:** `Where are we vs the timeline? What's at risk for the next gate?`
- **End of day:** `Wrap up: every teammate writes their report or progress note, update the board, commit completed tasks, list what needs me.`
- **Gate:** `Prepare the Gate N pack in docs/gates/ with Hritik's technical review.`

## 4. Your approvals

Everything that needs you lands in `team/inbox/roshan.md` and the PM tells you in the chat.
Reply in the chat, or write `→ Roshan <date>: <answer>` under the request. SLA: 12 hours.
The team never spends money, creates accounts, pushes to GitHub, deploys, or contacts real people without you.

## 5. Usage tips

- Every teammate is a full Claude session and uses its own tokens. **Keep 3–4 active at once**; the PM rotates them.
- Close the session when the day's work is done; everything important is in files (board, inboxes, plans, reports),
  so tomorrow's team picks up exactly where it stopped.
- Review `git diff` before you push — you are the final gate.

## 6. Backup way (if agent teams misbehave)

Run employees in separate terminal tabs, one per person:

```bash
cd ~/Desktop/ADMMIS.TECH && claude
```
> You are Neha. Read `CLAUDE.md`, then `.claude/agents/neha-backend.md`, and follow them. Check `team/BOARD.md`
> and `team/inbox/neha.md`, then start your tasks.

They can't message each other live in this mode, so they communicate only through `team/inbox/*.md` —
the rules in CLAUDE.md already require that, so nothing else changes.

Using Claude chat (claude.ai) for an employee: create a Project per person, paste `CLAUDE.md` + their role file
into the Project instructions, and upload the docs. Chats can't message each other, so copy their output into
the repo and their messages into `team/inbox/`.
