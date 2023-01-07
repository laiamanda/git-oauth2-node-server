const express = require("express");
const axios = require("axios");
const cors = require("cors");

require("dotenv").config();

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const GITHUB_URL = "https://github.com/login/oauth/access_token";

const app = express();
app.use(express.static(__dirname + "/public"));
app.use(cors({ credentials: true, origin: true}));

app.get("/oauth/redirect", (req, res) => {
  axios({
    method: "POST",
    url: `${GITHUB_URL}?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&code=${req.query.code}&redirect_uri=http://localhost:8080/oauth/redirect`,
    headers: {
      Accept: "application/json",
    },
  }).then((response) => {
    const accessToken = response.data.access_token;
    // res.redirect(
    //   `http://localhost:8080?access_token=${accessToken}`
    // );
    res.redirect(
      `/welcome.html?access_token=${accessToken}`
    );
  });
});

const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Listening at port ${PORT}`);
});