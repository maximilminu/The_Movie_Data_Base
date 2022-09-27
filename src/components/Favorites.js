import '../styles/Favorites.css'
import axios from "axios"
import { useContext, useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"

import Grid from '../commons/Grid'

import { FavoriteContext } from "../contexts/favoriteContext"

const Favorites = () => {
    const { favorites, getFavorites } = useContext(FavoriteContext)
    const { id } = useParams()
    const [actualUser, setActualUser] = useState({})
    const [actualFavorites, setActualFavorites] = useState([])

    // Tenemos que modificar este codigo para los favs
    //trabajar con el pedido de Favorites para renderisar en la pantalla cada uno, seria refactorizar lo de la linea 30 en adelante
    // useEffect(() => {
    //     console.log("ACAAAAAAAAA",getFavorites(id))
    // }, [])

    useEffect(() => {
        axios.get(`/api/users/${id}`)
            .then(res => res.data)
            .then(returnedUser => setActualUser(returnedUser))

        const fav=[]
        const promises = []
        Promise.resolve(getFavorites(id))        
        .then(()=>{
            favorites.forEach(favorite => {
                promises.push(
                    axios.get(`https://api.themoviedb.org/3/${favorite.type}/${favorite.title_id}?api_key=23b7a354034b17a5d10d57b2969dd271&language=en-US`)
                    .then(res=>res.data)
                    .then(movie => {
                        fav.push(movie)
                    })
                )
            })
        Promise.all(promises).then(() => setActualFavorites(fav))
        })
    }, [])

    console.log("Favorites",actualFavorites)

    if (favorites.length === actualFavorites.length) return (
        <div className='favorites-container'>
            <h1 className='favorites-title'>{(actualUser.username)[0].toUpperCase() + (actualUser.username).slice(1)}'s Favorites</h1>
            <Link to='/search' >
                <button className="favorites-button">Search other</button>
            </Link>

            {actualFavorites.length ? <Grid searchList={actualFavorites} isFavorite={true} /> : <p>There is no favorites...</p>}
        </div>
    )

    return <></>

}


export default Favorites