import React,{useState, useEffect} from 'react'
import MoviesList from '../MoviesList'
import './index.css'

const Home = () => {
  const [moviesData,setMoviesData] = useState([])
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  


  useEffect(() => {

    const apiUrl = `http://localhost:8000/movies`

    const fetchData = async () => {
      try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setMoviesData(data.results);
      
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

  const renderMovies = () => {
    return(
      <ul className='home-movies'>
        {moviesData.map(each => (
          <MoviesList key = {each.id} moviesData={each}/>
        ))}
      </ul>
    )
  }

  


  return(
    <div className='main-container'>
      <h1 className='page-title'>MOVIES LIST</h1>
      <div className='home-container'>{renderMovies()}</div>
    </div>
  )

}

export default Home
