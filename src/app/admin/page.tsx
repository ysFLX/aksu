import { AdminInventoryPage } from "@/components/site/admin-inventory-page";
import { SiteShell } from "@/components/site/site-shell";

export default function AdminPage() {
  return (
    <SiteShell>
      <AdminInventoryPage />
    </SiteShell>
  );
}
