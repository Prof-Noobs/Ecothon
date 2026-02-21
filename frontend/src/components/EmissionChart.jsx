import { Bar } from "react-chartjs-2";

function EmissionChart({ data }) {
  const chartData = {
    labels: ["Petrol", "EV"],
    datasets: [
      {
        label: "CO₂ Emission (kg)",
        data: [data.petrolCO2, data.evCO2],
        backgroundColor: ["#60a5fa", "#fbbf24"]
      },
    ],
  };

  return <Bar data={chartData} />;
}

export default EmissionChart;