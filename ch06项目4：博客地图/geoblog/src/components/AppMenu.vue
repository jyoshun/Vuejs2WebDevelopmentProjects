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
import { mapGetters, mapActions } from 'vuex'
export default {
  computed: mapGetters([
    'user',
    'userPicture',
  ]),

  methods: mapActions({
    centerOnUser: 'login',
    logout: 'logout',
  }),
}
</script>
