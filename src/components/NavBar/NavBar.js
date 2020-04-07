import React from 'react'
import './navbar.css'

function NavBar({ onRouteChange, onExitClick, language }) {
  
  let text = (language === 'english') ? 'Sign Out' : 'Выйти'
  return (
		<div className="">
          <p className="signout"
          onClick={() => {
          	onRouteChange('signin')
          	onExitClick()
            localStorage.clear()
          }}>
          {text}
          </p>
        </div>
	);
}

export default NavBar