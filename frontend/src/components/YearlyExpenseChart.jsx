import { Line } from "react-chartjs-2";

function YearlyExpenseChart({ yearWiseData }) {
  const labels = yearWiseData.map(item => `Year ${item.year}`);
  const petrolData = yearWiseData.map(item => item.petrolCost);
  const evData = yearWiseData.map(item => item.evCost);

  const chartData = {
    labels,
    datasets: [
      { label: "Petrol Cumulative Cost", data: petrolData, borderColor: "#f87171", fill: false },
      { label: "EV Cumulative Cost", data: evData, borderColor: "#34d399", fill: false }
    ],
  };

  return <Line data={chartData} />;
}

export default YearlyExpenseChart;