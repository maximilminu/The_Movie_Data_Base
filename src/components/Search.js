import '../styles/Search.css'
import Grid from '../commons/Grid'
import axios from 'axios'
import { useContext, useEffect, useState } from 'react'
import { SearchContext } from '../contexts/searchContext'
import useInput from '../hooks/useInput'


const Search = () => {
  const tmdbapi = "https://api.themoviedb.org/3/"
  const apikey = "23b7a354034b17a5d10d57b2969dd271"
  const searchQuery = useInput()
  const { searchResults, setSearchResults, typeSearch, setTypeSearch } = useContext(SearchContext)
  
  console.log("TYPE",typeSearch)

  const searching = typeSearch === 'movie' ? 'Movies' : typeSearch === 'tv' ? 'Series' : 'Usuarios'

  const getData = (query)=>{
    if(typeSearch !=='user') {
      return axios.get(`${tmdbapi}search/${typeSearch}?api_key=${apikey}&language=en-US&query=${query}&page=1&include_adult=false`)
    } else {
      return axios.get(`/api/users/search/${query.toLowerCase()}`)
    }
  }

  useEffect(()=>{
    if(searchQuery.value.length <=1) setSearchResults([])
    if (searchQuery.value.length > 1) getData(searchQuery.value)
    .then(res => res.data)
    .then(data => {
      if(typeSearch !== 'user') setSearchResults(data.results)
      else setSearchResults(data)})
},[searchQuery.value,typeSearch])

  return (
    <div>
      <div>
        <h2 className='search-title'>What are you looking for?</h2>
        <div className='search-buttons'>
          <button className='search-button' onClick={()=>{
            setSearchResults([])
            setTypeSearch('movie')
            }}>Movies</button>
          <button className='search-button' onClick={()=>{
            setSearchResults([])
            setTypeSearch('tv')
            }}>Series</button>
        </div>
      </div>
      <div className='search-title'> Looking for {searching}</div>
      <form className='search-form' onSubmit={(e) => e.preventDefault()}>
        <input
        className='search-input'
        type="text"
        placeholder={` Search for ${searching.slice(0,searching.length-1).toLowerCase()}`}
        onChange={searchQuery.onChange}
        value={searchQuery.value}
        />
      </form>
      
      {searchResults[0] && <p className='search-results'>Your results...</p>}
      {searchResults[0] && <Grid searchList={searchResults} remove={false} isUser={typeSearch === 'user' ? true :false}/>}
        </div>
  )
}

export default Search