export default function authMiddleware(to, from, next) {
  if (to.meta.requiresAuth) {
      var token = $cookies.get('token');
      const expiresAt = new Date(localStorage.getItem('expires_at'));
      const expiresAtFormatted = expiresAt.toLocaleDateString();
      const today = new Date();
      const todaysDate = today.toLocaleDateString();
      if (token && expiresAtFormatted > todaysDate) {
        next();
      } else {
        next({ name: 'Login' });
      }
    } else {
      next();
    }
  }

export function getAuthToken() {
    var token = $cookies.get('token');
    if (typeof $cookies.get('token') != 'undefined') {
      return {
        headers: { Authorization: `Bearer ${token}` },
      };
    }
  return null;
}