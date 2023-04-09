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


function login(username, password){
    //console.log("Someone try to login with", username, password)
    let matched = dbUsers.find(element => 
        element.username == username
    )
    
    //console.log(matched)
    if (matched){
        if(matched.password == password){
        console.log("access granted")}
        else {
        console.log("wrong password")
        }
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
    login(username, password);
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