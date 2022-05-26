const express = require("express")
const path = require("path")

const PORT = 3001 || process.env.PORT
const app = express()

app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../client/build/index.html"))
})
app.get("/resume", (req, res) => {
    res.sendFile(path.join(__dirname, "/Resume.pdf"))
})
app.get("/resume/download", (req, res) => {
    res.download(path.join(__dirname, "/Resume.pdf"))
})
app.use(express.static(path.join(__dirname, "../client/build")))
app.get("*", (req, res) => {
    res.redirect("/")
})

app.listen(PORT, () => {
    console.log(`Listening at http://localhost:${PORT}`)
})