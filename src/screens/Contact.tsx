import React from 'react'
import { useNavigate } from 'react-router-dom'

const Contact: React.FC = () => {
    const navigate = useNavigate()
  return (
    <div className='home-container'>
        <div className='main-container-contents'>
            <div className='main-container-header'>
                <h3>Contact</h3>
                <button className='red-small-button'
                    onClick={() => navigate('/user/home')}
                >Back</button>
            </div>
            <div className='main-container-body'>
                <p>Email: <h4>contact@brevity.com</h4></p>
                <p>Phone: <h4 >1-647-212-222</h4></p>
                <p style={{ color: 'white',userSelect: 'none'  }}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta, accusantium error tempora officiis porro facilis corrupti molestiae officia neque quam. Qui tenetur at porro cupiditate ipsum? Enim dignissimos deleniti optio.
                Ullam quidem labore natus, voluptatibus nulla officia alias, dolorum officiis atque reprehenderit sint provident ad placeat. Nemo consequatur neque natus laboriosam. Nihil, debitis possimus. Voluptatibus quas sit repudiandae omnis eius.</p>
                <p style={{ color: 'white',userSelect: 'none'  }}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta, accusantium error tempora officiis porro facilis corrupti molestiae officia neque quam. Qui tenetur at porro cupiditate ipsum? Enim dignissimos deleniti optio.
                Ullam quidem labore natus, voluptatibus nulla officia alias, dolorum officiis atque reprehenderit sint provident ad placeat. Nemo consequatur neque natus laboriosam. Nihil, debitis possimus. Voluptatibus quas sit repudiandae omnis eius.</p>
                <p style={{ color: 'white',userSelect: 'none'  }}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta, accusantium error tempora officiis porro facilis corrupti molestiae officia neque quam. Qui tenetur at porro cupiditate ipsum? Enim dignissimos deleniti optio.
                Ullam quidem labore natus, voluptatibus nulla officia alias, dolorum officiis atque reprehenderit sint provident ad placeat. Nemo consequatur neque natus laboriosam. Nihil, debitis possimus. Voluptatibus quas sit repudiandae omnis eius.</p>
            </div>
        </div>
    </div>
  )
}

export default Contact
