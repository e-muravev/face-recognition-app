import React from 'react'
import './Gallery.css'
// import photo_1 from './1.jpeg'
import Picture from '../../containers/Picture/Picture'

const urls = [
     'https://i.ibb.co/HTVWF8P/e117ff2dffba1e0a9b63c757c2ade948.jpg',
     'https://i.ibb.co/RNVR5z7/d279adf1b00d94ecfff41cab678e179a-friend-pics-friend-pictures.jpg',
     'https://i.ibb.co/zmKPyGm/h-332.jpg',
     'https://i.ibb.co/T12JyFZ/s12002.jpg',
     'https://i.ibb.co/T2twCkt/s12001.jpg',
     'https://i.ibb.co/ryWydzY/s1200.jpg',
     'https://i.ibb.co/jfJFHKV/s1200asd.jpg',
     'https://i.ibb.co/YTczBXy/i-Stock-532969250.jpg',
     'https://i.ibb.co/fG0NBgk/def24cbe0b9efffb0aa5adfbb0f74ad2.jpg',
     'https://i.ibb.co/NmNwWBM/horeografi.jpg',
     'https://i.ibb.co/DMh6pTg/df448b80719243f3b82575bf697e3334-max-1200x800.jpg',
     'https://i.ibb.co/CtdL1Nv/De-Som-Qv-X4-AEJFjg.jpg'
]

function Gallery({ onMainImageChange, onOrderOfHighlightedImageChange, orderOfHighlightedImage }) {
            
     return (
          <div className="gallery col-12 col-sm-5">
          {urls.map((url, i) => {
               if (i === orderOfHighlightedImage)
               {
                    return ( 
                     <div key={i} className="grid-item" 
                     onClick={() => {
                         onMainImageChange(url)
                         onOrderOfHighlightedImageChange(i)
                    }}
                    style = {{border: '4px solid #03ECFD' }}>
                    <Picture key={i} url={url} />
                    </div> 
                    )
               }
               else
               {
                    return (
                         <div key={i} className="grid-item" onClick={() => {
                              onMainImageChange(url)
                              onOrderOfHighlightedImageChange(i)
                         }}>
                         <Picture key={i} url={url} />
                         </div>
                         )
               }
          })}
          </div>
          )
}

export default Gallery