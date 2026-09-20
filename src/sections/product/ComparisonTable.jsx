export function ComparisonTable({ comparison }) {
  const { beforeLabel, afterLabel, rows } = comparison;

  return (
    <table role="table" className="comparison-table">
      <caption className="sr-only">
        {beforeLabel} and {afterLabel}
      </caption>
      <thead role="rowgroup">
        <tr role="row" className="comparison-table-head">
          <th role="columnheader" scope="col" className="comparison-table-label text-(--fg-subtle)">
            {beforeLabel}
          </th>
          <th role="columnheader" scope="col" className="comparison-table-label text-(--fg)">
            <span aria-hidden="true" className="square-marker tone-lime" />
            {afterLabel}
          </th>
        </tr>
      </thead>
      <tbody role="rowgroup">
        {rows.map(({ before, after }) => (
          <tr key={before} role="row" className="comparison-table-row">
            <td role="cell" className="text-(--fg-muted)">
              {before}
            </td>
            <td role="cell" className="text-(--fg)">
              {after}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
