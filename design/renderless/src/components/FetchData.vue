<script>
import axios from 'axios';

export default {
  props: ['url'],
  data() {
    return {
      response: null,
      loading: true,
    }
  },
  created() {
    axios.get(this.url)
      .then(response => {
        this.response = response.data;
        this.loading = false;
      })
      .catch(error => {
        alert('[ERROR] fetching the data', error);
        console.log(error);
      });
  },
  render() {
    // scopedslot을 통해 노출시키고 상위 컴포넌트에서 받아 사용함
    return this.$scopedSlots.default({
      response: this.response,
      loading: this.loading,
    });
  },
}
</script>