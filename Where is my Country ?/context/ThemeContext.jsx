import { createContext, useState} from "react";

export const ThemeContext= createContext();


//jab cheezo ko pass krna rehta to various components and the within component bhi deeper
//level pr paas krna rehta to children then to its children maan lo 4th number ke nested child ko zarurat hai
//toh waha tak pohochaane ke liye parent se lekar uss 4th number ke child  tak pohochaane ke liye beech mei har child se 
//pass karana padega even though needed nhi hai !!!!! also agar same cheez bohot saare alag alag component ko chahiye toh phirse 
//unn saare components mei props paas krne padenge !!!! PROPS KA MANAGEMENT NHI HO PAYEGA 
// AND IT WILL BE HARD TO UNDERSTAND !!!!!! THIS IS CALLED PROPS DRILLING !!!!!

//  iske liye CONTEXT API use hota hai

//context create kr lete hain through createContext()....ThemeContext mei store kara liye hain 
//ab agar ThemeContext ko console.log karenge toh Provider naam ki cheez dikhegi 
//PROVIDER se hum values provide krte hain jiske bhi around wrap krte....
//phir jo bhi component wrapped hain Provider se usme wo values available hongi !!!
//useContext() se access kr sakte uss particular component mei values ko

//useContext ke andar provide krna padega ki kaunsa context use kr rhe jaise kayi saare 
//context ho sakte hain toh kis context ko use krna hai kis value ko use krna hai uske liye
//batana padega ki kaunsa context use kr rhe toh useContext(ThemeContext) krne se ThemeContext wala context use mei aa jayega

//Another way of doing which is efficient//

export default function ThemeContextProvider({children}){

    const [Dark, setDark] = useState(
        JSON.parse(localStorage.getItem('isDarkValue'))
      )

    return(

        <ThemeContext.Provider value= {[Dark , setDark]}>
            {children}
        </ThemeContext.Provider>
    )
}
