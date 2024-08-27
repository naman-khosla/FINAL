import React, { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-balham.css";
import { useNavigate } from "react-router-dom";
import { fetchConfig } from "../utils/fetchConfig";

function EventSearch() {
  const [location, setLocation] = useState("");
  const [eventsData, setEventsData] = useState([]);
  const [pageCounter, setPageCounter] = useState(0);
  const [error, setError] = useState(null);
  let navigate = useNavigate();

  // Fetch the page counter
  useEffect(() => {
    const fetchPageCounter = async () => {
      try {
        const backendURL = await fetchConfig();
        const response = await fetch(`${backendURL}/api/page-counter`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();

        setPageCounter(data.count); // Update the state with the retrieved count
      } catch (error) {
        console.error("Error fetching page counter:", error);
      }
    };

    fetchPageCounter();
  }, []);

  // Handle location input change
  const handleLocationChange = (e) => {
    setLocation(e.target.value);
  };

  // Handle search button click
  const handleSearch = async () => {
    const backendURL = await fetchConfig();
    try {
      const response = await fetch(`${backendURL}/api/events?city=${location}`);
      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.status}`);
      }
      const data = await response.json();

      if (data.length === 0) {
        setError("No events found for the entered location.");
      } else {
        console.log("Fetched data:", data);
        setEventsData(data);
        setError(null); // Clear any previous error messages
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setError(
        "An error occurred while fetching data. You may have entered an incorrect city, please verify."
      ); // Set a generic error message
      setEventsData([]);
    }
  };

  // Handle row click in the grid
  const handleRowClick = (event) => {
    const eventId = event.data.id;

    if (eventId) {
      console.log("Event ID extracted", eventId);
      navigate(`/event-info/${eventId}`);
    } else {
      console.log("Information not available for this row");
    }
  };

  // Grid column definitions
  const gridColumns = [
    { headerName: "Event Name", field: "name" },
    { headerName: "Date", field: "dates.start.localDate" },
    {
      headerName: "Genre",
      valueGetter: (params) =>
        params.data.classifications[0]?.genre?.name || "N/A",
      filter: true,
      floatingFilter: true,
    },
    {
      headerName: "City",
      valueGetter: (params) =>
        params.data?._embedded?.venues[0]?.city?.name || "N/A",
    },
  ];

  return (
    <div className="container">
      <h1>Concert Findr</h1>
      <p>
        Explore the Melodic Vibes of Australia's Cities! 🎶 Enter city names
        across Australia to uncover a world of upcoming musical events. Click on
        a row to dive into the details - from event specifics to artist
        insights. Immerse yourself in the artist's music, discover nearby
        restaurants around the concert area, and uncover more enriching
        experiences. Your gateway to an unforgettable musical journey awaits!
      </p>
      <input
        type="text"
        placeholder="Enter location (city)"
        value={location}
        onChange={handleLocationChange}
      />
      <button onClick={handleSearch}>Search</button>

      {error && (
        <div className="error-message">
          <p style={{ color: "red", fontSize: "12px" }}>{error}</p>
        </div>
      )}

      <div className="ag-theme-balham" style={{ height: 400, width: "58%" }}>
        <AgGridReact
          columnDefs={gridColumns}
          rowData={eventsData}
          onRowClicked={handleRowClick}
        />
      </div>
      <p
        style={{
          fontSize: "20px",
          fontWeight: "bold",
          color: "black",
          position: "fixed",
          top: "70px",
          right: "10px",
        }}
      >
        View Counter: {pageCounter}
      </p>
    </div>
  );
}

export default EventSearch;
