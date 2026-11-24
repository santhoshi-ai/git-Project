const express = require("express");
const app = express();
const PORT = 3000;
app.use(express.json());
let tasks = [];
let nextId = 1;
app.get("/", (req, res) => {
  res.send("Task Manager API is running");
});
app.post("/tasks", (req, res) => {
  const { title, status } = req.body;
  if (!title | !title.trim()) {
    return res.status(400).json({
      success: false,
      message: "Task title is required"
    });
  }
  const task = {
    id: nextId++,
    title:title.trim(),
    status:status||"Pending"
  };
  tasks.push(task);
  res.status(201).json({
    success:true,
    message:"Taskaddedsuccessfully",
    data:task
  });
});
app.get("/tasks",(req,res)=>{
  res.json({
    success:true,
    count:tasks.length,
    data:tasks
  });
});
app.listen(PORT,()=>{
  console.log(`Serverrunningathttp://localhost:${PORT}`);
});