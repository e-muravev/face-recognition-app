import { CHANGE_USER_NAME} from '../constants/constants'

const userName = (state = '', action = {}) => {
	switch (action.type) {
		case CHANGE_USER_NAME:
			return action.name
		default:
			return state
	}
}

export default userName