import React from 'react'
import Gallery from '../Gallery/Gallery'
import MainPhoto from '../MainPhoto/MainPhoto'
import UserInformationField from '../UserInformationField/UserInformationField'
import './facerecognition.css'


function FaceRecognition({ language, onFetchFaceBoxes, mainImage, onMainImageChange, onOrderOfHighlightedImageChange, 
                        orderOfHighlightedImage, onUserOwnImageFieldStatusChange,
                        faceBoxes, userName, entries, children }) {
  return (
	    <div className="facerecognition flex justify-content-space-around col-11 ">
              <UserInformationField userName={userName} 
                                language={language}
                                entries={entries}/>
              <Gallery onMainImageChange={onMainImageChange} 
                       onOrderOfHighlightedImageChange={onOrderOfHighlightedImageChange}
                       orderOfHighlightedImage={orderOfHighlightedImage}/>
              <MainPhoto language={language}
                         mainImage={mainImage}
                         onUserOwnImageFieldStatusChange={onUserOwnImageFieldStatusChange}
                         faceBoxes={faceBoxes}
                         onFetchFaceBoxes={onFetchFaceBoxes}/>
              {children}
      </div>
	);
}

export default FaceRecognition