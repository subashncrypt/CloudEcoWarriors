const http = require("http");
const port = process.env.PORT || 3000;
const app = require('./app');
const server = http.createServer(app);
app.set('view engine', 'ejs');
server.listen(port, '0.0.0.0', () =>{
    console.log("server is running");
})
