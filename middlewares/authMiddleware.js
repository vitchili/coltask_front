export default function authMiddleware(to, from, next) {
    
    if (to.meta.requiresAuth) {
      const isAuthenticated = localStorage.getItem('authToken');
  
      if (isAuthenticated) {
        next();
      } else {
        next({ name: 'Login' });
      }
    } else {
      next();
    }
  }