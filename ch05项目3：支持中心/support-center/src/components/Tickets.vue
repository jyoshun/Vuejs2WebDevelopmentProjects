<template>
  <div class="tickets">
    <Loading v-if="remoteDataBusy" />
    <div v-else-if="tickets.length === 0" class="empty">
      You don't have any ticket yet.
    </div>
    <section v-else class="tickets-list">
      <div v-for="ticket in tickets" :key="ticket._id" class="ticket-item">
        <router-link :to="{name: 'ticket', params: { id: ticket._id }}">
          {{ ticket.title }}
        </router-link>>
        <span class="badge">{{ ticket.status }}</span>
        <span class="date">{{ ticket.date | date }}</span>
      </div>
    </section>
    <Ticket v-if="id" :id="id" />
  </div>
</template>

<script>
import RemoteData from '../mixins/RemoteData'
import Ticket from './Ticket.vue'
export default {
  mixins: [
    RemoteData({
      tickets: 'tickets',
    }),
  ],
  components: {
    Ticket,
  },
  data () {
    return {
      id: null,
    }
  },
}
</script>
