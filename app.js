const express = require('express')
const mongoose = require('mongoose')
const app = express()
const produtosRoutes = require('./api/routes/produtoRoutes');
const pedidosRoutes = require('./api/routes/pedidosRoutes')

const port = process.env.SERVER_PORT || 3000

//const dbURL = `mongodb+srv://${process.env.BD_USER}:${process.env.BD_PASSWORD}@cluster0.cu4zd.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`
const dbURL = `mongodb://localhost:27017/${process.env.DB_NAME}`

mongoose.connect(dbURL, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
}, (err) => {
    console.log(`${dbURL}`);
  if(!err) {
    console.log('MongoDB conectado');
  }else{
    console.log(`MongoDB erro ${err}`);
  }
})

app.use(express.json())
/*
app.use('/', (req, res, next) => {
  res.setHeader("Content-Type", "application/json; charset=utf-8")
  next()
})
*/
app.use('/produtos', produtosRoutes)
app.use('/pedidos', pedidosRoutes)

app.use((err, req, res, next) => {
    console.log('middleware...');
    res.status(400).send({mensagem: err.message, erro: err})
})

app.listen(port, () => {
    console.log(`Server listening on ${port}!`)
})
