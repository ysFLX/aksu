import { LandingPage } from "@/components/site/landing-page";
import { SiteShell } from "@/components/site/site-shell";
import { getFeaturedInventory } from "@/lib/inventory/service";

export default async function HomePage() {
  const vehicles = await getFeaturedInventory(3);

  return (
    <SiteShell>
      <LandingPage vehicles={vehicles} />
    </SiteShell>
  );
}
