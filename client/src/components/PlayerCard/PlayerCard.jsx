import { useNavigate } from 'react-router-dom'

import ImageViewer from '../ImageViewer/ImageViewer'

import './PlayerCardStyles.css'

const PlayerCard = ({ player }) => {
    const navigate = useNavigate()

    const clickHandler = () => {
        navigate(`/player/${player.playerId}`)
    }

    return (
        <div className="player-card" onClick={clickHandler}>
            <div className="pcimg-container">
                <ImageViewer width={120} height={120} src={`http://localhost:5000/static/players/${player.playerId}.webp`} />
            </div>
            <span>{player.playerName}</span>
        </div>
    )
}

export default PlayerCard