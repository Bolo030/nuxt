
import axios from "axios";
import store from "@/store";

let config = {
    baseURL: process.env.VUE_APP_API_URL || "",
    timeout: 60 * 1000, // Timeout
    headers: {'Content-Type': 'application/json'},
    // headers: {'Content-Type': 'text/plain'}
};

const _axios = axios.create(config);

_axios.interceptors.request.use(
    function (config) {
        // Do something before request is sent
        let token = localStorage.getItem('token');
        if (token) {
            config.headers['Authorization'] = token;
        }
        return config;
    },
    function (error) {
        // Do something with request error
        return Promise.reject(error);
    }
);

// Add a response interceptor
_axios.interceptors.response.use(
    function (response) {
        switch (response.data.status) {
            case 0:
                response.data.message
                //  && Message.error(response.data.message);
                break;
            case -1:
                // Message.warning('请先登陆');
                store.commit('user/logout');
                store.commit('user/loginDialog', true);
                //router.push({name: 'home'});
                break;
        }
        // Do something with response data
        return response.data;
    },
    function (error) {
        // Do something with response error
        return Promise.reject(error);
    }
);

export default _axios;
