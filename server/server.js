import express from 'express'
import dotenv from 'dotenv/config'
import cors from 'cors'
import Auth from './routes/auth.js'
import Cracker from './routes/cracker.js'
import Admin from './routes/admin.js'
import Order from './routes/order.js'
import Giftbox from './routes/giftbox.js'
import ConnectDB from './config/db.js'




const app = express()
const port = process.env.PORT || 5000

// Middleware

app.use(express.json())
app.use(cors())


// Database connection
ConnectDB()

app.use("/api/", Auth);
app.use("/api/admin", Admin);
app.use("/api/crackers",Cracker);
app.use("/api/orders", Order);
app.use("/api/giftbox", Giftbox);



app.get('/', (req, res)=>{
    res.send("API is Working")
})

app.listen(port, ()=>console.log(`Server is Started ${port}`))