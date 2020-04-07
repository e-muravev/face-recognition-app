import { CHANGE_ORDER_OF_HIGHLIGHTED_IMAGE } from '../constants/constants'

const orderOfHighlightedImage = (state = 6, action = {}) => {
	switch (action.type) {
		case CHANGE_ORDER_OF_HIGHLIGHTED_IMAGE:
			return action.order
		default:
			return state
	}
}

export default orderOfHighlightedImage