import { useNavigate } from 'react-router-dom'

import './HomePageStyles.css'

const Card = ({ name, image, link }) => {
    const navigate = useNavigate()
    const pushLink = () => {
        navigate(link)
    }

    return (
        <div className='home-card' onClick={pushLink}>
            <img src={`src/assets/${image}`} />
            {name}
        </div>
    )
}

const HomePage = () => (
    <div className="home-page">
        <div className='homepage-header'>
            <img src="src/assets/worldcup.png" alt="world cup" height={'100px'} style={{ marginBottom: '30px' }} />
            <img src="src/assets/worldcup.png" alt="world cup" height={'100px'} style={{ marginBottom: '30px' }} />
            <img src="src/assets/worldcup.png" alt="world cup" height={'100px'} style={{ marginBottom: '30px' }} />
            <img src="src/assets/worldcup.png" alt="world cup" height={'100px'} style={{ marginBottom: '30px' }} />
        </div>
        <div className="home-cards-container">
            <Card name={'Team Analysis'} image={'team.png'} link={'/teams'} />
            <Card name={'Player Analysis'} image={'player.png'} link={'/players'} />
            <Card name={'Points Table'} image={'scoreboard.png'} link={'/points-table'} />
        </div>
    </div>
)

export default HomePage