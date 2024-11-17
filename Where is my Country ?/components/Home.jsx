import Search from "./search"
import CountriesList from "./CountriesList"
import { useContext, useState } from "react"
import { useOutletContext } from "react-router-dom"
import { ThemeContext } from "../context/ThemeContext"



export default function Home(){

    const [query,Setquery] = useState('')
    // const [Dark,setDark] = useOutletContext();

    const [Dark,setDark] = useContext(ThemeContext)

    return(
    <main className={`${Dark?'dark':''}`}>

    <div className="search-filter-container">

    <Search Setquery={Setquery} />

    </div>

    <CountriesList query={query}/>

     
   

   </main>
    )
}