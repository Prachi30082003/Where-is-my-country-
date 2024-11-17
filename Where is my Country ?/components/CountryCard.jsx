import { Link } from "react-router-dom"
export default function CountryCard({name , capital , image , population , region}){

    return (

        <Link className="country-card" to={`/${name}`}>
      <img src={image} alt={name + ' Flag'} />
      <div className="card-text">
        <h3 className="card-title">{name}</h3>
        <p>
          <b>Population: </b>
          {population.toLocaleString('en-IN')}
        </p>
        <p>
          <b>Region: </b>{region}
        </p>
        <p>
          <b>Capital: </b>{capital}
        </p>
      </div>
    </Link>
    )
}