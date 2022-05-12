import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setSelectedUser } from "../Redux/actions/selectedUserAction";

function UserSelection() {
  const [items, setItems] = useState([]);
  // const [selectedValue, setSelectedValue] = useState(items[0]?.username);
  const [selectedValueId, setSelectedValueId] = useState(items[0]?.userid);
  const dispatch = useDispatch();

  useEffect(() => {
    fetchItems();
  }, []);

  useEffect(() => {}, [items]);

  const fetchItems = async () => {
    const data = await fetch("http://localhost:8000/getAllUsers");
    const dataItems = await data.json();
    setItems(dataItems.usersData);
  };

  const handleChange = (e) => {
    let data = e.target.value;
    setSelectedValueId(data); 
  };


  const onSubmitData = (e) => {
    e.preventDefault();
    dispatch(setSelectedUser(selectedValueId));
    // dispatch(setSelectedUserId(selectedValueId));
  };

  return (
    <main className="main">
      <section className="home section" id="home">
        <div className="container_home container grid">
          <h1> Welcmome to Movie Review Management System</h1>
          <h3>Select a user</h3>
          <form action="#">
            <label>Choose a User: </label>
            <select value={selectedValueId} onChange={handleChange}>
            <option value={"Select a user", ""} >
                  {"Select a user"}
                </option>
              {items?.map((item) => (
                <option value={item.username, item.userid} >
                  {item.username}
                </option>
              ))}
            </select>
            <br />
            <br />
            <button id="quoteSubmit" type="submit" onClick={onSubmitData}><link to="/home"></link>
              Submit
            </button>
          </form>
        </div>
      </section>

      <div></div>
    </main>
  );
}

export default UserSelection;
