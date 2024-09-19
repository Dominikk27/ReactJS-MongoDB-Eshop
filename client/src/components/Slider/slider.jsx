import React, { useState, useEffect } from 'react';
import { GoDot, GoDotFill } from 'react-icons/go';
import '../Slider/slider.css';
import art1 from '../Slider/images/slider-1.png';


import sliderIMG1 from '../Slider/images/1.jpg';
import sliderIMG2 from '../Slider/images/2.jpg';
import sliderIMG3 from '../Slider/images/3.jpg';
import sliderIMG4 from '../Slider/images/4.jpg';

const Slider = () => {
  const [index, setIndex] = useState(0);

  const slideImages = [
    {
      url: sliderIMG1,
      title: 'Všetko pre vašu záhradu!',
      description: 'Veľký výber záhradnej techniky všetkého druhu!'
    },
    {
      url: sliderIMG2,
      title: 'Autorizovaný servis!',
      description: 'Servis pre všetky predané produkty!'
    },
    {
      url: sliderIMG3,
      title: 'Myjava xxxxxxx',
      description: 'sdfasdfadfadfa'
    },
    {
      url: sliderIMG4,
      title: 'Text 423',
      description: 'Description 423'
    },
  ];

  const maxIndex = slideImages.length - 1;

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex === maxIndex ? 0 : prevIndex + 1));
    }, 5000);

    return () => clearInterval(interval);
  }, [maxIndex]);

  return (
    <div className="sliderContainer">
      <div className="sliderContent">
        <div className="sliderLeft">
          <div className="content">
            <div className="contentTitle">
              <h1>{slideImages[index].title}</h1>
            </div>
            <div className="contentDescription">
              <p>{slideImages[index].description}</p>
            </div>
            <div className="contentButton">
              <a href="#" className="Button">
                Zistite viac!
              </a>
            </div>
            <div className="sliderArtwork_1">
              <img src={art1} alt="test" />
            </div>
          </div>
        </div>
        <div
          className="sliderRight"
          style={{
            backgroundImage: `url(${slideImages[index].url})`
          }}
        ></div>
        <div className="sliderDots">
          {slideImages.map((_, dotIndex) => (
            dotIndex === index ? 
            <GoDotFill key={dotIndex} className='icon active' /> : 
            <GoDot key={dotIndex} className='icon' onClick={() => setIndex(dotIndex)} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Slider;