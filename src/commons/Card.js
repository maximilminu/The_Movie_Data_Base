import '../styles/Card.css'
import { Link } from 'react-router-dom'
import { useContext, useEffect, } from 'react'

import { FavoriteContext } from '../contexts/favoriteContext'
import { AuthContext } from '../contexts/authContext'

const Card = ({ singleResult, isFavorite }) => {
    const { removeFromFavorite } = useContext(FavoriteContext)
    const { user } = useContext(AuthContext)
    const type = singleResult.title ? 'movie' : 'tv'

    return (
        <div className='card-container'>
            <Link className='card-value' to={`/single/${type}/${singleResult.id}`}>
                {singleResult.poster_path && <img src={`https://image.tmdb.org/t/p/w154/${singleResult.poster_path}`} />}
                {type === 'movie' ? `${(singleResult.title.length > 14) ? singleResult.title.slice(0, 11) + "..." : singleResult.title}` : `${(singleResult.name.length > 20) ? singleResult.name.slice(0, 16) + "..." : singleResult.name}`}
            </Link>
            {/* {isFavorite && <button className='card-button' onClick={() => removeFromFavorite(singleResult.id, user.id)}>Remove</button>} */}
        </div>
    )
}

export default Card