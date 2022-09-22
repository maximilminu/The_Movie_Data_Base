import '../styles/View.css'
import axios from 'axios'
import { useEffect, useState, useContext } from 'react'
import { useParams, Link } from 'react-router-dom'
import { FaStar } from 'react-icons/fa';

import { FavoriteContext } from '../contexts/favoriteContext'
import { AuthContext } from '../contexts/authContext'
import { SearchContext } from '../contexts/searchContext'

const View = () => {
    const { id, type } = useParams() //movieId
    const [singleSearch, setSingleSearch] = useState({})
    const [alreadyAdded, setAreadyAdded] = useState(false)
    const { user } = useContext(AuthContext)
    const { typeSearch } = useContext(SearchContext)
    const { addToFavorite } = useContext(FavoriteContext)

    useEffect(() => {
        axios.get(`https://api.themoviedb.org/3/${type}/${id}?api_key=23b7a354034b17a5d10d57b2969dd271&language=en-US`)
            .then(res => res.data)
            .then(searchData => setSingleSearch(searchData))
            .then(() => axios.get(`/api/users/${user.id}/favorites/${id}`))
            .then(res => res.data)
            .then(favorite => {
                setAreadyAdded(favorite ? false : true)
            })
    }, [])


    if (type === 'movie' && singleSearch.id) return (
        <div className='view-container' >
            <img src={`https://image.tmdb.org/t/p/w1280/${singleSearch.backdrop_path}`} id="backdrop" />
            <div className='view-subcontainer'>
                <img src={`https://image.tmdb.org/t/p/w300/${singleSearch.poster_path}`} />
                <div className='view-contents'>
                    <h1 className='view-content'>{singleSearch.title}</h1>
                    <br />
                    <div className='view-content'> {Math.round(singleSearch.vote_average * 10) / 10} <FaStar /></div>
                    <br />
                    <div className='view-content'>Genre: <p>{singleSearch.genres[0].name}</p></div>
                    <div className='view-content'>Release Date: <p>{singleSearch.release_date}</p></div>
                    <div className='view-content'>Production: <p>{singleSearch.production_companies[0].name}</p></div>
                    <br />
                    <div className='view-content' id='overview'>
                        <p >{singleSearch.overview}</p>
                    </div>
                    <div className='button-container'>
                        {alreadyAdded && <button className='view-button' onClick={() => addToFavorite(singleSearch, user.id, typeSearch)}>Add to Favorites</button>}
                        <Link to='/home'>
                            <button className='view-button'>Back to Home</button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )

    if (singleSearch.id) return (
        <div className='view-container'>
            <div className='view-subcontainer'>
                <img src={`https://image.tmdb.org/t/p/w300/${singleSearch.poster_path}`} />
                <div className='view-contents'>
                    <h1 className='view-content'>{singleSearch.name}</h1>
                    <br />
                    <div className='view-content'> {Math.round(singleSearch.vote_average * 10) / 10} <FaStar /></div>
                    <br />
                    <div className='view-content'>Release Date: <p>{singleSearch.first_air_date}</p></div>
                    <div className='view-content'>Number of Seassons: <p>{singleSearch.number_of_seasons}</p></div>
                    <div className='view-content'>Production: <p>{singleSearch.production_companies[0].name}</p></div>
                    <br />
                    <div className='view-content' id='overview'>
                        <p>{singleSearch.overview}</p>
                    </div>
                    <div className='button-container'>
                        {alreadyAdded && <button className='view-button' onClick={() => addToFavorite(singleSearch, user.id, typeSearch)}>Add to Favorites</button>}
                        <Link to='/home'>
                            <button className='view-button'>Back to Home</button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )

    return (
        <></>
    )
}

export default View