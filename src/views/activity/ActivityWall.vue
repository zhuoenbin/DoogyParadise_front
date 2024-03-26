<template>
  <div class="col-lg-10 mx-auto col-lg-3"></div>
</template>
<script>
export default {
  components: {},
  data() {
    return {
      activities: [],
      page: 1,
    };
  },
  mounted() {
    this.loadActivities();
  },
  methods: {
    loadActivities() {},
  },
};
</script>
<style></style>
