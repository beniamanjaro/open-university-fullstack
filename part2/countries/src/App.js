import React, { useState, useEffect } from 'react'
import axios from 'axios'


const App = () =>{
const api_key = '601a917d7741c727072b1cfe586bff4d'

const [countries, setCountries] = useState([])
const [newSearch, setNewSearch] = useState("")
const [countriesToShow, setCountriesToShow] = useState([])
const [countryInfo, setCountryInfo] = useState({name:"",capital:"",population:"",languages:[],flag:""})
const [weather, setWeather] = useState({current:{temperature:"",weather_icons:[],wind_speed:""}})

useEffect(() => {
  axios
    .get("https://restcountries.eu/rest/v2/all")
    .then(response => {
      setCountries(response.data)
    })
}, [])

useEffect(() => {
  if(countryInfo.name === ""){
    return
  }
  axios
    .get(`http://api.weatherstack.com/current?access_key=${api_key}&query=${countryInfo.capital}`)
    .then(response => {
      setWeather(response.data)
    })
}, [countryInfo])

console.log(JSON.stringify(weather))

const handleFilterChange = (event) => {
  setNewSearch(event.target.value)
  let filteredCountries = countries.filter(country => country.name.toLowerCase().includes(`${newSearch.toLowerCase()}`))
  if (filteredCountries.length === 1) {
    setCountriesToShow([])
    setCountryInfo(filteredCountries[0])
  } else if(filteredCountries.length > 1 && filteredCountries.length < 10) {
    setCountriesToShow(filteredCountries)
    setCountryInfo({name:"",capital:"",population:"",languages:[],flag:""})
  } else {
    setCountriesToShow([])
    setCountryInfo({name:"",capital:"",population:"",languages:[],flag:""})
  }
}

const RenderCountryName = ({name}) => {
  return (
    <div>
      {name} <button value={name} onClick={handleCountryClick}>show</button>
    </div>
  )
}
 
const RenderCountriesNames = ({countriesNames}) => {
  return (
    <div>
      {countriesNames.map(country => <RenderCountryName name={country.name} /> )}
    </div>
  )
}

const Title = ({countryName}) => {
  return (
    <h1>{countryName}</h1>
  )
}
const Capital = ({capital}) => {
  return (
    <div>Capital {capital}</div>
  )
}

const Population = ({population}) => {
  return (
    <div> {`Population ${population}`} </div>
  )
}

const Languages = ({languages}) => {
  return (
    <div>
      <h2>Spoken languages:</h2>
      <ul>{languages.map(language => <li key={language.name}>{language.name}</li>)}</ul>
    </div>
  )
}

const Flag = ({flag}) => {
  return (
    <img src={flag}></img>
  )
}

const Temperature = ({temp}) => {
  return (
    <div>temperature: {temp} Celsius</div>
  )
}

const WeatherIcon = ({icon}) => {
  return (
    <img src={icon} ></img>
  )
}

const Wind = ({wind, windDir}) => {
  return(
    <div>wind: {wind} mph direction {windDir}</div>
  )
}

const Weather = ({countryInfo, weather}) => {
  if(countryInfo.name === "") {
    return <div></div>
  }
  return(
    <div>
    <Title countryName={`Weather in ${countryInfo.capital}`} />
    <Temperature temp={weather.current.temperature}/>
    <WeatherIcon icon={weather.current.weather_icons[0]} />
    <Wind wind={weather.current.wind_speed} windDir={weather.current.wind_dir} />
    </div>
  )
}

const RenderCountryInfo = ({countryInfo}) => {
  if(countryInfo.name === "") {
    return <div></div>
  }
  return (
    <div>
      <Title countryName={countryInfo.name} />
      <Capital capital={countryInfo.capital} />
      <Population population={countryInfo.population} />
      <Languages languages={countryInfo.languages}/>
      <Flag flag={countryInfo.flag}/>
    </div>
  )
}

const handleCountryClick = (event) => {
  const info = countries.filter(country => country.name.toLowerCase().includes(`${event.target.value.toLowerCase()}`))
  setCountryInfo(info[0])
}

return (
  <div>
    <div>find countries: <input value={newSearch} onChange={handleFilterChange} /></div>
    <RenderCountriesNames countriesNames={countriesToShow} />
    <RenderCountryInfo countryInfo={countryInfo} />
    <Weather countryInfo={countryInfo} weather={weather} />
  </div>
)
}


export default App
