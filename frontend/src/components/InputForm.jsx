// import { useState } from "react";
// import axios from "axios";

// function InputForm({ setResult }) {
//   const [city, setCity] = useState("");
//   const [avgKm, setAvgKm] = useState("");
//   const [years, setYears] = useState("");

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const res = await axios.post("http://localhost:5000/api/calculate", {
//         city,
//         avgKmPerDay: Number(avgKm),
//         years: Number(years)
//       });

//       console.log("API RESPONSE:", res.data); // check backend output
//       setResult(res.data);
//     } catch (error) {
//       console.error(error);
//       alert("Error fetching data from backend");
//     }
//   };

//   return (
//     <form
//       onSubmit={handleSubmit}
//       className="bg-white p-6 rounded-xl shadow-md max-w-md mx-auto"
//     >
//       <select
//         className="w-full p-2 border rounded mb-4"
//         value={city}
//         onChange={(e) => setCity(e.target.value)}
//         required
//       >
//         <option value="">Select City</option>
//         <option value="Nagpur">Nagpur</option>
//         <option value="Mumbai">Mumbai</option>
//         <option value="Delhi">Delhi</option>
//         <option value="Bengaluru">Bengaluru</option>
//         <option value="Hyderabad">Hyderabad</option>
//       </select>

//       <input
//         type="number"
//         placeholder="Average KM per Day"
//         className="w-full p-2 border rounded mb-4"
//         value={avgKm}
//         onChange={(e) => setAvgKm(e.target.value)}
//         required
//       />

//       <input
//         type="number"
//         placeholder="Years of Usage"
//         className="w-full p-2 border rounded mb-4"
//         value={years}
//         onChange={(e) => setYears(e.target.value)}
//         required
//       />

//       <button className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
//         Compare
//       </button>
//     </form>
//   );
// }

// export default InputForm;

import { useState } from "react";
import axios from "axios";

function InputForm({ setResult, setRecommendation }) {
  const [city, setCity] = useState("");
  const [avgKm, setAvgKm] = useState("");
  const [years, setYears] = useState("");

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
    if (!city || !avgKm || !years) {
      alert("Please fill all fields first");
      return;
    }

    try {
      const res = await axios.post("http://localhost:5000/api/vehicles/recommend", {
        city,
        dailyKm: Number(avgKm),
        years: Number(years),
      });

      console.log("Recommendation API RESPONSE:", res.data);

      // If App.jsx passed setRecommendation, update state there
      if (typeof setRecommendation === "function") {
        setRecommendation(res.data);
      } else {
        alert(
          `Recommended Vehicle: ${res.data.recommended.name} (${res.data.recommended.type.toUpperCase()})`
        );
      }
    } catch (error) {
      console.error(error);
      alert("Error fetching recommendation from backend");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-xl shadow-md max-w-md mx-auto"
    >
      {/* City Selection */}
      <select
        className="w-full p-2 border rounded mb-4"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        required
      >
        <option value="">Select City</option>
        <option value="Nagpur">Nagpur</option>
        <option value="Mumbai">Mumbai</option>
        <option value="Delhi">Delhi</option>
        <option value="Bengaluru">Bengaluru</option>
        <option value="Hyderabad">Hyderabad</option>
      </select>

      {/* Average KM per Day */}
      <input
        type="number"
        placeholder="Average KM per Day"
        className="w-full p-2 border rounded mb-4"
        value={avgKm}
        onChange={(e) => setAvgKm(e.target.value)}
        required
      />

      {/* Years of Usage */}
      <input
        type="number"
        placeholder="Years of Usage"
        className="w-full p-2 border rounded mb-4"
        value={years}
        onChange={(e) => setYears(e.target.value)}
        required
      />

      {/* Buttons */}
      <button
        type="submit"
        className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
      >
        Compare
      </button>

      <button
        type="button"
        className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700 mt-2"
        onClick={handleRecommendClick}
      >
        Recommend Best Vehicle
      </button>
    </form>
  );
}

export default InputForm;