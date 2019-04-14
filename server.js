const express = require('express');
const app = express();

app.use(express.static("public"));

const PORT = process.env.PORT ||  8080;

require("./routing/apiRoutes")(app);

app.listen(PORT, function() {
    console.log("App listening on PORT: " + PORT);
})

app.use(express.urlencoded({ extended: true }));
app.use(express.json());



