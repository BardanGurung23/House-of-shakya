import AutoScrollCarousel from "./AutoScrollCarousel";
import { EmblaOptionsType } from "embla-carousel";

const SLIDES = [
  { title: "Technology", icon: "/mobility.png" },
  { title: "Hospitality", icon: "/hotel.png" },
  { title: "Education", icon: "/school.png" },
  { title: "Tours and Travels", icon: "/luggage.png" },
  { title: "Retail and Commerce", icon: "/shopping-cart.png" },
  { title: "Health and Fitness", icon: "/dumbbell.png" },
  { title: "Government", icon: "/landmark.png" },
  { title: "Non-Profit Organizations", icon: "/building-2.png" },
];
const OPTIONS: EmblaOptionsType = { loop: true };

export default function SpecializationCarousel() {
  return (
    <div>
      <AutoScrollCarousel slides={SLIDES} options={OPTIONS} />
    </div>
  );
}
