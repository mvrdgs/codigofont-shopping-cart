module.exports = {
  reactStrictMode: true,
  redirects: async () => [{
    source: '/',
    destination: '/login',
    permanent: false,
  }],
};
