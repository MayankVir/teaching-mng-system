export default function authHeader() {
  const name = JSON.parse(localStorage.getItem("priksha_name"));
  const token = JSON.parse(localStorage.getItem("priksha_token"));
  const type = JSON.parse(localStorage.getItem("priksha_type"));
  const user = { name, type, token };
  if (user && user.token) {
    return { "x-auth-token": user.token };
  } else {
    return {};
  }
}
