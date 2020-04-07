import { IS_USER_OWN_IMAGE_FILD_ACTIVATED } from '../constants/constants'

const isUserOwnImageFieldActivated = (state = false, action = {}) => {
	switch (action.type) {
		case IS_USER_OWN_IMAGE_FILD_ACTIVATED:
			return action.status
		default:
			return state
	}
}

export default isUserOwnImageFieldActivated