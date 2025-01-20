// Home.jsx
import 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
function Home() {
  // Styling for the main container with back23.png
  const containerStyle = {
    backgroundImage: "url('/back23.png')", // Ensure back23.png is in the public folder
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    height: '100vh',
    color: 'black',
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between', // This makes the footer stick to the bottom
  };
  // Styling for the register and other buttons
  const buttonStyle = {
    backgroundColor: '#003366', // Dark blue color for buttons
    color: 'white',
    border: 'none',
    padding: '15px 30px',
    fontSize: '16px',
    fontWeight: 'bold', // Bold font
    cursor: 'pointer',
    borderRadius: '5px',
    marginTop: '50px',
  };

  return (
    <div style={containerStyle}>
      {/* Navigation Bar */}
 

      {/* Welcome Section */}
      <section id="welcome">
        <div className="container" style={{ padding: '50px 90px' }}> {/* Reduced padding to move title higher */}
          <h2>Welcome to Expert Campus</h2>
          <p style={{ padding: '50px 90px' }}>
            Expert Campus is your gateway to a comprehensive learning experience in the world of IT. 
            Whether you are looking to kickstart your career in technology or enhance your current skills, 
            we offer a range of programs to suit your needs. Join us as we empower the next generation of IT professionals!
          </p>
          
          {/* Register Button */}
          <a href="/form">
          <button style={buttonStyle} >
            Register Now
          </button>
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ backgroundColor: '#333', color: 'white', padding: '5px' }}>
        <p style={{ textAlign: 'center' }}>
          &copy; 2025 Expert Campus. All Rights Reserved.
        </p>
      </footer>
    </div>
  );
}

export default Home;