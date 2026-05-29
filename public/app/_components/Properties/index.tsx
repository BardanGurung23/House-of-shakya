import { getData } from "@/utils/apiHandle";
import PropertiesSection, { PropertyCard } from "./PropertySection";

interface PropertiesProps {
  limit?: number;
  showHeader?: boolean;
}

const formatPrice = (price?: number | string | null) => {
  if (price === null || price === undefined || price === "") {
    return "Price on request";
  }

  return `Rs. ${price}`;
};

type ApiProperty = {
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

const mapProperty = (property: ApiProperty): PropertyCard => ({
  id: property.id,
  name: property.name,
  location: property.location,
  category: property.category?.name || "Property",
  status: "Available",
  statusType: "ready",
  price: formatPrice(property.price),
  area: property.anna ? `${property.anna} Anna` : "Area on request",
  beds: Number(property.beds || 0),
  baths: Number(property.bath || 0),
  image: property.images?.[0]?.image || "",
});

export default async function Properties(props: PropertiesProps) {
  const response = await getData("property/list");
  const properties = response?.data?.data;
  const mappedProperties = Array.isArray(properties)
    ? properties.map(mapProperty)
    : [];

  return <PropertiesSection {...props} properties={mappedProperties} />;
}
