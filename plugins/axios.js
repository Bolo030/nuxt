import { Toast } from "vant";
export default function({ app: { $axios, $cookies }, redirect ,error}) {
  $axios.defaults.baseURL = process.env.baseUrl;
  $axios.defaults.timeout = 50000;
  $axios.interceptors.request.use(config => {
    config.headers["Authorization"] = $cookies.get("token") || "";
    config.headers["Content-Type"] = "application/json";
    return config;
  });

  $axios.interceptors.response.use(response => {
    if (/^[4|5]/.test(response.status)) {
      return Promise.reject(response.statusText);
    }
    console.log(response.data, "response.data");
    if (response.data.status != 1) {
      Toast(response.data.message);
      if (response.data.message == "请先登录"||response.data.message == "请重新登录") {
       return redirect("/login");
      }
      // error({ message: 'This page could not be found.', statusCode: 404 })
      return false;
    }
    return response.data;
  });
}
