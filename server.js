//I accidentally did my lab on the same file as the last class...

let dbUsers = [{
    username: "Zaid",
    password: "password",
    name: "Zaid Zaihan",
    email: "b022110151@utem.edu.my"
},
{
    username: "Azaril",
    password: "password",
    name: "Azaril Afiq",
    email: "b022110098@utem.edu.my"
} 
]

const express = require('express')
const app = express()
const port = 3000

const bcrypt = require('bcrypt');
const saltRounds = 10;
var hashed;


    function login(username, hashed){
    //console.log("Someone try to login with", username, password)
    let matched = dbUsers.find(element => 
        element.username == username
    )
    //console.log(matched)
    if (matched){
        //Bcrypt verify password
        bcrypt.compare(matched.password, hashed, function(err, result) {
        if(result == true){
            console.log("Access granted using bcrypt!")
        }else{
            console.log("Wrong password!")
            console.log(result)
        }
    });
    }
    else{
        console.log("username not registered ")
    }
    }

    function register(newusername, newpassword, newname, newEmail){
        //TODO:check if username exist
        let exist = dbUsers.find(element => 
            element.username == newusername
        )
        if(exist){
            console.log("Username already exist!")
        }
            else{
                dbUsers.push({
                    username: newusername,
                    password: newpassword,
                    name: newname,
                    email: newEmail
                })
                console.log("Successfully registered!")
            }
    }

//enable the express framework to parse the body attached with the HTTP request
app.use(express.json())

//post route for user to login
app.post('/login', (req, res) =>{
    let {username, password} = req.body;
    //BCRYPT hash
    bcrypt.genSalt(saltRounds, function(err, salt) {
        bcrypt.hash(password, salt, function(err, hash) {
            hashed = hash
            console.log('hash: ',hash)
        });
    });
    //sending username and hashed passwords to login function
    setTimeout(function() {login(username, hashed)}, 500)
    // login(username, hashed);
    res.send(req.body)
    
})

//post route for user to register
app.post('/register', (req, res) =>{
    const {newusername, newpassword,newname, newEmail} = req.body;
    register(newusername, newpassword, newname, newEmail)
    res.send(req.body)

})

//get method
app.get('/', (req, res) => {
  res.send('Hello World!')
})

//post method
app.post('/', (req, res)=> {
    res.send(req.body)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})