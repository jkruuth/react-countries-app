import { useEffect, useState } from "react";
import axios from 'axios'

const MoreThanOne = ({ countries, handleClick }) => {
  return (
    <div>
      {countries.map(country => 
        <p key={country.name}>
          {country.name} <button onClick={() => handleClick(country.name.toLowerCase())}>show</button>
        </p>)}
    </div>
  )
}

const SingleCountry = ({ country }) => {
  return (
    <div>
      <h1>{country.name}</h1>
      <p>capital {country.capital}</p>
      <p>population {country.population}</p>
      <h2>languages</h2>
      <ul>
      {country.languages.map(lang =>
        <li style={{ display: "flex", justifyContent: "center" }} key={lang.name}>{lang.name}</li>)}
      </ul>

      <img src={country.flag} alt="flag" style={{ width: 150 }}></img>
    </div>
  )
}



const GetCountryData = ({ countries, handleClick }) => {
  if (countries.length === 1) return <SingleCountry country={countries[0]} />
  
  if (countries.length <= 15) return <MoreThanOne countries={countries} handleClick={handleClick} />

  return (
    <div>
      Too many matches, please be more specific
    </div>
  )

}

const App = () => {

  const [countries, setCountries] = useState([])
  const [search, setSearch] = useState('')

  useEffect(() => {
    axios.get('https://restcountries.eu/rest/v2/all')
         .then(res => {
           setCountries(res.data)
         })
  },[])


const showExact = country => {
  setSearch(country)
}


  return (
    <div className="App">
      <form>
        find countries 
          <input 
            value={search} 
            onChange={e => setSearch(e.target.value)} 
            placeholder="write here..">
          </input>
      </form>

      <GetCountryData countries={countries.filter(country =>
        country.name.toLowerCase().includes(search) || search === '')} handleClick={showExact} />
    </div>
  );
}

export default App;