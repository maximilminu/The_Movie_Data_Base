import React from 'react'
import { useContext, useEffect, useState } from 'react'
import { SearchContext } from '../contexts/searchContext'
import axios from 'axios'
import Slider from './Slider'

const Discover = () => {
    const tmdbapi = "https://api.themoviedb.org/3/"
    const apikey = "23b7a354034b17a5d10d57b2969dd271"

    const { searchResults, setSearchResults, typeSearch, setTypeSearch } = useContext(SearchContext)

    const [popularMovies, setPopularMovies] = useState([])
    const [topRatedMovies, setTopRatedMovies] = useState([])
    const [blockbusterMovies, setblockbusterMovies] = useState([])
    const year = new Date().getFullYear();

    const searching = typeSearch === 'movie' ? 'Peliculas' : typeSearch === 'tv' ? 'Series' : 'Usuarios'


    useEffect(() => {
        axios.get(`${tmdbapi}${typeSearch === "user" ? "movie" : typeSearch}/popular?api_key=${apikey}&language=en-US`)
            .then((res) => res.data.results)
            .then((movie) => {
                setPopularMovies(movie)
            })
        axios.get(`${tmdbapi}${typeSearch === "user" ? "movie" : typeSearch}/top_rated?api_key=${apikey}&certification_country=US&certification=R&sort_by=vote_average.desc&language=en-US`)
            .then((res) => res.data.results)
            .then((movies) => {
                setTopRatedMovies(movies)
            })
        axios.get(`${tmdbapi}discover/movie?api_key=${apikey}&language=en-US&sort_by=revenue.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate&primary_release_year=${year - 5}`)
            .then((res) => res.data.results)
            .then((movies) => {
                setblockbusterMovies(movies)
            })

    }, [typeSearch])

    return (
        <div>
            <h2 className='discoverMovies'>Las peliculas más taquilleras</h2>
            <Slider movies={blockbusterMovies} />
            <h2 className='discoverMovies'>Las {typeSearch === "tv" ? "series" : "peliculas"} más populares</h2>
            <Slider movies={popularMovies} />
            <div id='topRated'>
                <h2 className='discoverMovies'>Las {typeSearch === "tv" ? "series" : "peliculas"} mejor valoradas</h2>
                <Slider movies={topRatedMovies} />
            </div>
        </div>
    )
}

export default Discover