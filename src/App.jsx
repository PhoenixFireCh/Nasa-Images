import { useState } from 'react'
import './App.css'
import Attribute from './component/Attribute';
const ACCESS_KEY = import.meta.env.VITE_APP_ACCESS_KEY;

function App() {
  //This reduces calls as certain topics don't have certain keywords.
  const categories = [
    {name: "Artemis", type: 0}, {name: "ISS", type: 0}, {name: "Apollo", type: 0}, {name: "Gemini", type: 0}, {name: "Skylab", type: 0}, {name: "STS", type: 0},
    {name: "Hubble", type: 1}, {name: "James Web Space Telescope", type: 1}, {name: "Chandra", type: 1}, {name: "Double Asteroid Redirection Test", type: 1}, {name: "New Horizons", type: 1}, 
    {name: "Voyager", type: 1}, {name: "Pioneer", type: 1}, {name: "Cassini", type: 1}, {name: "Planet", type: 2}, {name: "Star", type: 2}, 
    {name: "Blackhole", type: 2}, {name: "Exoplanet", type: 2}, {name: "Moon", type: 2}, {name: "Titan", type: 2}, {name: "Mercury", type: 2}, 
    {name: "Venus", type: 2}, {name: "Earth", type: 2}, {name: "Mars", type: 2}, {name: "Jupiter", type: 2}, {name: "Saturn", type: 2}, 
    {name: "Uranus", type: 2}, {name: "Neptune", type: 2}, {name: "Pluto", type: 2}, {name: "Nebula", type: 2}, {name: "Asteroid", type: 2}, {name: "Galaxy", type: 2}
  ]

  const modifiers= [ // Specific keyword modifiers
    ["EVA", "Research", "Diagram", "Crew", "Astronauts", "Exploration", "Mission", "Experiment"], //MANNED SPACECRAFTS
    ["Research", "Diagram", "Experiment", "Exploration", "Mission", "Technology"], //UNMANNED SPACECRAFTS
    ["Telescope", "Illustration", "Research", "Experiment"] //CELESTIAL OBJECTS
  ]

  const [currImage, setCurrImage] = useState("none");
  const [currAttributes, setAttributes] = useState([]);
  const [currDesc, setCurrDesc] = useState("");
  const [banned, setBanned] = useState([]);
  const [start, setStart] = useState(false);


  const beginApp = () => {
    setStart(true);
    newQuery();
  }

  const unBanItem = (e) => {
    e.preventDefault();
    setBanned((prev) => prev.filter(o => o !== e.target.value));
  }

  const banItem = (e) => {
    e.preventDefault();
    setBanned((prev) => [...prev, e.target.value]);
    setAttributes((prev) => prev.filter(o => o !== e.target.value));
  }

  const newQuery = (e) => {
    if (e != null) {e.preventDefault();}
    const keywords = prepQuery();
    let str = [...keywords].join(", ");
    setAttributes([...keywords]);
    const query = `https://images-api.nasa.gov/search?keywords=${str}&media_type=image`
    callAPI(query);
  }

  const callAPI = async (q) => {
    const response = await fetch(q);
    const json = await response.json();
    if (json == null) {
      alert("Oops! Something went wrong with that query, let's try again!")
    } else {
      setCurrentImage(json);
    }
  }

  const setCurrentImage = (j) => {
    const randIndex = Math.floor(Math.random() * j.collection.items.length);
    setCurrImage(j.collection.items[randIndex].links[0].href)
    setCurrDesc(j.collection.items[randIndex].data[0].description);
  }

  const prepQuery = () => {
    let allowedCategories = [];
    let allowedModifiers = [];
    let queryItems = new Set();
    for (const value of categories) {
      if (!banned.includes(value.name)) {
        allowedCategories.push(value);
      }
    }

    let randCategories = Math.floor(Math.random() * allowedCategories.length);
    let choosenCategory = allowedCategories[randCategories];
    let choosenModifier = modifiers[choosenCategory.type];
    queryItems.add(choosenCategory.name);
    for (const value of choosenModifier) {
       if (!banned.includes(value)) {
        allowedModifiers.push(value);
       }
    }

    for (let i = 0; i < allowedModifiers.length; i++) {
      let randModifiers = Math.floor(Math.random() * allowedModifiers.length);
      queryItems.add(allowedModifiers[randModifiers]);
    }

    return queryItems;
  }

  const started = (p) => ({
    display: p ? "none" : "flex"
  }); 

  return (
    <>
      <div className="App">
        <div className="banListBoundary">
          <div className='banListContainer container'>
            <h2>
              Ignored Items
            </h2>
            <div className='banList'>
              {banned && banned.map((o) => {
                return <Attribute key={o} label={o} click={unBanItem} />;
              })}
            </div>
          </div>
        </div>
        <div className='interactable container'>
          <div className='titleCard'>
            <h1>NASA Images</h1>
            <h2>A random selection of NASA images to gaze into the stars with.</h2>
          </div>
          <button className='launchButton' style={started(start)} onClick={beginApp}> Launch! </button>
          <div className="content" style={started(!start)}>
            <img src={currImage}></img>
            <form onSubmit={newQuery}>
              <div className='attributesList'>
                {currAttributes && currAttributes.map((o) => {
                  return <Attribute key={o} label={o} click={banItem} />;
                })}
              </div>
              <input type='submit' value="Roll Another"></input>
            </form>
            <h2 className='descriptionH2'>Description</h2>
            <p className='description'>{currDesc}</p>
          </div>
        </div>
        <div className="historyBoundary">
          <div className='historyContainer container'>
            <h2>
              History
            </h2>
            <div className='history'>

            </div>
          </div>
        </div>
      </div>
      <div className='background'>

      </div>
    </>
  )
}

export default App
