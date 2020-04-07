import { CHANGE_ROUTE } from '../constants/constants'

const route = (state = 'signin', action = {}) => {
	switch (action.type) {
		case CHANGE_ROUTE:
			return action.route
		default:
			return state
	}
}

export default route