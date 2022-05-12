import React, { useEffect, useState } from "react";
import { setSelectedUser } from "./Redux/actions/selectedUserAction";
import {useSelector} from "react-redux"; 

function AddRating() {
    const [film,setFilm] = useState('');
    const [userid,setFilmId] = useState('');
    const [subf,setSubf] = useState(null);
    const [rating,setRating] = useState('');
    const [main,setMain] = useState(true);
  const [isPending, setIsPending] = useState(false);
  const selectUserId = useSelector((state) => state.selectedUserId);  

  const handleSubmit = async (e) => {
    e.preventDefault();
    const a = film.split(',');
    const data ={ 
        useriid: selectUserId,
	      filmmid : ((a[1]=='true') ? a[0] : null),
      subfilmmid : ((a[1]=='true') ? null : a[0]) ,                         //NOTE : donot send null inside ""
        ratingvalues : rating,
        ismainnfilm : a[1],
    };
    console.log(data);
    setIsPending(true);

  const response = await fetch(`http://localhost:8000/addFilmRating`,{
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

    const [items, setItems] = useState([]);

    useEffect(() => {
        fetchItems();
      }, []);
   
      useEffect(() => {}, [items]);
   
      const fetchItems = async () => {
        const dataf = await fetch(`http://localhost:8000/getAllFilmsToBeRated?id=${selectUserId}`);
        const datafItems = await dataf.json();
        setItems(datafItems.getAllData);
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
                        <select value={film} onChange={(e) => setFilm(e.target.value)}><br></br>
              {items?.map((item) => (
                <option value={[item.filmid, item.mainfilm]}>
                  {item.filmname}
                </option>
              ))}
            </select><br></br>
            <label>Selct Ratings</label>
            <select value={rating} onChange={(e) => setRating(e.target.value)}>
                <option>Bad</option>
                <option>Good</option>
                <option>Best</option>
            </select><br></br>

            {!isPending && <button>Submit</button>}
          {isPending && <button disabled>Loading</button>}
                        </form>

                </div>
                <hr></hr>

               

            </div>
    )
}

export default AddRating;