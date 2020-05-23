import React from 'react'
import './errorMainImage.css'

function ErrorMainImage({ language }) {
	return (
		
		<div className = "errorMainImage">
		{
			(language === 'english') ?
			<div>
				<h2>BAD REQUEST</h2>
				<p>Not a "jpg", "jpeg" or "png" format</p>
				<p>URL must ended with ".jpg", ".jpeg" or ".png"</p>
			</div>
			:
			<div>
				<h2>НЕКОРРЕКТНЫЙ ЗАПРОС</h2>
				<p>Формат не соотвествует "jpg", "jpeg" или "png"</p>
				<p>Ссылка должна оканчиваться на".jpg", ".jpeg" или ".png"</p>
			</div>
		}
		</div>
	);
}

export default ErrorMainImage