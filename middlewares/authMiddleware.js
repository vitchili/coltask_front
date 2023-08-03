export default function authMiddleware(to, from, next) {
    
    if (to.meta.requiresAuth) {
      const hasToken = getAuthToken();
      if (hasToken) {
        next();
      } else {
        next({ name: 'Login' });
      }
    } else {
      next();
    }
  }

export function getAuthToken() {
    if (typeof localStorage.getItem("authToken") != 'undefined') {
      return {
        headers: { Authorization: `Bearer ${localStorage.getItem("authToken")}` },
      };
    }
  return null;
}