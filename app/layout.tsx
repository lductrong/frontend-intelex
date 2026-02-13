import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Intelex - Xây dựng tương lai công nghệ Việt Nam",
  description: "Kết nối sinh viên, doanh nghiệp và nhà đầu tư để xây dựng tương lai công nghệ Việt Nam cùng thế hệ trẻ tài năng.",
  keywords: "technology, startup, education, vietnam, innovation",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi">
      <head>
        {/* Favicon */}
        <link rel="shortcut icon" href="/images/favicon.png" />

        {/* Fonts */}
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Montserrat:300,400,500,600,700,800,900" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Poppins:200,300,400,500,600,700,800,900" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Dosis:300,400,500,600,700,800" />

        {/* Original Template CSS - Keep all styling */}
         <link rel="stylesheet" type="text/css" href="/css/plugins-css.css" />
        <link rel="stylesheet" type="text/css" href="/css/typography.css" />
        <link rel="stylesheet" type="text/css" href="/css/shortcodes/shortcodes.css" />
        <link rel="stylesheet" type="text/css" href="/css/style.css" />
        <link rel="stylesheet" type="text/css" href="/css/responsive.css" />
        <link rel="stylesheet" type="text/css" href="/css/skins/skin-yellow.css" /> 
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}