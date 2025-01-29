import React from 'react'
import "./User.scss"
import { NavLink } from 'react-router-dom'

const User = () => {
  return (
    <div className='User-name'>

        <div className="User-container">
           
           <div className="Logo">
                <img src="https://e7.pngegg.com/pngimages/178/595/png-clipart-user-profile-computer-icons-login-user-avatars-monochrome-black.png" alt="" />                
                <div className="logo-text">
                    <h1>Superadmin</h1>

                   
                   <div className="btn-grup">
              
                    <NavLink to={"/home"}>

                    <button>edit</button>
                    </NavLink>
                    <NavLink to={"/"}>
                    <button>logaut</button>

                    </NavLink>

                   </div>

                </div>

           </div>


        </div>


    </div>
  )
}

export default User