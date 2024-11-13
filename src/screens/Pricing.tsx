import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Typography,Box  } from '@mui/material';

declare global {
    namespace JSX {
      interface IntrinsicElements {
        'stripe-pricing-table': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
      }
    }
  }
const Pricing: React.FC = () => {
    const navigate = useNavigate()
  return (
    <div className = 'home-container'>
        <div className = 'main-container-contents'>
        <div className = 'main-container-header'>
            <h3></h3>
            <Typography variant='h3' sx={{ textAlign: 'center', alignSelf: 'center' , marginBottom:7,fontWeight: '400',fontFamily: 'Oswald',fontSize:'40px' }} >Pricing Plans</Typography>
            <button className='red-small-button'
                onClick = {()=>navigate('/agree-terms')}
                >Back</button>
        </div>
        <div className = 'main-container-body' style={{ width: '100%' }} >
          <Box className='pricing-card-container'>
          <stripe-pricing-table pricing-table-id="prctbl_1PdoiDJJ3Hkft6r7HddG5bEf"
publishable-key="pk_test_51PdoeAJJ3Hkft6r7K1bEGVasgxVw4Ra4Ji1PhpnKnHucbrbXhJNpmzMysxYdJp3DbGpfMdc1pLda5xBKLQC0ExbY00GFuRUpyg">
</stripe-pricing-table>
          </Box>
            
        </div>

        </div>
    </div>
  )
}

export default Pricing