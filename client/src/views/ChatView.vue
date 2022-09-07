<template>
  <div class="home">
    <ChatRoom/>
  </div>
</template>

<script>
// @ is an alias to /src
import ChatRoom from '@/components/ChatRoom.vue'

export default {
  name: 'HomeView',
  components: {
    ChatRoom
  }
}
</script>
