const path = require("path");
const { Pool, Client } = require("pg");

const express = require("express");
const cors = require("cors")
const hbs = require("hbs");

var client = new Client({
  user: "postgres",
  host: "localhost",
  database: "test2",
  password: "Akshay@04",
  port: 5432,
});

client.connect((err) => {
  if (err) {
    console.error("connection error", err.stack);
  } else {
    console.log("connected");
    
  }
});

const app = express();

app.use(express.json());

app.use(
  cors({
    origin: "*",
    credentials: true,
  })
)

//Define path for Express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewPath = path.join(__dirname, "../templates/views");
app.use(express.static(publicDirectoryPath));

// Setup handlebars engine and view location
app.set("view engine", "hbs"); //set the view engine as hadlebars
app.set("views", viewPath);

app.get("", (req, res) => {
  res.render("welcome", {});
});

// Server and Management
app.listen(8000, () => {
  console.log("Server is up on port 8000");
});

// API for Users
app.get("/getAllUsers", (req, res) => {
  client.query(`select * from get_all_users()`, (err, result) => {
    if (!err) {
      res.send({
        usersData: result.rows,
      });
    } else {
      res.send({
        usersData: err.message,
      });
    }
  });
});

// API for Film related persons
app.get("/getallpersons", (request, response) => {
  var query = {
    text: "select * from get_all_persons_with_films()",
  };

  client.query(query, (err, res) => {
    if (err) {
      response.send({
        personData: err.message,
      });
    } else {
      response.send({
        personData: res.rows,
      });
    }
  });
});

app.post("/addNewPerson", (request, response) => {
  let addPersonQuery = {
    text: "select * from insert_person($1,$2,$3)",
    values: [request.body.name, request.body.dob, request.body.gender],
  };
  client.query(addPersonQuery, (err, result) => {
    if (err) {
      response.send({
        addedPersonData: err.message,
      });
    } else {
      response.send({
        addedPersonData: result.rows,
      });
    }
  });
});

app.get("/getPersonById", (request, response) => {
  let getPersonByIdQuery = {
    text: "select * from get_person_by_id($1)",
    values: [parseInt(request.query.id)],
  };

  client.query(getPersonByIdQuery, (err, res) => {
    if (err) {
      response.send({
        getPersonById: err.message,
      });
    } else {
      response.send({
        getPersonById: res.rows,
      });
    }
  });
});

app.post("/updatePersonDetails", (request, response) => {
  let updatePersonQuery = {
    text: "select * from update_person_details($1,$2,$3,$4)",
    values: [
      parseInt(request.body.id),
      request.body.name,
      request.body.dob,
      request.body.gend,
    ],
  };

  client.query(updatePersonQuery, (err, res) => {
    if (err) {
      response.send({
        updatePersonDetails: err.message,
      });
    } else {
      response.send({
        updatePersonDetails: res.rows,
      });
    }
  });
});

app.post("/deletePersonDetails", (request, response) => {
  let deleteQuery = {
      text: "call delete_person($1,$2)",
      values: [parseInt(request.body.id), request.body.name]
  };
  client.query(deleteQuery, (err, res) => {
    if (err) {
      response.send({
        deletedData: err.message,
      });
    } else {
      response.send({
        deletedData: res.rows,
      });
    }
  });
});

// API for Films
app.get("/getallfilms", (request, response) => {
  var query = {
    text: "select * from get_all_films()",
  };

  client.query(query, (err, res) => {
    if (err) {
      response.send({
        filmsData: err.message,
      });
    } else {
      response.send({
        filmsData: res.rows,
      });
    }
  });
});

app.get("/getFilmById", (request, response) => {
  let getFilmByIdQuery = {
    text: "select * from get_film_by_id($1)",
    values: [parseInt(request.query.id)],
  };

  client.query(getFilmByIdQuery, (err, res) => {
    if (err) {
      response.send({
        getFilmById: err.message,
      });
    } else {
      response.send({
        getFilmById: res.rows,
      });
    }
  });
});

app.post("/addNewFilm", (request, response) => {
  let addFilmQuery = {
    text: "select * from add_new_film($1,$2,$3,$4,$5,$6,$7)",
    values: [
      request.body.name,
      request.body.year,
      request.body.genre,
      request.body.age,
      request.body.country,
      request.body.personRelated,
      request.body.isMainFilm,
    ],
  };
  client.query(addFilmQuery, (err, result) => {
    if (err) {
      response.send({
        addedFilmData: err.message,
      });
    } else {
      response.send({
        addedFilmData: result.rows,
      });
    }
  });
});

app.post("/updateFilmDetails", (request, response) => {
  let updateFilmQuery = {
    text: "select * from update_film_details($1,$2,$3,$4,$5,$6,$7,$8)",
    values: [
      parseInt(request.body.id),
      request.body.name,
      request.body.year,
      request.body.genre,
      request.body.age,
      request.body.country,
      request.body.personRelated,
      request.body.isMainFilm,
    ],
  };
  client.query(updateFilmQuery, (err, result) => {
    if (err) {
      response.send({
        updatedFilmData: err.message,
      });
    } else {
      response.send({
        updatedFilmData: result.rows,
      });
    }
  });
});

app.get("/deleteFilmOnId", (request, response) => {
  let deleteFilmQuery = {
      text: "select * from delete_films($1)",
      values: [parseInt(request.query.id)]
  };
  console.log(deleteFilmQuery);
  client.query(deleteFilmQuery, (err, res) => {
    if (err) {
      response.send({
        deletedData: err.message,
      });
    } else {
      response.send({
        deletedData: res.rows,
      });
    }
  });
});

app.get("/getallsubfilmsbyId", (request, response) => {
  var query = {
    text: "select * from get_all_sub_films($1)",
    values: [parseInt(request.query.id)],
  };

  client.query(query, (err, res) => {
    if (err) {
      response.send({
        subFilmsData: err.message,
      });
    } else {
      response.send({
        subFilmsData: res.rows,
      });
    }
  });
});

app.get("/getSubFilmById", (request, response) => {
  let getSubFilmByIdQuery = {
    text: "select * from get_sub_film_by_id($1)",
    values: [parseInt(request.query.id)],
  };

  client.query(getSubFilmByIdQuery, (err, res) => {
    if (err) {
      response.send({
        getSubFilmById: err.message,
      });
    } else {
      response.send({
        getSubFilmById: res.rows,
      });
    }
  });
});

app.post("/addNewSubFilm", (request, response) => {
  let addFilmQuery = {
    text: "select * from add_new_sub_film($1,$2,$3,$4,$5,$6,$7)",
    values: [
      request.body.name,
      request.body.year,
      request.body.genre,
      request.body.age,
      request.body.country,
      request.body.personRelated,
      request.body.parentFilmId,
    ],
  };
  client.query(addFilmQuery, (err, result) => {
    if (err) {
      response.send({
        addedSubFilmData: err.message,
      });
    } else {
      response.send({
        addedSubFilmData: result.rows,
      });
    }
  });
});

app.post("/updateSubFilmDetails", (request, response) => {
  let addFilmQuery = {
    text: "select * from update_sub_film_details($1,$2,$3,$4,$5,$6,$7,$8)",
    values: [
      parseInt(request.body.id),
      request.body.name,
      request.body.year,
      request.body.genre,
      request.body.age,
      request.body.country,
      request.body.personRelated,
      request.body.parentFilmId,
    ],
  };
  client.query(addFilmQuery, (err, result) => {
    if (err) {
      response.send({
        updatedSubFilmData: err.message,
      });
    } else {
      response.send({
        updatedSubFilmData: result.rows,
      });
    }
  });
});

app.get("/deleteSubFilmOnId", (request, response) => {
  let deleteSubFilmQuery = {
      text: "select * from delete_sub_films($1)",
      values: [parseInt(request.query.id)]
  };
  client.query(deleteSubFilmQuery, (err, res) => {
    if (err) {
      response.send({
        deletedData: err.message,
      });
    } else {
      response.send({
        deletedData: res.rows,
      });
    }
  });
});

//API for ratings
app.get("/getAllRatedFilms", (request, response) => {
  let getAllRatedQuery = {
      text: "select * from get_all_ratings($1)",
      values: [parseInt(request.query.id)]
  };
  client.query(getAllRatedQuery, (err, res) => {
    if (err) {
      response.send({
        getAllRatedData: err.message,
      });
    } else {
      response.send({
        getAllRatedData: res.rows,
      });
    }
  });
});

app.post("/addFilmRating", (request, response) => {
  let addRatingQuery = {
    text: "select * from add_new_rating($1,$2,$3,$4,$5)",
    values: [
      parseInt(request.body.useriid),
      parseInt(request.body.filmmid),
      parseInt(request.body.subfilmmid),
      request.body.ratingvalues,
      request.body.ismainnfilm
    ],
  };
  client.query(addRatingQuery, (err, result) => {
    if (err) {
      response.send({
        addRatingData: err.message,
      });
    } else {
      response.send({
        addRatingData: result.rows,
      });
    }
  });
});

app.post("/updateFilmRating", (request, response) => {
  let updateRatingQuery = {
    text: "select * from update_rating($1,$2)",
    values: [
      parseInt(request.body.useriid),
      request.body.ratingvalues
    ],
  };
  client.query(updateRatingQuery, (err, result) => {
    if (err) {
      response.send({
        updateRatingData: err.message,
      });
    } else {
      response.send({
        updateRatingData: result.rows,
      });
    }
  });
});

app.get("/deleteRatingOfFilm", (request, response) => {
  let deleteQuery = {
      text: "select * from delete_ratings($1)",
      values: [parseInt(request.query.id)]
  };
  client.query(deleteQuery, (err, res) => {
    if (err) {
      response.send({
        deletedData: err.message,
      });
    } else {
      response.send({
        deletedData: res.rows,
      });
    }
  });
});

app.get("/getAllFilmsToBeRated", (request, response) => {
  let getAllFilmForRatingQuery = {
      text: "select * from get_all_films_for_rating($1)",
      values: [parseInt(request.query.id)]
  };
  client.query(getAllFilmForRatingQuery, (err, res) => {
    if (err) {
      response.send({
        getAllData: err.message,
      });
    } else {
      response.send({
        getAllData: res.rows,
      });
    }
  });
});

//API for user suggestions
app.get("/getSuggestedFilmList", (request, response) => {
  let getQuery = {
      text: "select * from get_suggested_films($1)",
      values: [parseInt(request.query.id)]
  };
  client.query(getQuery, (err, res) => {
    if (err) {
      response.send({
        getData: err.message,
      });
    } else {
      response.send({
        getData: res.rows,
      });
    }
  });
});