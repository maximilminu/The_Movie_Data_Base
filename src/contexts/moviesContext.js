import { React, createContext, useState } from 'react';
import axios from 'axios';

const initialState = {
    popularMovies: () => { },
    topRatedMovies: () => { },
    blockbusterMovies: () => { }
};

export const MoviesContext = createContext(initialState);

const tmdbapi = "https://api.themoviedb.org/3/"
const apikey = "23b7a354034b17a5d10d57b2969dd271"
const year = new Date().getFullYear();

const MoviesContextProvider = ({ children }) => {
    const allRequests = {
        popularMovies: () => {
            return axios.get(`${tmdbapi}movie/popular?api_key=${apikey}&language=en-US`)
                .then(res => res.data.results)
        },
        topRatedMovies: () => {
            return axios.get(`${tmdbapi}movie/top_rated?api_key=${apikey}&certification_country=US&certification=R&sort_by=vote_average.desc&language=en-US`)
                .then(res => res.data.results)
        },
        blockbusterMovies: () => {
            return axios.get(`${tmdbapi}trending/all/week?api_key=${apikey}&language=en-US&certification_country=US`)
                .then(res => res.data.results)
        }

    }


    return (
        <MoviesContext.Provider value={{ ...allRequests }}>
            {children}
        </MoviesContext.Provider>
    )
}

export default MoviesContextProvider