import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { ModalProvider } from "@/context/ModalContext";
import LenisProvider from "@/components/LenisProvider";

export const metadata: Metadata = {
  title: "Vsmart Technologies — Engineering the Future of Software",
  description: "Innovative software development studio specializing in AI solutions, high-performance web applications, and intuitive mobile experiences. We build technology that moves the needle.",
  keywords: ["Software Development", "AI Solutions", "Web Development", "Mobile Apps", "Vsmart Technologies"],
  authors: [{ name: "Vsmart Technologies" }],
  icons: {
    icon: "https://ik.imagekit.io/zhf0gkzac/Vsmart%20Software/vsmart_small_logo-removebg-preview%20(1).png",
    apple: "https://ik.imagekit.io/zhf0gkzac/Vsmart%20Software/vsmart_small_logo-removebg-preview%20(1).png",
  },
  openGraph: {
    title: "Vsmart Technologies — Engineering the Future of Software",
    description: "Cutting-edge software, AI agents, and digital products tailored for your business success.",
    type: "website",
    url: "https://vsmarttech.net", // Adjust to your actual domain
    siteName: "Vsmart Technologies",
  },
  twitter: {
    card: "summary_large_image",
    title: "Vsmart Technologies — Engineering the Future of Software",
    description: "Technology that scales. Solutions that deliver.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider>
          <ModalProvider>
            <LenisProvider>
              {children}
            </LenisProvider>
          </ModalProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
