export default function ({ app: { $axios, $cookies } }) {
	$axios.defaults.baseURL = process.env.baseUrl;
	$axios.defaults.timeout = 50000
	$axios.interceptors.request.use(config => {
		config.headers['Authorization'] = $cookies.get('token') || ''
		config.headers['Content-Type'] = 'application/json'
		return config
	})
	
	$axios.interceptors.response.use(response => {
		if (/^[4|5]/.test(response.status)) {
			return Promise.reject(response.statusText)
		}
		return response.data
	})
}
