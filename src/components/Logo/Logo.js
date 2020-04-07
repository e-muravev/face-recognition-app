import React from 'react'
import face from './face.png'

function Logo() {
	return (
		<div className="w-100" style={{marginTop:'0.5rem'}}>
			<img className="col-4 col-sm-4" src={face} alt="face" />
		</div>
	);
}

export default Logo