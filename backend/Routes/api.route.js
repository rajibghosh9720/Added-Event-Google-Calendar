const express=require("express")
const Router=express.Router()
const {google} =require("googleapis")
require("dotenv").config()

const GOOGLE_CLIENT_ID=process.env.GOOGLE_CLIENT_ID
const GOOGLE_CLIENT_SECRET=process.env.GOOGLE_CLIENT_SECRET
const REFRESH_TOKEN=process.env.REFRESH_TOKEN

const oauth2client=new google.auth.OAuth2(
    GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET,
    "http://localhost:3000"
)

Router.get("/",async(req,res,next)=>{
    res.send({message:'Ok api is working'})
})

Router.post("/create-tokens",async(req,res,next)=>{
    try {
        const {code}=req.body
        // res.send(code)
        // const response=await oauth2client.getToken(code)
        // res.send(response)
        const {tokens}=await oauth2client.getToken(code)
        res.send(tokens)
       
        
    } catch (error) {
        next(error)
    }
})

Router.post("/create-events",async(req,res,next)=>{
        try {
            const {summary, description, location, startDateTime, endDateTime}=req.body
            oauth2client.setCredentials({refresh_token:REFRESH_TOKEN})
            const calendar=google.calendar('v3')
            const response=await calendar.events.insert({
               auth: oauth2client,
               calendarId:'primary' ,
               requestBody: {
                summary:summary,
                description:description,
                location:location,
                colorId: 7,
                start:{
                    dateTime:new Date(startDateTime)
                },
                end:{
                    dateTime:new Date(endDateTime)
                },
               }
            })
            res.send(response)

        } catch (error) {
            next(error)
        }
    })

module.exports=Router;