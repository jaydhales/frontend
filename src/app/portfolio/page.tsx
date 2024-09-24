import PortfolioPage from "@/components/portfolio/portfolioPage";

export default async function Home() {
  return (
    <main className="flex z-10 flex-col items-center justify-center text-white">
      <PortfolioPage />
    </main>
  );
}
