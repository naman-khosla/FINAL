import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocationDot,
  faHeadphones,
  faTicketAlt,
} from "@fortawesome/free-solid-svg-icons";

import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

import { fetchConfig } from "../utils/fetchConfig";

const EventInfo = () => {
  const { eventId } = useParams();
  const [eventData, setEventData] = useState(null);
  const [artistInfo, setArtistInfo] = useState(null);
  const [restaurants, setRestaurants] = useState([]);
  const [parking, setParking] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const backendURL = await fetchConfig();
        const eventUrl = `${backendURL}/api/events/${eventId}`;

        const response = await fetch(eventUrl);
        if (!response.ok) {
          throw new Error("Failed to fetch event data");
        }
        const data = await response.json();
        setEventData(data);

        if (data._embedded.attractions && data._embedded.attractions[0]) {
          const artistName = data._embedded.attractions[0].name;
          fetchArtistInfo(artistName);
        }
      } catch (error) {
        console.error("Error fetching event data:", error);
      }
    };

    fetchData();
  }, [eventId]);

  const fetchArtistInfo = async (artistName) => {
    const backendURL = await fetchConfig();
    fetch(`${backendURL}/api/artist-info?artistName=${artistName}`)
      .then((response) => response.json())
      .then((data) => setArtistInfo(data))
      .catch((error) => console.error("Error fetching artist info:", error));
  };

  useEffect(() => {
    const fetchData = async () => {
      const backendURL = await fetchConfig();
      if (eventData) {
        const { longitude, latitude } = eventData._embedded.venues[0].location;
        const radius = 5000; // 5 kilometers

        fetch(
          `${backendURL}/api/restaurants?lon=${longitude}&lat=${latitude}&radius=${radius}`
        )
          .then((response) => response.json())
          .then((data) => setRestaurants(data))
          .catch((error) =>
            console.error("Error fetching restaurant data:", error)
          );
      }
    };
    fetchData();
  }, [eventData]);

  useEffect(() => {
    const fetchData = async () => {
      const backendURL = await fetchConfig();
      if (eventData) {
        const { longitude, latitude } = eventData._embedded.venues[0].location;
        const radius = 3000; // 3 kilometers

        fetch(
          `${backendURL}/api/parking?lon=${longitude}&lat=${latitude}&radius=${radius}`
        )
          .then((response) => response.json())
          .then((data) => setParking(data))
          .catch((error) =>
            console.error("Error fetching parking data:", error)
          );
      }
    };
    fetchData();
  }, [eventData]);

  if (
    !eventData ||
    !artistInfo ||
    restaurants.length === 0 ||
    parking.length === 0
  ) {
    return <div>Loading...</div>;
  }

  const locationIcon = <FontAwesomeIcon icon={faLocationDot} size="lg" />;
  const eventInfo = eventData;
  const info = eventInfo.info;
  const city = eventInfo._embedded.venues[0].city.name;
  const address = eventInfo._embedded.venues[0].address.line1;
  const venue = eventInfo._embedded.venues[0].name;
  const artistName = eventData._embedded.attractions[0].name;
  const bookingLink = eventInfo.url;
  const eventDate = eventData.dates.start.localDate;

  const gridOptions = {
    defaultColDef: {
      flex: 1,
      minWidth: 150,
    },
    columnDefs: [
      { headerName: "Restaurant Name", field: "properties.name" },
      { headerName: "Cuisine", field: "properties.datasource.raw.cuisine" },
      { headerName: "Suburb", field: "properties.suburb" },
      { headerName: "Phone", field: "properties.datasource.raw.phone" },
    ],
    rowData: restaurants,
    pagination: true,
    paginationPageSize: 10,
    animateRows: true,
    rowSelection: "single",
  };

  const parkGridOptions = {
    defaultColDef: {
      flex: 1,
      minWidth: 150,
    },
    columnDefs: [
      { headerName: "Parking Name", field: "properties.name" },
      { headerName: "Address", field: "properties.formatted" },
      { headerName: "Fee", field: "properties.datasource.raw.fee" },
      { headerName: "Parking", field: "properties.datasource.raw.parking" },
    ],
    rowData: parking,
    pagination: true,
    paginationPageSize: 10,
    animateRows: true,
    rowSelection: "single",
  };

  return (
    <div className="container">
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          gap: "20px",
        }}
      >
        {/* Event information */}
        <div style={{ gridColumn: "span 3" }}>
          <h2>{eventInfo.name}</h2>
          <div>
            <p>{info}</p>
          </div>
        </div>

        {/* Artist, Venue, Location */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <p>
            <b>Venue:</b> {venue}
          </p>
          <p>
            <b>Date:</b> {eventDate}
          </p>
          <p>
            {locationIcon} : {address}, {city}
          </p>
        </div>

        {/* Event Image */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img
            src={eventInfo.images[0].url}
            alt={eventInfo.name}
            style={{ width: "100%", height: "auto" }}
          />
        </div>

        {/* Book Tickets */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
          }}
        >
          <h1>Event Booking</h1>
          <p>
            <FontAwesomeIcon icon={faTicketAlt} size="lg" />{" "}
            <a href={bookingLink} target="_blank" rel="noopener noreferrer">
              Book Tickets
            </a>
          </p>
        </div>

        {/* Artist Information */}
        <div style={{ gridColumn: "span 3" }}>
          <h4>Artist Information:</h4>
          <p>
            <b>Name:</b> {artistInfo.name}
          </p>
          <p>
            <FontAwesomeIcon icon={faHeadphones} size="lg" />
            <a
              href={artistInfo.url}
              target="_blank"
              rel="noopener noreferrer"
              color="2b6777"
            >
              Listen Now
            </a>
          </p>
          <p>
            <b>Number of Listeners:</b> {artistInfo.stats.listeners}
          </p>
        </div>

        {/* Similar Artists */}
        <div style={{ gridColumn: "span 2" }}>
          <p>
            More like <b>{artistName}:</b>
          </p>
          <div style={{ display: "flex", overflowX: "visible", gap: "20px" }}>
            {artistInfo.similar.artist.map((artist, index) => (
              <div key={index} style={{ flex: "0 0 auto", minWidth: "200px" }}>
                <h5>{artist.name}</h5>
                <p>
                  <FontAwesomeIcon icon={faHeadphones} size="lg" />
                  <a
                    href={artist.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Listen Now
                  </a>
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Restaurant Information */}
        <div style={{ gridColumn: "span 3" }}>
          <h4>Restaurants near the Venue (5km radius approx):</h4>
          <div
            className="ag-theme-alpine"
            style={{ height: 400, width: "100%" }}
          >
            <AgGridReact gridOptions={gridOptions} />
          </div>
        </div>
        {/* Parking Information */}
        <div style={{ gridColumn: "span 3" }}>
          <h4>Parking options near the Venue (3km radius approx):</h4>
          <div
            className="ag-theme-alpine"
            style={{ height: 400, width: "100%" }}
          >
            <AgGridReact gridOptions={parkGridOptions} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventInfo;
