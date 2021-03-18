import axios from 'axios'

export const api = axios.create({
	baseURL: 'https://voice-app.zenvia.com',
})
