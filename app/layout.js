import Logo from "@/_components/Logo";
import Navigation from "@/_components/Navigation";
import "@/_styles/globals.css";

export const metadata = {
  title: "The Wild Oasis",
  description: "Beautiful cabins for your vacation",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-primary-950 text-primary-50 min-h-screen">
        <header>
          <Logo />
          <Navigation />
        </header>
        <main>{children}</main>
        <footer>Copyright by The Wild Oasis</footer>
      </body>
    </html>
  );
}
