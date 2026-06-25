import { useState } from 'react'
import './App.css'

function App() {
  //This reduces calls as certain topics don't have certain keywords.
  const categories = [ // Specific category to add
    ["Artemis", "ISS", "Apollo", "Gemini", "Skylab"], //MANNED SPACECRAFTS 
    ["Hubble", "JWST", "Chandra", "DART", "New Horizons", "Voyager", "Pioneer", "Cassini"], //UNMANNED SPACECRAFTS
    ["Planet", "Star", "Blackhole", "Exoplanet", "Moon", "Titan", "Mercury", "Venus", "Earth", "Mars", "Jupiter", "Saturn", "Uranus", "Neptune", "Pluto", "Nebula", "Asteroid"]
  ]

  const modifiers= [ // Specific keyword modifiers
    ["EVA", "Research", "Diagram", "Crew", "Astronauts", "Exploration", "Mission", "Experiment"],
    ["Research", "Diagram", "Experiment", "Exploration", "Mission", "Technology"],
    ["Telescope", "Illustration", "Research", "Experiment"]
  ]

  return (
    <div className="App">
      <div className='banListContainer container'>
        <h2>
          Ignored Items
        </h2>
        <div className='banList'>
          
        </div>
      </div>
      <div className='interactable container'>
        <div className='titleCard'>
          <h1>NASA Images</h1>
          <h2>A random selection of NASA images to gaze into the stars with.</h2>
        </div>
        <div className="content">
          <img></img>
          <form>
            <div className='attributes'>
              {/* buttons here */}
            </div>
            <input type='submit' value="Roll Another"></input>
          </form>
          <h2 className='descriptionH2'>Description</h2>
          <p className='description'></p>
        </div>
      </div>
      <div className='historyContainer container'>
        <h2>
          History
        </h2>
        <div className='history'>

        </div>
      </div>
    </div>
  )
}

export default App
