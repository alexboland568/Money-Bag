const express = require("express");
const app = express();
var cors = require("cors");
const bodyParser = require("body-parser");

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://skepticalpython:Katnips6571@moneybag.a9kcosz.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

client.connect(err => {
  
  
    console.log("Connected to database");

  
});

app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
console.log("Listening on port 3001");
app.listen(3001);

const router = express.Router();

app.post("/emailValidation", (req, res) => {

    client.connect(err=> {

        const collection = client.db("moneybag").collection("users");

        collection.find({}, {projection: {email: 1}}).toArray(function(err, res2) {

            if (err) throw err; 

            var success = true;
            
            for (var i = 0;i < res2.length;i++) {

                if (res2[i]["email"] == req.body["email"]) {

                    success = false;
                    res.send({success: false});
                    break;

                }

            }

            if (success)
                res.send({success: true});

        })
        

    })

})

app.post("/signup", (req, res) => {

    client.connect(err=> {

        const collection = client.db("moneybag").collection("users");

        collection.insertOne(req.body, function(err, res2) {

            console.log("Inserted documents");
            res.send("Signed up!");

        })

    })

    console.log(req.body);

})

app.post("/login", (req, res) => {

    client.connect(err => {

        const collection = client.db("moneybag").collection("users");

        var success = false;

        collection.find({}, {projection: {"email": 1, "password": 1}}).toArray(function(err, res2) {

            if (err) throw err; 

            for (var i = 0;i < res2.length;i++) {

                if (res2[i]["email"] == req.body["email"] && res2[i]["password"] == req.body["password"]) {

                    success = true; 
                    res.send({success: true});
                    break; 

                }

            }

            if (!success) {
                res.send({success: false});
    
            }

        })

        

    })

})

client.close();