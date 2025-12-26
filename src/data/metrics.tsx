export type MetricTone = "ok" | "attention" | "critical";

export type Metric = {
  title: string;
  value: string;
  description: string;
  tone?: MetricTone;
};

export const metrics: Metric[] = [
  {
    title: "Active Assets",
    value: "128",
    description: "Equipment currently operating normally",
    tone: "ok",
  },
  {
    title: "Service Alerts",
    value: "3",
    description: "Some require immediate attention",
    tone: "attention",
  },
  {
    title: "Assets in Critical State",
    value: "1",
    description: "Some equipment requiring immediate action",
    tone: "critical",
  },
  {
    title: "Energy Consumption",
    value: "1.24 MWh",
    description: "Total consumption in the last 24 hours",
    tone: "ok",
  },
  {
    title: "System Status",
    value: "Operational",
    description: "All platform services operational",
    tone: "ok",
  },
];
