export default function DashboardFilters() {
  return (
    <div className="flex items-center gap-3">
      <select className="border rounded-lg px-3 py-2 text-sm">
        <option>This Month</option>
        <option>Last Month</option>
        <option>This Year</option>
      </select>
    </div>
  );
}
