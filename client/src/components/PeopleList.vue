<template>
    <div id="plist" class="people-list">
        <div class="input-group">
            <div class="input-group-prepend">
            <span class="input-group-text"><i class="fa fa-search"></i></span>
            </div>
            <input type="text" class="form-control" placeholder="Search..." v-model="search">
        </div>
        <ul class="chat-list" style="margin-top: 8px;">
            <li v-for="people in peoples" :key="people.id" class="clearfix" style="margin-top: 2px; display: flex;" @click="changeUserChat(people.id)">
                <img :src="people.avatarUrl" style="border-radius: 50%; height: 64px; width: 64px;" alt="avatar" />
                <div class="about">
                    <div class="name">{{people.name}}</div>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
/* eslint-disable */
import AuthenticationServices from '@/services/AuthenticationServices';
import _ from 'lodash'

export default {
  name: "People List",
  data() {
    return {
        search: '',
        peoples: []
    }
  },
  methods: {
    changeUserChat(friendId) {
        window.location.href = `/chat/${this.$store.state.user.id}/${friendId}`
    },
    async getListOfPeople() {
        this.peoples = []
        const allUsers  = (await AuthenticationServices.getAllUsers()).data
        allUsers.forEach(user => {
            if(user.id != this.$store.state.user.id) {
                this.peoples.push({
                    id: user.id,
                    avatarUrl: user.avatar,
                    name: user.name
                })
            }
        });
    }
  },
  watch: {
    search: async function (value) {
        // this.search = value
        this.peoples = []
        const allUsers  = (await AuthenticationServices.searchUser(value)).data
        allUsers.forEach(user => {
            if(user.id != this.$store.state.user.id) {
                this.peoples.push({
                    id: user.id,
                    avatarUrl: user.avatar,
                    name: user.name
                })
            }
        });
        console.log(this.peoples)
    }
  },
  async created() {
    await this.getListOfPeople()
  }
}
</script>

<style scoped>
.people-list {
    -moz-transition: .5s;
    -o-transition: .5s;
    -webkit-transition: .5s;
    transition: .5s
}

.people-list .chat-list li {
    padding: 10px 15px;
    list-style: none;
    border-radius: 3px
}

.people-list .chat-list li:hover {
    background: #efefef;
    cursor: pointer ;
}

.people-list .chat-list li.active {
    background: #efefef ;
}

.people-list .chat-list li .name {
    font-size: 15px;
    justify-content: center;
}

.people-list .chat-list img {
    width: 45px;
    border-radius: 50%;
}

.people-list img {
    float: left;
    border-radius: 50%;
}

.people-list .about {
    float: left;
    padding-left: 12px;
}

.people-list .status {
    color: #999;
    font-size: 13px;
}

.online,
.offline,
.me {
margin-right: 2px;
font-size: 8px;
vertical-align: middle
}

.online {
color: #86c541
}

.offline {
color: #e47297
}

.me {
color: #1d8ecd
}

@media only screen and (max-width: 767px) {
.people-list {
    height: 465px;
    width: 100%;
    overflow-x: auto;
    background: #fff;
    left: -400px;
    display: none
}

.people-list.open {
    left: 0
}

}

</style>