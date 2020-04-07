import React from 'react'
import './UserPhotoField.css'

function UserPhotoField({ language, closeUserPhotoField, onInputUrlChange, onRecognizePhotoSubmit }) {
	let placeholder_text = (language === 'english') ? 'Enter image url...' : 'Введите адрес картинки...'
	let h_text = (language === 'english') ? 'Try your own image' : 'Загрузить картинку'
	let p_text = (language === 'english') ? 'Give us a direct link to a file on a web'  
	: 'Укажите ссылку на картинку в поле ниже'
	let but_text = (language === 'english') ? 'Recognize face on your image' : 'Распознать лицо на картинке'
	return (
		<div className="w-100 userPhotoField">
			<div className="w-100">
				<h3 style={{margin:'0'}}>{h_text}</h3>
				<p>{p_text}</p>
				<input className="input_url" 
					   type="text"  
					   name="photo_url" 
					   placeholder={placeholder_text}
					   onChange={onInputUrlChange}/>
				<button onClick={onRecognizePhotoSubmit} className="pa2 submit">{but_text}</button>	   
			</div>
			<div onClick={closeUserPhotoField} className="close"></div>
		</div>
	);
}

export default UserPhotoField