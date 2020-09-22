const express = require('express')
const cors = require('cors')
const pool = require('./db')

//config
const app=express()
const port=process.env.PORT || 4000

//midd
app.use(cors())
app.use(express.json())

//routes
app.post('/todos',async (req,res)=>{
    try {
        const {description} = req.body
        const newTodo= await pool.query("INSERT INTO todo (description) VALUES ($1) RETURNING *;",[description])
        res.status(201).json(newTodo.rows)
    } catch (error) {
        console.log(error.message)
    }
})

app.get('/todos',async (req,res)=>{
    try {
        const todos= await pool.query('SELECT * FROM todo;')
        res.json(todos.rows)
    } catch (error) {
        console.log(error.message)
    }
    
})

app.get('/todos/:id',async (req,res)=>{
    try {
        const {id} = req.params; 
        const todos= await pool.query('SELECT * FROM todo WHERE todo_id=$1;',[id])
        res.json(todos.rows)
    } catch (error) {
        console.log(error.message)
    }
    
})

app.put('/todos/:id',async (req,res)=>{
    try {
        const {id} = req.params;
        const {description} = req.body;
        
        const todos= await pool.query('UPDATE todo SET description = $1 WHERE todo_id=$1;',[description,id])
        res.json(todos.rows)
    } catch (error) {
        console.log(error.message)
    }
    
})

app.delete('/todos/:id',async (req,res)=>{
    try {
        const {id} = req.params; 
        const todos= await pool.query('DELETE FROM todo WHERE todo_id=$1;',[id])
        res.json("Todo was deleted!!!")
    } catch (error) {
        console.log(error.message)
    }
    
})

//listen
async function main(){
    await app.listen(port)
    console.log('Server on port ', port)
}

main()