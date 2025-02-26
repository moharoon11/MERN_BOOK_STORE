import express from "express"
import mongoose from "mongoose"
import { PORT, mongoDBURL } from "./config.js"
import bookRoute from "./routes/bookRoute.js"
import cors from "cors"


const app = express()
app.use(express.json())
app.use(cors())

app.use("/books", bookRoute)


mongoose.connect(mongoDBURL).then(() => {
   console.log("App connected to database")
   app.listen(PORT, () => {
    console.log(`App is listening to port ${PORT}`)
})
}).catch((error) => {
    console.log(error)
})