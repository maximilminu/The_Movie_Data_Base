
import React from 'react'
import '../styles/Slider.css'
import { Link } from 'react-router-dom'


const Slider = ({ movies }) => {
    return (
        <div className='carousel'>
            <div className='carouselbox'>
                {movies.map((movie, index) => {
                    const type = movie.title ? 'movie' : 'tv'
                    return (
                        <Link className='card-value' to={`/single/${type}/${movie.id}`} key={index}>
                            <img src={`https://image.tmdb.org/t/p/w154/${movie.poster_path}`} />
                        </Link>)
                })}
            </div>
        </div>
    )
}

export default Slider
