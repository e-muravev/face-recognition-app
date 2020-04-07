import { CHANGE_USER_ID} from '../constants/constants'

const userId = (state = '', action = {}) => {
	switch (action.type) {
		case CHANGE_USER_ID:
			return action.id
		default:
			return state
	}
}

export default userId