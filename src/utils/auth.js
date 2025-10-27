const SESSION_KEY = "ticketapp_session";

export function getSession() {
  try {
    return JSON.parse(localStorage.getItem(SESSION_KEY));
  } catch (e) {
    return null;
  }
}
export function setSession(session) {
  localStorage.setItem(SESSION_KEY, JSON.stringify(session));
}
export function clearSession() {
  localStorage.removeItem(SESSION_KEY);
}
export function isAuthenticated() {
  return !!getSession();
}

// simple mock login
export async function login({ email, password }) {
  // mock validation
  await new Promise((r) => setTimeout(r, 300));
  if (email === "test@user.com" && password === "password") {
    const token = { user: { email }, token: "mock-token-123" };
    setSession(token);
    return token;
  }
  throw new Error("Invalid credentials");
}
export async function signup({ email, password }) {
  await new Promise((r) => setTimeout(r, 300));
  // accept any signup for demo
  const token = { user: { email }, token: "mock-token-123" };
  setSession(token);
  return token;
}
