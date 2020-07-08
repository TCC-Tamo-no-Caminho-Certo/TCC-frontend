import api from "services/api"

export default async function isAuthenticated(method, url) {
  try {
    await api[method](url, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("JWT")}`,
      },
    })
    return true
  } catch {
    return false
  }
}
