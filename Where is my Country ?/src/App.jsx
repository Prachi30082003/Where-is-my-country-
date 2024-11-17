import { useContext, useState } from "react"
import Header from "../components/header"
import './App.css'
import { Outlet } from "react-router-dom"
import {ThemeContext} from "../context/ThemeContext"
import ThemeContextProvider from "../context/ThemeContext"


function App() {

  console.log(ThemeContext)

 // const [Dark , setDark] = useState(JSON.parse(localStorage.getItem("isDarkValue")))
 // console.log(Dark + "local") // local storage mei agar khuch bhi set nhi kare ho toh getItem krne pr null milega
  
  return (
    <>

    <ThemeContextProvider>
 
    <Header/>
                  {/* ThemeContextProvider tag ke andar wrap kr diye toh Header aur 
                  Outlet children bann gya toh wo gayab ho jayenge UI se toh as 
                  prop paas karenge Children ko phir ThemeContextProvider mei access karenge
                  aur render karayenge */}
    <Outlet/>


    </ThemeContextProvider>

       
   {/* <ThemeContext.Provider value={[Dark,setDark]}> {/*value prop pass krna very important isme hi required cheezein pass krte hain !!!*/

    /* <Header Dark={Dark} setDark={setDark}/>

     <Outlet context={[Dark,setDark]}/> */ /* context naam hi use krna hai aur koyi naam use nhi kr sakte*/

        // <Header/>

        // <Outlet/>

   //  </ThemeContext.Provider> 

    }
     
     
    </>
  )
}

export default App
