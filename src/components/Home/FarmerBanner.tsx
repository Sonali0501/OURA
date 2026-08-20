import Reveal from "./Reveal";

const FARMER_IMG = "farmer.png";

export default function FarmerBanner() {
  return (
    <section className="bg-ivory">
      <Reveal>
        <div className="overflow-hidden">
          <img
            src={FARMER_IMG}
            alt="A Kerala coconut farmer at work in the grove"
            className="w-full h-[40vh] lg:h-[60vh] fill object-cover"
          />
        </div>
      </Reveal>
    </section>
  );
}
