import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

export default function Footer() {
  const icon = <FontAwesomeIcon icon={faUser} />;
  const date = new Date().getFullYear();

  //     return (
  //         <div className="Footer">
  //             <div>
  //                 Created by&nbsp;
  //                 {icon}
  //                 <a href="https://in.linkedin.com/in/pavan-asopa-53a81a106" target="_blank"
  //                     style={{
  //                         color: "#5A5A5A",
  //                         marginLeft: "0.25rem"
  //                     }}>
  //                     Naman Khosla
  //                 </a>
  //                 &nbsp;&#169;&nbsp;{`${date}`}
  //             </div>
  //         </div>
  //     );
  // }

  return (
    <div className="Footer">
      <div>
        Created by&nbsp;
        {icon}
        <a
          href="https://www.linkedin.com/in/qut-data-analyst/"
          target="_blank"
          rel="noreferrer"
          style={{
            color: "#5A5A5A",
            marginLeft: "0.25rem",
          }}
        >
          Naman Khosla
        </a>
        &nbsp;&#169;&nbsp;{`${date}`}
      </div>
      <div style={{ float: "right" }}>
        <b>Driven by: {"  "}</b>
        <a
          href="https://developer.ticketmaster.com/products-and-docs/apis/getting-started/"
          target="_blank"
          rel="noreferrer"
          style={{
            color: "#5A5A5A",
            textDecoration: "none",
            marginRight: "1rem",
          }}
        >
          Ticketmaster
        </a>
        <a
          href="https://apidocs.geoapify.com/docs/places/#about"
          target="_blank"
          rel="noreferrer"
          style={{
            color: "#5A5A5A",
            textDecoration: "none",
            marginRight: "1rem",
            margin: "0 0.5rem",
          }}
        >
          Geoapify
        </a>
        <a
          href="https://www.last.fm/api/show/track.getSimilar"
          target="_blank"
          rel="noreferrer"
          style={{
            color: "#5A5A5A",
            textDecoration: "none",
            padding: "15px",
            marginRight: "1rem",
          }}
        >
          LastFM
        </a>
      </div>
    </div>
  );
}
