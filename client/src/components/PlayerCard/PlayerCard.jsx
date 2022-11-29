import { useNavigate } from 'react-router-dom'

import ImageViewer from '../ImageViewer/ImageViewer'

import './PlayerCardStyles.css'

const PlayerCard = ({ player }) => {
    const navigate = useNavigate()

    const clickHandler = () => {
        navigate(`/player/${player.player_id}`)
    }

    return (
        <div className="player-card" onClick={clickHandler}>
            <div className="pcimg-container">
                <ImageViewer width={120} height={120} src={`http://localhost:5000/static/players/${player.player_id}.webp`} />
            </div>
            <span>{player.player_name}</span>
        </div>
    )
}

export default PlayerCard