const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const TodoModel = require('./models/Todo')

const app = express()
app.use(cors())
app.use(express.json())
const mongoURI = 'mongodb+srv://faarouk:farouk1919@cluster0.lwhiwr2.mongodb.net/?retryWrites=true&w=majority';
mongoose.connect(mongoURI);
app.get('/get',(req,res) =>{
    TodoModel.find()
    .then(result => res.json(result))
    .catch(err=>res.json(err))
})

app.put('/update/:id', async (req, res) => {
    const { id } = req.params;
    try {
      const todo = await TodoModel.findById(id);
      if (!todo) {
        return res.status(404).json({ message: 'Todo not found' });
      }
      todo.done = !todo.done;
      const updatedTodo = await todo.save();
      res.json(updatedTodo);
    } catch (err) {
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });
  
app.delete('/delete/:id', (req,res)=> {
    const {id} = req.params
    TodoModel.findByIdAndDelete({_id : id})
    .then(result => res.json(result))
    .catch(err=>res.json(err))
    
})

app.post('/add',(req,res)=>{
    const task = req.body.task
    TodoModel.create({
        task : task
    }).then((result)=> res.json(result))
      .catch((err)=>res.json())
})

app.listen(3001,()=>{
    console.log("Server is running")
})