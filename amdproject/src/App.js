import './App.css';
import UserSelection from './UserSelection/UserSelection';
import { BrowserRouter as Router, Routes , Route} from "react-router-dom";
import Navbar from './Navbar/Navbar';
import Person from "./Person";
import Films from "./Films";
import Home from "./Home";
import FilmRatings from "./FilmRatings";
import Addperson from './Addperson';
import EditPerson from './EditPerson';
import Addfilm from './Addfilm';
import Editfilm from './EditFilm';
import AddSub from './AddSub';
import ChooseFilm from './ChooseFilm';
import AddRating from './AddRating';
import EditRating from './EditRating'
import SubFilms from './SubFilms';
import EditSub from './EditSub';
const pool = require("./db");

function App() {
  return (
    <Router>
    <div className="App">
     <Navbar />
     <Routes>
      <Route path="/" exact element={<UserSelection />}/>
      <Route path="/home" element={<Home />}/>
      <Route path="/person" element={<Person />}/>
      <Route path="/films" exact element={<Films />}/>
      <Route path="/film-ratings" element={<FilmRatings />}/>
      <Route path="/user-selection" element={<UserSelection />}/>
      <Route path="/add-person" element={<Addperson />}/>
      <Route path="/edit-person" element={<EditPerson />}/>
      <Route path="/add-film" element={<Addfilm />}/>
      <Route path="/edit-film" element={<Editfilm />}/>
      <Route path="/add-sub" element={<AddSub />}/>
      <Route path="/choose-film" element={<ChooseFilm />}/>
      <Route path="/add-rating" element={<AddRating />}/>
      <Route path="/edit-rating" element={<EditRating />}/>
      <Route path="/sub-films" element={<SubFilms />}/>
      <Route path="/edit-sub" element={<EditSub/>}/>
    </Routes>
      </div>
    </Router>
  );
}

export default App;
