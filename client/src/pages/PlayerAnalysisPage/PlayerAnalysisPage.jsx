import { useEffect } from 'react'
import { useState } from 'react'
import { useParams } from 'react-router-dom'

import FrameViewer from '../../components/FrameViewer/FrameViewer'
import Loader from '../../components/Loader/Loader'

import './PlayerAnalysisPageStyles.css'

const PlayerAnalysisPage = () => {
	const params = useParams()

	const [isLoading, setIsLoading] = useState(true)
	const [data, setData] = useState(null)

	const getData = async () => {
		if (params && params.player_id) {
			const player_id = parseInt(params.player_id)
			const response = await fetch(
				`http://localhost:5000/player-analysis/${player_id}`
			)
			const d = await response.json()
			setData(d)
			setTimeout(() => {
				setIsLoading(false)
			}, 2000)
		}
	}

	useEffect(() => {
		getData()
	}, [])

	if (isLoading || !data) return <Loader />
	return (
		<div className='player-analysis-page'>
			<div className='player-header'>
				<div>
					<img
						src={`http://localhost:5000/static/players/${params.player_id}.webp`}
						width={200}
						height={200}
						alt={params.player_id}
					/>
				</div>
				<div>
					<h1>{data.playerName}</h1>
					<span>Country: {data.country}</span>
				</div>
			</div>
			<div className='analysis-container'>
				{Object.keys(data.analysis).map((f) => (
					<FrameViewer key={f} srcData={data.analysis[f].graphData} />
				))}
			</div>
		</div>
	)
}

export default PlayerAnalysisPage
