export default function BurnTableHeaders() {
  return (
    <tr className=" font-thin hidden text-[14px] md:grid gap-x-4 grid-cols-5 text-left text-gray-500 border-b border-white  pb-1 border-opacity-10">
      <th className="font-normal">Token</th>
      <th className="font-normal">Long</th>
      <th className="font-normal">Versus</th>
      <th className="font-normal">Leverage ratio</th>
      <th className="font-normal">Balance</th>
    </tr>
  );
}
