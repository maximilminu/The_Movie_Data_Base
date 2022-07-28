import React, { useContext, useEffect, useState } from 'react'
import { MoviesContext } from '../contexts/moviesContext'
import Hero from './Hero'
import Slider from "./Slider"

const Home = () => {

  const { popularMovies, topRatedMovies, blockbusterMovies } = useContext(MoviesContext)

  const [popular_Movies, set_Popular_Movies] = useState([])
  const [top_Rated_Movies, set_Top_Rated_Movies] = useState([])
  const [blockbuster_Movies, set_blockbuster_Movies] = useState([])

  useEffect(() => {
    popularMovies().then((movies) => {
      set_Popular_Movies(movies)
    })
    topRatedMovies().then((movies) => {
      set_Top_Rated_Movies(movies)
    })
    blockbusterMovies().then((movies) => {
      set_blockbuster_Movies(movies)
    })

  }, [])

  return (
    <div>
      <Hero />
      <div>
        <h2 className='discoverMovies'>Las peliculas más taquilleras</h2>
        <Slider movies={blockbuster_Movies} />
        <h2 className='discoverMovies'>Las peliculas más populares</h2>
        <Slider movies={popular_Movies} />
        <div id='topRated'>
          <h2 className='discoverMovies'>Las peliculas mejor valoradas</h2>
          <Slider movies={top_Rated_Movies} />
        </div>
      </div>
    </div>
  )
}

export default Home