import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../Config/firebase";

const RatingBarChart = () => {
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

  const countRatings = () => {
    const ratingCounts = {};

    placeDetails.forEach((place) => {
      const rating = place.RatingMoeen;

      if (!ratingCounts[rating]) {
        ratingCounts[rating] = 1;
      } else {
        ratingCounts[rating]++;
      }
    });

    return ratingCounts;
  };

  const ratingCounts = countRatings();

//   console.log(ratingCounts);

  const chartData = {
    labels: Object.keys(ratingCounts),
    datasets: [
      {
        label: 'Number of Rated Places',
        data: Object.values(ratingCounts),
        backgroundColor: "#CDEAD5", // You can change the color
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: true,
    scales: {
      x: {
        beginAtZero: true,
        precision: 0,
      },
      y: {
        beginAtZero: true,
        precision: 0,
      },
    },
    width: 300,
    height: 150,
  };

  return <Bar data={chartData} options={chartOptions} />;
};

export default RatingBarChart;
