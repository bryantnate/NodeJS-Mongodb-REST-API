const Express = require("express");
const Mongoose = require("mongoose");
const BodyParser = require("body-parser");

var app = Express();
// Mongoose.connect("mongodb://localhost/testapi", true) 
Mongoose.connect("mongodb://localhost/api", (err) => {
  console.log(err)
})

const PersonModel = Mongoose.model("person", {
  firstname: String,
  lastname: String
});

app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: true }));

app.get("/people", async (req, res) => {
  try {
    var result = await PersonModel.find().exec();
    res.send(result)
  }
  catch (err) {
    res.status(500).send(err)
  }
});

app.get("/person/:id", async (req, res) => {
  try {
    var result = await PersonModel.findById(req.params.id).exec();
    res.send(person)
  } catch (err) {
    res.status(500).send(err)
  }
});

app.post("/person", async (req, res) => {
  try {
    var person = new PersonModel(req.body);
    var result = await person.save();
    res.send(result);
  }
  catch (err) {
    res.status(500).send(err)
  }
});

app.put("/person/:id", async (req, res) => {
  try {
    var person = await PersonModel.findById(req.param.id).exec();
    person.set(req.body);
    var result = await person.save();
    res.send(result);
  } catch (err) {
    res.status(500).res.send(err)
  }
});

app.delete("/person/:id", async (req, res) => {
  try {
    var result = await PersonModel.deleteOne({ _id: req.params.id }).exec();
    res.send(result);
  } catch (err) {
    res.status(500).send(err)
  }
});


app.listen(8081, () => {
  console.log("App listening at port 8081...");
})