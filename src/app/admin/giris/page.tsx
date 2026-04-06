import { AdminLoginPage } from "@/components/site/admin-login-page";
import { SiteShell } from "@/components/site/site-shell";

export default function AdminLoginRoute() {
  return (
    <SiteShell>
      <AdminLoginPage />
    </SiteShell>
  );
}
