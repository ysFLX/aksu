import type { ReactNode } from "react";

import { SiteFooter } from "@/components/site/site-footer";
import { SiteHeader } from "@/components/site/site-header";

type SiteShellProps = {
  children: ReactNode;
};

export function SiteShell({ children }: SiteShellProps) {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,#2b180d_0%,#120e0c_42%,#080808_100%)] text-white">
      <SiteHeader />
      {children}
      <SiteFooter />
    </div>
  );
}

