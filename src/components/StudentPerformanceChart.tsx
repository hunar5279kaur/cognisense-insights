import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

const mockPerformanceData = [
  { month: "Jan", healthy: 65, average: 20, atRisk: 15 },
  { month: "Feb", healthy: 68, average: 22, atRisk: 10 },
  { month: "Mar", healthy: 60, average: 25, atRisk: 15 },
  { month: "Apr", healthy: 70, average: 18, atRisk: 12 },
  { month: "May", healthy: 75, average: 17, atRisk: 8 },
  { month: "Jun", healthy: 72, average: 20, atRisk: 8 },
];

export function StudentPerformanceChart() {
  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={mockPerformanceData}
          margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
        >
          <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
          <XAxis 
            dataKey="month" 
            tick={{ fill: "hsl(var(--muted-foreground))" }}
            axisLine={{ stroke: "hsl(var(--border))" }}
          />
          <YAxis 
            tick={{ fill: "hsl(var(--muted-foreground))" }}
            axisLine={{ stroke: "hsl(var(--border))" }}
            tickFormatter={(value) => `${value}%`}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "hsl(var(--card))",
              border: "1px solid hsl(var(--border))",
              borderRadius: "8px",
            }}
            labelStyle={{ color: "hsl(var(--foreground))" }}
            formatter={(value: number) => [`${value}%`, ""]}
          />
          <Legend />
          <Line
            type="monotone"
            dataKey="healthy"
            name="Healthy"
            stroke="hsl(145, 63%, 49%)"
            strokeWidth={3}
            dot={{ fill: "hsl(145, 63%, 49%)", strokeWidth: 2 }}
            activeDot={{ r: 6, fill: "hsl(145, 63%, 49%)" }}
          />
          <Line
            type="monotone"
            dataKey="average"
            name="Average"
            stroke="hsl(40, 89%, 67%)"
            strokeWidth={3}
            dot={{ fill: "hsl(40, 89%, 67%)", strokeWidth: 2 }}
            activeDot={{ r: 6, fill: "hsl(40, 89%, 67%)" }}
          />
          <Line
            type="monotone"
            dataKey="atRisk"
            name="At Risk"
            stroke="hsl(0, 84%, 60%)"
            strokeWidth={3}
            dot={{ fill: "hsl(0, 84%, 60%)", strokeWidth: 2 }}
            activeDot={{ r: 6, fill: "hsl(0, 84%, 60%)" }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
