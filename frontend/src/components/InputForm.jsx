

import { useState } from "react";
import axios from "axios";

function InputForm({ setResult, setRecommendation }) {
  const [city, setCity] = useState("");
  const [avgKm, setAvgKm] = useState("");
  const [years, setYears] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  // Handle Compare button (existing functionality)
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!city || !avgKm || !years) {
      alert("Please fill all fields first");
      return;
    }

    try {
      const res = await axios.post("http://localhost:5000/api/calculate", {
        city,
        avgKmPerDay: Number(avgKm),
        years: Number(years),
      });

      console.log("API RESPONSE:", res.data); // debug
      setResult(res.data);
    } catch (error) {
      console.error(error);
      alert("Error fetching data from backend");
    }
  };

  // Handle Recommend Best Vehicle button
  const handleRecommendClick = async () => {
  if (!city || !avgKm || !years || !minPrice || !maxPrice) {
    alert("Please fill all fields including budget");
    return;
  }

  // ✅ ADD THIS RIGHT HERE
  if (Number(maxPrice) < Number(minPrice)) {
    alert("Maximum price cannot be less than minimum price");
    return;
  }

  try {
    const res = await axios.post(
      "http://localhost:5000/api/vehicles/recommend",
      {
        city,
        dailyKm: Number(avgKm),
        years: Number(years),
        minPrice: Number(minPrice),
        maxPrice: Number(maxPrice),
      }
    );

    console.log("Recommendation API RESPONSE:", res.data);

    if (typeof setRecommendation === "function") {
      setRecommendation(res.data);
    } else {
      alert(
        `Recommended Vehicle: ${res.data.recommended.name} (${res.data.recommended.type.toUpperCase()})`
      );
    }
  } catch (error) {
    console.error("BACKEND ERROR:", error.response?.data);
    alert(error.response?.data?.error || "Error fetching recommendation");
  }
};

// return (
//   <form
//     onSubmit={handleSubmit}
//     className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-3xl shadow-2xl max-w-2xl mx-auto space-y-6"
//   >
//     {/* Section Title */}
//     <h2 className="text-2xl font-bold text-center text-white mb-4">
//       Enter Your Usage Details
//     </h2>

//     {/* City Selection */}
//     <div>
//       <label className="block text-gray-300 mb-2">Select City</label>
//       <select
//         className="w-full p-3 rounded-xl bg-black/40 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-green-500 transition"
//         value={city}
//         onChange={(e) => setCity(e.target.value)}
//         required
//       >
//         <option value="">Choose your city</option>
//         <option value="Nagpur">Nagpur</option>
//         <option value="Mumbai">Mumbai</option>
//         <option value="Delhi">Delhi</option>
//         <option value="Bengaluru">Bengaluru</option>
//         <option value="Hyderabad">Hyderabad</option>
//       </select>
//     </div>

//     {/* Average KM per Day */}
//     <div>
//       <label className="block text-gray-300 mb-2">Average KM per Day</label>
//       <input
//         type="number"
//         placeholder="e.g. 25"
//         className="w-full p-3 rounded-xl bg-black/40 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-green-500 transition"
//         value={avgKm}
//         onChange={(e) => setAvgKm(e.target.value)}
//         required
//       />
//     </div>

//     {/* Years of Usage */}
//     <div>
//       <label className="block text-gray-300 mb-2">Years of Usage</label>
//       <input
//         type="number"
//         placeholder="e.g. 5"
//         className="w-full p-3 rounded-xl bg-black/40 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-green-500 transition"
//         value={years}
//         onChange={(e) => setYears(e.target.value)}
//         required
//       />
//     </div>

//     {/* Compare Button */}
//     <button
//       type="submit"
//       className="w-full py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-blue-500 to-indigo-600 hover:scale-105 transform transition duration-200 shadow-lg"
//     >
//       📊 Compare Vehicles
//     </button>

//     {/* Divider */}
//     <div className="border-t border-gray-700 pt-6">
//       <h3 className="text-xl font-semibold text-green-400 mb-4 text-center">
//         Budget Range
//       </h3>

//       {/* Budget Inputs */}
//       <div className="grid grid-cols-2 gap-4">
//         <input
//           type="number"
//           value={minPrice}
//           onChange={(e) => setMinPrice(e.target.value)}
//           placeholder="Minimum ₹"
//           className="p-3 rounded-xl bg-black/40 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-green-500 transition"
//         />

//         <input
//           type="number"
//           value={maxPrice}
//           onChange={(e) => setMaxPrice(e.target.value)}
//           placeholder="Maximum ₹"
//           className="p-3 rounded-xl bg-black/40 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-green-500 transition"
//         />
//       </div>

//       {/* Recommendation Button */}
//       <button
//         type="button"
//         onClick={handleRecommendClick}
//         className="w-full mt-6 py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-green-500 to-emerald-600 hover:scale-105 transform transition duration-200 shadow-lg"
//       >
//         🚗 Recommend Best Vehicle
//       </button>
//     </div>
//   </form>
// );
return (
  <form
    onSubmit={handleSubmit}
    className="bg-white/70 backdrop-blur-xl border border-white/40 p-10 rounded-3xl shadow-xl space-y-8 transition-all duration-300"
  >
    {/* Title */}
    <div className="text-center space-y-2">
      <h2 className="text-2xl font-bold text-green-700">
        Enter Your Usage Details
      </h2>
      <p className="text-gray-500 text-sm">
        Provide your travel pattern to compare EV vs Petrol
      </p>
    </div>

    {/* City */}
    <div className="space-y-2">
      <label className="text-gray-700 font-medium">Select City</label>
      <select
        className="w-full p-3 rounded-xl bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400 transition"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        required
      >
        <option value="">Choose your city</option>
        <option value="Nagpur">Nagpur</option>
        <option value="Mumbai">Mumbai</option>
        <option value="Delhi">Delhi</option>
        <option value="Bengaluru">Bengaluru</option>
        <option value="Hyderabad">Hyderabad</option>
      </select>
    </div>

    {/* KM per day */}
    <div className="space-y-2">
      <label className="text-gray-700 font-medium">Average KM per Day</label>
      <input
        type="number"
        placeholder="e.g. 25"
        className="w-full p-3 rounded-xl bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400 transition"
        value={avgKm}
        onChange={(e) => setAvgKm(e.target.value)}
        required
      />
    </div>

    {/* Years */}
    <div className="space-y-2">
      <label className="text-gray-700 font-medium">Years of Usage</label>
      <input
        type="number"
        placeholder="e.g. 5"
        className="w-full p-3 rounded-xl bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400 transition"
        value={years}
        onChange={(e) => setYears(e.target.value)}
        required
      />
    </div>

    {/* Compare Button */}
    <button
      type="submit"
      className="w-full py-3 rounded-xl font-semibold text-white bg-green-600 hover:bg-green-700 transition duration-200 shadow-md hover:shadow-lg active:scale-95"
    >
      📊 Compare Vehicles
    </button>

    {/* Divider */}
    <div className="border-t border-gray-200 pt-6 space-y-6">
      <h3 className="text-lg font-semibold text-green-600 text-center">
        Budget Range
      </h3>

      {/* Budget Grid */}
      <div className="grid grid-cols-2 gap-4">
        <input
          type="number"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
          placeholder="Minimum ₹"
          className="p-3 rounded-xl bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400 transition"
        />

        <input
          type="number"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          placeholder="Maximum ₹"
          className="p-3 rounded-xl bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400 transition"
        />
      </div>

      {/* Recommend Button */}
      <button
        type="button"
        onClick={handleRecommendClick}
        className="w-full py-3 rounded-xl font-semibold text-white bg-emerald-500 hover:bg-emerald-600 transition duration-200 shadow-md hover:shadow-lg active:scale-95"
      >
        🚗 Recommend Best Vehicle
      </button>
    </div>
  </form>
);
}

export default InputForm;