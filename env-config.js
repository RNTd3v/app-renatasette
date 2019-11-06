const prod = process.env.NODE_ENV === "production";
module.exports = {
  "process.env.API_URL": prod
    ? "https://api.renatasette.com/"
    : "http://localhost:4004/",
  "process.env.URL": prod
    ? "https://renatasette.com/"
    : "http://127.0.0.1:3000/"
};
