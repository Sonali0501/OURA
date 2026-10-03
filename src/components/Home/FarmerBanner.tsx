import Reveal from "./Reveal";
import { useDeferredMedia } from "../../lib/deferredMedia";

const FARMER_IMG = "farmer.png";

export default function FarmerBanner() {
  // Lazy until the hero is playing, then fetched in the background before the visitor scrolls here.
  const imgLoading = useDeferredMedia() ? "eager" : "lazy";
  return (
    <section className="bg-ivory">
      <Reveal>
        <div className="overflow-hidden">
          <img
            src={FARMER_IMG}
            loading={imgLoading}
            decoding="async"
            alt="A Kerala coconut farmer at work in the grove"
            className="w-full h-[40vh] lg:h-[60vh] fill object-cover"
          />
        </div>
      </Reveal>
    </section>
  );
}
