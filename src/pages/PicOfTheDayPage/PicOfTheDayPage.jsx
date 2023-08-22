import React from 'react';
import { useState, useEffect } from 'react';
import { PicOfTheDay } from '../../utilities/PicOfTheDay';
import './PicOfTheDayPage.css';


export default function PicOfTheDayPage() {
  const [picture, setPicture] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const pictureData = await PicOfTheDay();
        setPicture(pictureData);
      } catch (error) {
        console.error('Error fetching picture:', error);
      }
    }

    fetchData();
  }, []);

  return (
    <div className="content">
      <h1>Astronomy Picture Of The Day</h1>
      {picture && (
        <div>
          <div className="picture-container">
            <h2>{picture.title}</h2>
            <a href="https://apod.nasa.gov/apod/astropix.html" target="_blank" rel="noopener noreferrer">
              <img id="nasa-img" src={picture.url} alt={picture.title} />
            </a>
            <p>{picture.explanation}</p>
          </div>
        </div>
      )}
    </div>
  );
}

