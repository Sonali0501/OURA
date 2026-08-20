import B2BPortal from "../components/Home/B2BPortal";
import DeepDiveLink from "../components/Home/DeepDiveLink";
import FarmerBanner from "../components/Home/FarmerBanner";
import Genesis from "../components/Home/Genesis";
import Hero from "../components/Home/Hero";
import SoilToSip from "../components/Home/SoilToSip";
import Spectrum from "../components/Home/Spectrum";
import Testimonials from "../components/Home/Testimonials";
import OuraLayout from "../components/layout/OuraLayout";

export default function Home() {
  return (
    <OuraLayout>
      <Hero />
      <Genesis />
      <DeepDiveLink />
      <Spectrum />
      <SoilToSip />
      <FarmerBanner />
      <Testimonials />
      <B2BPortal />
    </OuraLayout>
  );
}