import {Link} from 'react-router-dom'
import './index.css'

const MoviesList = (props) => {
  const {moviesData} = props
  const {id,original_title,poster_path,release_date} = moviesData


  return(
    <li className='movies-list-container'>
      <Link className='link-item' key={id} to={`movie/${id}`}>
        <img  alt={original_title} src={`https://image.tmdb.org/t/p/w200/${poster_path}`}/>
        <h2 className='title-name'>{original_title}</h2>
        <p className='date-style'>{release_date}</p>
      </Link>
    </li>

  )
}

export default MoviesList