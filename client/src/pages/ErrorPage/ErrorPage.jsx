import { useNavigate } from 'react-router-dom'
import ErrorGIF from '../../assets/error.gif'

import './ErrorPageStyles.css'

const ErrorPage = () => {
    const navigate = useNavigate()
    return (
        <div className='error-page'>
            <img src={ErrorGIF} />
            <div className='error-desc'>
                <div>
                    <span className='error-num'>404</span>
                </div>
                <div className='right-sec'>
                    <span>Probably something messed up!!!</span>
                    <button onClick={() => navigate('/')} className='home-button'>Go to Home</button>
                </div>
            </div>
        </div>
    )
}

export default ErrorPage