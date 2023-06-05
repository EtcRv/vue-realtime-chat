<template>
    <div class="header">
        <div class="header-head">
            <h1 class="header-head-logo" @click="navigateTo('/')" >
                Chat App
            </h1>
            <ul class="header-head-type">
                <li @click="navigateTo('/')">HOME</li>
                <li @click="navigateTo(this.$store.state.roomChatUrl)">ROOM CHAT</li>
            </ul>
    
            <div class="header-head-user">
                <button @click="navigateTo('/login')" v-if="!this.$store.state.isUserLoggedIn" >Login</button>
                <div class="user-loggedIn" v-if="this.$store.state.isUserLoggedIn">
                    <div class="user-info">👨 Hi, {{this.$store.state.user.name}}</div>
                    <div class="user-features">
                        <div @click="logout">Logout</div>
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>

<script>
// import AuthenticationServices from '@/services/AuthenticationServices';

export default {
    name: "HeaderComponent",
    data() {
        return {
            chatUrl: ''
        }
    },
    methods: {
        navigateTo(route) {
            this.$router.push(route)
        },
        logout() {
            this.$store.dispatch('setToken', null)
            this.$store.dispatch('setUser', null)
            this.$router.push("/")
        },
    }
}
</script>

<style scoped>
.header {
    display: block;
    position: relative;
    width: 100%;
    height: 100px;
    background-color: rgb(231 172 26 / 0%);
}

.header-head {
    display: flex;
    width: 100%;
    justify-content: space-around;
    align-items: center;
}

.header-head h1 {
    color: #e50914;
    cursor: pointer;
}

.header-head-type {
    display: flex;
    list-style-type: none;
}

.header-head-type li {
    cursor: pointer;
    padding: 0 24px;
    color: rgb(10, 43, 213);
}

.header-head-user {
    position: relative;

}  
.header-head-user button {
    margin: 5px;
    padding: 5px;
}

.user-loggedIn {
    position: absolute;
    top: -18px;
    cursor: pointer;
    background-color: #fff;
    border-radius: 4px;
    display: inline-block;
    font-weight: 400;
    white-space: nowrap;
    vertical-align: middle;
    user-select: none;
    border: 1px solid transparent;
    padding: 0.375rem 0.75rem;
    font-size: 1rem;
    line-height: 1.5;
    transition: color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out;
    
}
.user-features {
    display: none;
    margin: 8px 0 0 0;

}
.user-features div {
    padding: 8px 0;
}

.user-features div:hover {
    background-color: #007bff;
}
.user-loggedIn:hover .user-features  {
    display: block;
}
</style>