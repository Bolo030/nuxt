export default function({ app: { $axios, $cookies },redirect }) {
  $axios.defaults.baseURL = process.env.baseUrl;
  $axios.defaults.timeout = 50000;
  $axios.interceptors.request.use(config => {
    config.headers["Authorization"] = $cookies.get("token") ;
    config.headers["Content-Type"] = "application/json";
    return config;
  });

  $axios.interceptors.response.use(response => {
    if (/^[4|5]/.test(response.status)) {
      return Promise.reject(response.statusText);
    }
    console.log(response.data,'response.data')
    if (response.data.status==-1||response.data.message == "请先登录") {
      redirect("/login");
      return false;
    }
    return response.data;
  });
}
