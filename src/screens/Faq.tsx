import React from 'react'
import { useNavigate } from 'react-router-dom'



const Faq: React.FC = () => {
    const navigate = useNavigate()
    return (
        <div className='home-container'>
            <div className='main-container-contents'>
                <div className='main-container-header'>
                    <h3>FAQ</h3>
                    <button className='red-small-button'
                        onClick={() => navigate('/user/home')}
                    >Back</button>
                </div>
                <div className='main-container-body'>


                    <h4>Frequently Asked Questions</h4>
                    
                </div>
            </div>
        </div>
    )
}

export default Faq
