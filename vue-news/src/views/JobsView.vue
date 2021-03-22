<template>
  <div>
    <ListItem></ListItem>
    <!-- <ul class="news-list">
      <li v-for="job in this.$store.state.jobs" class="post">
        <div class="points">
          {{ job.points || 0 }}
        </div>
        <div>
          <p class="news-title">
            <a :href="job.url">{{ job.title }}</a>
          </p>
          <small class="link-text">
            {{ job.time_ago }} by
            <a :href="job.url">
              {{ job.domain }}
            </a>
          </small>
        </div>
      </li>
    </ul> -->

    <!-- <p v-for="job in this.$store.state.jobs">
      <a :href="job.url">{{ job.title }}</a>
      <small>{{ job.time_ago }} by {{ job.domain }}</small>
    </p> -->
  </div>
</template>

<script>
import ListItem from "../components/ListItem.vue";

export default {
  components: {
    ListItem,
  },
};
</script>