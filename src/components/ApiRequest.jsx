import React from 'react'
import axios from 'axios';
import { useState } from 'react';

const ApiRequest = () => {
    const [imageUrl, setImageUrl] = useState(null);


    const fetchImage = async () => {
        try {
          const response = await axios.get('https://dog.ceo/api/breeds/image/random');
          const imageUrl = response.data.message;
          setImageUrl(imageUrl);
          console.log(imageUrl)
        } catch (error) {
          console.error('Error fetching image:', error);
        }
      };


  return (
    <div>ApiRequest

<div className="card">
      <button onClick={fetchImage} className='img-btn'>Dog Image</button>
      {imageUrl && <img src={imageUrl} alt="Cat" className='api-img' />}
    </div>




    </div>
  )
}

export default ApiRequest