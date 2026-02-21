import CostChart from "./CostChart";
import EmissionChart from "./EmissionChart";
import YearlyExpenseChart from "./YearlyExpenseChart";
import YearlyCarbonChart from "./YearlyCarbonChart";

function ResultCard({ data }) {
  if (!data || !data.totalKm || !data.yearWiseData) return null;

  return (
    <div className="space-y-10 mt-10 max-w-6xl mx-auto">
      {/* 🔹 Summary Section */}
      <div className="grid md:grid-cols-3 gap-6 text-center">
        <div className="bg-gray-50 p-6 rounded-xl shadow">
          <h2 className="text-lg font-semibold text-gray-600">
            Total Distance
          </h2>
          <p className="text-2xl font-bold text-gray-800">
            {data.totalKm.toLocaleString()} km
          </p>
        </div>

        <div className="bg-green-50 p-6 rounded-xl shadow">
          <h2 className="text-lg font-semibold text-green-700">Money Saved</h2>
          <p className="text-2xl font-bold text-green-800">
            ₹ {Math.abs(data.savings).toLocaleString()}
          </p>
        </div>

        <div className="bg-blue-50 p-6 rounded-xl shadow">
          <h2 className="text-lg font-semibold text-blue-700">Carbon Saved</h2>
          <p className="text-2xl font-bold text-blue-800">
            {Math.abs(data.carbonSaved)?.toFixed(2)} kg
          </p>
        </div>
      </div>

      {/* 🔹 Charts Section */}
      <div className="grid md:grid-cols-2 gap-10">
        <div className="bg-white p-6 rounded-xl shadow">
          <CostChart data={data} />
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <EmissionChart data={data} />
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <YearlyExpenseChart yearWiseData={data.yearWiseData} />
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <YearlyCarbonChart yearWiseData={data.yearWiseData} />
        </div>
      </div>

      {/* 🔹 Recommendation */}
      <div className="text-center mt-8">
        <h2 className="text-2xl font-bold">
          Recommended Option:
          <span
            className={`ml-3 px-4 py-2 rounded-full ${
              data.recommendation === "EV"
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {data.recommendation}
          </span>
        </h2>
      </div>
    </div>
  );
}

export default ResultCard;
