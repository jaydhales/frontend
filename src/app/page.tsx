import LeveragePage from "@/components/leverage/leveragePage";
import Leverage from "@/components/leverage/leveragePage";
import LeverageTabs from "@/components/leverage/leverageTabs";
import { api } from "@/trpc/server";
// import { api } from "@/trpc/server";

export default async function Home() {
  // const hello = await api.post.hello({ text: "from tRPC" });
  const vaultQuery = await api.vault.getVaults();
  return (
    <main className="flex flex-col items-center justify-center text-white">
      <LeveragePage>
        <LeverageTabs vaultsQuery={vaultQuery} />
      </LeveragePage>
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
