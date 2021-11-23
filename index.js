const express = require("express");
const axios = require("axios");
const app = express();
const { auth } = require('express-openid-connect');
const { requiresAuth } = require('express-openid-connect');

app.get("/", function(req, res) {
  res.send("Root Hit");
});

const config = {
  authRequired: false,
  auth0Logout: true,
  secret: 'e90b5b9f680e4961b59c5b5ad02fc90f7034e01ec151a6bd9fe424d9e94484d9',
  baseURL: 'http://localhost:5000',
  clientID: 'hfwegNKvKd39F3WaartTnAKx1f4spJw1',
  issuerBaseURL: 'https://barneslardo.us.auth0.com'
};

// auth router attaches /login, /logout, and /callback routes to the baseURL
app.use(auth(config));

// req.isAuthenticated is provided from the auth router
app.get('/', (req, res) => {
  res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
});


// axios.get('https://skylardo.free.beeceptor.com')
//   .then(response => {
//     console.log(response.data);
//   })
//   .catch(error => {
//     console.log(error);
//   });

app.get("/call", function(req, res) {
  axios.get('https://skylardo.free.beeceptor.com')
    .then(response => {
      console.log(response.data);
      res.send(response.data);
    })
    .catch(error => {
      console.log(error);
    });
})

app.get('/profile', requiresAuth(), (req, res) => {
  res.send(JSON.stringify(req.oidc.user));
  axios.post('https://skylardo.free.beeceptor.com/peepeepoopoo');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT);
console.log("Server running on port " + PORT);
