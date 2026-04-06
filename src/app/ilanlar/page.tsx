import { GalleryPage } from "@/components/site/gallery-page";
import { SiteShell } from "@/components/site/site-shell";
import { getInventory } from "@/lib/inventory/service";

export const dynamic = "force-dynamic";

export default async function ListingsPage() {
  const vehicles = await getInventory();

  return (
    <SiteShell>
      <GalleryPage vehicles={vehicles} />
    </SiteShell>
  );
}
