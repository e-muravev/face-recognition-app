import React from 'react'
import './developerInfo.css'
import mail from './mail.png'
import dev from './dev.png'

function DeveloperInfo() {
	return (
		<div className="developerInfo">
			<div className="flex justify-content-center align-items-center">
				<img src={dev} style={{width:'30px', height: '30px'}} alt='dev'/>
				<p style={{margin: '5px 0', fontStyle: 'italic'}}>: Evgeny Muravev - web developer</p>
			</div>
			<div className="flex justify-content-center align-items-center">
				<img src={mail} style={{width:'30px', height: '30px'}} alt='mail'/>
          		<p style={{margin: '5px 0', fontStyle: 'italic'}}>: e.muravev.js@gmail.com</p>
          	</div> 
		</div>
	);
}

export default DeveloperInfo