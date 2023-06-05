<template>
    <div class="chat">
        <div class="chat-header clearfix">
            <div class="row">
                <div class="col-lg-6">
                    <a href="javascript:void(0);" data-toggle="modal" data-target="#view_info">
                    <img :src="userChatWith.avatar" alt="avatar" style="border-radius: 50%; height: 64px; width: 64px;" >
                    </a>
                    <div class="chat-about">
                    <h6 class="m-b-0">{{userChatWith.name}}</h6>
                    <!-- <small>Last seen: 2 hours ago</small> -->
                    </div>
                </div>
                <div class="col-lg-6 hidden-sm text-right">
                    <a href="javascript:void(0);" class="btn btn-outline-secondary"><i class="fa fa-camera"></i></a>
                    <a href="javascript:void(0);" class="btn btn-outline-primary"><i class="fa fa-image"></i></a>
                    <a href="javascript:void(0);" class="btn btn-outline-info"><i class="fa fa-cogs"></i></a>
                    <a href="javascript:void(0);" class="btn btn-outline-warning"><i class="fa fa-question"></i></a>
                </div>
            </div>
        </div>
        <div class="chat-history">
            <ul class="m-b-0">
                <li class="clearfix" v-for="singleMessage,idx in allMessage" :key="idx">
                    <div v-if="singleMessage.send_id == this.$store.state.user.id">
                        <div class="message-data" style="text-align: right;">
                            <span class="message-data-time">{{singleMessage.time}}</span>
                        </div>
                        <div class="message other-message float-right">
                            {{singleMessage.message}}
                        </div>
                    </div>
                    <div v-else>
                        <div class="message-data" style="text-align: left;">
                            <span class="message-data-time ">{{singleMessage.time}}</span>
                        </div>
                        <div class="message my-message" style="float: left">{{singleMessage.message}}</div>
                    </div>
                </li>
            </ul>
        </div>
        <div class="chat-message clearfix" style="width: 100%;">
            <div class="input-group mb-0">
                <div class="input-group-prepend">
                    <span class="input-group-text" id="input-send" @click="sendData"><i class="fa fa-send"></i></span>
                </div>
                <input type="text" class="form-control" placeholder="Enter text here..." id="form-input-message" v-model="message" @keyup.enter="sendData" >
            </div>
        </div>
    </div>
</template>


<script>
import SocketioService from '../plugins/sockets'
import AuthenticationServices from '@/services/AuthenticationServices'
import MessageServices from '@/services/MessageServices'

export default {
    name: "ChatComponent",
    data() {
        return {
            allMessage: [],
            message: "",
            userChatWith: {
                avatar: "",
                name: ""
            },
            friendId: this.$route.params.friendId,
            userId: this.$route.params.userId
        }
    },
    methods: {
        async sendData() {
            if(this.message) {
                const now = new Date()
                const timeSendMessage = now.toLocaleTimeString('en-US',{
                    hour: '2-digit',
                    minute: '2-digit',
                })
                
                await this.storeMessageToDB({
                    send_id: this.userId,
                    receive_id: this.friendId,
                    message: this.message
                })

                SocketioService.sendMessage({
                    send_id: this.userId,
                    receive_id: this.friendId,
                    time: `${timeSendMessage}, Today`,
                    message: this.message
                })
                this.message = ''
            }
        },
        async getInfoUserChatWith() {
            return (await AuthenticationServices.getUser(this.friendId)).data
        },
        async storeMessageToDB(data) {
            try{
                const message = await MessageServices.sendMessage(data)
                console.log("message send: ", message)
            }catch(err) {
                console.log( err)
            }
        },
        async getAllMessage(userId, friendId) {
            const messages = (await MessageServices.getMessage(userId, friendId)).data
            messages.forEach((mes) => {
                const dateParse = Date.parse(mes.createdAt)
                const date = new Date(dateParse)

                this.allMessage.push({
                    send_id: mes.send_id,
                    receive_id: mes.receive_id,
                    message: mes.message,
                    time: date
                })
                
            })
            
        }
    },
    async mounted() {
        this.userChatWith = await this.getInfoUserChatWith()
        await this.getAllMessage(this.userId, this.friendId)
        await this.getAllMessage(this.friendId, this.userId)
        this.allMessage.sort((a,b) => a.time > b.time ? 1 : -1)
        this.allMessage.map((mes) => {
            let today = new Date()
            today = today.toLocaleDateString('en-US')
            const time = mes.time.toLocaleTimeString('en-US',{
                hour: '2-digit',
                minute: '2-digit',
                
            })
            let dateConvert = mes.time.toLocaleDateString('en-US')

            if(today == dateConvert) {
                dateConvert = 'Today'
            }

            mes.time = `${time}, ${dateConvert}`
        })

        let chatHistoryElement = this.$el.querySelector(".chat-history");
        chatHistoryElement.scrollTop = chatHistoryElement.scrollHeight
        console.log(chatHistoryElement.scrollHeight)

        
        SocketioService.socket.on('return-message', ({data, from, to}) => {
            if((this.userId == from && this.friendId == to) || (this.userId == to && this.friendId == from) ){
                this.allMessage.push({
                    send_id: from,
                    receive_id: to,
                    message: data.message,
                    time: data.time
                })

            }
            chatHistoryElement.scrollTop = chatHistoryElement.scrollHeight 
        })

    }
}
</script>

<style scoped>
.chat .chat-header {
padding: 15px 20px;
border-bottom: 2px solid #f4f7f6;
}

.chat .chat-header img {
float: left;
border-radius: 40px;
width: 40px;
}

.chat .chat-header .chat-about {
float: left;
padding-left: 10px;
}

.chat .chat-history {
padding: 20px;
border-bottom: 2px solid #fff;
height: 600px;
overflow-y: scroll;
}

.chat .chat-history ul {
padding: 0;
}

.chat .chat-history ul li {
list-style: none;
margin-bottom: 30px;
}

.chat .chat-history ul li:last-child {
margin-bottom: 0px;
}

.chat .chat-history .message-data {
margin-bottom: 15px;
}

.chat .chat-history .message-data img {
border-radius: 40px;
width: 40px;
}

.chat .chat-history .message-data-time {
color: #434651;
padding-left: 6px;
}

.chat .chat-history .message {
color: #444;
padding: 18px 20px;
line-height: 26px;
font-size: 16px;
border-radius: 7px;
display: inline-block;
position: relative;
}

.chat .chat-history .message:after {
bottom: 100%;
left: 7%;
border: solid transparent;
content: " ";
height: 0;
width: 0;
position: absolute;
pointer-events: none;
border-bottom-color: #fff;
border-width: 10px;
margin-left: -10px;
}

.chat .chat-history .my-message {
background: #efefef;
}

.chat .chat-history .my-message:after {
bottom: 100%;
left: 30px;
border: solid transparent;
content: " ";
height: 0;
width: 0;
position: absolute;
pointer-events: none;
border-bottom-color: #efefef;
border-width: 10px;
margin-left: -10px;
}

.chat .chat-history .other-message {
background: #e8f1f3;
text-align: right;
}

/* .chat .chat-history .other-message:after {
border-bottom-color: #e8f1f3;
left: 93%
} */

.chat .chat-message {
padding: 20px;
}



.float-right {
float: right;
}

.clearfix:after {
visibility: hidden;
display: block;
font-size: 0;
content: " ";
clear: both;
height: 0;
}

@media only screen and (max-width: 767px) {



.chat .chat-header {
    border-radius: 0.55rem 0.55rem 0 0;
}

.chat-history {
    height: 300px;
    overflow-x: auto;
}
}

@media only screen and (min-width: 768px) and (max-width: 992px) {
.chat-list {
    height: 650px;
    overflow-x: auto;
}

.chat-history {
    height: 600px;
    overflow-x: auto;
}
}

@media only screen and (min-device-width: 768px) and (max-device-width: 1024px) and (orientation: landscape) and (-webkit-min-device-pixel-ratio: 1) {
.chat-list {
    height: 480px;
    overflow-x: auto;
}

.chat-history {
    height: calc(100vh - 350px);
    overflow-x: auto;
}
}
</style>