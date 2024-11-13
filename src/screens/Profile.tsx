import React from 'react'
import { useNavigate } from 'react-router-dom'

const Profile:React.FC = () => {
    const navigate = useNavigate()
  return (
    
    <div className='home-container'>
                <div className='main-container-contents-speaker' style={{height:'600px'}}>
                <div className="main-container-header" style={{justifyContent:'right'}}>
                <button className='red-small-button_speaker' style={{ justifySelf: 'right' }} onClick={() => navigate('/user/home')}>Back</button>
                </div>
            <div className = 'profile-left' style={{ marginTop: '90px' }}> 
                <h3>Profile</h3>
                <p>License: Brevity Unlimited Plan</p>
                <p>Username: Brevity</p>
                <p>Password: **********</p>
                <button className = 'green-button'
                onClick = {()=>navigate('/user/edit/profile')}
                >Edit</button>
            </div>
            {/* <div className = 'profile-right'>
                <button className='red-small-button'
                onClick = {()=>navigate('/user/home')}
                >Back</button>
            </div> */}
        </div>
    </div>
  )
}

export default Profile