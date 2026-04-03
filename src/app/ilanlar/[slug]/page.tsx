import { notFound } from "next/navigation";

import { ListingDetailPage } from "@/components/site/listing-detail-page";
import { SiteShell } from "@/components/site/site-shell";
import { getInventory, getVehicleBySlug } from "@/lib/inventory/service";

type ListingDetailRouteProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateStaticParams() {
  const vehicles = await getInventory();

  return vehicles.map((vehicle) => ({
    slug: vehicle.slug,
  }));
}

export default async function ListingDetailRoute({ params }: ListingDetailRouteProps) {
  const { slug } = await params;
  const vehicle = await getVehicleBySlug(slug);

  if (!vehicle) {
    notFound();
  }

  return (
    <SiteShell>
      <ListingDetailPage vehicle={vehicle} />
    </SiteShell>
  );
}
