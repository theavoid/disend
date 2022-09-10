const axios = require("axios")

class Client {
    constructor(token) {
        if (!token) throw new Error("Token is not provided")

        this.token = token;     
    }
    send(message, channel) {
        if (!channel) throw new Error("Channel is not provided")
        if (!message) throw new Error("Message is not provided")
    
        const headers = {
            'authorization': this.token
        }

        const body = {
            'content': message
        }
        
        
        axios.request({
            url: "https://discord.com/api/v9/channels/" + channel + "/messages",
            method: 'post',
            headers: headers,
            data: body
        }).then(res => {

            if (res.status !== 200) throw new Error("Message could not be sent")

            return res.data;

        }).catch(err => {
            console.log(err)
            if (err.code == "ERR_BAD_REQUEST") throw new Error("Message could not be sent. Please check your token and channel id.")
            if (err.code == "ECONNREFUSED") throw new Error("Message could not be sent. Please internet connection.")
            if (err.code == "ECONNRESET") throw new Error("Message could not be sent. Please check your internet connection.")
            throw new Error("Message could not be sent")



        })

    }
    sendToUser(message, user) {
        
        if (!message || !user) throw new Error("Message or user is not provided")
        
        const headers = {
            'Authorization': this.token
        }
        
        const createBody = {
            "recipient_id": user
        }
        
        axios.request({
            url: "https://discord.com/api/v9/users/@me/channels",
            method: 'post',
            headers: headers,
            data: createBody
        }).then(res => {
            
            if (res.status !== 200) throw new Error("Message could not be sent")
            let channel = res.data.id;

            const sendBody = {
                'content': message
            }

            axios.request({
                url: "https://discord.com/api/v9/channels/" + channel + "/messages",
                method: 'post',
                headers: headers,
                data: sendBody
            }).then(res => {
                if (res.status !== 200) throw new Error("Message could not be sent")
            }).catch(err => {
                console.log(err)
                if (err.code == "ERR_BAD_REQUEST") throw new Error("Message could not be sent. Please check your token and channel id.")
                if (err.code == "ECONNREFUSED") throw new Error("Message could not be sent. Please internet connection.")
                if (err.code == "ECONNRESET") throw new Error("Message could not be sent. Please check your internet connection.")
                throw new Error("Message could not be sent")
            })

            return res.data;
            
        }).catch(err => {
            console.log(err.data)
            if (err.code == "ERR_BAD_REQUEST") throw new Error("Message could not be sent. Please check your message id.")
            if (err.code == "ECONNREFUSED") throw new Error("Message could not be sent. Please check your internet connection.")
            if (err.code == "ECONNRESET") throw new Error("Message could not be sent. Please check your internet connection.")
            throw new Error("Message could not be sent.")
    })
    
    }
    delete(message, channel) {
            
            if (!message) throw new Error("Message is not provided")
    
            const headers = {
                'authorization': this.token
            }            
            
            axios.request({
                url: "https://discord.com/api/v9/channels/" + channel + "/messages/" + message,
                method: 'delete',
                headers: headers,
                data: null
            }).then(res => {
    
                if (res.status !== 200) throw new Error("Message could not be deleted")
    
                return res.data;
    
            }).catch(err => {
                if (err.code == "ERR_BAD_REQUEST") throw new Error("Message could not be deleted. Please check your message id.")
                if (err.code == "ECONNREFUSED") throw new Error("Message could not be deleted. Please check your internet connection.")
                if (err.code == "ECONNRESET") throw new Error("Message could not be deleted. Please check your internet connection.")
                throw new Error("Message could not be sent")
    })
    }
    update(message, newMessage, channel) {
                
            if (!message) throw new Error("Message is not provided")
            if (!newMessage) throw new Error("New message is not provided")
    
            const headers = {
                'authorization': this.token
            }            
            
            const body = {
                'content': newMessage
            }
            
            axios.request({
                url: "https://discord.com/api/v9/channels/" + channel + "/messages/" + message,
                method: 'patch',
                headers: headers,
                data: body
            }).then(res => {
    
                if (res.status !== 200) throw new Error("Message could not be uptadet")
    
                return res.data;
    
            }).catch(err => {
                if (err.code == "ERR_BAD_REQUEST") throw new Error("Message could not be updated. Please check your message id.")
                if (err.code == "ECONNREFUSED") throw new Error("Message could not be updated. Please check your internet connection.")
                if (err.code == "ECONNRESET") throw new Error("Message could not be updated. Please check your internet connection.")
                throw new Error("Message could not be updated.")
    })
    }
    getMessages(channel, limit = 10) {

        if (!channel) throw new Error("Channel is not provided")

        const headers = {
            'authorization': this.token
        }

       return axios.request({
            url: "https://discord.com/api/v9/channels/" + channel + "/messages?limit=" + limit,
            method: 'get',
            headers: headers,
            data: null
        }).then(res => { return res.data.reverse() })
        .catch(err => {
            if (err.code == "ERR_BAD_REQUEST") throw new Error("Messages could not be fetched. Please check your channel id.")
            if (err.code == "ECONNREFUSED") throw new Error("Messages could not be fetched. Please check your internet connection.")
            if (err.code == "ECONNRESET") throw new Error("Messages could not be fetched. Please check your internet connection.")
            throw new Error("Messages could not be fetched.")
    })

    }
    addReact(channel, message, emoji) {
            
            if (!message) throw new Error("Message is not provided")
            if (!emoji) throw new Error("Emoji is not provided")
    
            const headers = {
                'authorization': this.token
            }
        
            axios.request({
                url: encodeURI("https://discord.com/api/v9/channels/" + channel + "/messages/" + message + "/reactions/" + emoji + "/@me"),
                method: 'put',
                headers: headers,
                data: null
            }).then(res => {
    
                if (res.status !== 204) throw new Error("Reaction could not be added")
    
                return res.data;
    
            }).catch(err => {
                if (err.code == "ERR_BAD_REQUEST") throw new Error("Reaction could not be added. Please check your message id.")
                if (err.code == "ECONNREFUSED") throw new Error("Reaction could not be added. Please check your internet connection.")
                if (err.code == "ECONNRESET") throw new Error("Reaction could not be added. Please check your internet connection.")
                throw new Error("Reaction could not be added.")
    })
    
        }
    removeReact(channel, message, emoji) {
                    
                    if (!message) throw new Error("Message is not provided")
                    if (!emoji) throw new Error("Emoji is not provided")
            
                    const headers = {
                        'authorization': this.token
                    }
                
                    axios.request({
                        url: encodeURI("https://discord.com/api/v9/channels/" + channel + "/messages/" + message + "/reactions/" + emoji + "/@me"),
                        method: 'delete',
                        headers: headers,
                        data: null
                    }).then(res => { return res.data.reverse() })            
                    .catch(err => {
                        if (err.code == "ERR_BAD_REQUEST") throw new Error("Reaction could not be removed. Please check your message id.")
                        if (err.code == "ECONNREFUSED") throw new Error("Reaction could not be removed. Please check your internet connection.")
                        if (err.code == "ECONNRESET") throw new Error("Reaction could not be removed. Please check your internet connection.")
                        throw new Error("Reaction could not be removed.")
            })
            
    }
    getReactions(channel, message, emoji) {
                            
                if (!message) throw new Error("Message is not provided")
                if (!emoji) throw new Error("Emoji is not provided")
        
                const headers = {
                    'authorization': this.token
                }
            
                return axios.request({
                    url: encodeURI("https://discord.com/api/v9/channels/" + channel + "/messages/" + message + "/reactions/" + emoji),
                    method: 'get',
                    headers: headers,
                    data: null
                }).then(res => {
        
                    if (res.status !== 200) throw new Error("Reactions could not be fetched")
        
                    return res.data;
        
                }).catch(err => {
                    if (err.code == "ERR_BAD_REQUEST") throw new Error("Reactions could not be fetched. Please check your message id.")
                    if (err.code == "ECONNREFUSED") throw new Error("Reactions could not be fetched. Please check your internet connection.")
                    if (err.code == "ECONNRESET") throw new Error("Reactions could not be fetched. Please check your internet connection.")
                    throw new Error("Reactions could not be fetched.")
        })
                    
    }
    deleteAllReactions(channel, message) {

                    if (!message) throw new Error("Message is not provided")
            
                    const headers = {
                        'authorization': this.token
                    }
                
                    axios.request({
                        url: "https://discord.com/api/v9/channels/" + channel + "/messages/" + message + "/reactions",
                        method: 'delete',
                        headers: headers,
                        data: null
                    }).then(res => {
            
                        if (res.status !== 200) throw new Error("Reactions could not be deleted")
            
                        return res.data;
            
                    }).catch(err => {
                        if (err.code == "ERR_BAD_REQUEST") throw new Error("Reactions could not be deleted. Please check your message id.")
                        if (err.code == "ECONNREFUSED") throw new Error("Reactions could not be deleted. Please check your internet connection.")
                        if (err.code == "ECONNRESET") throw new Error("Reactions could not be deleted. Please check your internet connection.")
                        throw new Error("Reactions could not be deleted.")
        })

        }
        deleteAllReactionsForEmoji(channel, message, emoji) {
                
                if (!message) throw new Error("Message is not provided")
                if (!emoji) throw new Error("Emoji is not provided")
        
                const headers = {
                    'authorization': this.token
                }
            
                axios.request({
                    url: encodeURI("https://discord.com/api/v9/channels/" + channel + "/messages/" + message + "/reactions/" + emoji),
                    method: 'delete',
                    headers: headers,
                    data: null
                }).then(res => {
        
                    if (res.status !== 200) throw new Error("Reactions could not be deleted")
        
                    return res.data;
        
                }).catch(err => {
                    if (err.code == "ERR_BAD_REQUEST") throw new Error("Reactions could not be deleted. Please check your message id.")
                    if (err.code == "ECONNREFUSED") throw new Error("Reactions could not be deleted. Please check your internet connection.")
                    if (err.code == "ECONNRESET") throw new Error("Reactions could not be deleted. Please check your internet connection.")
                    throw new Error("Reactions could not be deleted.")
    })

    }
    getChannelInvites(channel) {
            
            if (!channel) throw new Error("Channel is not provided")
        
            const headers = {
                'authorization': this.token
            }
        
            return axios.request({
                url: "https://discord.com/api/v9/channels/" + channel + "/invites",
                method: 'get',
                headers: headers,
                data: null
            }).then(res => {
        
                if (res.status !== 200) throw new Error("Invites could not be fetched")
        
                return res.data;
        
            }).catch(err => {
                if (err.code == "ERR_BAD_REQUEST") throw new Error("Invites could not be fetched. Please check your channel id.")
                if (err.code == "ECONNREFUSED") throw new Error("Invites could not be fetched. Please check your internet connection.")
                if (err.code == "ECONNRESET") throw new Error("Invites could not be fetched. Please check your internet connection.")
                throw new Error("Invites could not be fetched.")
    })
    
    }
    createChannelInvite(channel, options) {
                
                if (!channel) throw new Error("Channel is not provided")
            
                const headers = {
                    'authorization': this.token
                }
            
                return axios.request({
                    url: "https://discord.com/api/v9/channels/" + channel + "/invites",
                    method: 'post',
                    headers: headers,
                    data: options
                }).then(res => {
            
                    if (res.status !== 200) throw new Error("Invite could not be created")
            
                    return res.data;
            
                }).catch(err => {
                    if (err.code == "ERR_BAD_REQUEST") throw new Error("Invite could not be created. Please check your channel id.")
                    if (err.code == "ECONNREFUSED") throw new Error("Invite could not be created. Please check your internet connection.")
                    if (err.code == "ECONNRESET") throw new Error("Invite could not be created. Please check your internet connection.")
                    throw new Error("Invite could not be created.")
        })
        
     }
     deleteChannelInvite(channel, invite) {
                        
            if (!channel) throw new Error("Channel is not provided.")
            if (!invite) throw new Error("Invite is not provided.")
        
            const headers = {
                'authorization': this.token
            }
        
            return axios.request({
                url: "https://discord.com/api/v9/invites/" + invite,
                method: 'delete',
                headers: headers,
                data: null
            }).then(res => {
        
                if (res.status !== 200) throw new Error("Invite could not be deleted")
        
                return res.data;
        
            }).catch(err => {
                if (err.code == "ERR_BAD_REQUEST") throw new Error("Invite could not be deleted. Please check your channel id.")
                if (err.code == "ECONNREFUSED") throw new Error("Invite could not be deleted. Please check your internet connection.")
                if (err.code == "ECONNRESET") throw new Error("Invite could not be deleted. Please check your internet connection.")
                throw new Error("Invite could not be deleted.")
    })
    
    }
    typing(channel) {
            
            if (!channel) throw new Error("Channel is not provided.")
        
            const headers = {
                'authorization': this.token
            }
        
            return axios.request({
                url: "https://discord.com/api/v9/channels/" + channel + "/typing",
                method: 'post',
                headers: headers,
                data: null
            }).then(res => {
        
                if (res.status !== 204) throw new Error("Typing could not be sent.")
        
                return res.data;
        
            }).catch(err => {
                if (err.code == "ERR_BAD_REQUEST") throw new Error("Typing could not be sent. Please check your channel id.")
                if (err.code == "ECONNREFUSED") throw new Error("Typing could not be sent. Please check your internet connection.")
                if (err.code == "ECONNRESET") throw new Error("Typing could not be sent. Please check your internet connection.")
                throw new Error("Typing could not be sent.")
    })
        
    }
    getPinnedMessages(channel) {
                
            if (!channel) throw new Error("Channel is not provided.")
        
            const headers = {
                'authorization': this.token
            }
        
            return axios.request({
                url: "https://discord.com/api/v9/channels/" + channel + "/pins",
                method: 'get',
                headers: headers,
                data: null
            }).then(res => {
        
                if (res.status !== 200) throw new Error("Pinned messages could not be fetched.")
        
                return res.data;
        
            }).catch(err => {
                if (err.code == "ERR_BAD_REQUEST") throw new Error("Pinned messages could not be fetched. Please check your channel id.")
                if (err.code == "ECONNREFUSED") throw new Error("Pinned messages could not be fetched. Please check your internet connection.")
                if (err.code == "ECONNRESET") throw new Error("Pinned messages could not be fetched. Please check your internet connection.")
                throw new Error("Pinned messages could not be fetched.")
    })
            
    }
    pin(channel, message) {
                        
            if (!channel) throw new Error("Channel is not provided.")
            if (!message) throw new Error("Message is not provided.")
        
            const headers = {
                'authorization': this.token
            }
        
            return axios.request({
                url: "https://discord.com/api/v9/channels/" + channel + "/pins/" + message,
                method: 'put',
                headers: headers,
                data: null
            }).then(res => {
        
                if (res.status !== 204) throw new Error("Message could not be pinned.")
        
                return res.data;
        
            }).catch(err => {
                if (err.code == "ERR_BAD_REQUEST") throw new Error("Message could not be pinned. Please check your channel id.")
                if (err.code == "ECONNREFUSED") throw new Error("Message could not be pinned. Please check your internet connection.")
                if (err.code == "ECONNRESET") throw new Error("Message could not be pinned. Please check your internet connection.")
                throw new Error("Message could not be pinned.")
    })
                
    }
    unpin(channel, message) {
                                
        if (!channel) throw new Error("Channel is not provided.")
        if (!message) throw new Error("Message is not provided.")
    
        const headers = {
            'authorization': this.token
        }
    
        return axios.request({
            url: "https://discord.com/api/v9/channels/" + channel + "/pins/" + message,
            method: 'delete',
            headers: headers,
            data: null
        }).then(res => {
    
            if (res.status !== 204) throw new Error("Message could not be unpinned.")
    
            return res.data;
    
        }).catch(err => {
            if (err.code == "ERR_BAD_REQUEST") throw new Error("Message could not be unpinned. Please check your channel id.")
            if (err.code == "ECONNREFUSED") throw new Error("Message could not be unpinned. Please check your internet connection.")
            if (err.code == "ECONNRESET") throw new Error("Message could not be unpinned. Please check your internet connection.")
            throw new Error("Message could not be unpinned.")
})
                
        }
        
        

}

module.exports = Client;