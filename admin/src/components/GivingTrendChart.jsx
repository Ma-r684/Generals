import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { month: "Jan", giving: 120000 },
  { month: "Feb", giving: 150000 },
  { month: "Mar", giving: 135000 },
  { month: "Apr", giving: 170000 },
  { month: "May", giving: 210000 },
];

export default function GivingTrendChart() {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border">
      <h3 className="text-lg font-semibold mb-4">Giving Trend</h3>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="giving"
            strokeWidth={3}
            stroke="#2563eb"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
