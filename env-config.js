const prod = process.env.NODE_ENV === "production";
module.exports = {
  "process.env.API_URL": prod
    ? "https://janicedavila.com/api/v1"
    : "http://localhost:4004/",
  "process.env.URL": prod
    ? "https://janicedavila.com/"
    : "http://127.0.0.1:3000/"
};
