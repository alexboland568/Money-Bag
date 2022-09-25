const express = require("express");
const app = express();
var cors = require("cors");
const bcrypt = require('bcrypt');
const bodyParser = require("body-parser");
const mongo = require("mongodb").MongoClient;

const uri = "mongodb+srv://skepticalpython:Katnips6571@moneybag.a9kcosz.mongodb.net/?retryWrites=true&w=majority";
mongo.connect(uri, function(err) {

    if (err) throw err; 
    console.log("Connected to database!");

})


app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
console.log("Listening on port 3001");
app.listen(3001);

const validatePassword = async(password, hashedPass) => {

    return await bcrypt.compare(password, hashedPass); 

}

const hashPassword = async (password, saltRounds = 10) => {

    try {

        const salt = await bcrypt.genSalt(saltRounds);

        return await bcrypt.hash(password, salt);

    } catch(err) {
        console.log(err);
    }

    return null;

}

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

app.post("/signup", async (req, res) => {

    const email = req.body["email"];
    const password = req.body["password"];

    const hashedPass = await hashPassword(password);
    
    mongo.connect(uri, function(err, db) {

        var dbo = db.db("moneybag");
        dbo.collection("users").find({}, {projection: {email: 1}}).toArray(function(err, result) {

            if (err) throw err;

            var success = true;
            
            for (var i = 0;i < result.length;i++) {

                if (result[i]["email"] == email) {

                    // Email exists 
                    success = false;
                    res.send({success: false});
                    break; 

                }

            }

            if (success) {

                // Email doesn't exist 
                res.send({success: true});

                dbo.collection("users").insertOne({email: email, password: hashedPass},  function(err, res2) {

                    if (err) throw err; 

                    console.log("INSERTED DOCUMENT");

                })

            }

        })
        // collection.insertOne(req.body, function(err, res2) {

        //     console.log("Inserted documents");
        //     res.send("Signed up!");

        // })

    })


})

app.post("/login", async (req, res) => {

    const email = req.body["email"];
    const password = req.body["password"];

    const hashedPass = await hashPassword(password);
    console.log(hashedPass);
    
    mongo.connect(uri, function(err, db) {

        var dbo = db.db("moneybag");
        dbo.collection("users").find({}, {projection: {email: 1, password: 1}}).toArray(async function(err, result) {
            
            var success = false;

            for (var i = 0;i < result.length;i++) {

                var comparison = await validatePassword(password, result[i]["password"])

                if (email == result[i]["email"] && comparison) {

                    console.log("LOGIN SUCCESSFUL!");
                    success = true; 
                    res.send({success: true});
                    break; 

                }

            }

            if (!success) {

                console.log("LOGIN FAILED");
                success = false;
                res.send({success: false});
                

            }

        })

    })

    

    // client.connect(err => {

        //  collection = client.db("moneybag").collection("users");
        // collection.find()

    //     var success = false;

    //     collection.find({}, {projection: {"email": 1, "password": 1}}).toArray(function(err, res2) {

    //         if (err) throw err; 

    //         for (var i = 0;i < res2.length;i++) {

    //             if (res2[i]["email"] == req.body["email"] && res2[i]["password"] == req.body["password"]) {

    //                 success = true; 
    //                 res.send({success: true});
    //                 break; 

    //             }

    //         }

    //         if (!success) {
    //             res.send({success: false});
    
    //         }

    //     })

        

    // })

})
