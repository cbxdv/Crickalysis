import './LoaderStyles.css'

import LoadingGIF from '../../assets/loading.gif'

const Loader = ({ fullSize = true, icon = false }) => {
    return (
        <div className={fullSize ? 'loader-container' : ''}>
            { icon ? (<span className={`loader`}></span>) : (<img src={LoadingGIF} />) }
            { !icon && (<span style={{ marginTop: '30px' }}><i>Loading...</i></span>) }
        </div>
    )
}

export default Loader