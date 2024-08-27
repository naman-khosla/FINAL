import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDragon } from '@fortawesome/free-solid-svg-icons';



export default function Header() {
    const icon = <FontAwesomeIcon icon={faDragon} size="lg" />; // Adjust icon size
  
    return (
      <div className='Header' style={{ padding: '10px 0' }}>
        <p style={{ fontSize: '24px', margin: '0' }}>
          <a href='/' style={{ color: '#333', textDecoration: 'none' }}>
            {icon} ConcertConnect
          </a>
        </p>
        <p style={{ fontSize: '14px', color: '#2A2B2E' }}>Navigating Music and Flavors of Your City</p>
      </div>
    );
  }