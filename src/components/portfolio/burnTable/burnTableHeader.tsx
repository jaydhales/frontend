export default function BurnTableHeaders() {
  return (
    <tr className=" hidden md:grid gap-x-4 grid-cols-5 text-left text-gray border-b border-white pb-1 border-opacity-20">
      <th>Token</th>
      <th>Long</th>
      <th>Versus</th>
      <th>Leverage ratio</th>
      <th>Balance</th>
    </tr>
  );
}
