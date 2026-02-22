

// import { useState } from "react";
// import InputForm from "./components/InputForm";
// import ResultCard from "./components/ResultCard";
// import "./chartSetup";

// function App() {
//   const [result, setResult] = useState(null); // For Compare
//   const [recommendation, setRecommendation] = useState(null); // For Best Vehicle

//   return (
//     <div className="min-h-screen bg-gray-100 p-10">
//       <h1 className="text-4xl font-bold text-center mb-10">
//         EV vs Petrol Comparison
//       </h1>

//       {/* Form to get input */}
//       <InputForm setResult={setResult} setRecommendation={setRecommendation} />

//       {/* Result section */}
//       {result && (
//         <div className="mt-10">
//           <h2 className="text-2xl font-semibold mb-4 text-center">Comparison Result</h2>
//           <ResultCard data={result} />
//         </div>
//       )}

//       {/* Recommendation section */}
//       {recommendation && (
//         <div className="mt-10 p-6 bg-green-100 rounded-lg shadow-md max-w-md mx-auto">
//           <h2 className="text-2xl font-bold mb-4 text-center">
//             Recommended Vehicle
//           </h2>
//           <p className="mb-2">
//             <strong>Name:</strong> {recommendation.recommended.name}
//           </p>
//           <p className="mb-2">
//             <strong>Type:</strong> {recommendation.recommended.type.toUpperCase()}
//           </p>
//           <p className="mb-2">
//             <strong>Total CO₂:</strong> {recommendation.recommended.totalCarbon.toFixed(2)} kg
//           </p>
//           <p className="mt-2 text-gray-700">
//             <strong>Why we chose this car:</strong> It has the lowest total carbon emissions
//             based on your city, daily usage, and years of ownership compared to other vehicles.
//           </p>
//         </div>
//       )}
//     </div>
//   );
// }

// export default App;


// import { useState } from "react";
// import InputForm from "./components/InputForm";
// import ResultCard from "./components/ResultCard";
// import "./chartSetup";

// function App() {
//   const [result, setResult] = useState(null);
//   const [recommendation, setRecommendation] = useState(null);

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-black text-white px-6 py-12">
      
//       {/* Header */}
//       <div className="text-center mb-14">
//         <h1 className="text-5xl font-extrabold bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
//           EV vs Petrol Dashboard
//         </h1>
//         <p className="text-gray-400 mt-4 text-lg">
//           Compare total cost & carbon emissions based on your usage
//         </p>
//       </div>

//       {/* Form Section */}
//       <div className="max-w-4xl mx-auto bg-white/5 backdrop-blur-lg p-8 rounded-3xl shadow-2xl border border-white/10">
//         <InputForm 
//           setResult={setResult} 
//           setRecommendation={setRecommendation} 
//         />
//       </div>

//       {/* Comparison Result */}
//       {result && (
//         <div className="mt-16 max-w-6xl mx-auto">
//           <h2 className="text-3xl font-bold mb-8 text-center text-green-400">
//             📊 Comparison Result
//           </h2>

//           <div className="bg-white/5 backdrop-blur-lg p-8 rounded-3xl shadow-xl border border-white/10">
//             <ResultCard data={result} />
//           </div>
//         </div>
//       )}

//       {/* Recommendation Section */}
//       {recommendation && (
//         <div className="mt-16 max-w-xl mx-auto">
//           <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-[2px] rounded-3xl shadow-2xl">
//             <div className="bg-black rounded-3xl p-8">
//               <h2 className="text-3xl font-bold mb-6 text-center text-green-400">
//                 🚗 Recommended Vehicle
//               </h2>

//               <div className="space-y-3 text-lg">
//                 <p>
//                   <span className="text-gray-400">Name:</span>{" "}
//                   <span className="font-semibold">
//                     {recommendation.recommended.name}
//                   </span>
//                 </p>

//                 <p>
//                   <span className="text-gray-400">Type:</span>{" "}
//                   <span className="font-semibold uppercase">
//                     {recommendation.recommended.type}
//                   </span>
//                 </p>

//                 <p>
//                   <span className="text-gray-400">Total CO₂:</span>{" "}
//                   <span className="font-semibold text-green-400">
//                     {recommendation.recommended.totalCarbon.toFixed(2)} kg
//                   </span>
//                 </p>
//               </div>

//               <div className="mt-6 text-gray-400 border-t border-gray-700 pt-4">
//                 This vehicle produces the lowest total carbon emissions 
//                 based on your selected city, daily travel, and ownership period.
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default App;


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