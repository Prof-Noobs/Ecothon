import { Bar } from "react-chartjs-2";

function CostChart({ data }) {
  const chartData = {
    labels: ["Petrol", "EV"],
    datasets: [
      {
        label: "Total Cost (₹)",
        data: [data.petrolCost, data.evCost],
        backgroundColor: ["#f87171", "#34d399"]
      },
    ],
  };

  return <Bar data={chartData} />;
}

export default CostChart;