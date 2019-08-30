<template>
  <div class="app-menu">
    <div class="header">
      <i class="material-icons">place</i>
      Geoblog
    </div>

    <div class="user">
      <div v-if="user" class="info">
        <span v-if="userPicture" class="picture">
          <img :src="userPicture" />
        </span>
        <span class="username">{{ user.profile.displayName }}</span>
      </div>
      <a @click="centerOnUser">
        <i class="material-icons">my_location</i>
      </a>
      <a @click="logout">
        <i class="material-icons">power_settings_new</i>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    user () {
      return this.$store.getters.user
    },
    userPicture () {
      return this.$store.getters.userPicture
    },
  },
  methods: {
    centerOnUser () {
      // TODO
    },
    logout () {
      // TODO
      if (!this.user) {
        const userData = {
          profile: {
            displayName: 'Mr Cat',
          },
        }
        this.$store.commit('user', userData)
        // this.$store.state.user = userData
      } else {
        this.$store.commit('user', null)
        // this.$store.state.user = null
      }
    },
  },
}
</script>
