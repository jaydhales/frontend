export default function ErrorMessage({
  children,
}: {
  children: React.ReactNode;
}) {
  return <p className="h-[14px] text-left text-sm text-red-400">{children}</p>;
}
