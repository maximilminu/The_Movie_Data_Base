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
    },[])


    if (type === 'movie' && singleSearch.id) return (
        <div className='view-container'>
            <div className='view-subcontainer'>
                <img src={`https://image.tmdb.org/t/p/w300/${singleSearch.poster_path}`} />
                <div className='view-contents'>
                    <div className='view-content'># {singleSearch.id}</div>
                    <h1 className='view-content'>{singleSearch.title}</h1>
                    <div className='view-content'><FaStar /> {singleSearch.vote_average}</div>
                    <div className='view-content'>Fecha de estreno: {singleSearch.release_date}</div>
                    <div className='view-content'>Producción: {singleSearch.production_companies[0].name}</div>
                    {singleSearch.homepage && <div className='view-content'>Mirala en: {singleSearch.homepage}</div>}
                    <div className='view-content'>Descripción: </div>
                    <div>{singleSearch.overview}</div>
                    {alreadyAdded && <button className='view-button' onClick={() => addToFavorite(singleSearch, user.id, typeSearch)}>Agregar a favoritos</button>}
                    <Link to='/home'>
                        <button className='view-button'>Volver a la busqueda</button>
                    </Link>
                </div>
            </div>
        </div>
    )

    if (singleSearch.id) return (
        <div className='view-container'>
            <div className='view-subcontainer'>
                <img src={`https://image.tmdb.org/t/p/w300/${singleSearch.poster_path}`} />
                <div className='view-contents'>
                    <div className='view-content'># {singleSearch.id}</div>
                    <h1 className='view-content'>{singleSearch.name}</h1>
                    <div className='view-content'><FaStar /> {singleSearch.vote_average}</div>
                    <div className='view-content'>Fecha de inicio: {singleSearch.first_air_date}</div>
                    <div className='view-content'>Fecha de finalizacion: {singleSearch.last_air_date}</div>
                    <div className='view-content'>Numero de temporadas: {singleSearch.number_of_seasons}</div>
                    <div className='view-content'>Producción: {singleSearch.production_companies[0].name}</div>
                    {singleSearch.homepage && <div className='view-content'>Mirala en: {singleSearch.homepage}</div>}
                    <div className='view-content'>Descripción: {singleSearch.overview}</div>
                    {alreadyAdded && <button className='view-button' onClick={() => addToFavorite(singleSearch, user.id, typeSearch)}>Agregar a favoritos</button>}
                    <Link to='/home'>
                        <button className='view-button'>Volver a la busqueda</button>
                    </Link>
                </div>
            </div>
        </div>
    )

    return (
        <></>
    )
}

export default View