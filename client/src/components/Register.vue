<template>
    <div>
        <div class="container">
            <form @submit.prevent="register">
                <h2 class="mb-3">Register</h2>
                <div class="input">
                    <label for="email">Name</label>
                    <input
                        class="form-control"
                        type="text"
                        name="text"
                        placeholder="abc"
                        v-model="name"
                    />
                </div>
                <div class="input">
                    <label for="email">Email address</label>
                    <input
                        class="form-control"
                        type="text"
                        name="email"
                        placeholder="email@adress.com"
                        v-model="email"
                    />
                </div>
                <div class="input">
                    <label for="password">Password</label>
                    <input
                        class="form-control"
                        type="password"
                        name="password"
                        placeholder="password123"
                        v-model="password"
                    />
                </div>
                <div class="input">
                    <label for="avatar">Avatar URL</label>
                    <input
                        class="form-control"
                        type="text"
                        name="avatar"
                        placeholder="http://localhost123/..."
                        v-model="avatar"
                    />
                </div>
    
                <div class="alternative-option mt-4">
                Already have an account? <span @click="navigateTo('/login')">Login</span>
                </div>
    
                <p v-if="error" style="color: red">{{error}}</p>
    
                <button type="submit" id="register_button" class="mt-4 btn-pers">
                Register
                </button>
            </form>
        </div>
    </div>
    </template>
    
    <script>
    import AuthenticationServices from '@/services/AuthenticationServices';
    
    export default {
        name: "RegisterComponent",
        data() {
          return {
              name: "",
              email: "",
              password: "",
              avatar: "",
              error:null
          };
        },
        methods: {
            async register() {
                try{
                    const response = await AuthenticationServices.register({
                        name: this.name,
                        email: this.email,
                        password: this.password,
                        avatar: this.avatar
                    })
    
                    this.$store.dispatch('setToken', response.data.token)
                    this.$store.dispatch('setUser', response.data.user)
                    const friendId = await this.getFirstFriendIdChat()
                    // console.log("friendId: ",friendId)
                    this.$store.dispatch('setRoomChatUrl', `/chat/${this.$store.state.user.id}/${friendId}`)
                    this.$router.push(`/chat/${this.$store.state.user.id}/${friendId}`)
                }catch(err) {
                    this.error = err.response.data.error
                }
                
            },
            async getFirstFriendIdChat() {
                let allUsers = (await AuthenticationServices.getAllUsers()).data;
                if(allUsers.length == 1) {
                    // this.$store.dispatch('createBotChat')
                }
                allUsers = (await AuthenticationServices.getAllUsers()).data;
                for(let user of allUsers) {
                    if(user.id != this.$store.state.user.id) {
                        return user.id
                    }
                }
            },
            navigateTo(route) {
                window.location.href = route
            },
        },
    };
    </script>
    
    <style scoped>
    /* CUSTOM STYLE */
    
    #content {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        border: 1px solid lightgray;
        padding: 4rem 4rem;
        border-radius: 5px;
        background: #fefefe;
    }
    
    
    .navbar {
        background: #fafafa;
        /* position: absolute; */
        /* top: 0; */
        width: 100vw;
        height: 70px;
        box-shadow: 6.7px 6.7px 5.3px rgba(0, 0, 0, 0.028),
        22.3px 22.3px 17.9px rgba(0, 0, 0, 0.042),
        100px 100px 80px rgba(0, 0, 0, 0.07);
    }
    
    .nav {
        width: 80%;
        min-width: 400px;
        margin: auto;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        background: #fafafa;
    }
    
    #name_project {
        font-weight: 700;
    }
    
    .container {
        width: 400px;
        max-width: 95%;
        margin: auto;
    }
    
    .input {
        display: flex;
        flex-direction: column;
        margin-bottom: 15px;
    }
    
    .input > label {
        text-align: start;
    }
    
    .input > input {
        margin-top: 6px;
        height: 38px !important;
    }
    
    /* From uiverse.io */
    .btn-pers {
        position: relative;
        left: 50%;
        padding: 1em 2.5em;
        font-size: 12px;
        text-transform: uppercase;
        letter-spacing: 2.5px;
        font-weight: 700;
        color: #000;
        background-color: #fff;
        border: none;
        border-radius: 45px;
        box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
        transition: all 0.3s ease 0s;
        cursor: pointer;
        outline: none;
        transform: translateX(-50%);
        margin: 1em 0;
    }
    
    .btn-pers:hover {
        background-color: #198754;
        box-shadow: 0px 15px 20px rgba(46, 229, 157, 0.4);
        color: #fff;
        transform: translate(-50%, -7px);
    }
    
    .btn-pers:active {
        transform: translate(-50%, -1px);
    }
    
    /*  */
    
    .alternative-option {
        text-align: center;
    }
    
    .alternative-option > span {
        color: #0d6efd;
        cursor: pointer;
    }
    
    #sign_out {
        position: relative;
        left: 50%;
        transform: translateX(-50%);
    }
    </style>