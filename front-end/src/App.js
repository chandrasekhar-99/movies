import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home'
import MovieDetail from './components/MovieDetail';
import './App.css';

const  App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" exact Component={Home}/>
        <Route path="/movie/:id" exact Component={MovieDetail}/>
        
      </Routes>
    </Router>
  );
}

export default App;
