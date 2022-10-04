import '../styles/Grid.css'
import Card from './Card'
import UserCard from './UserCard'

const Grid = ({searchList,isFavorite,isUser})=>{

    return (
        <div className='container'>
        {searchList.map((singleResult) => 
            singleResult.poster_path?(            
            isUser ? <UserCard singleResult={singleResult} key={singleResult.id}/>
            :
            <Card singleResult={singleResult} isFavorite={isFavorite} key={singleResult.id}/>):
            null
        )}
        
        </div>
    )
}

export default Grid