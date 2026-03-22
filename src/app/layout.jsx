import NoPhoto from "@/components/app/noPhoto/NoPhoto";
import "./globals.css"
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body >
        {children}
      </body>
    </html>
  );
}
