import { useState } from "react";
import InputForm from "./components/InputForm";
import ResultCard from "./components/ResultCard";
import "./chartSetup";

function App() {
  const [result, setResult] = useState(null);
  const [recommendation, setRecommendation] = useState(null);

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-[#f9fbf8] via-[#eef6f0] to-[#e6f4ea] flex items-center justify-center px-6 py-16 overflow-hidden">

      {/* 🌿 Animated Green Background Blobs */}
      <div className="absolute w-96 h-96  left-10"></div>
      <div className="absolute w-96 h-96 bg-emerald-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000 bottom-10 right-10"></div>

      {/* 🌿 Main Glass Container */}
      <div className="relative z-10 w-full max-w-5xl bg-white/60 backdrop-blur-2xl border border-white/40 shadow-2xl rounded-3xl p-12 space-y-16 transition-all duration-500">

        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-extrabold text-green-700 tracking-tight">
            EV vs Petrol Comparison
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Compare total cost and carbon emissions to make smarter,
            greener vehicle decisions 🌱
          </p>
        </div>

        {/* Form Section */}
        <div className="flex justify-center">
          <div className="w-full max-w-2xl">
            <InputForm
              setResult={setResult}
              setRecommendation={setRecommendation}
            />
          </div>
        </div>

        {/* Results Section */}
        {result && (
          <div className="space-y-8 animate-fadeIn">
            <h2 className="text-2xl font-bold text-green-700 text-center">
              📊 Comparison Result
            </h2>

            <div className="bg-white/70 backdrop-blur-md p-8 rounded-2xl shadow-lg border border-white/40">
              <ResultCard data={result} />
            </div>
          </div>
        )}

        {/* Recommendation Section */}
        {recommendation && (
          <div className="space-y-6 text-center animate-fadeIn">
            <h2 className="text-2xl font-bold text-green-700">
              🚗 Recommended Vehicle
            </h2>

            <div className="bg-gradient-to-r from-green-100 to-emerald-100 border border-green-200 rounded-2xl p-6 shadow-md max-w-xl mx-auto space-y-3">
              <p className="text-gray-700">
                <strong>Name:</strong>{" "}
                {recommendation.recommended.name}
              </p>
              <p className="text-gray-700">
                <strong>Type:</strong>{" "}
                {recommendation.recommended.type.toUpperCase()}
              </p>
              <p className="text-green-600 font-semibold text-lg">
                Total CO₂:{" "}
                {recommendation.recommended.totalCarbon.toFixed(2)} kg
              </p>

              <p className="text-gray-600 pt-4 border-t">
                This vehicle has the lowest total carbon emissions
                based on your selected city, travel pattern,
                and ownership duration.
              </p>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

export default App;