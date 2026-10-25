
import "./globals.css";

export const metadata = {
  title: "Rohan Singh | Full Stack Developer",
  description:
    "Rohan Singh's portfolio — Full Stack Developer specializing in modern web applications, mobile apps, APIs, and database-driven solutions.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
