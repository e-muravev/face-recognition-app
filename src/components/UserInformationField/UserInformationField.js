import React from 'react'
import './userInformationField.css'

function UserInformationField({ language, userName, entries }) {
	let text1 = (language === 'english') ?
	'Face detection is a computer technology being used in a variety of applications that identifies human faces in digital images.' :
	'Распознавание лиц- это компьютерная технология, используемая в различных приложениях, которая идентифицирует человеческие лица на цифровых изображениях.'
	let text2 = (language === 'english') ?
	`Try this one, ${userName}, click on any image from gallery or even try your own image, it's get you more fun.`:
	`Хочешь попробовать, ${userName}? - кликай на любую из картинок, что в галерее или же попробуй загрузить свою картинку. Это весело!`
	let text3 = (language === 'english') ?
	`${userName}, your current count of your own photo is ${entries}.`:
	`На данный момент, ${userName}, ты проверил(а) ${entries} собственных фото.`
	localStorage.setItem('userEntries', entries)
	return (
		<div className="userInformationField col-11">	
			<p className="title_text">{text1}</p>
			<p className="text_for_user" style={{marginBottom: '0'}}>{text2}</p>
			<p className="text_for_user" style={{margin: '0'}}>{text3}</p>
		</div>	
	);
}

export default UserInformationField