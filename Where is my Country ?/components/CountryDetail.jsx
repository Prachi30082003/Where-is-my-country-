import React, { useContext, useEffect, useState } from 'react'

import './country.css'
import { Link, useOutletContext, useParams } from 'react-router-dom'
import ShimmerCountryDetail from './ShimmerCountryDetail'
import { ThemeContext } from '../context/ThemeContext'

export default function CountryDetail() {
  const params = useParams()
  const countryName = params.country

  const [countryData, setCountryData] = useState(null)
  const [notFound, setNotFound] = useState(false)

//   const [Dark,setDark] = useOutletContext()

const [Dark,setDark] = useContext(ThemeContext)

  console.log(countryData?.borders);

  useEffect(() => {
    fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`)
      .then((res) => res.json())
      .then(([data]) => {
        setCountryData({
          name: data.name.common,
          nativeName: Object.values(data.name.nativeName)[0].common,
          population: data.population,
          region: data.region,
          subregion: data.subregion,
          capital: data.capital,
          flag: data.flags.svg,
          tld: data.tld,
          languages: Object.values(data.languages).join(', '),
          currencies: Object.values(data.currencies)
            .map((currency) => currency.name)
            .join(', '),
          borders: []
        })

        // data.borders.map((border)=>{
        //     fetch(`https://restcountries.com/v3.1/alpha/${border}`)
        //     .then((res)=>res.json())
        //     .then(([borderCountry])=>{
        //         setCountryData((prevState)=>({...prevState,borders:[...prevState.borders,borderCountry.name.common]}))
        //     })
        // })       Aise bhi kr sakte ho.....ab sochooge ki jitne bhi borders honge utne baar setCountryData call hoga toh utni baar re-render
        //hoga but react automatically optimize kr deta dekhta ki baar baar aisa ho rha toh ruk jaata ki ek baar mei aa jaye data tab ek saath daal dunga
        //useEffect ke bahar jo console.log(countryData?.borders) hai wo jitne time run hoga < to no of borders thus optimizze kr rha


         // Dusra method hai Promise.all se promise.all array of promises leta jab saare resolve ho jaate toh sabka result collectively return krta

        if(!data.borders) {
          data.borders = []  //Since its possible ki khuch countries ka border exist na krta ho toh in such case set it to [] kyuki promise.all ko array chahiye rehta agar nhi mila toh error throw kr dega
        }

        Promise.all(data.borders.map((border) => {
          return fetch(`https://restcountries.com/v3.1/alpha/${border}`)
          .then((res) => res.json())
          .then(([borderCountry]) => borderCountry.name.common)
        })).then((borders) => {
          setCountryData((prevState) => ({...prevState, borders }))
        })
      })
      .catch((err) => {
        console.log(err); //agar jo country chahiye wo exist nhi krti toh uske liye error handling(ye border ke liye nhi balki overall then ke liye hai jo upar se hai)
        setNotFound(true)
      })
  }, [countryName]) // !!!!!! dependency mei countryName isiliye daale kyuki jab border countries mei click karenge toh uss specific
                    // country wala page aa jana chahiye ab since /:country mei CountryDetail page render hota hai toh ab Country page toh already ek baar render ho chuka tha toh ab jab re-render hoga 
                    //toh useEffect nhi chalega agar dependency array khaali hoga toh useEffect nhi chalega kyuki re-render mei nhi chalta hai toh eventhough url mei changes aa jayenge but page mei changes nhi aayega
                    //yahi cheez ho rhi thi mere saath jab mai apna code likh rhi thi isiliye dependency array mei url param ko daal diye ki jab ye change hoga tab phirse code chale phirse fetch ho

  if(notFound) {
    return <div>Country Not Found</div> // agar error aa gya ki country nhi mili toh ye render karayenge
  }

  return countryData === null ? (  //ye null wali condition isiliye lagaye kyuki useState asynchronously update hota toh baki code run hota rahega toh yaha jab run karega toh hum countryData 
                                   //se alag alag cheez access kr rhe toh error aa jayega isiliye jab tak countryData Null rahega tab tak loading.... dikhayega phir jab useState update hoga toh component re-render hoga toh phir hamara compnent render ho jayega !!!
    <ShimmerCountryDetail/>
  ) : (
    <main className= {` ${Dark?'dark':''}`}>
      <div className="country-details-container">
        <span className="back-button" onClick={() => history.back()}>
          <i className="fa-solid fa-arrow-left"></i>&nbsp; Back
        </span>
        <div className="country-details">
          <img src={countryData.flag} alt={`${countryData.name} flag`} />
          <div className="details-text-container">
            <h1>{countryData.name}</h1>
            <div className="details-text">
              <p>
                <b>Native Name: {countryData.nativeName}</b>
                <span className="native-name"></span>
              </p>
              <p>
                <b>
                  Population: {countryData.population.toLocaleString('en-IN')}
                </b>
                <span className="population"></span>
              </p>
              <p>
                <b>Region: {countryData.region}</b>
                <span className="region"></span>
              </p>
              <p>
                <b>Sub Region: {countryData.subregion}</b>
                <span className="sub-region"></span>
              </p>
              <p>
                <b>Capital: {countryData.capital.join(', ')}</b>
                <span className="capital"></span>
              </p>
              <p>
                <b>Top Level Domain: {countryData.tld}</b>
                <span className="top-level-domain"></span>
              </p>
              <p>
                <b>Currencies: {countryData.currencies}</b>
                <span className="currencies"></span>
              </p>
              <p>
                <b>Languages: {countryData.languages}</b>
                <span className="languages"></span>
              </p>
            </div>
           { countryData.borders.length !== 0 && <div className="border-countries">
              <b>Border Countries: </b>&nbsp;
              {
                countryData.borders.map((border) => <Link key={border} to={`/${border}`}>{border}</Link>)
              }
            </div>}
          </div>
        </div>
      </div>
    </main>
  )
}