export default function Search({Setquery}){

    return (
        <div className="search-filter-container">
            <div className="search-container">
            <i className="fa-solid fa-magnifying-glass"/>
                <input onChange={(e)=> Setquery(e.target.value.toLowerCase())} type="text"  placeholder="Search for a country"/>
            </div>

            <select className="filter-by-region">
          <option hidden>Filter by Region</option>
          <option value="Africa">Africa</option>
          <option value="America">America</option>
          <option value="Asia">Asia</option>
          <option value="Europe">Europe</option>
          <option value="Oceania">Oceania</option>
        </select>
        
        </div>
    )
}