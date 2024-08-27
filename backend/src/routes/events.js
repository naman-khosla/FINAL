const express = require("express");
const router = express.Router();
const fetch = require("node-fetch");

// Route to search for events by city
router.get("/events", async (req, res) => {
  try {
    const { city } = req.query;
    if (!city) {
      return res.status(400).json({ error: "City parameter is required" });
    }

    const apiKey = process.env.TICKETMASTER_API_KEY;
    const url = `https://app.ticketmaster.com/discovery/v2/events.json?apikey=${apiKey}&city=${city}&countryCode=AU`;

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(
        `Failed to fetch events from Ticketmaster. Status: ${response.status}`
      );
    }

    const data = await response.json();
    if (!data._embedded || !data._embedded.events) {
      return res.status(404).json({ error: "No events found" });
    }

    res.json(data._embedded.events);
  } catch (error) {
    console.error("Error fetching events:", error);
    res.status(500).json({ error: error.message });
  }
});

// Route to fetch individual event details by event ID
router.get("/events/:eventId", async (req, res) => {
  try {
    const { eventId } = req.params;
    const apiKey = process.env.TICKETMASTER_API_KEY;
    const url = `https://app.ticketmaster.com/discovery/v2/events/${eventId}.json?apikey=${apiKey}`;

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(
        `Failed to fetch event details from Ticketmaster. Status: ${response.status}`
      );
    }

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error("Error fetching event details:", error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
