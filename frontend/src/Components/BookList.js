import React, { useEffect, useState } from 'react';
import axios from '../axiosconfig.js';
import styled from 'styled-components';


const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
`

const Form = styled.form`
   display: flex;
   flex-direction: column;
   gap: 10px;
   margin-bottom: 20px;
`

const Input = styled.input`
    padding: 10px;
    width: 100%;
    border: 1px solid #ddd;
    border-radius: 5px;
`

const Button = styled.button`
   background-color: #4caf50;
   color: white;
   border: none;
   padding: 10px 15px;
   border-radius: 5px;
   cursor: pointer;

   &:hover {
    background-color: #45a049;
   }
`

const DeleteButton = styled(Button)`
   background-color: #e53935;

   &:hover {
     background-color: #d32f2f;
   }
`

const BookContainer = styled.div`
     display: flex;
     flex-wrap: wrap;
     gap: 15px;
`

const BookCard = styled.div`
    background-color: #f1f1f1;
    padding: 15px;
    border-radius: 8px;
    width: calc(50% -10px);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

    h3 {
      margin: 0 0 8px 0;
    }

    p {
      margin: 4px 0;
    }

    `

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [form, setForm] = useState({ title: '', author: '', publishYear: '' });
  const [editId, setEditId] = useState(null);


  const fetchBooks = async () => {
      
    try {
        const response = await axios.get('/books')
        setBooks(response.data)
    } catch (error) {
       console.error("Error fetching books", error.message)
    }
  }


  useEffect(() => {
      console.log("inside use effects")
      fetchBooks()
  }, [])


  const handleSubmit = async (e) => {
     e.preventDefault()

     try {

      if(editId) {
        await axios.put(`/books/${editId}`, form)
      } else {
        await axios.post('/books', form)
      }

      setForm({title: '', author: '', publishYear: ''})
      setEditId(null)
      fetchBooks()
     } catch (error) {
      console.error("Error submitting form:", error.message)
     }
  }

  const handleEdit = (book) => {
    setForm(book)
    setEditId(book._id)
  }

  const handleDelete = async (id) => {

    try {
       await axios.delete(`/books/${id}`)
       fetchBooks()
    } catch (error) {
      console.error("Error deleting book:", error.message)
    }
  }
  
  const handleChange = (e) => {
    const { name, value} = e.target
    setForm({...form, [name] : value})
  }

  return (
       <Container>
         <h1>📚 Book Management</h1>

         <Form onSubmit={handleSubmit}>

          <Input 
             type="text"
             name="title"
             placeholder="Title"
             value={form.title}
             onChange={handleChange}
             required
            />

            <Input 
              type="text"
              name="author"
              placeholder="Author"
              value={form.author}
              onChange={handleChange}
              required
             />

             <Input
               type="number"
               name="publishYear"
               placeholder="Publish Year"
               value={form.publishYear}
               onChange={handleChange}
               required
             />

             <Button type="submit">
               {editId ? 'Update' : "Add"} Book
             </Button>
         </Form>

         <BookContainer>
          {
            books.map((book) => (
                <BookCard key={book._id}>
                  <h3>{book.title}</h3>
                  <p>Author: {book.author}</p>
                  <p>Published: {book.publishYear}</p>
                  <Button onClick={() => {handleEdit(book)}}>Edit</Button>
                  <DeleteButton onClick={() => {handleDelete(book._id)}}>Delete</DeleteButton>
                </BookCard>
            ))
          }
         </BookContainer>
       </Container>
  );
};

export default BookList;

