import { useState } from "react";
// import dataCountry from "../src/dataCountry";
import CountryCard from "./CountryCard";
import Shimmer from "./Shimmer";
import { useEffect } from "react";

export default function CountriesList({query}){

     const [dataCountry,setDataCountry]=useState([]) //useState kyu use kare??? let dataCountry=[] krke array initialise kr lete 
     //phir fetch mei dataCountry=country kr dete phir map toh run ho hi rha hai toh aise bhi render ho jana chahiye but nhi hota !!!!!
     //kyuki react ko pta hi nhi chalega ki array mei koyi value aa gyi isiliye useState ka hi use krna padega !!!!!
     //aisa samajh lo React mandbuddhi hai usko pta nhi chalta kab kya update hua isliye ghanti bajani padti usko batane ke liye 
     //that ghanti is useState

    // fetch("https://restcountries.com/v3.1/all")
    // .then((res)=>res.json())
    // .then((country)=>{
    //     console.log(country)
    //     setDataCountry(country) // setDataCountry krne se page phirse render hoga toh agar page phirse render hua 
    //     //phirse sab run hoga that means fetch request phirse jayegi then phirse setDataCountry hoga phirse render phirse fetch and the process
    //     //goes on agar network tab mei dekhoge toh request continuously jaati ja rhi hai !!!!

    //     //HOW TO STOP THIS ???? Using UseEffect hook !!!!!!
    // })


    //chahte toh if(dataCountry.length===0) krke bhi fetch run kara sakte the tab bhi ek hi baar fetch request jaati then useEffect
    //ka kya kaam ??? agar hum UI mei ek aisa button render karaye jisko click krne se countries gayab ho jaye <button onclick="()=>setdataCountry([])">
    //isme click karte hi sab gayab ho jayega but if condition mei dataCountry.length===0 hai toh ye phirse run kr jayega and phirse countries show ho jayegi

    useEffect(()=>{
           
        fetch("https://restcountries.com/v3.1/all")
        .then((res)=>res.json())
        .then((country)=>{
            console.log(country)
            setDataCountry(country) 
        })

        // const intervalID= setInterval(()=>{
        //     console.log('Testing clean up function')
        // },[1000])

        // return ()=>{

        //     clearInterval(intevalID) //Clean up function hai ye jab koyi particular component unmount hota tab ye run krta hai
        //jaise for example interval chal rha toh jab unmount hoga toh usko band krna hoga toh clean up function mei uski memory clear kr diye

        // }

    },[] ) //useEffect tab use krte jab humko data chahiye hota mtlb koyi  aisi cheez karani hai jo ki page ke re-render hone pr dobara se execute na ho
    //[] ye agar laga doge toh useEffect ke andar ka content sirf first render pr run hoga phir dobara nhi hoga , agar [] hata doge toh har render pr run hoga
    //[] ye dependency array hai iske andar jo bhi pass karoge unke change hone pr useEffect phirse chalega



     console.log(dataCountry)

    // const Myarray = [
    //    <CountryCard/>,
    //    <CountryCard/>, /*Multiple elements ko render kaise karaoge ?? basically array ke andar component store kr lo (array of jsx/react component) react apne aap automatically render kr dega*/
    //    <CountryCard/> 
    // ]

    //console.log(Myarray) /*object ban jayega array ka element which is basically react element*/

    // const array = dataCountry.map(()=> <CountryCard/>) //map se dataCountry ke element pr iterate hoga and khuch return krke naya array ban jayega toh dataCountry mei jitne bhi number of data hai utne baar country card chahiye isiliye map is best kyuki poore dataCountry array mei loop ho jayega(For loop bhi use kr sakte ho !!!)
    // but saare card barbados ke aa rhe hume toh alag alag chahiye !! aisa isliye ho rha kyuki humne hard code kr diya hai sabkhuch isiliye dynamic banane ke liye data pass karenge through props

    const Myarray = dataCountry.filter((country)=> country.name.common.toLowerCase().includes(query)).map((country)=>{
        console.log(country);
        return <CountryCard 
        name={country.name.common} 
        capital={country.capital?.[0]} 
        image={country.flags.svg} 
        population={country.population.toLocaleString('en-IN')} 
        region={country.region}/>
    })

    if(!dataCountry.length) return <Shimmer/>

    return (

        <div className="countries-container">
         
          {/* {[
                <CountryCard/>,
                <CountryCard/>, //Aise bhi directly array pass kr sakte ya phir variable mei bhi store kr sakte hain
                <CountryCard/>
            ] } */} 
 
           {/* { Myarray} */}

           {Myarray}
    

        </div>
    )
}