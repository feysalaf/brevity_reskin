import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography, TextField, Box, Grid, List, ListItem, ListItemText } from '@mui/material';
// import { CSSTransition } from 'react-transition-group';
import { css, Global } from '@emotion/react';

const Settings: React.FC = () => {
  const navigate = useNavigate();
  // const [showGreeting, setShowGreeting] = useState(true);
  // const [showSecondaryText, setShowSecondaryText] = useState(false);

  // // Function to get the greeting based on the current time
  // const getGreeting = (): string => {
  //   const currentHour = new Date().getHours();
  //   if (currentHour < 12) {
  //     return 'User Account';
  //   } else if (currentHour < 18) {
  //     return 'User Account';
  //   } else if (currentHour < 22) {
  //     return 'User Account';
  //   } else {
  //     return '';
  //   }
  // };

  // const greeting = getGreeting();
  // const secondaryText = 'User Account';

  // useEffect(() => {
  //   const timer1 = setTimeout(() => {
  //     setShowGreeting(false);
  //   }, 3000); // 3 seconds before fade out

  //   const timer2 = setTimeout(() => {
  //     setShowSecondaryText(true);
  //   }, 4000); // 4 seconds to show the secondary text

  //   return () => {
  //     clearTimeout(timer1);
  //     clearTimeout(timer2);
  //   };
  // }, []);

  return (
    <div className='home-container' style={{ display: 'flex', flexDirection: 'row', paddingTop: '20px' }}>
      <Global
        styles={css`
          .fade-enter {
            opacity: 0;
          }
          .fade-enter-active {
            opacity: 1;
            transition: opacity 1000ms;
          }
          .fade-exit {
            opacity: 1;
          }
          .fade-exit-active {
            opacity: 0;
            transition: opacity 1000ms;
          }
        .middle-boxes {
            display: flex;
            justify-content: space-between;
            align-items: center;
            flex-wrap: wrap;
            gap: 20px;
            width: 100%;
        }

        .middle-box {
            position: relative; /* Needed to position the pseudo-element */
            background: linear-gradient(135deg, rgba(7, 105, 117, 1), rgba(10, 92, 106, 0.8));
            padding: 20px;
            color: white;
            border-radius: 20px;
            flex: 1;
            overflow: hidden; /* Ensures the shine effect stays within the box */
        }

        .middle-box::before {
            content: '';
            position: absolute;
            top: 0;
            left: -50%;
            width: 150%;
            height: 100%;
            background: linear-gradient(120deg, rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0.1));
            transform: skewX(-30deg);
            transition: all 0.5s;
            pointer-events: none; /* Ensures the shine doesn't interfere with other content */
        }

        .middle-box:hover::before {
            left: 100%;
            transition: all 0.5s;
        }

          .middle-box h2{
              text-align: right;
          }
        `}
      />
    <Box 
      sx={{ 
        width: '20%', 
        paddingRight: '20px', 
        backgroundColor: '#f7f7f7', 
        padding: '20px', 
        borderRight: '1px solid #e0e0e0',
        height: '50vh',
        marginTop:'-160px'
      }}
    >
      <Box className='middle-box' 
        sx={{ 
          backgroundColor: 'black', 
          padding: '10px 20px', 
          borderRadius: '8px', 
          marginBottom: '20px',
        }}
      >
        <Typography variant="h6" sx={{ color: 'white',fontFamily: 'Oswald' }}>
          Settings
        </Typography>
      </Box>
      <List component="nav">
        <ListItem 
          button 
          onClick={() => navigate('/user/new-analysis')} 
          sx={{ 
            marginBottom: '10px', 
            borderRadius: '8px', 
            '&:hover': { backgroundColor: '#e0e0e0' } 
          }}
        >
          <ListItemText primary="New Analysis" sx={{ color: '#555' }} />
        </ListItem>
        <ListItem 
          button 
          onClick={() => navigate('/user/settings')} 
          sx={{ 
            marginBottom: '10px', 
            borderRadius: '8px', 
            '&:hover': { backgroundColor: '#e0e0e0' } 
          }}
        >
          <ListItemText primary="Account" sx={{ color: '#555' }} />
        </ListItem>
        <ListItem 
          button 
          onClick={() => navigate('/user/settings')} 
          sx={{ 
            borderRadius: '8px', 
            '&:hover': { backgroundColor: '#e0e0e0' } 
          }}
        >
          <ListItemText primary="Settings" sx={{ color: '#555' }} />
        </ListItem>
      </List>
    </Box>
      {/* Main Content */}
      <Box sx={{ width: '80%',padding:'50px' }}>
        {/* <CSSTransition in={showGreeting} timeout={1000} classNames='fade' unmountOnExit>
          <Typography variant='h4' sx={{ textAlign: 'center', alignSelf: 'center', marginBottom: 7, fontWeight: 400, fontFamily: 'Oswald', fontSize: '30px' }}>
            User Account
          </Typography>
        </CSSTransition> */}
           <Typography variant='h4' sx={{ textAlign: 'center', alignSelf: 'center', marginBottom: 7, fontWeight: 400, fontFamily: 'Oswald', fontSize: '30px' }}>
            User Account
          </Typography>
 
        <Box sx={{ width: '100%', marginTop: 4 }}>
          <Grid container spacing={2} justifyContent="center">
            {/* <Grid item xs={12} style={{ display: 'flex', justifyContent: 'center' }}>
              <Avatar alt="User Avatar" src="https://via.placeholder.com/150" sx={{ width: 80, height: 80 }} />
            </Grid> */}
            <Grid item xs={12}>
              <TextField fullWidth label="Name" variant="outlined" value="John Doe" InputProps={{ readOnly: true }} />
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth label="Email" variant="outlined" value="johndoe@example.com" InputProps={{ readOnly: true }} />
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth label="Phone" variant="outlined" value="+1 234 567 890" InputProps={{ readOnly: true }} />
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth label="Address" variant="outlined" value="1234 Street, City, Country" InputProps={{ readOnly: true }} />
            </Grid>
            {/* <Grid item xs={12} style={{ display: 'flex', justifyContent: 'center' }}>
              <Button variant="contained" color="primary" onClick={() => navigate('/user/edit-profile')}>
                Edit Profile
              </Button>


              
            </Grid> */}


            <Box className='middle-boxes' sx={{ width: '100%', marginTop: 4 , padding:'10px'}}>
                        <Box className='middle-box'>
                            <Typography variant='h4'>Minutes used</Typography>
                            <Typography variant='h2'>0</Typography>
                        </Box>
                        <Box className='middle-box'>
                            <Typography variant='h4'>Pages used</Typography>
                            <Typography variant='h2'>0</Typography>
                        </Box>
                        <Box className='middle-box'>
                            <Typography variant='h4'>Charges</Typography>
                            <Typography variant='h2'>0</Typography>
                        </Box>
                        <Box className='middle-box'>
                            <Typography variant='h4'>Lies Detected</Typography>
                            <Typography variant='h2'>0 </Typography>
                        </Box>
                    </Box>
          </Grid>
        </Box>
      </Box>
    </div>
  );
};

export default Settings;
