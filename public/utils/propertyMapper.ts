export type ApiProperty = {
  id: number;
  name: string;
  location: string;
  beds?: number | null;
  bath?: number | null;
  anna?: number | string | null;
  price?: number | string | null;
  category?: {
    name?: string;
  } | null;
  images?: {
    image: string;
  }[];
};

export type PropertyCard = {
  id: number;
  name: string;
  location: string;
  category: string;
  status: string;
  statusType: string;
  price: string;
  area: string;
  beds: number;
  baths: number;
  image: string;
};

export const formatPropertyPrice = (price?: number | string | null) => {
  if (price === null || price === undefined || price === "") {
    return "Price on request";
  }

  return `Rs. ${price}`;
};

export const mapProperty = (property: ApiProperty): PropertyCard => ({
  id: property.id,
  name: property.name,
  location: property.location,
  category: property.category?.name || "Property",
  status: "Available",
  statusType: "ready",
  price: formatPropertyPrice(property.price),
  area: property.anna ? `${property.anna} Anna` : "Area on request",
  beds: Number(property.beds || 0),
  baths: Number(property.bath || 0),
  image: property.images?.[0]?.image || "",
});

type ApiProject = {
  id: number;
  name: string;
  location: string;
  type: string;
  description: string;
  img?: string | null;
};
export type ProjectItem = {
  id: number;
  name: string;
  location: string;
  type: string;
  status: string;
  statusColor: string;
  description: string;
  image: string;
  span?: string;
};

export type ProjectProps = {
  projects?: ProjectItem[];
};
const statusColors = [
  "bg-gold/80 text-navy-deep",
  "bg-forest/80 text-cream",
  "bg-navy/80 text-cream",
];

export const mapProject = (
  project: ApiProject,
  index: number
): ProjectItem => ({
  id: project.id,
  name: project.name,
  location: project.location,
  type: project.type,
  status: "Available",
  statusColor: statusColors[index % statusColors.length],
  description: project.description,
  image: project.img || "",
  span: index % 3 === 0 ? "lg:col-span-2" : "lg:col-span-1",
});

export type BannerItem = {
  image?: string | null;
  title?: string;
  subTitle?: string;
  primaryButton?: string;
  primaryButtonUrl?: string;
  secondaryButton?: string;
  secondaryButtonUrl?: string;
  overlayType?: "linear" | "solid" | string | null;
  overlayColor?: string | null;
  overlayOpacity?: number | string | null;
  overlayDirection?: string | null;
};
