import express from 'express'
import path, { dirname } from 'path'
import { fileURLToPath } from 'url'
import authRoutes from './routes/authRoutes.js'
import todoRoutes from './routes/todoRoutes.js'
import authMiddleware from './middleware/authMiddleware.js'

const app = express()
const PORT = process.env.PORT || 2323

// Get file path from the URL of current module
const __filename = fileURLToPath(import.meta.url)
// Get the dir name from the file path
const __dirname = dirname(__filename)
app.use(express.json())
app.use(express.static(path.join(__dirname, '../public')))

app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, 'public', 'index.html'))
})

// If gets a request from '/auth' it will redirect the request to authRoutes.js
// and the same goes for '/todo'
app.use('/auth', authRoutes)
app.use('/todos', authMiddleware, todoRoutes)

app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`))
