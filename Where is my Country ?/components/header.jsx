import { useContext } from "react"
import { ThemeContext } from "../context/ThemeContext"


export default function Header(){

    const [Dark,setDark] = useContext(ThemeContext)


    return (
        <header className={`header-container ${Dark? 'dark':''}`}>
            <div className="header-content">
                <h2 className="title">
                    <a href="">Where in the World ?</a>
                    </h2>
                <p className="theme-changer" onClick={()=>{

                    localStorage.setItem("isDarkValue" , !Dark)
                     setDark(!Dark)
                
                }
                    
                    }>
                <i className={`fa-regular fa-${ Dark ? 'sun':'moon'}`}/> {Dark ? 'Light' : 'Dark'} Mode  </p>
            </div>
        </header>
    )
}
