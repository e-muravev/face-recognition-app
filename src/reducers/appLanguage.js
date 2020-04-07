import { CHANGE_LANGUAGE } from '../constants/constants'

const appLanguage = (state = 'english', action = {}) => {
	switch (action.type) {
		case CHANGE_LANGUAGE:
			return action.language
		default:
			return state
	}
}

export default appLanguage