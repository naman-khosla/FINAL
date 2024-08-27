const express = require("express");
const axios = require("axios");

const router = express.Router();

router.get("/artist-info", async (req, res) => {
  const { artistName } = req.query;
  const apiKey = process.env.LASTFM_API_KEY;
  const url = `http://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=${artistName}&api_key=${apiKey}&format=json`;

  console.log("Requesting URL:", url);

  try {
    const response = await axios.get(url);
    const artist = response.data.artist;
    res.json({
      name: artist.name,
      url: artist.url,
      stats: artist.stats,
      similar: artist.similar,
    });
  } catch (error) {
    console.error("Error fetching artist info from Last.fm:", error.message);
    res.status(500).json({ error: "Failed to fetch artist information." });
  }
});

module.exports = router;
