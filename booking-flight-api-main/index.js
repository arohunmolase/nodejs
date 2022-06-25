const express = require("express");
const { json } = require("express");
const flights = require("./controllers/flightController");
const models = require("./models/Flight");
const routes = require("./routes/flightRoute");
const users = require("./users.json")
const app = express();
const fs = require('fs');

app.use(express.json());
app.use(express.urlencoded());

app.use("/", routes);

app.get('/users', (req, res) => {
    return res.json({users})
})

app.post('/users', (req, res) => {
  console.log(req.body.newUser);
  
  users.push(req.body.newUser);
  console.log({users});

  let stringedData = JSON.stringify(users, null, 2);
  fs.writeFile('users.json', stringedData, function (err) {
    if (err) {
      return res.status(500).json({message: err })
    }
  })

  return res.status(200).json({message: "new user created"})
})


app.get('/users/:id', (req, res) => {
 let id = req.params.id;
let foundUser = users.find(user => {
    return (user.id) === id;
  })
  if (foundUser) {
    return res.status(200).json({user: "Found flight"})
  } else {
    return res.status(400).json({message: "user not found"})
  }
  
})


const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});