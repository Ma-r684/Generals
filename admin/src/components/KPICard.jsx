import { ArrowUpRight, ArrowDownRight } from "react-icons/hi2";

export default function KPICard({ title, value, change, positive }) {
  return (
    <div className="bg-white rounded-xl p-5 shadow-sm border">
      <p className="text-sm text-gray-500">{title}</p>

      <div className="flex items-center justify-between mt-2">
        <h2 className="text-2xl font-semibold">{value}</h2>

        <span
          className={`flex items-center gap-1 text-sm font-medium ${
            positive ? "text-green-600" : "text-red-600"
          }`}
        >
          {positive ? <ArrowUpRight /> : <ArrowDownRight />}
          {change}
        </span>
      </div>
    </div>
  );
}
