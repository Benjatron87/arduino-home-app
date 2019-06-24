const express = require('express');
const app = express();
const authRoutes = require('./routing/authRoutes')
const path = require("path");

app.use(express.static("public"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

require("./routing/apiRoutes")(app);

app.use('/', authRoutes)

if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));
}

const PORT = process.env.PORT ||  4000;

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../client/public/index.html"));
  });

app.listen(PORT, function() {
    console.log("App listening on PORT: " + PORT);
})
