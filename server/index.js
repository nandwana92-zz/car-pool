const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router("db.json");
const bodyParser = require("body-parser");
const middlewares = jsonServer.defaults();
const dummyData = require("./db.json");

server.use(middlewares);
server.use(bodyParser.urlencoded());
server.use(bodyParser.json());

function getLocalityId(locality) {
  const localities = dummyData.localities;

  for (let localityId in localities) {
    if (
      localities.hasOwnProperty(localityId) &&
      localities[localityId] === locality
    ) {
      return localityId;
    }
  }

  return null;
}

function getAvailableCars(cars, from, to) {
  const availableCars = cars.filter(item => {
    const carRoute = item.checkpoints;
    const requestedPickDrop = [from, to];
    let fromIndex = 0;

    return (
      item.availableSeatCount > 0 &&
      requestedPickDrop.every(item => {
        let foundIndex = carRoute.indexOf(item, fromIndex);

        if (foundIndex > -1) {
          fromIndex = foundIndex + 1;

          return true;
        } else {
          return false;
        }
      })
    );
  });

  return availableCars;
}

function validateUser(username, password) {
  const users = dummyData.users;

  const userExists = users.find(item => {
    return (
      (item.emailId === username || item.mobileNumber === username) &&
      item.password === password
    );
  });

  return userExists;
}

server.use("/cars", (req, res) => {
  const fromLocalityId = getLocalityId(req.query.from);
  const toLocalityId = getLocalityId(req.query.to);

  const cars = dummyData.cars;
  const availableCars = getAvailableCars(cars, fromLocalityId, toLocalityId);
  res.send(availableCars);
});

server.use("/login", (req, res) => {
  const username = req.query.username;
  const password = req.query.password;
  const userExists = validateUser(username, password);
  if (userExists) {
    res.send("Success");
  } else {
    res.sendStatus(401);
  }
});

server.post("/register", (req, res) => {
  dummyData.users.push(req.body);
  res.send("Success");
});

server.use("/api", jsonServer.router("db.json"));

server.listen(8000, () => {
  console.log("JSON Server is running");
});
