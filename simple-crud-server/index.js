const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const port = process.env.PORT || 5000;
const app = express()

// middleWare
app.use(cors())
app.use(express.json())

// iamkhairul101
// n0xFcQgkGsKX8T2Z

const uri = "mongodb+srv://iamkhairul101:n0xFcQgkGsKX8T2Z@cluster0.eko35.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    const database = client.db("usersDB");
    const userCollection = database.collection("users");

    app.get('/users', async (req, res) => {
      const cursor = userCollection.find()
      const result = await cursor.toArray()
      res.send(result)
    })

    // for update
    app.get('/users/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) }
      const user = await userCollection.findOne(query)
      res.send(user)
    })

    app.post('/users', async (req, res) => {
      const user = req.body
      console.log("newUser ", user)
      const result = await userCollection.insertOne(user);
      res.send(result)
    })

    app.put('/users/:id', (req, res) => {
      const id = req.params.id;
      const updatedUser = req.body;
      console.log(updatedUser)
    })
    
    app.delete('/users/:id', async (req, res) => {
      const id = req.params.id
      console.log('deleted from server id no:', id)

      const query = { _id: new ObjectId(id) }
      const result = await userCollection.deleteOne(query)
      res.send(result)
    })

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.log);
// mongoDB end

app.get('/', (req, res) => {
  res.send('Simple crud is running')
})

app.listen(port, () => {
  console.log(`simple crud is runnig on port: ${port}`)
})