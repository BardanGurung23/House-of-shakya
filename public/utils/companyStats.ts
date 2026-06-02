export type CompanyStat = {
  label: string;
  value: number;
  suffix?: string;
};

export const defaultCompanyStats: CompanyStat[] = [
  { value: 24, suffix: "+", label: "Projects Delivered" },
  { value: 480, suffix: "+", label: "Homes Created" },
  { value: 120, suffix: " Ropani", label: "Land Developed" },
  { value: 11, suffix: " Yrs", label: "Industry Experience" },
];

const normalizeCompanyStat = (stat: unknown): CompanyStat | null => {
  if (!stat || typeof stat !== "object") return null;

  const value = stat as Partial<CompanyStat>;
  const numericValue = Number(value.value);

  if (!value.label || Number.isNaN(numericValue)) {
    return null;
  }

  return {
    label: value.label,
    value: numericValue,
    suffix: value.suffix || "",
  };
};

export const getCompanyStats = (stats?: CompanyStat[] | string | null) => {
  let parsedStats: unknown = stats;

  if (typeof stats === "string") {
    try {
      parsedStats = JSON.parse(stats || "[]");
    } catch {
      parsedStats = null;
    }
  }

  if (!Array.isArray(parsedStats) || parsedStats.length === 0) {
    return defaultCompanyStats;
  }

  const normalizedStats = parsedStats
    .map(normalizeCompanyStat)
    .filter((stat): stat is CompanyStat => Boolean(stat));

  return normalizedStats.length > 0 ? normalizedStats : defaultCompanyStats;
};
