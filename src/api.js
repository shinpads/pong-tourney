const axios = require('axios');
const api = {
  getData: async () => {
    const res = await axios.get('/data');
    return res.data;
  }
};

export default api;
