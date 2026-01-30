import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";

interface HealthStatusChartProps {
  data: {
    healthy: number;
    average: number;
    unhealthy: number;
  };
}

export function HealthStatusChart({ data }: HealthStatusChartProps) {
  const chartData = [
    { name: "Healthy", value: data.healthy, color: "hsl(145, 63%, 49%)" },
    { name: "Average", value: data.average, color: "hsl(40, 89%, 67%)" },
    { name: "At Risk", value: data.unhealthy, color: "hsl(0, 84%, 60%)" },
  ];

  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={chartData}
          margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
        >
          <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
          <XAxis 
            dataKey="name" 
            tick={{ fill: "hsl(var(--muted-foreground))" }}
            axisLine={{ stroke: "hsl(var(--border))" }}
          />
          <YAxis 
            tick={{ fill: "hsl(var(--muted-foreground))" }}
            axisLine={{ stroke: "hsl(var(--border))" }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "hsl(var(--card))",
              border: "1px solid hsl(var(--border))",
              borderRadius: "8px",
            }}
            labelStyle={{ color: "hsl(var(--foreground))" }}
          />
          <Bar 
            dataKey="value" 
            radius={[8, 8, 0, 0]}
            className="transition-all duration-300"
          >
            {chartData.map((entry, index) => (
              <Cell 
                key={`cell-${index}`} 
                fill={entry.color}
                className="hover:opacity-80 transition-opacity"
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
