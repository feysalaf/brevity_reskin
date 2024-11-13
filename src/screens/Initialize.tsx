import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
// import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import { LinearProgress, linearProgressClasses,Typography  } from '@mui/material';



const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 10,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    background: 'linear-gradient(to right, #00b8b9,#00dadb, #00b8b9)',
  },
}));


const Initialize: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const [heading, setHeading] = useState<string>('Loading up the server');
  const [oldHeading] = useState<string>('');


  
  useEffect(() => {
 
    const socket = new WebSocket('ws://127.0.0.1:8000/ws/initial_status/');
 

    socket.onopen = () => {
        console.log('Connected to backend');
    };
    socket.onmessage = (event) => {
        const data = JSON.parse(event.data);
        console.log("LS");
        console.log(data.message);

        let messageType = "";

        if (data.message.includes("audio")) {
            messageType = "audio";
        } else if (data.message.includes("Loading video model")) {
            messageType = "Loading video model";
        } else if (data.message.includes("Loading scalers")) {
            messageType = "Loading scalers";
        } else if (data.message.includes("Loading audio model")) {
            messageType = "Loading audio model";
        } else if (data.message.includes("Loading text model")) {
            messageType = "Loading text model";
        } else if (data.message.includes("Single File")) {
            messageType = "Single";
        } else if (data.message.includes("Discovering")) {
            messageType = "Discovering";
        }
        else if (data.message.includes("Creating")) {
            messageType = "Trans";
        }

        const updateHeading = (newHeading: string) => {
             setTimeout(() => {
                setHeading('');
                setTimeout(() => {
                    setHeading(newHeading);
                 }, 500); // Delay to allow tick to disappear
            }, 2000); // Duration to show the tick
        };

        switch (messageType) {
            case "Loading audio model":
                
                updateHeading('Loading audio models...');
 
                break;
            case "Loading video model":
                updateHeading('Loading video model');
 
                break;
            case "Loading scalers":
                updateHeading('Loading scalers');
  
                break;
            case "Loading text model":
                updateHeading('Loading text model');
 
                break;
            case "Completed":
                 break;
            case "LLM":
                updateHeading('Performing co-occurrence');
                 break;
            case "Discovering":
                updateHeading('Discovering co-occurrence in a single file');
                 break;
            case "Trans":
                updateHeading('Creating transcription');
 
                break;
            default:
                // Handle unknown message types if necessary
                break;
        }
    };

    return () => {
        socket.close();
    };
}, [ navigate]);



  useEffect(() => {
    const checkConnection = () => {
      axios.get('http://localhost:8000', { timeout: 5000 })
        .then(() => {
          setIsLoading(false);
        })
        .catch(() => {
          setIsLoading(false);
        });
    };

    checkConnection();
    const interval = setInterval(checkConnection, 5000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!isLoading) {
      const navigationTimeout = setTimeout(() => {
        navigate('/welcome');
      }, 2000);

      return () => clearTimeout(navigationTimeout);
    }
  }, [isLoading, navigate]);

  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent', // Remove background color
      }}
    >            <style>
    {`
        @keyframes flash {
            0% { opacity: 1; }
            50% { opacity: 0.5; }
            100% { opacity: 1; }
        }
        .flashing-heading {
            animation: flash 2s infinite;
            color: #17AAB5;
        }
        @keyframes fadeInOut {
            0% { opacity: 0; }
            100% { opacity: 1; }
        }
        @keyframes tickAppear {
            0% { opacity: 0; transform: scale(0); }
            100% { opacity: 1; transform: scale(1); }
        }
        .tick {
            animation: tickAppear 0.5s forwards;
            color: #015964;
        }
        .hidden {
            display: none;
        }
    `}
</style>
      {isLoading ? (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            position: 'fixed',
            top: 400,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'transparent', // Remove background color
            zIndex: 9999,
          }}
        >
            { (
                            <Box
                                sx={{
                                    position: 'fixed',
                                    top: 0,
                                    left: 0,
                                    width: '100%',
                                    height: '100%',
                                    zIndex: 2222222,
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    backgroundColor: 'rgba(22, 26, 30, 0.8)', // Adjust the background color and opacity as needed
                                    backdropFilter: 'blur(13px)', // Adding a blur effect to the overlay

                                }}
                            >

                                <Box sx={{ width: '50%' }}>
                                    <Typography  variant="h6" sx={{ color: '#F0EEEE', mb:4,fontWeight: '400',fontFamily:"Oswald"  }}>
                                        Initializing Brevity, please wait...
                                    </Typography >
                                    <h2 className="flashing-heading" style={{ fontWeight: 600, fontFamily: 'Oswald', fontSize: '1.7em',marginBottom:30 }}>
                                                      {heading || oldHeading}  
                                                  </h2>
                                    <BorderLinearProgress sx={{ height: 13 }} />
                                </Box>
                            </Box>
                        )}
          
         
        </Box>
      ) : (
        <p style={{ margin: 'auto' }}></p>
      )}
    </Box>
  );
};

export default Initialize;
