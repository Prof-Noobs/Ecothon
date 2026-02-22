import { useState } from "react";
import { Bar, Line } from "react-chartjs-2";

function ChartCarousel({ result }) {
  const [index, setIndex] = useState(0);

  const charts = [
    {
      title: "Cost Comparison",
      element: (
        <Bar
          data={{
            labels: ["Total Cost"],
            datasets: [
              {
                label: "₹ Cost",
                data: [result.totalCost],
              },
            ],
          }}
        />
      ),
    },
    {
      title: "Emission Comparison",
      element: (
        <Bar
          data={{
            labels: ["CO₂ Emission"],
            datasets: [
              {
                label: "kg CO₂",
                data: [result.totalEmission],
              },
            ],
          }}
        />
      ),
    },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8">
      <div className="flex justify-between items-center mb-6">
        <button
          onClick={() => setIndex((prev) => (prev - 1 + charts.length) % charts.length)}
          className="px-4 py-2 bg-slate-100 rounded-lg"
        >
          ←
        </button>

        <h3 className="text-xl font-semibold">{charts[index].title}</h3>

        <button
          onClick={() => setIndex((prev) => (prev + 1) % charts.length)}
          className="px-4 py-2 bg-slate-100 rounded-lg"
        >
          →
        </button>
      </div>

      {charts[index].element}
    </div>
  );
}

export default ChartCarousel;