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
import Home from './components/Home';
import MoviesContextProvider from './contexts/moviesContext';

const App = () => {

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
    
    </AuthContextProvider>
    </SearchContextProvider>
    </FavoriteContextProvider>
    </MoviesContextProvider>
    </>
  );
}

export default App;
