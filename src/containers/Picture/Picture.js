import React from 'react'
import Loader from '../../components/Loader/Loader'
import './Picture.css'


class Picture extends React.Component {
		 
    constructor(props) {
    	super(props);
    	this.state = {
    		pictureStatus: 'not loading',
    	}
        
    }

    componentDidMount() {
        const image = new Image();
        image.onload = () => {
                setTimeout(() => this.setState({pictureStatus:'loading'}), 200) 
        };

        image.onerror = (e) => {console.log('picture not loading')};
        image.src = this.props.url
    }

    componentDidUpdate(prevProps) {
        if (prevProps.url !== this.props.url)
        {
           this.setState({pictureStatus:'not loading'})
           const image = new Image();
           image.onload = () => {
                this.setState({pictureStatus:'loading'}) 
           };

            image.onerror = (e) => {console.log('picture not loading')};
            image.src = this.props.url 
        }  
    }

    render() {
        
        const {pictureStatus} = this.state
        const {url, faceBoxes} = this.props

        if (this.props.mainphoto === true)
        {  
           return(
                (pictureStatus === 'not loading') ? <Loader/> : 
                (
                    <div style={{position: 'relative'}}>
                        <img id="mainphoto" className="w-100" src={url} alt=""/>
                        {(faceBoxes.length === 0) ? 
                        <div id="face detecting..." style={{display: 'flex', justifyContent: 'center', paddingTop: '10px'}}>    
                            <h4 style={{color: 'white', margin: '0 auto'}}>Face detecting</h4>
                            <Loader styleOn={'miniloader'}/>
                        </div> : null}
                        
                        {faceBoxes.map((faceBox, i) => {
                            return (
                                <div key={i} className="bounding-box" style={{top: faceBox.top, 
                                   right: faceBox.right, bottom: faceBox.bottom, left: faceBox.left}}></div>
                            );
                        })}
                    </div> 
                )
           ); 
        }
        else
        {
            return (pictureStatus === 'not loading') ? <Loader styleOn={'loader'}/> : <img className="w-100" src={url} alt=""/>
        }
    }
}

export default Picture