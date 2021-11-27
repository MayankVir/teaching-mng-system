export default function authHeader() {
  const name = JSON.parse(localStorage.getItem("name"));
  const token = JSON.parse(localStorage.getItem("token"));
  const type = JSON.parse(localStorage.getItem("type"));
  const user = { name, type, token };
  if (user && user.token) {
    return { "x-auth-token": user.token };
  } else {
    return {};
  }
}
