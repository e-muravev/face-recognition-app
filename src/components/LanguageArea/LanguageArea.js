import React from 'react'
import './languageArea.css'
import flagUK from './Flag_UK.png'
import flagRussia from './Flag_Russia.png'
import {setLanguage} from '../../actions'
import { connect } from 'react-redux'

const mapStateToProps = (state) => {
  return {
    language: state.appLanguage,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onLanguageChange: (language) => dispatch(setLanguage(language)),
  }
}

function LanguageArea({ not_home, language, onLanguageChange }) {
	return (
		 <div className="language-area flex align-items-center" style={(not_home) ? {
		 											display: 'flex',
		 											justifyContent: 'flex-end',
		 											alignItems: 'center',
		 											paddingTop:'10px',
		 											paddingRight: '10px'
		 											} : null}>
			 {(language === 'english') ? <img src={flagUK} alt="flag"/> : <img src={flagRussia} alt="flag"/>}
			 <select value = {language} id="languages" name="languages" onChange={e => {onLanguageChange(e.target.value)}}>
	  			<option value="english">English</option>
	  			<option value="russian">Русский</option>
			</select>
		</div> 
	);
}

export default connect(mapStateToProps,mapDispatchToProps)(LanguageArea)