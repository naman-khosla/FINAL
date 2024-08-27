//import logo from './logo.svg';
import './App.css';
import './css/styles.css';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./routes/Root.js";
import EventSearch from './routes/EventSearch.js';
import EventInfo from './routes/EventInfo.js';
import Footer from './routes/Footer.js';



const router = createBrowserRouter([
  {
    path: "/",
      element: <Root />,
      children: [
        {
          path: "/",
          name: "Home",
          element: <EventSearch />
        },
        {
          path: "/event-info/:eventId",
          name: "Stock Info",
          element: <EventInfo />
        }
      ],
  }
]);

export default function App() {
  return (
    <div>
      <RouterProvider router={router} />
      <div className="bottom-page-padding"></div>
      <Footer/>
    </div>
  );
}


