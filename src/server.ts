import bodyParser from 'body-parser'
import express from 'express'
import session from 'express-session'
import ejs from 'ejs'

import routes from './routes'

// Inicializa o express e define uma porta
const app = express()

// Configuração do ejs
app.engine('html', ejs.renderFile) // ejs
app.set('view engine', 'html') // ejs
app.set('views', __dirname + '/html') // ejs

app.use(session({ secret: 'shhh' })) // Inicialização do express-session

app.use(bodyParser.urlencoded({ extended: true })) // Indica o uso do body-parser

app.use(routes) // Indica para o express usar o as rotas do arquivo routes

// Indica as rotas estáticas
app.use('/assets', express.static(__dirname + '/html/assets'))
app.use('/css', express.static(__dirname + '/html/css'))

// Indica para o express escutar a porta 1000
app.listen(1000, () => console.log(`Server running on port 1000`))
