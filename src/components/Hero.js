import { useContext, useEffect, useState } from 'react'
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import "../styles/Hero.css";
import axios from 'axios'


const Hero = () => {
  const tmdbapi = "https://api.themoviedb.org/3/"
  const apikey = "23b7a354034b17a5d10d57b2969dd271"
  const [currentSlide, setCurrentSlide] = useState(0);
  const [trendingMovies, setTrendingMovies] = useState([])
  const slideLength = trendingMovies.length;
  const autoScroll = true;
  let slideInterval;
  let intervalTime = 10000;

  const nextSlide = () => {
    setCurrentSlide(currentSlide === slideLength - 1 ? 0 : currentSlide + 1);
  };

  const prevSlide = () => {
    setCurrentSlide(currentSlide === 0 ? slideLength - 1 : currentSlide - 1);
  };

  function auto() {
    slideInterval = setInterval(nextSlide, intervalTime);
  }


  //Trabajar en este pedido axios para que no esté haciedo el pedido axios cada vez que cambia de slide
  useEffect(() => {
    axios.get(`${tmdbapi}trending/all/day?api_key=${apikey}&language=en-US`)
      .then((res) => res.data.results)
      .then((movie) => {
        setTrendingMovies(movie)
      })
      setCurrentSlide(0)
  }, [])

  useEffect(() => {
    if (autoScroll) {
      auto();
    }
    return () => clearInterval(slideInterval);
  }, [currentSlide]);

  console.log(trendingMovies)

  return (
    <div className="hero">
      <AiOutlineArrowLeft className="arrow prev" onClick={prevSlide} />
      <AiOutlineArrowRight className="arrow next" onClick={nextSlide} />
      {trendingMovies.map((slide, index) => {
        return (
          <div
            className={index === currentSlide ? "slide current" : "slide"}
            key={index}
          >
            {index === currentSlide && (
              <div>
                <img src={`https://image.tmdb.org/t/p/w1280/${slide.backdrop_path}`} alt="slide" className="image" />
                <div className="content">
                  <h2 className='heroContent'>{slide.title? slide.title : slide.original_name}</h2>
                  <p className='heroContent'>{slide.overview.slice(0, 200) + "..."}</p>
                  <button className="--btn --btn-primary">Get Started</button>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Hero;