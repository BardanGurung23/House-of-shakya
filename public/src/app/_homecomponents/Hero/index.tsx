import HeroBanner from "./HeroBanner";
import { getData } from "../../../../utils/apiHandle";

export default async function Hero() {
  const response = await getData("banner/home-banner");
  const bannerItems = response?.data?.bannerItems;
  const banner = Array.isArray(bannerItems) ? bannerItems[0] : null;

  return <HeroBanner banner={banner} />;
}
