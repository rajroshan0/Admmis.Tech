import type { ReactNode } from 'react'

export type TableRow = { key: string; header: ReactNode; cells: ReactNode[] }

/**
 * Real table on wide screens, stacked cards below 640 px (900 px in Nepali). Only `display` changes, so
 * the semantics stay. Cell labels come from `data-label` (components.css .table-stacked).
 */
export function Table({
  caption,
  captionVisible,
  columns,
  rows,
}: {
  caption: string
  captionVisible?: boolean
  /** first entry labels the row header column */
  columns: string[]
  rows: TableRow[]
}) {
  return (
    <table role="table" className="table-stacked w-full max-w-[64rem] border-collapse text-start">
      <caption className={captionVisible ? 'mb-3 text-start font-bold' : 'sr-only'}>
        {caption}
      </caption>
      <thead role="rowgroup">
        <tr role="row">
          {columns.map((c) => (
            <th
              key={c}
              scope="col"
              role="columnheader"
              className="border-b-2 border-fg p-3 text-start text-small"
            >
              {c}
            </th>
          ))}
        </tr>
      </thead>
      <tbody role="rowgroup">
        {rows.map((row) => (
          <tr key={row.key} role="row" className="border-b border-line hover:bg-bg">
            <th
              scope="row"
              role="rowheader"
              data-label={columns[0]}
              className="p-3 text-start align-top"
            >
              {row.header}
            </th>
            {row.cells.map((cell, i) => (
              <td key={i} role="cell" data-label={columns[i + 1]} className="p-3 align-top">
                {cell}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  )
}
