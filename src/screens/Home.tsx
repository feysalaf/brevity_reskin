import React from "react";
import { useNavigate } from "react-router-dom";
import { Typography, Box } from "@mui/material";

const Home: React.FC = () => {
  const navigate = useNavigate();

  // Function to get the greeting based on the current time
  const getGreeting = (): string => {
    const currentHour = new Date().getHours();
    if (currentHour < 12) {
      return "Good morning!";
    } else if (currentHour < 18) {
      return "Good afternoon!";
    } else if (currentHour < 22) {
      return "Good evening!";
    } else {
      return "";
    }
  };

  const greeting = getGreeting();

  return (
    <div className="home-container">
      <div className="content-container-home">
        <Typography variant="h4" className="greeting-text" sx={{ fontWeight: 700, fontFamily: 'Arial', fontSize: '28px' }}>
          {greeting}
        </Typography>
        <button className="analysis-button" onClick={() => navigate('/user/new-analysis')}>New Analysis</button>

        {/* table */}
        <div className="table-home">
          <div className="table-home-top">Account Balance</div>
          <div className="table-home-bottom">
            <div className="home-table-left">
              <Box className="receipt-row">
                <Typography sx={{ fontWeight: 900, fontFamily: 'Arial', fontSize: '16px' }} >Plan:</Typography>
                <Typography sx={{ fontWeight: 400, fontFamily: 'Arial', fontSize: '16px' }}>Basic</Typography>
              </Box>
              <Box className="account-row">
                <Typography  sx={{ fontWeight: 900, fontFamily: 'Arial', fontSize: '16px' }}>
                  Plan units used:
                </Typography>
                <Typography sx={{ fontWeight: 400, fontFamily: 'Arial', fontSize: '16px' }}>400</Typography>
              </Box>
              <Box className="account-row">
                <Typography sx={{ fontWeight: 900, fontFamily: 'Arial', fontSize: '16px' }}>
                  Plan units remaining:
                </Typography>
                <Typography sx={{ fontWeight: 400, fontFamily: 'Arial', fontSize: '16px' }}>345</Typography>
              </Box>
            </div>
            <div className="home-table-right">
            <Box className="account-row-rate">
                <Typography  sx={{ fontWeight: 900, fontFamily: 'Arial', fontSize: '16px' }}>
                  Rate per Unit:
                </Typography>
                <Typography  sx={{ fontWeight: 400, fontFamily: 'Arial', fontSize: '16px' }}>$ 24.75</Typography>
              </Box>

            </div>
          </div>
        </div>

        <button className="update-plan-button">Update Plan</button>
      </div>
    </div>
  );
};

export default Home;







