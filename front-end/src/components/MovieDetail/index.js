import React,{useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'

import './index.css'

const MovieDetail = () => {
  const {id} = useParams();
  const [cast,setCast] = useState([])
  const [genres, setGenres] = useState([])
  const [movieName, setMovieName] = useState([])
  const [backImage, setBackImage] = useState([])
  const [desc, setDesc] = useState([])
  const [direct, setDirect] = useState([])
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  


  useEffect(() => {

    const apiUrl = `http://localhost:8000/movie/info/${id}`

    const fetchData = async () => {
      try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setDirect(data.credits.crew)
        setDesc(data.overview)
        setBackImage(data.poster_path)
        setMovieName(data.original_title)
        setGenres(data.genres)
        setCast(data.credits.cast);
        
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, );

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  

  

  const renderCastDetails = () => {
    return(
      
      
      <ul className='home-movies'>
        {cast.map(each => (
          <div className='cast-data'>
            {each.profile_path !== null ? (<img className='true-cast-profile' alt={each.name} src={`https://image.tmdb.org/t/p/w200/${each.profile_path}`}/>):(<img className='false-cast-profile' alt={each.name} src="https://img.freepik.com/premium-vector/default-avatar-profile-icon-social-media-user-image-gray-avatar-icon-blank-profile-silhouette-vector-illustration_561158-3383.jpg"/>)}
            <p className='font-color'>{each.name}</p>
            <p className='font-color'>{each.character}</p>
          </div>
        ))}
      </ul>

     
      
    )
  }

  const renderGenre = () => {
    return(
      <ul className='genre-cont'>
        {genres.map(each => (
          <div className='genre-data'>
            <p className='font-color-1'>{each.name},</p>
          </div>
        ))}
      </ul>
    )
  }

  

    const filterDirector = direct.filter((direct) =>{
      return direct.job === "Director"
    } )


  


  return(
    <div className='main-container'>
      <h1 className='page-title'>MOVIES DETAILS</h1>
      <div className='movie-detail-container'>
        <img alt={movieName} src={`https://image.tmdb.org/t/p/w400/${backImage}`}/>
        <div className='movie-detail-cont'>
          <h2 className='font-color-1'>{movieName}</h2>
          <div className='genre-cont'>{renderGenre()}</div>
          
          <h2 className='font-color-1'>Over View</h2>
          <p className='font-color-2'>{desc}</p>
          <h2 className='font-color-1'>Director </h2>
          <p className='font-color-2'>{filterDirector[0].name}</p>
        </div>
      </div>
      <div className='cast-cont'>
        <h3 className='font-color-4'>Full cast & crew</h3>
        <div >{renderCastDetails()}</div>
      </div>
    </div>
  )

}

export default MovieDetail
