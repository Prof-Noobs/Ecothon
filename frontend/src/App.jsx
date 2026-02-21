// import { useState } from "react";
// import InputForm from "./components/InputForm";
// import ResultCard from "./components/ResultCard";
// import "./chartSetup";
// import { calculateVehicle, recommendVehicle } from "./api"; // create api.js for backend calls

// function App() {
//   const [result, setResult] = useState(null);

//   return (
//     <div className="min-h-screen bg-gray-100 p-10">
//       <h1 className="text-4xl font-bold text-center mb-10">
//         EV vs Petrol Comparison
//       </h1>

//       {/* Form to get input */}
//       <InputForm setResult={setResult} />

//       {/* Result section */}
//       {result && <ResultCard data={result} />}
//     </div>
//   );
// }

// export default App;

import { useState } from "react";
import InputForm from "./components/InputForm";
import ResultCard from "./components/ResultCard";
import "./chartSetup";

function App() {
  const [result, setResult] = useState(null); // For Compare
  const [recommendation, setRecommendation] = useState(null); // For Best Vehicle

  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <h1 className="text-4xl font-bold text-center mb-10">
        EV vs Petrol Comparison
      </h1>

      {/* Form to get input */}
      <InputForm setResult={setResult} setRecommendation={setRecommendation} />

      {/* Result section */}
      {result && (
        <div className="mt-10">
          <h2 className="text-2xl font-semibold mb-4 text-center">Comparison Result</h2>
          <ResultCard data={result} />
        </div>
      )}

      {/* Recommendation section */}
      {recommendation && (
        <div className="mt-10 p-6 bg-green-100 rounded-lg shadow-md max-w-md mx-auto">
          <h2 className="text-2xl font-bold mb-4 text-center">
            Recommended Vehicle
          </h2>
          <p className="mb-2">
            <strong>Name:</strong> {recommendation.recommended.name}
          </p>
          <p className="mb-2">
            <strong>Type:</strong> {recommendation.recommended.type.toUpperCase()}
          </p>
          <p className="mb-2">
            <strong>Total CO₂:</strong> {recommendation.recommended.totalCarbon.toFixed(2)} kg
          </p>
          <p className="mt-2 text-gray-700">
            <strong>Why we chose this car:</strong> It has the lowest total carbon emissions
            based on your city, daily usage, and years of ownership compared to other vehicles.
          </p>
        </div>
      )}
    </div>
  );
}

export default App;