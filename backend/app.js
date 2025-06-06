const express = require("express");
const app = express();

const cors = require('cors');


require("dotenv").config();
require("./connections/conn");

const user = require('./routes/user');
const Books = require('./routes/book');
const Favourite = require('./routes/favourite');
const Cart = require('./routes/cart');
const Order = require('./routes/order');
const book = require("./models/book");


app.use(cors());

app.use(cors({
  origin: 'https://ecombookstore.vercel.app/' // Your Vercel frontend URL
}));

const allowedOrigins = [
  'https://ecombookstore.vercel.app',
  'http://localhost:5173' // For local development
];

app.use(cors({
  origin: function(origin, callback) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
}));

app.use(express.json());

app.use("/api/v1", user);
app.use("/api/v1", Books);
app.use("/api/v1", Favourite);
app.use("/api/v1", Cart);
app.use("/api/v1", Order);

app.get("/allbooks",async(req,res)=>{
    const books = await book.find();
    res.send(books)
})

app.get('/', (req, res) =>{
    res.send("Hello from backend");
});

//creating port
app.listen(process.env.PORT, ()=>{
    console.log(`Server started on port ${process.env.PORT}`);
})
