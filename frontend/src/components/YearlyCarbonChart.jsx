import { Line } from "react-chartjs-2";

function YearlyCarbonChart({ yearWiseData }) {
  const labels = yearWiseData.map(item => `Year ${item.year}`);
  const petrolCO2 = yearWiseData.map(item => item.petrolCO2);
  const evCO2 = yearWiseData.map(item => item.evCO2);

  const chartData = {
    labels,
    datasets: [
      { label: "Petrol CO₂", data: petrolCO2, borderColor: "#60a5fa", fill: false },
      { label: "EV CO₂", data: evCO2, borderColor: "#fbbf24", fill: false }
    ],
  };

  return <Line data={chartData} />;
}

export default YearlyCarbonChart;