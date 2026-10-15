import { PieChart, Pie } from "recharts";

const data = [
  { value: 75 },
  { value: 25 },
];

export default function GivingGauge() {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border">
      <h3 className="text-lg font-semibold mb-4">Giving Target</h3>

      <PieChart width={200} height={200}>
        <Pie
          data={data}
          innerRadius={70}
          outerRadius={90}
          dataKey="value"
          startAngle={90}
          endAngle={-270}
          fill="#2563eb"
        />
      </PieChart>

      <p className="text-center mt-2 text-sm text-gray-500">
        75% of Monthly Target
      </p>
    </div>
  );
}
