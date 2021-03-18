// @ts-nocheck
import express, { Request, Response } from 'express'

const routes = express.Router() // Inicializa o router do express

// Rota para exibir o index.html
routes.get('/', (request: Request, response: Response) => {
	response.render('index')
})

export default routes
