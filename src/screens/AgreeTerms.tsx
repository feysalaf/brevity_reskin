import React, { useState, useEffect, ChangeEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, Checkbox, FormControlLabel } from '@mui/material';


const apiUrl = import.meta.env.VITE_API_URL;

// Function to check subscription status for conditional rendering
const checkSubscriptionStatus = async (email: string): Promise<boolean> => {
  try {
    const response = await fetch(`${apiUrl}/check_subscription`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });

    const data = await response.json();
    return data.subscribed || false;
  } catch (error) {
    console.error('Error checking subscription status:', error);
    return false;
  }
};


const AgreeTerms: React.FC = () => {
  const [termsChecked, setTermsChecked] = useState(false);
  const [licenseChecked, setLicenseChecked] = useState(false);
  const [disclaimerChecked, setDisclaimerChecked] = useState(false);
  const [openDialog, setOpenDialog] = useState<{ [key: string]: boolean }>({
    terms: false,
    license: false,
    disclaimer: false,
  });

  const navigate = useNavigate();

  useEffect(() => {
    // const userEmail = localStorage.getItem('userEmail') || '';
    const userEmail = "xyz@gmail.com";

    const checkSubscription = async () => {
      const isSubscribed = await checkSubscriptionStatus(userEmail);
      if (isSubscribed) {
        console.log("GOING TO HOME");
        navigate('/user/home');
      }
    };

    checkSubscription();
  }, [navigate]);

  const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    switch (name) {
      case 'terms':
        setTermsChecked(checked);
        break;
      case 'license':
        setLicenseChecked(checked);
        break;
      case 'disclaimer':
        setDisclaimerChecked(checked);
        break;
      default:
        break;
    }
  };

  const handleDialogOpen = (type: string) => {
    setOpenDialog((prev) => ({ ...prev, [type]: true }));
  };

  const handleDialogClose = (type: string) => {
    setOpenDialog((prev) => ({ ...prev, [type]: false }));
  };

  const isButtonDisabled = !termsChecked || !licenseChecked || !disclaimerChecked;

  const isDialogOpen = openDialog.terms || openDialog.license || openDialog.disclaimer;

  return (
    <div className='main-container' style={{ filter: isDialogOpen ? 'blur(5px)' : 'none', textAlign: 'center' }}>
      <div className="container">
        <div className='agree-terms-container'>
          <h3><strong>Before continuing with Coyote 2.26, Please review the following</strong></h3>
          <div className="agreements" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div className='terms-check-container' style={{ display: 'flex', alignItems: 'center', marginBottom: '0px' }}>
              <FormControlLabel
                control={
                  <Checkbox
                    id="terms"
                    name="terms"
                    checked={termsChecked}
                    onChange={handleCheckboxChange}
                  />
                }
                label={<span style={{ whiteSpace: 'nowrap' }}>I have read and agree to the <Link to="#" style={{ color: 'red' }} onClick={() => handleDialogOpen('terms')}>Terms and Conditions</Link></span>}
                style={{ flexDirection: 'row-reverse', justifyContent: 'space-between', width: '500px' }}
              />
            </div>
            <div className='terms-check-container' style={{ display: 'flex', alignItems: 'center', marginBottom: '0px' }}>
              <FormControlLabel
                control={
                  <Checkbox
                    id="license"
                    name="license"
                    checked={licenseChecked}
                    onChange={handleCheckboxChange}
                  />
                }
                label={<span style={{ whiteSpace: 'nowrap' }}>I have read and agree to the <Link to="#" style={{ color: 'red' }} onClick={() => handleDialogOpen('license')}>License Agreement</Link></span>}
                style={{ flexDirection: 'row-reverse', justifyContent: 'space-between', width: '500px' }}
              />
            </div>
            <div className='terms-check-container' style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
              <FormControlLabel
                control={
                  <Checkbox
                    id="disclaimer"
                    name="disclaimer"
                    checked={disclaimerChecked}
                    onChange={handleCheckboxChange}
                  />
                }
                label={<span style={{ whiteSpace: 'nowrap' }}>I have read and agree to the <Link to="#" style={{ color: 'red' }} onClick={() => handleDialogOpen('disclaimer')}>Disclaimer</Link></span>}
                style={{ flexDirection: 'row-reverse', justifyContent: 'space-between', width: '500px' }}
              />
            </div>
          </div>
          <button type="submit" className='green-button' disabled={isButtonDisabled}
            onClick={() => navigate('/user/home')}
            style={{ marginTop: '20px' }}
          >
            Continue
          </button>
        </div>
        <p className='version'>Brevity Version: 1.93</p>
      </div>

      <style>
        {`
          .custom-scrollbar::-webkit-scrollbar {
            width: 12px;
          }
          .custom-scrollbar::-webkit-scrollbar-track {
            background: #f1f1f1;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb {
            background: #888;
            border-radius: 10px;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb:hover {
            background: #555;
          }
        `}
      </style>

      <Dialog
        open={openDialog.terms}
        onClose={() => handleDialogClose('terms')}
        PaperProps={{
          style: {
            minWidth: '900px', // Adjust the width as needed
          },
        }}
      >
        <DialogTitle style={{ fontSize: '34px' }}>Terms and Conditions</DialogTitle>
        <DialogContent className="custom-scrollbar">
          <div style={{ margin: 'auto', width: '100%', padding: '30px', fontFamily: '' }}>
            {/* Content */}
          </div>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => handleDialogClose('terms')}
            style={{ color: 'white', backgroundColor: '#01545E', padding: '10px', width: '20px' }}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={openDialog.license}
        onClose={() => handleDialogClose('license')}
        PaperProps={{
          style: {
            minWidth: '900px', // Adjust the width as needed
          },
        }}
      >
        <DialogTitle style={{ fontSize: '34px' }}>License Agreement</DialogTitle>
        <DialogContent className="custom-scrollbar">
          <div style={{ margin: 'auto', width: '100%', padding: '30px'}}>
            {/* Content */}
          </div>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => handleDialogClose('license')}
            style={{ color: 'white', backgroundColor: '#01545E', padding: '10px', width: '20px' }}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={openDialog.disclaimer}
        onClose={() => handleDialogClose('disclaimer')}
        PaperProps={{
          style: {
            minWidth: '900px', // Adjust the width as needed
          },
        }}
      >
        <DialogTitle style={{ fontSize: '34px' }}>Disclaimer</DialogTitle>
        <DialogContent className="custom-scrollbar">
          <div style={{ margin: 'auto', width: '100%', padding: '30px'}}>
            {/* Content */}
          </div>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => handleDialogClose('disclaimer')}
            style={{ color: 'white', backgroundColor: '#01545E', padding: '10px', width: '20px' }}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default AgreeTerms;
