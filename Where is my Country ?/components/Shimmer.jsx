export default function Shimmer(){

    // const [array,useArray] = useState([])

    // for(let i=1;i<=10;i++){
         
    //     useArray((prevState)=> ([...prevState,<div className="shimmer"></div>]))

    // }

// 
   const mapped = Array.from({length:100}).map((ele)=> {
   return <div className="country-card shimmer"></div>
})
    
//    console.log(mapped + 'shimmer')

    return ( 

        <div className="countries-container">
             {mapped}
        </div>
       

    )
}

// import React from 'react'

// // import './CountriesListShimmer.css'

// export default function CountriesListShimmer() {
//   // new Array(10).fill('')

//   return (
//     <div className="countries-container">
//       {Array.from({ length: 10 }).map((el, i) => {
//         return <div key={i} className="country-card shimmer-card"></div>
//       })}
//     </div>
//   )
// }

