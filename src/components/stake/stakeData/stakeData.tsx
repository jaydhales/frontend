// Dummy data
const data = [
  {
    icon: undefined,
    title: "Total Value Locked",
    value: "36.68 SIR",
  },
  {
    icon: undefined,
    title: "Staking APY",
    value: "6.8%",
  },
];

const StakeData = () => {
  return (
    <div className="flex justify-evenly">
      {data.map((e, i) => (
        <div
          key={i}
          className="bg-secondary rounded-md h-20 w-[45%] py-4 px-8 flex flex-col justify-center items-center gap-1"
        >
          <div className="text-sm">{e.title}</div>
          <div className="text-2xl font-bold">{e.value}</div>
        </div>
      ))}
    </div>
  );
};

export default StakeData;
