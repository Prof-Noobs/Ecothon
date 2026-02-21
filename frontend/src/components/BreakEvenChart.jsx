import { Line } from "react-chartjs-2";

function BreakEvenChart({ data }) {
  const years = 5;
  const petrolYearly = data.petrolCost / years;
  const evYearly = data.evCost / years;

  const labels = [];
  const petrolData = [];
  const evData = [];

  let petrolSum = 0;
  let evSum = 0;

  for (let i = 1; i <= years; i++) {
    petrolSum += petrolYearly;
    evSum += evYearly;

    labels.push(`Year ${i}`);
    petrolData.push(petrolSum);
    evData.push(evSum);
  }

  const chartData = {
    labels,
    datasets: [
      {
        label: "Petrol Cost",
        data: petrolData,
      },
      {
        label: "EV Cost",
        data: evData,
      },
    ],
  };

  return <Line data={chartData} />;
}

export default BreakEvenChart;