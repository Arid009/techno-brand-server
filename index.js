const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const express = require('express');
const cors = require('cors');
const app = express()
const port = process.env.PORT || 5000;

app.use(cors())
app.use(express.json())

// ariddasgupta
// SAgxIW1n0fzx5d6d

const uri = "mongodb+srv://ariddasgupta:SAgxIW1n0fzx5d6d@cluster0.rcyjf.mongodb.net/?retryWrites=true&w=majority";

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

    const productsCollection = client.db("productsDB").collection('addedproducts')
    const googleCollection = client.db("productsDB").collection('Googleproducts')
    const appleCollection = client.db("productsDB").collection('Appleproducts')
    const samsungCollection = client.db("productsDB").collection('Samsungproducts')
    const sonyCollection = client.db("productsDB").collection('Sonyproducts')
    const intelCollection = client.db("productsDB").collection('Intelproducts')
    const microsoftCollection = client.db("productsDB").collection('Microsoftproducts')
    const myCartCollection = client.db("productsDB").collection('MyCart')

    app.post('/addedproducts', async (req, res) => {
      const product = req.body
      console.log(product);
      const request = await productsCollection.insertOne(product)
      res.send(request)
    })

    app.post('/mycart',async(req,res)=> {
      const product = req.body;
      const result = await myCartCollection.insertOne(product)
      res.send(result)
    })

    app.get('/mycart',async(req,res)=>{
      const result = await myCartCollection.find().toArray()
      res.send(result)
    })

    app.get('/brand/:brand', async (req, res) => {
      const brand = req.params.brand
      console.log(brand);

      if (brand == 'Google') {
        const result = await googleCollection.find().toArray()
        res.send(result)
      }
      else if (brand == 'Intel') {
        const result = await intelCollection.find().toArray()
        res.send(result)
      }
      else if (brand == 'Apple') {
        const result = await appleCollection.find().toArray()
        res.send(result)
      }
      else if (brand == 'Samsung') {
        const result = await samsungCollection.find().toArray()
        res.send(result)
      }
      else if (brand == 'Microsoft') {
        const result = await microsoftCollection.find().toArray()
        res.send(result)
      }
      else if (brand == 'Sony') {
        const result = await sonyCollection.find().toArray()
        res.send(result)
      }
    })

    app.get('/updateproducts/:id', async (req, res) => {
      const id = req.params.id
      const query = {
        _id: new ObjectId(id)
      }
      const intelResult = await intelCollection.findOne(query)
      const appleResult = await appleCollection.findOne(query)
      const googleResult = await googleCollection.findOne(query)
      const sonyResult = await sonyCollection.findOne(query)
      const microsoftResult = await microsoftCollection.findOne(query)
      const samsungResult = await samsungCollection.findOne(query)
      if (intelResult) {
        res.send(intelResult)
      }
      else if (appleResult) {
        res.send(appleResult)
      }
      else if (googleResult) {
        res.send(googleResult)
      }
      else if (sonyResult) {
        res.send(sonyResult)
      }
      else if (microsoftResult) {
        res.send(microsoftResult)
      }
      else if (samsungResult) {
        res.send(samsungResult)
      }

    })

    app.put('/updateproducts/:id', async (req, res) => {
      const id = req.params.id
      const data = req.body
      const filter = { _id: new ObjectId(id) }

      const options = { upsert: true }

      const updatedUser = {
        $set: {
          name: data.name,
          image: data.image,
          brand: data.brand,
          type: data.type,
          price: data.price,
          ratingValue: data.ratingValue,
        }
      }
      
      if (data.brand == 'intel') {
        const result = await intelCollection.updateOne(filter,updatedUser,options)
        res.send(result)
      }
      else if (data.brand == 'apple') {
        const result = await appleCollection.updateOne(filter,updatedUser,options)
        res.send(result)
      }
      else if (data.brand == 'google') {
        const result = await googleCollection.updateOne(filter,updatedUser,options)
        res.send(result)
      }
      else if (data.brand == 'sony') {
        const result = await sonyCollection.updateOne(filter,updatedUser,options)
        res.send(result)
      }
      else if (data.brand == 'microsoft') {
        const result = await microsoftCollection.updateOne(filter,updatedUser,options)
        res.send(result)
      }
      else if (data.brand == 'samsung') {
        const result = await samsungCollection.updateOne(filter,updatedUser,options)
        res.send(result)
      }

    })

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);


app.listen(port, () => {
  console.log(`Techno Website is running on : ${port}`);
})
