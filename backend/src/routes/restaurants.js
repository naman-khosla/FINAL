const express = require("express");
const axios = require("axios");

const router = express.Router();

router.get("/restaurants", async (req, res) => {
  const { lon, lat, radius } = req.query;
  const apiKey = process.env.GEOAPIFY_API_KEY;
  const url = `https://api.geoapify.com/v2/places?categories=catering.restaurant&filter=circle:${lon},${lat},${radius}&limit=20&apiKey=${apiKey}`;

  console.log("Requesting URL:", url);

  try {
    const response = await axios.get(url);
    res.json(response.data.features);
  } catch (error) {
    console.error("Error fetching restaurants from Geoapify:", error.message);
    res.status(500).json({ error: "Failed to fetch restaurants." });
  }
});

router.get("/parking", async (req, res) => {
  try {
    const { lon, lat, radius } = req.query;
    const apiKey = process.env.GEOAPIFY_API_KEY; // Ensure this key is in your .env file
    const url = `https://api.geoapify.com/v2/places?categories=parking&filter=circle:${lon},${lat},${radius}&apiKey=${apiKey}`;

    const response = await fetch(url);
    const data = await response.json();

    res.json(data.features); // Assuming the parking data you need is within the 'features' array
  } catch (error) {
    console.error("Error fetching parking data:", error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
