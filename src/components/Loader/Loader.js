import React from 'react'
import './Loader.css'

function Loader({ styleOn, style}) {
	return (
		<div className={styleOn} style={{...style, color: 'white'}}></div>	
	);	
}

export default Loader
