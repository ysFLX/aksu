import { LandingPage } from "@/components/site/landing-page";
import { getInventory } from "@/lib/inventory/service";

export default async function HomePage() {
  const vehicles = await getInventory();

  return <LandingPage vehicles={vehicles} />;
}

