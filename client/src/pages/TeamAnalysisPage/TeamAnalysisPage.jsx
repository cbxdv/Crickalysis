import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

import Loader from "../../components/Loader/Loader"
import FrameViewer from '../../components/FrameViewer/FrameViewer'

import './TeamAnalysisPageStyles.css'

const TeamAnalysisPage = () => {
    const [isLoading, setIsLoading] = useState(true)
    const [data, setData] = useState(null)

    const params = useParams()

    const getData = async () => {
        if (params && params.teamId) {
            const teamId = params.teamId
            const res = await fetch(`http://localhost:5000/team-analysis/${teamId}`)
            const d = await res.json()
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
        <div>
            <div className="team-details-container">
                <img src={`http://localhost:5000/static/flags/${data.teamId}.png`} />
                <div>
                    <h1>{data.country}</h1>
                </div>
            </div>
            <div className="analysis-container">
                {Object.keys(data.analysis).map(f => <FrameViewer key={f} srcData={data.analysis[f].graphData} />)}
            </div>
        </div>
    )
}

export default TeamAnalysisPage