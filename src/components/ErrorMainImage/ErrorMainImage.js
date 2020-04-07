import React from 'react'
import './errorMainImage.css'

function ErrorMainImage({ language }) {
	return (
		
		<div className = "errorMainImage">
		{
			(language === 'english') ?
			<div>
				<h2>BAD REQUEST</h2>
				<p>Are you sure that your image URL is correct?</p>
				<p>Is it right that your URL end with ".jpg", ".jpeg" or ".png"?</p>
				<p>Available URL example:</p>
				<p>https://img2.goodfon.com/original/1920x1200/8/c4/devushka-anzhelina-zholi<span>.jpg</span></p>
			</div>
			:
			<div>
				<h2>НЕКОРРЕКТНЫЙ ЗАПРОС</h2>
				<p>Вы уверенны, что ваша ссылка на картинку корректна?</p>
				<p>Проверьте, оканчивается ли ваша ссылка расширением ".jpg", ".jpeg" или ".png"?</p>
				<p>Пример корректной ссылки:</p>
				<p>https://img2.goodfon.com/original/1920x1200/8/c4/devushka-anzhelina-zholi<span>.jpg</span></p>
			</div>
		}
		</div>
	);
}

export default ErrorMainImage