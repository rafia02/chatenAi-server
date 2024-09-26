
const express = require('express')
var cors = require('cors')
var app = express()
const port = 5000

app.use(cors())
app.use(express.json())



const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');


async function run() {
    try {
        const uri = "mongodb+srv://rafia:Ym2WLtiVKtuJb3Mz@cluster0.uidcysm.mongodb.net/?retryWrites=true&w=majority";
        const client = new MongoClient(uri, {
            serverApi: {
                version: ServerApiVersion.v1,
                strict: true,
                deprecationErrors: true,
            }
        });


        const datasCollection = client.db("ChatenAi").collection("Datas")
        const subjectCollection = client.db("ChatenAi").collection("subject")


        // app.delete("/reserve/:id", async(req, res)=>{
        //     const id = req.params.id 
        //     const filter = {_id: new ObjectId(id)}
        //     const result = await reserveCollection.deleteOne(filter)
        //     res.send(result)
        // })

        app.post("/datas", async(req, res)=>{
            const data = req.body 
            const result = await datasCollection.insertOne(data)
            res.send(result)
        })
        app.post("/sub", async(req, res)=>{
            const data = req.body 
            const result = await subjectCollection.insertOne(data)
            res.send(result)
        })

        app.get("/datas", async(req, res)=>{
           const {email, sub} = req.query


            console.log(email, sub)
            const filter = {
                email: email,
                main: sub
            }

            const result = await datasCollection.find(filter).toArray()
            res.send(result)
        })

        
        app.get("/sub", async(req, res)=>{
            const email = req.query.email
            // console.log(email)

            const filter = { email: email }
            const result = await subjectCollection.find(filter).toArray()
            res.send(result)
        })


       





    } finally {


    }
}
run().catch(console.dir);


app.get('/', (req, res) => {
    res.send('Hello World!')
})



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})