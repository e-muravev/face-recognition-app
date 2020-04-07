import React from 'react'
import { connect } from 'react-redux'
import './App.css'
import Particles from 'react-particles-js'
import config from './components/Particles/particles-config'
import Register from './containers/Register/Register'
import SignIn from './containers/SignIn/SignIn'
import Logo from './components/Logo/Logo'
import NavBar from './components/NavBar/NavBar'
import FaceRecognition from './components/FaceRecognition/FaceRecognition'
import UserPhotoField from './components/UserPhotoField/UserPhotoField'
import LanguageArea from './components/LanguageArea/LanguageArea'
import DeveloperInfo from './components/DeveloperInfo/DeveloperInfo'
import {setRoute, 
        changeUserOwnImageFieldStatus,
        setOrderOfHighloghtedImage,
        setInputUrl,
        setFaceBoxes,
        setMainImage,
        setUserId,
        setUserName,
        setEntriesCount
} from './actions'



const mapStateToProps = (state) => {
  return {
    route: state.route,
    mainImage: state.mainImage,
    orderOfHighlightedImage: state.orderOfHighlightedImage,
    isUserOwnImageFieldActivated: state.isUserOwnImageFieldActivated,
    inputUrl: state.inputUrl,
    faceBoxes: state.faceBoxes,
    language: state.appLanguage,
    userId: state.userId,
    userName: state.userName,
    entries: state.entries
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onRouteChange: (route) => dispatch(setRoute(route)),
    onUserIdChange: (id) => dispatch(setUserId(id)),
    onEntriesChange: (count) => dispatch(setEntriesCount(count)),
    onUserNameChange: (name) => dispatch(setUserName(name)),
    onUserOwnImageFieldStatusChange: (status) => dispatch(changeUserOwnImageFieldStatus(status)), 
    onOrderOfHighlightedImageChange: (order) => dispatch(setOrderOfHighloghtedImage(order)),
    onInputUrlChange: (event) => {
      let url = event.target.value
      dispatch(setInputUrl(url))
    },
    closeUserPhotoField: () => dispatch(changeUserOwnImageFieldStatus(false)),
    displayFaceBox: (faceboxes) => dispatch(setFaceBoxes(faceboxes)),
    setMainImage: (image) => dispatch(setMainImage(image)),
    onExitClick: () => {
      dispatch(setMainImage('https://www.nastol.com.ua/pic/201702/1920x1200/nastol.com.ua-210453.jpg'))
      dispatch(setOrderOfHighloghtedImage(6))
    }
  }
}


class App extends React.Component {

  dataFromAPI = {};

  componentDidMount() {
    window.onresize = () => {
      if (this.dataFromAPI && this.props.route === 'home-page') {
        let image = document.getElementById('mainphoto');
        if (image)
        {
          this.props.displayFaceBox(this.calculateFaceLocation(this.dataFromAPI));
        }  
      }
    }
  }

  onFetchFaceBoxes = (data, ...arg) => {
    this.props.displayFaceBox([])  //сбрасывается рамка указывающая на лицо

    // т.к элемент является картинкой, он может быть getElement может быть null пока она не подгрузится
    // поэтому сделал промис, который вызывает рекурсивно функцию получения элемента каждую секунду
    // как только элемент получен - можно делать запрос в API и строить рамку
    let getMainImage = new Promise ((resolve, reject) => {
        const getImage = () => {
          let image = document.getElementById('mainphoto');
          if (!image) {
            return setTimeout(() => getImage(), 1000)
          }
          else {
            return resolve(true)
          }
        }
        getImage()
    })

    getMainImage.then( result => {
      fetch('https://dry-waters-08741.herokuapp.com/imageurl', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          input: data
        })
      })
      .then(response => response.json())
      .then(data => {
        if(data.status === undefined)
        {
          if (data.message === 'Request failed with status code 504') {
            (this.props.language === 'english') ?
            alert(`Server clarifai API don't response. This is not internal error, that's meen external resource isn't avaliable now. Try later again.`) :
            alert(`Сервер clarifai API в данный момент недоступен. Это не внутренняя ошибка сайта, на данный момент не доступен сторонний ресурс. Попробуйте позже.`)
          }
          else if (data.message === 'Request failed with status code 400' ) {
            this.props.setMainImage('errorImage')
            // (this.props.language === 'english') ?
            // alert(`"${data.message}". Are you sure that your image URL is correct? Is it right that your URL end with ".jpg", ".jpeg" or ".png"?`) :
            // alert(`"${data.message}". Вы уверенны, что ваша ссылка на картинку корректна? Проверьте, оканчивается ли ваша ссылка расширением ".jpg", ".jpeg" или ".png"?`)
          }
          else {
            alert(data.message)
          }  
        }
        else {
          if(data.status.code  === 10000) 
          {
              this.dataFromAPI = data;
              this.props.displayFaceBox(this.calculateFaceLocation(data));
              (arg[0] === 'fromRecognizePhotoSubmit') ? this.getCountOfEntriesFromDB() : arg[0]=undefined
          } 
          else {
            alert(data.status.description)
          } 
        }
        
      })
     .catch(error => console.log(error))
    })
  } 

  getCountOfEntriesFromDB = () => {
    fetch('https://dry-waters-08741.herokuapp.com/image', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: this.props.userId
      })
    })
    .then(response => response.json())
    .then(user => {
      this.props.onEntriesChange(user.entries)
    })
    
  }

  onMainImageChange = (image) => {
    this.props.setMainImage(image)
    this.onFetchFaceBoxes(image)
  }

  // функция заускающаяся при нажатии кнопки в поле, где подгружаешь свою фотку
  onRecognizePhotoSubmit = () => {
    this.props.setMainImage(this.props.inputUrl)
    this.onFetchFaceBoxes(this.props.inputUrl, 'fromRecognizePhotoSubmit')
    this.props.onUserOwnImageFieldStatusChange(false)
    
  }

  calculateFaceLocation = (data) => {
        if (data.outputs[0].data.regions !== undefined)
        {
            let image = document.getElementById('mainphoto');
            const width = Number(image.width);
            const height = Number(image.height);

            const clarifai = data.outputs[0].data.regions.map((region) => {
              return region.region_info.bounding_box
            })
            const faceBoxes = clarifai.map(bounding_box => {
              return {
                left: bounding_box.left_col * width,
                top: bounding_box.top_row * height,
                right: width - (bounding_box.right_col * width),
                bottom: height - (bounding_box.bottom_row * height)    
              }
            })
            return faceBoxes
        }
        else {
          return []
        }
  }

  render() {

    if (this.props.route === 'register')
    {
    	return (
	    <div className="App">
	      <Particles className="particles" params={config} />
        <LanguageArea not_home={true}/>
	      <div className = "flex justify-content-center align-items-center" style={{height:'90vh', maxWidth: '1024px', margin: '0 auto', marginTop: '10px'}}>
          <div className="col-11 col-sm-5 col-md-4 col-lg-3 pa3" style={{backgroundColor: 'rgba(255,255,255,0.7)', borderRadius: '5px'}}>
              <Register language={this.props.language} onRouteChange={this.props.onRouteChange}/>
              <Logo/>
              <p style={{color: 'black',marginTop: '0',marginBottom: '0'}}>Face Recognition App</p>
          </div>
        </div>
	    </div>
	    );
    }

    if (this.props.route === 'signin')
    {
      return (
        <div className="App">
          <Particles className="particles" params={config} />
          <LanguageArea not_home={true}/>
          <div className = "flex justify-content-center align-items-center" style={{height:'90vh', maxWidth: '1024px', margin: '0 auto'}}>
            <div className="col-11 col-sm-5 col-md-4 col-lg-3 pa3" style={{backgroundColor: 'rgba(255,255,255,0.7)', borderRadius: '5px'}}>
              <SignIn language={this.props.language} 
                      onRouteChange={this.props.onRouteChange}
                      onUserIdChange={this.props.onUserIdChange}
                      onUserNameChange={this.props.onUserNameChange}
                      onEntriesChange={this.props.onEntriesChange}/>
              <Logo/>
              <p style={{color: 'black',marginTop: '0',marginBottom: '0'}}>Face Recognition App</p>
            </div>
          </div>
        </div>
      );  
    }
    if (this.props.route === 'home-page')
    {
      return (
       <div className="App"> 
        <Particles className="particles" params={config} />
        <header className="flex justify-content-space-between align-items-center pa3">
          <LanguageArea/>
          <NavBar language={this.props.language} onExitClick={this.props.onExitClick} onRouteChange={this.props.onRouteChange}/>
        </header> 
        <main> 
          <FaceRecognition language={this.props.language}
                           entries={this.props.entries}
                           userName={this.props.userName} 
                           mainImage={this.props.mainImage}
                           orderOfHighlightedImage={this.props.orderOfHighlightedImage}
                           onMainImageChange={this.onMainImageChange} 
                           onOrderOfHighlightedImageChange={this.props.onOrderOfHighlightedImageChange}
                           onUserOwnImageFieldStatusChange={this.props.onUserOwnImageFieldStatusChange}
                           faceBoxes={this.props.faceBoxes}
                           onFetchFaceBoxes={this.onFetchFaceBoxes}>
                {(this.props.isUserOwnImageFieldActivated) && <UserPhotoField 
                                                    language={this.props.language}
                                                    closeUserPhotoField={this.props.closeUserPhotoField}
                                                    onInputUrlChange={this.props.onInputUrlChange}
                                                    onRecognizePhotoSubmit={this.onRecognizePhotoSubmit}/>}
          </FaceRecognition>
        </main>
        <footer>
          <DeveloperInfo/>
        </footer>
      </div>

      ); 
    }
    
  }
  
}

export default connect(mapStateToProps,mapDispatchToProps)(App);
