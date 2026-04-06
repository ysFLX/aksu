import { notFound } from "next/navigation";

import { ListingDetailPage } from "@/components/site/listing-detail-page";
import { SiteShell } from "@/components/site/site-shell";
import { getVehicleBySlug } from "@/lib/inventory/service";

export const dynamic = "force-dynamic";

type ListingDetailRouteProps = {
  params: Promise<{
    slug: string;
  }>;
};

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
