import express from "express"
import  Book  from "../models/bookModel.js"

const router = express.Router()

router.post('/', async (req, res) => {
    try {

        if(!req.body.title || 
           !req.body.author ||
           !req.body.publishYear
        ) {
            return res.status(400).json("Send all required fields: title, author, publishYear")
        }

        const newBook = {
            title: req.body.title,
            author: req.body.author,
            publishYear: req.body.publishYear
        }

        const book = await Book.create(newBook)

        return res.status(200).send({
            "message" : "Book created successfully",
            "book" : book
        })

    } catch (error) {
        console.log(error.message)
        res.status(500).json(error.message)
    }
})

router.get('/', async (req, res) => {
    try {

         const bookList = await Book.find()
         
         if(!bookList) {
            return res.status(404).json("No books found!")
         }

         res.status(200).json(bookList);
    } catch (error) {
        res.status(500).json(error.message);
    }
})

router.get("/:id", async (req, res) => {

    try {
        
        const book_id = req.params.id

        const book = await Book.findById(book_id)

        if(!book) {
            return res.status(404).json(`No book found for the given id ${book_id}`)
        }

        res.status(200).send(book)

    } catch (error) {
        res.status(500).json(error.message)
    }
})

router.put("/:id", async (req, res) => {

    try {
      
        const book_id = req.params.id

        const book = await Book.findByIdAndUpdate(book_id, req.body)

        if(!book) {
            return res.status(404).json(`No book found for the given id ${book_id}`)
        }

        const updatedBook = await Book.findById(book_id)
        return res.status(200).send(updatedBook)
    } catch (error) {
        res.status(500).json(error.message)
    }
})

router.delete("/:id", async (req, res) => {

    try {

        const book_id = req.params.id

        const book = await Book.findByIdAndDelete(book_id, req.body)

        if(!book) {
            return res.status(404).json(`No book found for the given id ${book_id}`)
        }

        
        return res.status(200).json("Book deleted Successfully")

    } catch (error) {
        res.status(500).json(error.message)
    }
})

export default router