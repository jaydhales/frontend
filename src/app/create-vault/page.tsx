import CreateVaultPage from "@/components/create-vault/createVaultPage";

export default async function Home() {
  return (
    <main className="flex flex-col items-center justify-center text-white">
      <CreateVaultPage />
    </main>
  );
}
