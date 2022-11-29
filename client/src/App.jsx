import { Routes, Route, Navigate } from 'react-router-dom'

import HomePage from './pages/HomePage/HomePage'
import TeamSelectPage from './pages/TeamSelectPage/TeamSelectPage'
import PlayerSelectPage from './pages/PlayerSelectPage/PlayerSelectPage'
import PointsTablePage from './pages/PointsTablePage/PointsTablePage'
import PlayerAnalysisPage from './pages/PlayerAnalysisPage/PlayerAnalysisPage'
import TeamAnalysisPage from './pages/TeamAnalysisPage/TeamAnalysisPage'
import Sidebar from './components/Sidebar/Sidebar'

import './App.css'
import ErrorPage from './pages/ErrorPage/ErrorPage'

const App = () => (
  <div className='app'>
    <div className='sidebar-container'>
      <Sidebar />
    </div>
    <main>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/teams' element={<TeamSelectPage />} />
        <Route path='/team/:team_id' element={<TeamAnalysisPage />} />
        <Route path='/players' element={<PlayerSelectPage />} />
        <Route path='/player/:player_id' element={<PlayerAnalysisPage />} />
        <Route path='/points-table' element={<PointsTablePage />} />
        <Route path='/404' element={<ErrorPage />} />
        <Route path='*' element={<Navigate to='/404' replace />} />
      </Routes>
    </main>
  </div>
)

export default App
