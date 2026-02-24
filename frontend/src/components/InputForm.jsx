

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


return (
  <form onSubmit={handleSubmit} className="max-w-xl mx-auto">

    <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 space-y-6">

      {/* Title */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900">
          Vehicle CO₂ Calculator
        </h2>
        <p className="text-gray-500 text-sm mt-1">
          Compare emissions and get the best vehicle recommendation
        </p>
      </div>

      {/* City */}
      <div>
        <label className="text-sm font-medium text-gray-900">
          Select your city
        </label>

        <select
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-3"
          required
        >
          <option value="">Choose city</option>
          <option value="Nagpur">Nagpur</option>
          <option value="Mumbai">Mumbai</option>
          <option value="Delhi">Delhi</option>
          <option value="Bengaluru">Bengaluru</option>
          <option value="Hyderabad">Hyderabad</option>
        </select>
      </div>

     
      <div>
        <label className="block mb-2 text-sm font-medium text-gray-900">
          Average KM per day
        </label>

        <input
          type="number"
          value={avgKm}
          onChange={(e) => setAvgKm(e.target.value)}
          placeholder="25"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-3"
          required
        />
      </div>

      
      <div>
        <label className="block mb-2 text-sm font-medium text-gray-900">
          Years of usage
        </label>

        <input
          type="number"
          value={years}
          onChange={(e) => setYears(e.target.value)}
          placeholder="5"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-3"
          required
        />
      </div>

     
      <button
        type="submit"
        className="w-full text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-3 text-center"
      >
        Compare Vehicles
      </button>

    
      <div className="flex items-center">
        <div className="flex-grow border-t border-gray-300"></div>
        <span className="mx-4 text-gray-500 text-sm font-medium">
          Budget Range
        </span>
        <div className="flex-grow border-t border-gray-300"></div>
      </div>

  
      <div className="grid grid-cols-2 gap-4">

        <div>
          <input
            type="number"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            placeholder="Min ₹"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-3"
          />
        </div>

        <div>
          <input
            type="number"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            placeholder="Max ₹"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-3"
          />
        </div>

      </div>

    
      <button
        type="button"
        onClick={handleRecommendClick}
        className="w-full text-white bg-emerald-600 hover:bg-emerald-700 focus:ring-4 focus:ring-emerald-300 font-medium rounded-lg text-sm px-5 py-3 text-center"
      >
        Recommend Best Vehicle
      </button>

    </div>

  </form>
);
}
export default InputForm;