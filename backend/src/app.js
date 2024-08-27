const express = require("express");
const cors = require("cors");
const app = express();
require("dotenv").config();

const eventsRoute = require("./routes/events");
const restaurantsRoute = require("./routes/restaurants");
const artistInfoRoute = require("./routes/artist-info");
const pageCounterRoute = require("./routes/pageCounter");

app.use(cors());
app.use(express.json());

app.use("/api", eventsRoute);
app.use("/api", restaurantsRoute);
app.use("/api", artistInfoRoute);
app.use("/api", pageCounterRoute);

// Root route
app.get("/", (req, res) => {
  res.send("Backend server is running!");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
