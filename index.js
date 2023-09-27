import express, { response } from "express";
import fetch from "node-fetch";
import dotenv from "dotenv";
import cors from "cors"

const app=express();
dotenv.config();

app.use(express.json({limit: "30mb",extended: true}))
app.use(express.urlencoded({limit:"30mb",extended:true}))
app.use(cors())

app.get('/',(req,res)=>{
      res.send("News API Running")
})

app.post('/news', async(req,res)=>{
      const { category, country,pageSize,page } = req.body;
      console.log( category,country,pageSize,page);
      const api_key = process.env.API_KEY;
      console.log(api_key)
      try {
          let url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${api_key}&page=${page}&PageSize=${pageSize}`;
          let data = await fetch(url);
          let parseData = await data.json();
          console.log(parseData)
          res.status(200).json(parseData);
        } catch (e) {
          console.log(e);
          res.status(404).json({ message: "Something went wrong" });
        }
})

const PORT = process.env.PORT || 4000

try{
      app.listen(PORT, ()=> console.log(`server running on ${PORT}`))
}
catch(e){
      console.log(e)
}