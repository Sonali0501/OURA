import { ShoppingBag } from "lucide-react";
import { useCart } from "../../context/cartContext";

export default function CartButton({ light = false }: { light?: boolean }) {
  const { itemCount, openCart } = useCart();

  return (
    <button
      type="button"
      onClick={openCart}
      aria-label={itemCount > 0 ? `Open cart, ${itemCount} items` : "Open cart"}
      className={`relative inline-flex items-center justify-center w-11 h-11 transition-colors ${
        light ? "text-gold/80 hover:text-gold" : "text-ivory/90 hover:text-ivory"
      }`}
    >
      <ShoppingBag className="w-5 h-5" strokeWidth={1.5} />
      {itemCount > 0 && (
        <span className="absolute top-1 right-0.5 min-w-[18px] h-[18px] px-1 rounded-full bg-theme-gradient text-ivory text-[10px] font-sans-ui font-medium flex items-center justify-center">
          {itemCount}
        </span>
      )}
    </button>
  );
}
