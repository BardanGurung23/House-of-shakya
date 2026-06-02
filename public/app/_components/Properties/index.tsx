import { getData } from "@/utils/apiHandle";
import { mapProperty } from "@/utils/propertyMapper";
import PropertiesSection from "./PropertySection";

interface PropertiesProps {
  limit?: number;
  showHeader?: boolean;
}

export default async function Properties(props: PropertiesProps) {
  const response = await getData("property/list?page=1&limit=3");
  const properties = response?.data?.data;
  const mappedProperties = Array.isArray(properties)
    ? properties.map(mapProperty)
    : [];

  return <PropertiesSection {...props} properties={mappedProperties} />;
}
