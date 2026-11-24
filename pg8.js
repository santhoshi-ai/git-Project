const express = require("express");

const app = express();
const PORT = 3001;

app.use(express.json());

const USERNAME ="student";
const PASSWORD ="12345";

app.post("/login",(req,res) => {
    const { username,password } = req.body;
    if(!username||!password)
        return res.status(400).json({
    
            success:false,
            message:"Username and password are required"
        });
    
    if(username === USERNAME && password === PASSWORD) {
        return res.status(200).json({
            success:true,
            message:"Login successfull"
        });
    }
    return res.status(401).json({
        success:false,
        message:"invalid username or password"
    });
});
app.listen(PORT,() => {
    console.log(`login API running at http://localhost:${PORT}`);
})