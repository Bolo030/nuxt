let baseUrl = "";
if(process.env.NODE_ENV == 'test'){
  baseUrl = 'https://api.testing.996110.com/api'
}else if(process.env.NODE_ENV == 'pro'){
  // baseUrl = 'https://api.996110.com/api'
  baseUrl = 'https://api.testing.996110.com/api'
}else{
  baseUrl = 'https://api.testing.996110.com/api'
}
export default function ({ app: { $axios, $cookies } }) {
	$axios.defaults.baseURL = baseUrl;
	$axios.defaults.timeout = 30000
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
