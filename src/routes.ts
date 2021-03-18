// @ts-nocheck
import express, { Request, Response } from 'express'

import { checkVerificationCode } from './UseCases/CheckVerificationCode'
import { sendVerificationCode } from './UseCases/SendVerificationCode'

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

// Rota para receber o código enviado pelo usuário, realizar a requição à API e exibição da tela do resultado
routes.post('/verifica', async (request: Request, response: Response) => {
	const { codigo } = request.body // Armazena o código em uma variável

	// Verifica se o código foi passado
	if (codigo) {
		// Chama a nossa classe que faz a chamada à API e armazena o resultado retornado pela chamada
		// É passado o ID que armazenamos na seção e o código enviado pelo usuário
		const validade = await checkVerificationCode.execute(
			request.session.verificacaoId,
			codigo
		)

		// Verifica se o retorno da API foi igual a 'valido'
		if (validade === 'valido') {
			// Se sim, renderiza a tela resultado.html e envia a variável validade como 'concluída com sucesso!'
			response.render('resultado', {
				validade: 'concluída com sucesso!',
			})
		} else {
			// Se não, renderiza a tela resultado.html e envia a variável validade como 'cancelada! Seu código de verificação está inválido'
			response.render('resultado', {
				validade: 'cancelada! Seu código de verificação está inválido',
			})
		}
	}
})

export default routes
