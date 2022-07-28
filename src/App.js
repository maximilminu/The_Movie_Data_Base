import './styles/App.css';
import { Link,Route,Routes } from 'react-router-dom'

import { SearchContextProvider } from "./contexts/searchContext";
import { AuthContextProvider } from "./contexts/authContext";
import { FavoriteContextProvider } from './contexts/favoriteContext';

import Navbar from './components/Navbar';
import Register from './components/Register'
import Login from './components/Login'
import Search from './components/Search'
import View from './components/View'
import Favorites from './components/Favorites';
import Footer from './components/Footer'
import Home from './components/Home';
import MoviesContextProvider from './contexts/moviesContext';

const App = () => {
  // const api_key = '23b7a354034b17a5d10d57b2969dd271'

  // busquedas grupales -> trae un arreglo de resultados
  // tv -> https://api.themoviedb.org/3/search/tv?api_key=23b7a354034b17a5d10d57b2969dd271&language=en-US&page=1&query={INGRESAR_QUERY}&include_adult=false
  // movies -> https://api.themoviedb.org/3/search/movie?api_key=23b7a354034b17a5d10d57b2969dd271&language=en-US&query={INGRESAR_QUERY}&page=1&include_adult=false
  // ambas -> https://api.themoviedb.org/3/search/multi?api_key=23b7a354034b17a5d10d57b2969dd271&language=en-US&query={INGRESAR_QUERY}&page=1&include_adult=false
  // general -> https://api.themoviedb.org/3/search/{TIPO_DE_DATO}?api_key=23b7a354034b17a5d10d57b2969dd271&language=en-US&query={INGRESAR_QUERY}&page=1&include_adult=false

  // busquedas individuales -> trae toda la info de 1 sola pelicula/serie
  // tv -> https://api.themoviedb.org/3/tv/{tv_id}?api_key=23b7a354034b17a5d10d57b2969dd271&language=en-US
  // movies -> https://api.themoviedb.org/3/movie/{movie_id}?api_key=23b7a354034b17a5d10d57b2969dd271&language=en-US
  // general -> https://api.themoviedb.org/3/{TIPO_DE_DATO}/{ID}?api_key=23b7a354034b17a5d10d57b2969dd271&language=en-US

  return (
    <>
    <MoviesContextProvider>
    <FavoriteContextProvider>
    <SearchContextProvider>
    <AuthContextProvider>
    
    <Navbar />
    <Routes>
      <Route path='/' element={<></>} />
      <Route path='/register' element={<Register />} /> 
      <Route path='/login' element={<Login />} />
      <Route path='/home' element={<Home />} />
      <Route path='/search' element={<Search />} />
      <Route path='/single/:type/:id' element={<View />} />
      <Route path='/users/:id/favorites' element={<Favorites />} />
    </Routes>
    
    <Footer className='bottom'/>
    </AuthContextProvider>
    </SearchContextProvider>
    </FavoriteContextProvider>
    </MoviesContextProvider>
    </>
  );
}

export default App;
