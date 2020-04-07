import React from 'react'
import './Loader.css'

function Loader({ styleOn }) {
	return (
		<div className={styleOn ? "miniloader" : "loader" }>Loading...</div>	
	);	
}

export default Loader
