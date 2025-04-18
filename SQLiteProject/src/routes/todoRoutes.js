import express from 'express'
import db from '../db.js'

const router = express.Router()

// Get all todos
router.get('/', (req, res) => {
	const getTodos = db.prepare(`SELECT * FROM todos WHERE user_id = ?`)
	const todos = getTodos.all(req.userId)
	res.json(todos)
})
// create a new todo
router.post('/', (req, res) => {
	const { task } = req.body
	const insertTodo = db.prepare(`INSERT INTO todos (user_id, task) VALUES(?, ?)`)
	const result = insertTodo.run(req.userId, task)

	res.json({ id: result.lastInsertRowid, task, completed: 0 })
})
// update todo <id>
router.put('/:id', (req, res) => {
	const { task, completed } = req.body
	//req.params = /:id
	const { id } = req.params
	const updateTodo = db.prepare(`UPDATE todos SET task = ?, completed = ? WHERE id = ?`)
	updateTodo.run(task, completed, id)
	res.json({ message: 'Updated todo' })
})
// delete todo <id>
router.delete('/:id', (req, res) => {
	const { id } = req.params
	const deleteTodo = db.prepare(`DELETE FROM todos WHERE id = ? AND user_id = ?`)
	deleteTodo.run(id, req.userId)
	res.json({ message: 'Todo deleted' })
})

export default router
