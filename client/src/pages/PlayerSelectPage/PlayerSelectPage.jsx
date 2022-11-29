import { useState, useEffect } from "react"
import Loader from "../../components/Loader/Loader"
import PlayerCard from "../../components/PlayerCard/PlayerCard"

import './PlayerSelectPageStyles.css'

const PlayerSelectPage = () => {

    const [searched, setSearched] = useState(false)
    const [isSearching, setIsSearching] = useState(false)
    const [searchTerm, setSearchTerm] = useState('')
    const [searchResults, setSearchResults] = useState([])

    const searchHandler = async () => {
        if (searchTerm.length == 0) return
        setIsSearching(true)
        const res = await fetch(`http://localhost:5000/players?q=${searchTerm.toLowerCase()}`)
        if (res.status != 200) return
        const data = await res.json()
        setSearchResults(data)
        setIsSearching(false)
        setSearched(true)
    }

    const enterHandler = event => {
        if (event.code === 'Enter') {
            searchHandler()
        }   
    }

    useEffect(() => {
        setSearched(false)
    }, [])

    return (
        <div className="player-select-page">
            <div className="search-stick">
                <div className="search-container">
                    <input autoFocus placeholder="Enter a player's name" value={searchTerm} onKeyDown={enterHandler} onChange={event => setSearchTerm(event.target.value)} />
                    <img src={'src/assets/search.png'} onClick={() => searchHandler()} />
                </div>
            </div>
            {
                isSearching ? <Loader icon /> : !searched ? 'Search for some players' : searched && searchResults.length == 0 ? <>No results found</> :  (
                    <div className="search-results-container">
                        {searchResults.map(sr => <PlayerCard key={`psc-${sr.player_id}`} player={sr} />)}
                    </div>
                )
            }
        </div>
    )
}

export default PlayerSelectPage