import axios from 'axios';

const connection = ({ method = 'get', endpoint, data = null, token = null }) => {
  const api = process.env.NEXT_PUBLIC_API;

  return axios[method](`${api}${endpoint}`,
    data,
    {
      headers: {
        Authorization: token,
      },
    });
};

export default connection;
