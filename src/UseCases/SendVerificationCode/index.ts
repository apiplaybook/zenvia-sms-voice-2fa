import { config } from 'dotenv' // Importação do config do dotenv
import { api } from '../../config/api' // Importação da api configurada no arquivo do axios

config() // Inicialização do dotenv para usarmos variáveis de ambiente

class SendVerificationCode {
	async execute(numero_destino: string, tts: boolean) {
		try {
			// Tente realizar a chamada
			const response = await api.post(
				'/verificacao',
				{
					numero_destino,
					nome_produto: 'Prensa Store',
					tamanho: '4',
					tts,
				},
				{
					headers: {
						'Content-Type': 'application/json',
						'access-token': `${process.env.VOICE_TOKEN}`,
					},
				}
			)

			// Armazena o campo sucesso da resposta da API de voz
			const {
				sucesso,
				dados: { id },
			} = response.data

			// Verifica se o sucesso é verdadeiro
			if (sucesso === true) {
				// Se sim, exibe status de sucesso no console da aplicação
				console.log('Sucesso! A chamada está sendo realizada.')

				// Retorna o id da transação
				return id
			} else {
				// Se não, exibe status de erro no console da aplicação
				console.log('Erro na chamada.')

				// Retorna string vazia
				return ''
			}
		} catch (error) {
			// Caso não seja possível chamar a API de voz, exibe um status de erro no console
			console.log('Error:', error)

			// Retorna false
			return false
		}
	}
}

// Exportação da insância da classe
export const sendVerificationCode = new SendVerificationCode()
