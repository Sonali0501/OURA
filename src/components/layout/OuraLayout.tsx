import OuraNav from "./OuraNav";
import OuraFooter from "./OuraFooter";
import WhatsAppButton from "./WhatsAppButton";

export default function OuraLayout({ children }: { children: React.ReactNode }) {
  return (
      <div className="bg-ivory text-palm min-h-screen flex flex-col">
        <OuraNav />
        <main className="flex-1">{children}</main>
        <OuraFooter />
        <WhatsAppButton />
      </div>
  );
}
