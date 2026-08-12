import { MessageCircle } from "lucide-react";

const WHATSAPP_NUMBER = "918138014300";

const waLink = (text: string) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;

export default function WhatsAppButton() {
  return (
    <a
      href={waLink("Hello OURA, I'd love to know more about your coconut essentials.")}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="fixed bottom-5 right-5 z-50 flex items-center gap-2.5 pl-3.5 pr-5 h-12 rounded-full bg-gold text-ivory shadow-[0_10px_30px_rgba(22,58,46,0.35)] hover:brightness-110 transition"
    >
      <MessageCircle className="w-5 h-5" />
      <span className="text-[11px] font-sans-ui tracking-luxe uppercase">Chat with us</span>
    </a>
  );
}