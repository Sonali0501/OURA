import B2BPortal from "../components/Home/B2BPortal";
import DeepDiveLink from "../components/Home/DeepDiveLink";
import FarmerBanner from "../components/Home/FarmerBanner";
import Genesis from "../components/Home/Genesis";
import Hero from "../components/Home/Hero";
import SoilToSip from "../components/Home/SoilToSip";
import Spectrum from "../components/Home/Spectrum";
import CreatorVideos from "../components/Home/CreatorVideos";
import Testimonials from "../components/Home/Testimonials";
import CookWithOura from "../components/Home/CookWithOura";
import OuraLayout from "../components/layout/OuraLayout";

export default function Home() {
  return (
    <OuraLayout>
      <Hero />
      <Genesis />
      <DeepDiveLink />
      <CreatorVideos />
      <Spectrum />
      <Testimonials />
      <CookWithOura />
      <SoilToSip />
      <B2BPortal />
      <FarmerBanner />
    </OuraLayout>
  );
}