import { CHANGE_INPUT_URL } from '../constants/constants'

const inputUrl = (state = '', action = {}) => {
	switch (action.type) {
		case CHANGE_INPUT_URL:
			return action.url
		default:
			return state
	}
}

export default inputUrl