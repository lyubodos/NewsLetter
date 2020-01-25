//jshint esversion:6

const express = require("express"),
bodyParser = require("body-parser"),
request = require("request");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));


app.get("/", function(req,res){
  res.sendFile(__dirname + "/signup.html");
});


app.post("/", function(req,res){
  var fName = req.body.firstName;
  var lName = req.body.lastName;
  var eMail = req.body.mail;

  var data = {
    members: [
      {
        email_address: eMail, 
        status: "subscribed",
        merge_fields: {
          "FNAME": fName,
          "LNAME": lName
        }
      }
    ]
  };

  var jsonData = JSON.stringify(data);
  var options = {
    url: "https://us4.api.mailchimp.com/3.0/lists/f2f772bce4",
    method:"POST",
    headers: {
        "Authorization": "lyubo1 c24dbbcad75c3c70cc41e22b1f740d43-us4"
    },
    body: jsonData
  };

  request(options, function(error,response,body){
    if(error){
      res.sendFile(__dirname + "/failure.html");
    }else{
        res.sendFile(__dirname + "/success.html");
    }
  });
});


app.post("/failure", function(req,res){
  res.redirect("/");

});

app.listen(3000,function(){
  console.log("Server is runing on port 3000");
});
