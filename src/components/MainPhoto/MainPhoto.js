import React from 'react'
import Picture from '../../containers/Picture/Picture'
import './mainphoto.css'
import ErrorMainImage from '../ErrorMainImage/ErrorMainImage'


class MainPhoto extends React.Component {
  		
  componentDidMount() {
    this.props.onFetchFaceBoxes('https://i.ibb.co/jfJFHKV/s1200asd.jpg')
  }

  ScrollPage = () => {
          window.scrollTo(0,0)
          let mainphoto = document.getElementById('mainphotoField')
          let mainphotoHeight = mainphoto.scrollHeight
          let mainphotoOffset = mainphoto.getBoundingClientRect().top + window.scrollY
          let scrollOffset = (mainphotoOffset+mainphotoHeight) - document.documentElement.clientHeight
          if (scrollOffset > 0)
          { window.scrollBy(0, scrollOffset + 10) }
  }

  componentDidUpdate(prevProps) {
      if(this.props.mainImage !== prevProps.mainImage)
      {
        
        let imageOnloaded = new Promise ( (resolve, reject) => {
          const image = new Image();
          image.onload = () => {
                resolve(true) 
          };
          image.onerror = (e) => {reject('image not download')};
          image.src = this.props.mainImage
        })

        imageOnloaded.then(result => this.ScrollPage(), error => console.log(error))  
      }
  }

	render () {
	
    const faceBoxes = this.props.faceBoxes
    let text = (this.props.language === 'english') ? 'Try your own image' : 'Загрузить картинку'
		return (
       	      <div className="col-12 col-sm-5" id='mainphotoField'>
                    <div className="mainphoto">
                      {this.props.mainImage === 'errorImage' ? <ErrorMainImage language={this.props.language}/>
                       :<Picture mainphoto={true} faceBoxes={faceBoxes} url={this.props.mainImage} />}
                    </div>
                    <button onClick={this.props.onUserOwnImageFieldStatusChange} 
                            className="w-100 pa2 own-photo-click">
                            {text}
                    </button>
              </div>  
		);
	}
	
}

export default MainPhoto