import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import Logo from '../../assets/worldcup.png'
import TeamIcon from '../../assets/team.png'
import PlayerIcon from '../../assets/player.png'
import ScoreBoardIcon from '../../assets/scoreboard.png'

import './SidebarStyles.css'

const Header = () => {
	const [isVisible, setIsVisible] = useState(false)

	const location = useLocation()
	const navigate = useNavigate()

	useEffect(() => {
		if (location.pathname == '/' || location.pathname == '/404') {
			setIsVisible(false)
		} else {
			setIsVisible(true)
		}
	}, [location.pathname])

	if (!isVisible) return <></>
	return (
		<div className='sidebar'>
			<img
				onClick={() => navigate('/')}
				src={Logo}
				height={50}
				style={{ cursor: 'pointer' }}
			/>
			<nav>
				<ul>
					<li
						onClick={() => navigate('/teams')}
						className={
							location.pathname.startsWith('/team')
								? 'selected'
								: ''
						}
					>
						<img src={TeamIcon} height={45} />
					</li>
					<li
						onClick={() => navigate('/players')}
						className={
							location.pathname.startsWith('/player')
								? 'selected'
								: ''
						}
					>
						<img src={PlayerIcon} height={45} />
					</li>
					<li
						onClick={() => navigate('/points-table')}
						className={
							location.pathname.startsWith('/points-table')
								? 'selected'
								: ''
						}
					>
						<img src={ScoreBoardIcon} height={45} />
					</li>
				</ul>
			</nav>
			<div></div>
		</div>
	)
}

export default Header
