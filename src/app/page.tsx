import Leverage from "@/components/leverage/leverage";
import { LeverageTier, type TPool } from "@/lib/types";
// import { api } from "@/trpc/server";

const mockPools: TPool[] = [
  {
    debtToken: "0x",
    collateralToken: "0x",
    leverageTier: LeverageTier.one,
    vaultId: "123",
  },
];
export default async function Home() {
  // const hello = await api.post.hello({ text: "from tRPC" });
  return (
    <main className="flex flex-col items-center justify-center text-white">
      <Leverage />
    </main>
  );
}

// async function CrudShowcase() {
//   const latestPost = await api.post.getLatest();

//   return (
//     <div className="w-full max-w-xs">
//       {latestPost ? (
//         <p className="truncate">Your most recent post: {latestPost.name}</p>
//       ) : (
//         <p>You have no posts yet.</p>
//       )}

//       <CreatePost />
//     </div>
//   );
// }
