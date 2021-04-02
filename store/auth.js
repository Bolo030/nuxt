export const state = () => ({
  cookieMaxExpires: new Date(Date.now() + 8.64e7 * 365 * 10), // cookies 过期时间,
  token: "",
  deviceType: ""
});

export const mutations = {
  UPDATE_TOKEN(state, payload) {
    state.token = payload;
  },
  UPDATE_DEVICETYPE(state, payload) {
    state.deviceType = payload;
  }
};
