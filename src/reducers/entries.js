import { CHANGE_ENTRIES} from '../constants/constants'

const entries = (state = 0, action = {}) => {
	switch (action.type) {
		case CHANGE_ENTRIES:
			return action.count
		default:
			return state
	}
}

export default entries