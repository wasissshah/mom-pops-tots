import type { Metadata } from "next";
import "bootstrap/dist/css/bootstrap.min.css";
import "slick-carousel/slick/slick.css";
import "select2/dist/css/select2.min.css";
import "./globals.css";
import BootstrapClient from "@/components/layout/BootstrapClient";
import IconSprite from "@/components/ui/IconSprite";

export const metadata: Metadata = {
  title: "MPT",
  description: "Moms Pops Tots",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link href="/assets/css/style.css" rel="stylesheet" />
      </head>
      <body suppressHydrationWarning>
        <IconSprite />
        {children}
        <BootstrapClient />
      </body>
    </html>
  );
}
