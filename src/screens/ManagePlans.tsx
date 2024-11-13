import React from 'react';
import {  Box } from '@mui/material';

const ManagePlans: React.FC = () => {

  return (
    <div className='home-container'>
      <div className='main-container-contents'>
 
        <div className='main-container-body' style={{ width: '100%' }}>
          <Box sx={{ marginTop: 4, textAlign: 'center' }}>
  
            <webview 
              src='https://billing.stripe.com/p/login/test_eVa6qpcgf3dc1vqbII'
              style={{ width: '100%', height: '650px' }}
            />
          </Box>
        </div>
      </div>
    </div>
  );
};

export default ManagePlans;
