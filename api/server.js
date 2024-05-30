import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors'
import RecipeRoutes from './routes/RecipeRoutes.js'
import dotenv from 'dotenv';

import UserRoutes from './routes/UserRoutes.js'
dotenv.config()
const app = express();
const uri=process.env.MONGO_URI
const port=process.env.PORT || 4000
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  connectTimeoutMS: 10000
}
app.get('/', (req, res) => {
  res.send('Hello World!');
});
app.use(cors("*"))
app.use(express.json())
app.use(express.urlencoded({extended:false}))
mongoose.connect(uri, options).then(()=>{
  console.log("MonogoDB connected successfully")
  app.use("/api/recipes", RecipeRoutes)
  app.use("/api/user", UserRoutes)

  app.listen(port,()=>console.log(`Server listening on ${port}`))
}).catch(error =>{
  console.error("Error connecting to monogoDB"+error);
  process.exit(1)
})
app.use((req,res,next)=>{
  console.log(req.path, req.method)
  next()
})