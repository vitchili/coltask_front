<script>
import axios from "axios";
import router from '../router'
import { getAuthToken } from '../../middlewares/authMiddleware'; 

export default {
  name: 'Logout',
  data(){
    return {
    }
  },
  mounted(){
      localStorage.removeItem('authToken');
      axios.post(`${process.env.VUE_APP_API_DOMAIN}/logout`, null, getAuthToken());
      router.push({ name: 'Login'});

    }
}
</script>