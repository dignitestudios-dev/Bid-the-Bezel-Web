import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import { Suspense } from "react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <Suspense fallback={null}>
        <Navbar />
      </Suspense>
      {children}
      <Footer />
    </div>
  );
}

