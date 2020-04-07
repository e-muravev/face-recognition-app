import {
	CHANGE_ROUTE,
	CHANGE_MAIN_IMAGE,
	CHANGE_ORDER_OF_HIGHLIGHTED_IMAGE,
	IS_USER_OWN_IMAGE_FILD_ACTIVATED,
	CHANGE_INPUT_URL,
	CHANGE_FACE_BOXES,
	CHANGE_LANGUAGE,
	CHANGE_USER_ID,
	CHANGE_USER_NAME,
	CHANGE_ENTRIES
} from '../constants/constants'

export const setRoute = (route) => ({
	type: CHANGE_ROUTE,
	route
})
export const setMainImage = (image) => ({
	type: CHANGE_MAIN_IMAGE,
	image
})
export const setOrderOfHighloghtedImage = (order) => ({
	type: CHANGE_ORDER_OF_HIGHLIGHTED_IMAGE,
	order
})
export const changeUserOwnImageFieldStatus = (status) => ({
	type: IS_USER_OWN_IMAGE_FILD_ACTIVATED,
	status
})
export const setInputUrl = (url) => ({
	type: CHANGE_INPUT_URL,
	url
})
export const setFaceBoxes = (faceboxes) => ({
	type: CHANGE_FACE_BOXES,
	faceboxes
})
export const setLanguage = (language) => ({
	type: CHANGE_LANGUAGE,
	language
})
export const setUserId = (id) => ({
	type: CHANGE_USER_ID,
	id
})
export const setUserName = (name) => ({
	type: CHANGE_USER_NAME,
	name
})
export const setEntriesCount = (count) =>({
	type: CHANGE_ENTRIES,
	count
})