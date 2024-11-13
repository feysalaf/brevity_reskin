import React, { useState, useEffect } from 'react';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import Wifi1BarIcon from '@mui/icons-material/Wifi1Bar';
import Wifi2BarIcon from '@mui/icons-material/Wifi2Bar';
import WifiIcon from '@mui/icons-material/Wifi';

const Footer: React.FC = () => {
  const [status, setStatus] = useState("No Connection");
  const [icon, setIcon] = useState(<MoreHorizIcon style={{ color: 'red' }} />);
  const [animationIndex, setAnimationIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false); // New state to control animation
  const url = "ws://localhost:8000/ws/status_group/";
  let ws: WebSocket | null = null;

  useEffect(() => {
    const connectWebSocket = () => {
      ws = new WebSocket(url);

      ws.onopen = () => {
        
        if (isAnimating) return; // Avoid playing if already animating
        setIsAnimating(true);
        setStatus("Re-establishing Connection");

        
        setTimeout(() => {
          setIsAnimating(false); // Reset animation state
          setStatus("Connected");
        }, 1700); 
      };

      ws.onclose = () => {
        setStatus("No Connection");
        // Attempt to reconnect after a short delay
        setTimeout(connectWebSocket, 3000); // Retry every 3 seconds
      };

      ws.onerror = () => {
        setStatus("Re-establishing Connection");
        if (ws) ws.close(); // Close the socket if there's an error
      };

      ws.onmessage = (event) => {
        const data = JSON.parse(event.data);
        if (data.status === "connected") {
          if (isAnimating) return; // Avoid playing if already animating
          setIsAnimating(true);
          setStatus("Re-establishing Connection");

          
          setTimeout(() => {
            setIsAnimating(false); 
            setStatus("Connected");
          }, 1700); 
        } else if (data.status === "disconnected") {
          setStatus("No Connection");
        } else {
          // Handle status updates
          setStatus(data.message || "No Connection");
        }
      };
    };

    if (status !== "Connected") {
      connectWebSocket();
    }

    // Clean up on unmount
    return () => {
      if (ws) ws.close();
    };
  }, []);

  // Handle icon animation based on status
  useEffect(() => {
    const interval = setInterval(() => {
      if (isAnimating) { // Only animate if animating
        if (animationIndex === 0) {
          setIcon(<Wifi1BarIcon className="rotated" style={{ color: '#C4C4C4' }} />);
          setAnimationIndex(1);
        } else if (animationIndex === 1) {
          setIcon(<Wifi2BarIcon className="rotated" style={{ color: '#C4C4C4' }} />);
          setAnimationIndex(2);
        } else {
          setIcon(<WifiIcon className="rotated" style={{ color: '#C4C4C4' }} />);
          setAnimationIndex(0);
        }
      } else if (status === "Connected") {
        setIcon(<WifiIcon className="rotated" style={{ color: 'green' }} />);
      } else if (status === "No Connection") {
        setIcon(<MoreHorizIcon style={{ color: 'red' }} />);
      }
    }, 500);

    return () => clearInterval(interval);
  }, [status, animationIndex, isAnimating]); // Include isAnimating as a dependency

  return (
    <div className="footer" style={{ background: '#17213C' }}>
      <div className="footer-status">
        {icon}
        <span className={`footer-status-text ${status === "Re-establishing Connection" ? 'grey' : status === "Connected" ? 'green' : 'red'}`}>
          {status}
        </span>
      </div>
      <p style={{ color: 'white' }}>Brevity Version: 2.025</p>
    </div>
  );
};

export default Footer;
