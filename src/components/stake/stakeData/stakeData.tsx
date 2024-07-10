// Dummy data
const data = [
  {
    title: "Total Value Locked",
    value: "36.68 SIR",
  },
  {
    title: "Staking APY",
    value: "6.8%",
  },
];

const StakeData = () => {
  return (
    <div className="flex justify-evenly py-[24px]">
      {data.map((e, i) => (
        <div
          key={i}
          className="bg-secondary rounded-md w-[47%] py-2 flex flex-col justify-center items-center gap-2"
        >
          <div className="text-sm font-light">{e.title}</div>
          <div className="text-2xl font-semibold font-lora">{e.value}</div>
        </div>
      ))}
    </div>
  );
};

export default StakeData;
