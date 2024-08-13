const router = require("express").Router();
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const Book = require("../models/book");
const {authenticateToken} = require("./userAuth");

//add book --admin
router.post('/add-book', authenticateToken, async (req, res)=>{
    try {
        const {id} = req.headers;
        const user =await User.findById(id);
        if(user.role !== "admin"){
            return res.status(400).json({message:"You don't have superPower to perform Admin's task"});
        }
        

        const book = new Book({
            url: req.body.url,
            title: req.body.title,
            author: req.body.author,
            price: req.body.price,
            desc: req.body.desc,
            language: req.body.language,
        });
        await book.save();

        return res.status(200).json({message: "Book added successfully"});
    } catch (error) {
        return res.status(500).json({message: "Internal server error"});
    }
})

//Update book --admin

router.put('/update-book', authenticateToken, async (req, res)=>{
    try {
        const {bookid}= req.headers;
        await Book.findByIdAndUpdate(bookid, {
            url: req.body.url,
            title: req.body.title,
            author: req.body.author,
            price: req.body.price,
            desc: req.body.desc,
            language: req.body.language,
        });

        return res.status(200).json({message: "Book updated successfully"});

    } catch (error) {
        return res.status(500).json({message: "Internal server error"});
    }
})

//delete boo --admin
router.delete('/delete-book', authenticateToken, async (req, res)=>{
    try {
        const {bookid}= req.headers;
        await Book.findByIdAndDelete(bookid);    
        return res.status(200).json({message: "Book deleted successfully"});
    } catch (error) {
        return res.status(500).json({message: "Internal server error"});
    }
});


//get all books
router.get('/getallbook', authenticateToken, async (req, res) => {
    try {
        const books = await Book.find({});
        res.status(200).send(books);  // Added status code for successful response
        console.log("Books retrieved successfully");
    } catch (error) {
        console.error("Error retrieving books:", error);  // More detailed logging
        res.status(500).json({ message: "An error occurred while retrieving books" });
    }
});


//get recent added book
router.get('/get-recent-books', async(req, res)=>{
    try {
        const books = await Book.find().sort({createdAt: -1}).limit(4);
        return res.json({
            status: "success",
            data: books,
        });

    } catch (error) {
        return res.status(500).json({message: "Internal server error"});
    }
})


//get single book details

router.get('/get-book-by-id/:id', async(req, res)=>{
    try {
        const {id} =req.params;
        const book = await Book.findById(id);
        return res.json({
            status: "success",
            data: book,
        });
    } catch (error) {
        return res.status(500).json({message:"Internal server error"});
    }
})

module.exports = router;