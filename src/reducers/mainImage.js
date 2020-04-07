import { CHANGE_MAIN_IMAGE } from '../constants/constants'

const mainImage = (state = 'https://i.ibb.co/jfJFHKV/s1200asd.jpg', action = {}) => {
	switch (action.type) {
		case CHANGE_MAIN_IMAGE:
			return action.image
		default:
			return state
	}
}

export default mainImage