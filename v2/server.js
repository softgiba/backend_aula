import app from './src/app.js'
// definição de porta condicional ou dod proxy ou na 3002
const port = process.env.PORT || 3002; 

// retorno no terminal com o link
app.listen(port, () => {
    console.log(`Servidor escutando em http://localhost:${port}`)
  })

// executar node server.js
// executar npm run dev