const { MongoClient, ServerApiVersion } = require("mongodb");
const { ObjectId } = require("mongodb");
const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 3000;

// middlewares
app.use(express.json());
app.use(cors());

const uri =
  "mongodb+srv://SwiftTasks:gNTThzR93qCjJJBO@cluster0.koweo.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();
    const usersCollection = client.db("SwiftTasks").collection("users");
    const tasksCollection = client.db("SwiftTasks").collection("tasks");

    // send user data to the database
    app.post("/users", async (req, res) => {
      const userEmail = req.body.email;
      const user = await usersCollection.findOne({ email: userEmail });
      if (user) {
        res.send("User already exists");
        return;
      }
      const userData = req.body;
      const result = await usersCollection.insertOne(userData);
      res.send(result);
    });

    // add user task
    app.post("/add-task", async (req, res) => {
      const taskData = req.body;
      const result = await tasksCollection.insertOne(taskData);
      res.send(result);
    });

    // get user tasks
    app.get("/tasks", async (req, res) => {
      const userEmail = req.query.email;
      const tasks = await tasksCollection
        .find({ email: userEmail })
        .sort({ order: 1 })
        .toArray();
      res.send(tasks);
    });

    app.put("/tasks/reorder", async (req, res) => {
      const { tasks } = req.body;

      const bulkOps = tasks.map((task) => ({
        updateOne: {
          filter: { _id: new ObjectId(task._id) },
          update: { $set: { order: task.order } },
        },
      }));

      await tasksCollection.bulkWrite(bulkOps);
    });

    app.put("/tasks/:id", async (req, res) => {
      const { id } = req.params;
      const { category } = req.body;

      try {
        // Update the task in MongoDB
        const updatedTask = await tasksCollection.updateOne(
          { _id: new ObjectId(id) },
          { $set: { category } }
        );

        // Check if any document was updated
        if (updatedTask.matchedCount === 0) {
          return res.status(404).send("Task not found");
        }

        res.send("Task updated successfully");
      } catch (error) {
        console.error("Error updating task:", error);
        res.status(500).send("Server error");
      }
    });

    // update a specific task
    app.put("/update-task/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };

      const updateDoc = {
        $set: {
          title: req.body.title,
          description: req.body.description,
        },
      };

      const result = await tasksCollection.updateOne(query, updateDoc);
      res.send(result);
    });

    // Send a ping to confirm a successful connection
    // await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("SwiftTasks is running!");
});

app.listen(port, () => {
  console.log(`SwiftTasks listening on PORT: ${port}`);
});
