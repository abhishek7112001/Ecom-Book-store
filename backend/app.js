const express = require("express");
const app = express();
app.use(express.json());
require("dotenv").config();
require("./connections/conn");

const user = require('./routes/user');
const Books = require('./routes/book');


app.use("/api/v1", user);
app.use("/api/v1", Books);



// app.get('/', (req, res) =>{
//     res.send("Hello from backend");
// });

//creating port
app.listen(process.env.PORT, ()=>{
    console.log(`Server started on port ${process.env.PORT}`);
})
