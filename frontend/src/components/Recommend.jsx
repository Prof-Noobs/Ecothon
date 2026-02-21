import { useState } from "react";
import axios from "axios";

function Recommend() {
  const [city, setCity] = useState("");
  const [avgKm, setAvgKm] = useState("");
  const [years, setYears] = useState("");
  const [recommendation, setRecommendation] = useState(null);
  const [error, setError] = useState("");

  const handleRecommend = async () => {
    setError("");
    setRecommendation(null);

    if (!city || !avgKm || !years) {
      setError("Please fill all fields first");
      return;
    }

    try {
      const res = await axios.post("http://localhost:5000/api/vehicles/recommend", {
        city,
        dailyKm: Number(avgKm),
        years: Number(years),
      });

      setRecommendation(res.data);
    } catch (err) {
      console.error(err);
      setError("Error fetching recommendation from backend");
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md max-w-md mx-auto mt-6">
      <h2 className="text-2xl font-bold mb-4 text-center">Best Vehicle Recommendation</h2>

      {error && <p className="text-red-600 mb-2">{error}</p>}

      <select
        className="w-full p-2 border rounded mb-4"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      >
        <option value="">Select City</option>
        <option value="Nagpur">Nagpur</option>
        <option value="Mumbai">Mumbai</option>
        <option value="Delhi">Delhi</option>
        <option value="Bengaluru">Bengaluru</option>
        <option value="Hyderabad">Hyderabad</option>
      </select>

      <input
        type="number"
        placeholder="Average KM per Day"
        className="w-full p-2 border rounded mb-4"
        value={avgKm}
        onChange={(e) => setAvgKm(e.target.value)}
      />

      <input
        type="number"
        placeholder="Years of Usage"
        className="w-full p-2 border rounded mb-4"
        value={years}
        onChange={(e) => setYears(e.target.value)}
      />

      <button
        onClick={handleRecommend}
        className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700"
      >
        Recommend
      </button>

      {recommendation && (
        <div className="mt-6 p-4 bg-green-100 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-2">Recommended Vehicle</h3>
          <p className="mb-1">
            <strong>Name:</strong> {recommendation.recommended.name}
          </p>
          <p className="mb-1">
            <strong>Type:</strong> {recommendation.recommended.type.toUpperCase()}
          </p>
          <p className="mb-1">
            <strong>Total CO₂:</strong> {recommendation.recommended.totalCarbon.toFixed(2)} kg
          </p>
          <p className="mb-1">
            <strong>Price:</strong> Rs.{recommendation.recommended.price || "Not Available"}
          </p>
          <p className="mt-2 text-gray-700">
            <strong>Why we chose this car:</strong> It has the lowest total carbon emissions 
            based on your city, daily usage, and years of ownership, compared to all other vehicles.
          </p>
        </div>
      )}
    </div>
  );
}

export default Recommend;