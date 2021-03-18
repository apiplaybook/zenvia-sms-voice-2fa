import { config } from 'dotenv'
import { api } from '../../config/api'

config()

class CheckVerificationCode {
	async execute(id: string, codigo: string) {
		try {
			// Tente realizar a chamada
			const response: any = await api.get(`/verificacao/?id=${id}&pin=${codigo}`, {
				headers: {
					'Content-Type': 'application/json',
					'access-token': `${process.env.VOICE_TOKEN}`,
				},
			})

			// Armazena o campo sucesso da resposta da API de voz
			const {
				dados: { resultado },
			} = response.data

			// Retorna o resultado da verificação
			return resultado
		} catch (error) {
			// Caso não seja possível chamar a API de voz, exibe um status de erro no console
			console.log('Error:', error)

			// Retorna false
			return false
		}
	}
}

export const checkVerificationCode = new CheckVerificationCode()
