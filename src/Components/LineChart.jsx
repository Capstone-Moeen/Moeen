import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../Config/firebase";
import 'chart.js/auto';
import { Chart } from 'react-chartjs-2';

const LineChart = () => {
  const [placeDetails, setPlaceDetails] = useState([]);

  useEffect(() => {
    const getPlaceDetails = async () => {
      try {
        const query = await getDocs(collection(db, "AcceptedPlaces"));
        const data = query.docs.map((doc) => doc.data());
        setPlaceDetails(data);
      } catch (error) {
        // console.error(error);
      }
    };

    getPlaceDetails();
  }, []);

  // console.log(placeDetails);

  const countPlaceTypes = () => {
    const typeCounts = {};

    placeDetails.forEach((place) => {
      const type = place.placeType;

      if (!typeCounts[type]) {
        typeCounts[type] = 1;
      } else {
        typeCounts[type]++;
      }
    });

    return typeCounts;
  };

  const typeCounts = countPlaceTypes();

  console.log(typeCounts);

  const chartData = {
    labels: Object.keys(typeCounts),
    datasets: [
      {
        label: 'Places Types ',
        data: Object.values(typeCounts),
        fill: false, 
        borderColor: "#CDEAD5",
        backgroundColor: "#CDEAD5",
      },
    ],
  };

  // console.log(`d ${chartData}`);

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: true, // for h and w
    scales: {
      y: {
        beginAtZero: true,
        precision: 0, 
      },
    },
    width: 300, 
    height: 150, 
  };

  return <Line data={chartData} options={chartOptions} />
};

export default LineChart;
