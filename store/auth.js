export const state = () => ({
  cookieMaxExpires: new Date(Date.now() + 8.64e7 * 365 * 10), // cookies 过期时间,
  token: "",
  deviceType: "",
  openBank:{},
  real:{}
});

export const mutations = {
  UPDATE_TOKEN(state, payload) {
    state.token = payload;
  },
  UPDATE_DEVICETYPE(state, payload) {
    state.deviceType = payload;
  },
  UPDATE_OPENBANK(state,payload){
    state.openBank=payload
  },
  UPDATE_REAL(state,payload){
    state.real=payload
  }
};
