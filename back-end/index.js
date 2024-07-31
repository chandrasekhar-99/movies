const express = require('express')
const axios = require('axios')
const dotenv = require('dotenv')
const cors = require('cors')

dotenv.config()
const app = express()
app.use(cors())

const port = process.env.PORT || 8001
const URI = process.env.MOVIE_URL
const key = process.env.API_KEY
const URI_DETAIL = process.env.MOVIE_DETAIL

app.get('/' ,(req,res) => {
  res.send("chandu is hero")
})

app.get("/movies", async(req,res) => {
  try{
    const response = await axios.get(`${URI}?api_key=${key}`)
    res.json(response.data);

  }catch(error){
    res.status(500).json({ error: error.message });
  }

})

app.get("/movie/info/:id", async(req,res)=>{
  const movie_id= req.params.id
  try{
    const response = await axios.get(`${URI_DETAIL}/${movie_id}?api_key=${key}&language=en-US&append_to_response=credits`)
    res.json(response.data);

  }catch(error){
    res.status(500).json({ error: error.message });
  }

})


app.listen(port, () => {
  console.log("server is running on port")
})