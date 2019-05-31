const express = require('express');
const app = express();
const authRoutes = require('./routing/authRoutes')

app.use(express.static("public"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

require("./routing/apiRoutes")(app);

app.use('/', authRoutes)

const PORT = process.env.PORT ||  4000;

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../client/public/index.html"));
  });

app.listen(PORT, function() {
    console.log("App listening on PORT: " + PORT);
})
