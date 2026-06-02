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
