import React, { useState, useEffect } from 'react'
import axios from 'axios'
const Weather = ({country}) => {
  const [ weather, setWeather ] = useState({
    "cloud coverage": "",
    "humidity": "",
    "wind": ""
  })
  useEffect(() => {
    axios
      .get(`http://api.openweathermap.org/data/2.5/weather?q=${country.capital},${country.name}&APPID=1a9fb89481a9f6810d6442a40f12d777`)
      .then(response => {
        setWeather({
          "cloud coverage": response.data.weather[0].description,
          "humidity": response.data.main.humidity,
          "wind": response.data.wind.speed
        })
      })
  })
  return (
    <div>
      <h2>Weather in {country.capital}</h2>
      <p><b>Cloud coverage: </b>{weather["cloud coverage"]}</p>
      <p><b>Humidity: </b>{weather["humidity"]} %</p>
      <p><b>Wind: </b>{weather["wind"]} kmph</p>
    </div>
  )
}
const Results = ({countries, setFlt}) => {
  const imgStyle = {
    width: '200px',
    height: '120px'
  }
  if(countries.length > 10){
    return (
      <div>
        Too many matches, specify another filter
      </div>
    )
  }
  else if (countries.length === 1){
    const country = countries[0]
    return (
      <div>
        <h1>{country.name}</h1>
        capital: {country.capital} <br/>
        population: {country.population} <br/>
        <h2>Languages</h2>
        <ul>
          {country.languages.map(lang => <li key = {lang["iso639_2"]}>{lang.name}</li>)}
        </ul>
        <img style = {imgStyle} alt = "Country flag" src = {country.flag}></img>
        <Weather country = {country}/>
      </div>
    )
  }
  else if (countries.length > 1){
    return (
      <div>
        {countries.map(country => {
          return (
            <p key = {country["alpha3Code"]}>
              {country.name}
              <button onClick = {() => setFlt(country["name"])}>show</button>
            </p>
          )
        })}
      </div>
    )
  }
  return (
    <div></div>
  )
}
const App = () => {
  const [ countries, setCountries] = useState([]) 
  const [ flt, setFlt ] = useState('')
  useEffect(() => {
    axios
    .get('https://restcountries.eu/rest/v2/all')
    .then(response => {
      setCountries(response.data)
    })
  }, [])
  const handleFilterChange = (event) => setFlt(event.target.value)
  const filtered = countries.filter(country => {
    return country.name.toLowerCase().includes(flt.toLowerCase())
  })
  return (
    <div>
      <form>
        find countries:
        <input
        value = {flt}
        onChange = {handleFilterChange}/>
      </form>
      <Results countries={filtered} setFlt={setFlt}/>
    </div>
  )
}
    
export default App