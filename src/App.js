import React from 'react'

import './styles/app.scss'

import Player from './components/Player'
import Song from './components/Song'


function App() {
	return (
		<div className='App'>
			<h1>Harmony Player App</h1>
			<Song />
      <Player/>
		</div>
	)
}

export default App
