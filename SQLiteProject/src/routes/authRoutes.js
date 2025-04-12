import express from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import db from '../db.js'

const router = express.Router()

router.post('/register', (req, res) => {
	const { username, password } = req.body

	// encrypt password
	const hashedPassword = bcrypt.hashSync(password, 8)

	try {
		const insertUser = db.prepare(`
            INSERT INTO users(username, password) 
            VALUES (?, ?)
            `)
		const result = insertUser.run(username, hashedPassword)

		//default todo
		const defaultTodo = 'Add first todo'

		const insertTodo = db.prepare(`
            INSERT INTO todos(user_id, task)
            VALUES (?, ?)
            `)

		insertTodo.run(result.lastInsertRowid, defaultTodo)

		// create token
		const token = jwt.sign({ id: result.lastInsertRowid }, process.env.JWT_SECRET, { expiresIn: '24h' })
		res.json({ token })
	} catch (err) {
		console.log(err.message)
		res.sendStatus(503)
	}

	console.log(username, hashedPassword)
})

router.post('/login', (req, res) => {
	//check if password checks out by encrypting it and checking it against the
	//encrypted password

	const { username, password } = req.body

	try {
		const getUser = db.prepare(`SELECT * FROM users WHERE username = ?`)
		const user = getUser.get(username)

		//Check for user
		if (!user) {
			return res.status(404).send({ message: `User not found` })
		}
		//Check password
		const isPasswordValid = bcrypt.compareSync(password, user.password)
		if (!isPasswordValid) {
			return res.status(401).send({ message: `Invalid password` })
		}

		//User found
		const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '24h' })
		console.log(`Succesfully logged in!`)
		res.json({ token })
	} catch (err) {
		console.log(err)
		res.sendStatus(503)
	}
})

export default router
