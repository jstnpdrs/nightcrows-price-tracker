"use client";
import { useEffect, useState } from "react";

function DataPage() {
  const [averageP, setAverageP] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://api.wemixplay.com/info/v2/price-chart?symbol=CROW&range=1d"
        ); // Replace with your actual API endpoint
        const jsonData = await response.json();

        // Calculate average directly in the fetch function
        const pValues = jsonData.data.chart.map((item) => item.p);
        const sumP = pValues.reduce((acc, val) => acc + val, 0);
        const countP = pValues.length;
        const average = sumP / countP;

        setAverageP(average); // Set the average as a state variable
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    // Fetch data initially and set up interval for refetching
    fetchData();
    const intervalId = setInterval(fetchData, 2000); // Fetch every second

    // Cleanup function to clear the interval on unmount
    return () => clearInterval(intervalId);
  }, []);

  if (!averageP) {
    return (
      <div className="flex items-center justify-center h-screen">
        Loading...
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center h-screen">
      <p className="text-4xl font-bold">Average value: {averageP}</p>
    </div>
  );
}

export default DataPage;
