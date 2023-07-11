const express=require("express")
const app=express()
const createError=require("http-errors")
const morgan=require("morgan")
const route=require("./Routes/api.route.js")

require("dotenv").config()

const cors=require("cors")

app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(morgan("dev"))

app.use(cors())

app.get('/', async(req,res,next)=>{
    res.send({message: "Awesome it works"});
})

app.use("/api",route)

app.use((req,res,next)=>{
    next(createError.NotFound())
})

app.use((err,req,res,next)=>{
    res.status(err.status||500)
    res.send({
        status:err.status || 500,
        message: err.message
    })
})

const PORT=process.env.PORT ||4000
app.listen(PORT,()=>{
    console.log(`Server Sucessfully run http://localhost:${PORT}`)
})
