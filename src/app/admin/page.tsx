import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { AdminInventoryPage } from "@/components/site/admin-inventory-page";
import { SiteShell } from "@/components/site/site-shell";
import { getAdminCookieName, isAdminSessionTokenValid } from "@/lib/admin-auth";

export default async function AdminPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get(getAdminCookieName())?.value;
  const isAuthenticated = await isAdminSessionTokenValid(token);

  if (!isAuthenticated) {
    redirect("/admin/giris");
  }

  return (
    <SiteShell>
      <AdminInventoryPage />
    </SiteShell>
  );
}
