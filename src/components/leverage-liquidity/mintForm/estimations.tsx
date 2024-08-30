export default function Estimations({
  ape,
  disabled,
}: {
  ape: string;
  disabled: boolean;
}) {
  return (
    <div className={` pt-2 ${disabled ? "opacity-50" : ""}`}>
      <h2 className="text-sm">You receive:</h2>
      <div className="pt-1"></div>
      <div className="rounded-md bg-primary p-3">
        <h2 className={`text-xl `}>{ape} APE</h2>
        <h2 className=" text-sm italic text-gray-500">{"$20.55 (-X.XX%)"}</h2>
      </div>
    </div>
  );
}
