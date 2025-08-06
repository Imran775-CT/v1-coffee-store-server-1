const { ObjectId } = require("mongodb");
const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { MongoClient, ServerApiVersion } = require("mongodb");

const app = express();
const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@coffeestore.vf4l8z4.mongodb.net/?retryWrites=true&w=majority&appName=coffeeStore`;

console.log("Mongo URI from ENV:", uri); // Debugging purpose

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    await client.connect();

    const coffeesCollection = client.db("coffeeDB").collection("coffee");

    const userCollection = client.db("coffeeDB").collection("users");

    // 🔹 Get all coffees
    app.get("/coffees", async (req, res) => {
      const result = await coffeesCollection.find().toArray();
      res.send(result);
    });

    // 🔹 Get a single coffee by ID
    app.get("/coffees/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await coffeesCollection.findOne(query);
      res.send(result);
    });

    // 🔹 Add a new coffee
    app.post("/addCoffees", async (req, res) => {
      const newCoffee = req.body;
      console.log("New Coffee:", newCoffee);
      const result = await coffeesCollection.insertOne(newCoffee);
      res.send(result);
    });

    // 🔹 Update a coffee by ID
    app.put("/coffees/:id", async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      const options = { upsert: true };
      const updatedCoffee = req.body;

      const updatedDoc = {
        $set: {
          name: updatedCoffee.name,
          quantity: updatedCoffee.quantity,
          supplier: updatedCoffee.supplier,
          taste: updatedCoffee.taste,
          category: updatedCoffee.category,
          details: updatedCoffee.details,
          photo: updatedCoffee.photo,
        },
      };

      const result = await coffeesCollection.updateOne(
        filter,
        updatedDoc,
        options
      );
      res.send(result);
    });

    // 🔹 Delete a coffee by ID (fixed to `/coffees/:id`)
    app.delete("/coffees/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await coffeesCollection.deleteOne(query);
      res.send(result);
    });

    // Users related API's
    app.patch('/users', async(req, res) =>{
      const email = req.body.email;
      const filter = {email};
      const updatedDoc = {
        $set: {
          lastSignInTime : req.body?.lastSignInTime
        }
      }

      const result = await userCollection.updateOne(filter, updatedDoc)
      res.send(result)
    })

    app.delete('/users/:id', async(req, res) =>{
      const id = req.params.id;
      const query = {_id: new ObjectId(id)};
      const result = await userCollection.deleteOne(query)
      res.send(result)
    })

    app.get('/users', async(req, res) =>{
      const cursor = userCollection.find()
      const result = await cursor.toArray();
      res.send(result)
    })

    app.post("/users", async (req, res) => {
      const newUser = req.body;
      console.log("new user created", newUser);
      const result = await userCollection.insertOne(newUser);
      res.send(result);
    });

    // ✅ Connection ping test
    await client.db("admin").command({ ping: 1 });
    console.log(
      "✅ Pinged your deployment. Successfully connected to MongoDB!"
    );
  } finally {
    // await client.close(); // Disable for persistent server connection
  }
}
run().catch(console.dir);

// Root Route
app.get("/", (req, res) => {
  res.send("☕ Coffee making server is running!");
});

// Start server
app.listen(port, () => {
  console.log(`🚀 Server is running on port: ${port}`);
});
