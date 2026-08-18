import OuraNav from "./OuraNav";
import OuraFooter from "./OuraFooter";
import WhatsAppButton from "./WhatsAppButton";
import CartDrawer from "../cart/CartDrawer";

export default function OuraLayout({
  children,
  solidNav = false,
}: {
  children: React.ReactNode;
  /** Pages that open on a light background need opaque nav chrome from the top. */
  solidNav?: boolean;
}) {
  return (
      <div className="bg-ivory text-palm min-h-screen flex flex-col">
        <OuraNav solid={solidNav} />
        <main className="flex-1">{children}</main>
        <OuraFooter />
        <WhatsAppButton />
        <CartDrawer />
      </div>
  );
}
