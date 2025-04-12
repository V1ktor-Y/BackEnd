import express from 'express'
import db from '../db.js'

const router = express.Router()

//Get all todos
router.get('/', (req, res) => {
	const getTodos = db.prepare(`SELECT * FROM todos WHERE user_id = ?`)
	const todos = getTodos.all(req.userID)
	req.json(todos)
})
//create a new todo
router.post('/', (req, res) => {})
//update todo <id>
router.put('/:id', (req, res) => {})
//delete todo <id>
router.delete('/:id', (req, res) => {})

export default router
