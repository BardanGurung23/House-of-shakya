import { getData } from "@/utils/apiHandle";
import HeroSection from "./Herosection";

export default async function Hero() {
  const response = await getData("banner/home-banner");
  const bannerItems = response?.data?.bannerItems;
  const banner = Array.isArray(bannerItems) ? bannerItems[0] : null;

  return (
    <>
      <HeroSection banner={banner} />
    </>
  );
}
