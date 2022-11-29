import { useEffect, useState } from "react"
import FrameViewer from "../../components/FrameViewer/FrameViewer"
import Loader from "../../components/Loader/Loader"

import './PointsTablePageStyles.css'

const PointsTablePage = () => {
    
    const [isLoading, setIsLoading] = useState(true)
    const [data, setData] = useState(null)

    const fetchData = async () => {
        const res = await fetch('http://localhost:5000/points-table')
        if (res.status != 200) return
        const data = await res.json()
        setData(data)
        setTimeout(() => {
            setIsLoading(false) 
        }, 2000)
    }

    useEffect(() => {
        fetchData()
    }, [])

    if (isLoading) {
        return <Loader />
    }

    return (
        <div className="points-table-page">
            <h1>Points Table</h1>
            <div className="table-container">
                <FrameViewer srcData={data.table} height={700} width={1000} />
            </div>
        </div>
    )
}

export default PointsTablePage