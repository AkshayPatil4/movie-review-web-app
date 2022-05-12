import React, { useEffect, useState } from "react";
import {useSelector} from "react-redux";


function EditRating() {
    const [film,setFilm] = useState('');
    const [userid,setUserid] = useState('');
    const [ratingid,setRatingid] = useState('');
    const [rating,setRating] = useState('');
    const [main,setMain] = useState(true);
  const [isPending, setIsPending] = useState(false);
  const selectUserId = useSelector((state) => state.selectedUserId);  

  const handleSubmit = async (e) => {
    e.preventDefault();
    const a = film.split(',');
    const data ={ 
        
        useriid: a[1],
	   // filmmid : film,
                                 //NOTE : donot send null inside ""
        ratingvalues : rating,
        
    };
    console.log(a);
    setIsPending(true);

  const response = await fetch("http://localhost:8000/updateFilmRating",{
       method: 'POST',
       headers: {"Content-Type": "application/json"},
       mode: 'cors',
       cache: 'no-cache',
       credentials: 'same-origin',
       body: JSON.stringify(data)
       
   });
//    .then(() =>{
//        console.log(data);
//        setIsPending(false);
//        //history.go(-1);
//    }
//    )
   console.log(response.json());
   setIsPending(false);
}

    const [itemss, setItemss] = useState([]);

    useEffect(() => {
        fetchItemss();
      }, []);
   
      useEffect(() => {}, [itemss]);
   
      const fetchItemss = async () => {
        const dataf = await fetch(`http://localhost:8000/getAllRatedFilms?id=${selectUserId}`);
      const datafItemss = await dataf.json();
        setItemss(datafItemss.getAllRatedData);
      };
    

    return (
        <div>
                <div>
                    <h1>Film ratings</h1>
                </div>
                <div>
                    <h3> Add ratings</h3>
                    <form onSubmit={ handleSubmit}>
                        <label>Select Film</label>
                    <select value={film} onChange={(e) => setFilm(e.target.value)}>
              {itemss?.map((item) => (
                <option value={[item.filmname,item.ratingid]} >
                  {item.filmname}
                </option>
              ))}
            </select><br></br>
            <label>Selct Ratings</label>
            <select value={rating} onChange={(e) => setRating(e.target.value)}>
                <option value="Bad">Bad</option>
                <option value="Good">Good</option>
                <option Value="Best">Best</option>
            </select><br></br>

            {!isPending && <button>Submit</button>}
          {isPending && <button disabled>Loading</button>}
                        </form>

                </div>
                <hr></hr>

               

            </div>
    )
}

export default EditRating;