import ImageViewer from '../ImageViewer/ImageViewer'

import './TeamCardStyles.css'

const TeamCard = ({ team, onClickHandler = () => {} }) => {

    return (
        <div className='team-card' onClick={() => onClickHandler(team.id)}>
            <div className='tflag-container'>
                <ImageViewer width={150} height={150} src={`http://localhost:5000/static/flags/${team.id}.png`} />
            </div>
            <div className='tname-container'>
                <span>{team.name}</span>
            </div>
        </div>
    )
}

export default TeamCard