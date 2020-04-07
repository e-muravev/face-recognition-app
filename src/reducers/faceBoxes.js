import { CHANGE_FACE_BOXES } from '../constants/constants'

const faceBoxes = (state = [], action = {}) => {
	switch (action.type) {
		case CHANGE_FACE_BOXES:
			return action.faceboxes
		default:
			return state
	}
}

export default faceBoxes