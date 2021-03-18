// @ts-nocheck
import express, { Request, Response } from 'express'

import { checkVerificationCode } from './UseCases/CheckVerificationCode'

const routes = express.Router() // Inicializa o router do express

// Rota para exibir o index.html
routes.get('/', (request: Request, response: Response) => {
	response.render('index')
})

// Rota para receber as informações do form, realizar a requição à API e exibição da tela para o envio do código
routes.post('/verificacao', async (request: Request, response: Response) => {
	const { numero_destino, tts } = request.body // Armazena as informações do form em variáveis

	// Verifica se elas foram realmente passadas na requisição
	if (numero_destino && tts) {
		// Chama a nossa classe que faz a chamada à API e armazena o ID retornado pela chamada
		const returnID = await sendVerificationCode.execute(
			numero_destino,
			tts === 'false' ? false : tts === 'true' && true
		)

		// Verifica se foi feita a chamada com sucesso
		if (returnID !== '') {
			request.session.verificacaoId = returnID // Armazena o ID em uma variável de sessão
		}
	}

	response.render('verificacao') // Renderiza o arquivo verificacao.html com o ejs
})

export default routes
