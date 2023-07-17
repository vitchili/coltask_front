<script>
import axios from "axios";
import router from '../router'

export default {
  name: 'Logout',
  data(){
    return {
      token: localStorage.getItem('authToken'),
    }
  },
  mounted(){
      const config = {
          headers: { Authorization: `Bearer ${this.token}` }
      };

      localStorage.removeItem('authToken');
      axios.post(`${process.env.VUE_APP_API_DOMAIN}/logout`, null, config);
      router.push({ name: 'Login'});

    }
}
</script>