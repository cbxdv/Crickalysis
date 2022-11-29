import { useNavigate } from 'react-router-dom'

import TeamCard from '../../components/TeamCard/TeamCard'

import TEAM_DATA from './teams.json'

import './TeamSelectPageStyles.css'

const TeamSelectPage = () => {

    const navigate = useNavigate()

    const changePage = team_id => {
        navigate(`/team/${team_id}`)
    }

    return(
        <div className='team-select-page'>
            <h1>Select a Team</h1>
            <div className='teams-container'>
                { TEAM_DATA.map(team => <TeamCard key={team.id} team={team} onClickHanlder={changePage} />) }
            </div>
        </div>
    )
}

export default TeamSelectPage