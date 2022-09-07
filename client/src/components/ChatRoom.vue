<template>
  <div class="container">
    <div class="row clearfix">
      <div class="col-lg-12">
        <div class="card chat-app">
          <PeopleList class="people-list-component" />
          <Chat class="chat-component" />
        </div>
      </div>
    </div>
  </div>
</template>


<script >
import SocketioService from '../plugins/sockets'
import PeopleList from './PeopleList.vue';
import Chat from './Chat.vue';
export default {
    name: "ChatRoom",
    created() {
        SocketioService.setupSocketConnection();
    },
    components: { PeopleList, Chat }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.card {
background: #fff;
transition: .5s;
border: 0;
margin-bottom: 30px;
border-radius: .55rem;
position: relative;
width: 100%;
box-shadow: 0 1px 2px 0 rgb(0 0 0 / 10%);
}

.chat-app .people-list-component {
width: 280px;
position: absolute;
left: 0;
top: 0;
padding: 20px;
z-index: 7
}

.chat-app .chat-component {
margin-left: 280px;
border-left: 1px solid #eaeaea
}



/* @media only screen and (max-width: 767px) {

.chat-app .chat-component {
    margin: 0
}

} */
/* 
@media only screen and (min-width: 768px) and (max-width: 992px) {
.chat-app .chat-list {
    height: 650px;
    overflow-x: auto
}

.chat-app .chat-history {
    height: 600px;
    overflow-x: auto
}
}

@media only screen and (min-device-width: 768px) and (max-device-width: 1024px) and (orientation: landscape) and (-webkit-min-device-pixel-ratio: 1) {
.chat-app .chat-list {
    height: 480px;
    overflow-x: auto
}

.chat-app .chat-history {
    height: calc(100vh - 350px);
    overflow-x: auto
}
} */
</style>
