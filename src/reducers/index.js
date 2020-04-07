import { combineReducers } from 'redux'
import faceBoxes from './faceBoxes'
import inputUrl from './inputUrl'
import isUserOwnImageFieldActivated from './isUserOwnImageFieldActivated'
import mainImage from './mainImage'
import orderOfHighlightedImage from './orderOfHighlightedImage'
import route from './route'
import appLanguage from './appLanguage'
import userName from './userName'
import userId from './userId'
import entries from './entries'

export default combineReducers({
  faceBoxes,
  inputUrl,
  isUserOwnImageFieldActivated,
  mainImage,
  orderOfHighlightedImage,
  route,
  appLanguage,
  userName,
  userId,
  entries
})