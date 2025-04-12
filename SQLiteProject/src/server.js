import express from 'express'
import path, { dirname } from 'path'
import { fileURLToPath } from 'url'
import authRoutes from './routes/authRoutes.js'
import todoRoutes from './routes/todoRoutes.js'

const app = express()
const PORT = process.env.PORT || 2323

// Get file path from the URL of current module
const __filename = fileURLToPath(import.meta.url)
// Get the dir name from the file path
const __dirname = dirname(__filename)
app.use(express.json())
// Serves the html file from the 'public' dir
app.use(express.static(path.join(__dirname, '../public')))

app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, 'public', 'index.html'))
})

//If gets a request from '/auth' it will redirect the request to authRoutes.js
app.use('/auth', authRoutes)
app.use('/todos', todoRoutes)

app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`))
