import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";
import ReduxProvider from "@/providers/ReduxProvider";
import { queryClient } from "@/lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Bid The Bezel",
  description: "Bid The Bezel",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="overflow-x-hidden" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={`${spaceGrotesk.className} overflow-x-hidden antialiased`}
      >
        <QueryClientProvider client={queryClient}>
          <Toaster
            position="bottom-left"
            toastOptions={{
              style: {
                background: "#0d1b2a",
                color: "#ffffff",
                border: "none",
              },
            }}
          />
          <ReduxProvider>{children}</ReduxProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
