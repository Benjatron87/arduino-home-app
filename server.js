const express = require('express');
const app = express();

app.use(express.static("public"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

require("./routing/apiRoutes")(app);

const PORT = process.env.PORT ||  4000;

app.listen(PORT, function() {
    console.log("App listening on PORT: " + PORT);
})
