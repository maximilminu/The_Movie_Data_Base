import axios from 'axios';
import '../styles/Login.css'
import { useNavigate, Link } from 'react-router-dom'
import { useContext, useEffect } from 'react';
import useInput from '../hooks/useInput'
import { AuthContext } from '../contexts/authContext'


const Login = () => {
    const navigate = useNavigate()
    const email = useInput()
    const password = useInput()
    const { toggleAuth, isAuthenticated } = useContext(AuthContext)

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post('/api/login', { email: email.value, password: password.value })
            .then((res) => res.data)
            .then(user => {
                toggleAuth(user)
                navigate(`/home`)
            })
            .catch(() => alert('Incorrect email or password'))
    }
    useEffect(() => {
        if (isAuthenticated) navigate('/search')
    })

    return (
        <div className='fullLogin'>
            <h1 className='login-title'>Login</h1>
            <div className='table'>
                <form className='login-form' onSubmit={handleSubmit}>
                    <div className='login-label-input'>
                        <label className='login-label' id="login">Email: </label>
                        <input
                            className='login-input'
                            type="text"
                            placeholder="  email@mail.com"
                            onChange={email.onChange}
                            value={email.value}
                        />
                    </div>
                    <div className='login-label-input'>
                        <label className='login-label'>Contraseña: </label>
                        <input
                            className='login-input'
                            type="password"
                            placeholder="  Contraseña"
                            onChange={password.onChange}
                            value={password.value}
                        />
                    </div>
                    <button id='login-button'>Login</button>
                </form>
            </div>
            <div className='login-label'>
                <p>If you don't have a user yet, <Link className='link' to='/register'>Click Here</Link> to register</p>
            </div>
        </div>
    )
}

export default Login