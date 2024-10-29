const express = require("express")
const { setLanguage, initI18n } = require('./middlewares/i18nmiddleware')
const cookieParser = require('cookie-parser')
const app = express()
const path = require('path')
const http = require("http").createServer(app)
const io = require("socket.io")(http)

app.set("view engine", "ejs")
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))
app.set('views', path.join(__dirname, 'views'))

app.get("/", setLanguage, initI18n, (req, res) => {
    res.render("index")
})

app.post("/setlang/:lang", setLanguage, initI18n, (req, res) => {
    const lang = req.params.lang
    req.setLocale(lang)
    res.cookie('lang', lang)
    res.sendStatus(200)
})

io.on("connection", (socket) => {
    socket.on("disconnect", (data) => {
        // console.log(`${socket.id} disconnected`)
    })
    socket.on("msg", (data) => {
        io.emit("showmsg", data)
    })
})

http.listen(3000, () => {
    console.log("running")
})