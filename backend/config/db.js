const mongoose = require("mongoose");

const uri = "mongodb+srv://uditsuri2:suri1234@cluster0.bttcchu.mongodb.net/mernstack?retryWrites=true&w=majority&appName=Cluster0";

let dbURL = uri.replace("<username>", process.env.DB_USERNAME);
dbURL = dbURL.replace("<password>", process.env.DB_PASSWORD);
dbURL = dbURL.replace("<dbName>", process.env.DB_NAME);

mongoose.connect(dbURL).then(() => {
    console.log("-----------database connected-----------");
})
    .catch((err) => {
        console.log("-----------database not connected-----------");
        console.log(err);
    });