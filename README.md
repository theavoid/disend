[![stars](https://img.shields.io/github/stars/theavoid/disend?color=yellow&logo=github&style=for-the-badge)](https://github.com/theavoid/disend)
[![license](https://img.shields.io/github/license/theavoid/disend?logo=github&style=for-the-badge)](https://github.com/theavoid/disend)
[![supportServer](https://img.shields.io/discord/711995199945179187?color=7289DA&label=Support&logo=discord&style=for-the-badge)](https://discord.com/users/599722407913062417)
[![forks](https://img.shields.io/github/forks/theavoid/disend?color=green&logo=github&style=for-the-badge)](https://github.com/theavoid/disend)
[![issues](https://img.shields.io/github/issues/theavoid/disend?color=red&logo=github&style=for-the-badge)](https://github.com/theavoid/disend)

<p align="center">
  <h3 align="center">Disend API</h3>

  <p align="center">
    Simplified Discord API.
    <br />
    <a href="https://discord.com/users/599722407913062417"><strong>Get support »</strong></a>
    <br />
    <br />
    <a href="https://github.com/theavoid/disend/issues">Report Bug</a>
    ·
    <a href="https://github.com/theavoid/disend/issues">Request Feature</a>
    ·
    <a href="https://thavo.me">Some link</a>
  </p>
</p>
Disend
# ✨ Disend: Simplified Discord API

-   <b>Disend</b> simplified discord api for users
-   <b>Disend</b> is improving every day with the Discord API!

# 📦 Installation

-   Using npm: `npm i disend`

# 🤓 Usage

```js
const Client = require("disend")
const client = new Client("token")

client.send("Hello World!", "channel_id")
// Sends a message to the specified channel.

client.update("message_id", "Updated Message!", "channel_id")
// Edits the specified message in the specified channel.

client.delete("message_id", "channel_id")
// Deletes the specified message in the specified channel.

client.getMessages("channel_id", "limit").then(messages => {
    console.log(messages)
})
// Retrieves message data from the specified channel.

client.addReact(channel, message_id, emoji)
// Adds emoji to specific message in the specific channel.

client.removeReact(channel, message_id, emoji)
// Removes emoji.

client.getReactions(channel, message_id, emoji)
// It fetches anyone who chooses the specific emoji.

client.deleteAllReactions(channel, message)
// Deletes all emoji in the specific message.

client.deleteAllReactionsForEmoji(channel, message, emoji)
// Deletes specific emoji in the specific message.

client.getChannelInvites(channel).then(channelInvites => {
    console.log(channelInvites)
})
// Fetchs all invites in the specific channel.

client.createChannelInvite(channel, options)
// Creates an invitation on a specific channel.

client.deleteChannelInvite(channel, invite)
// Deletes an invitation on specific channel.

client.typing(channel)
// Triggers typing in the specific channel.

client.getPinnedMessages(channel).then(pinnedMessages => {
    console.log(pinnedMessages)
})
// Fetchs pinned messages in specific channel.

client.pin(channel, message)
// It pins a specific message on a specific channel.

client.unpin(channel, message)
// It unpins a specific message on a specific channel.

```

# 📄 License

Copyright © 2021 [theavoid](https://github.com/theavoid).

Distributed under the [MIT](https://mit-license.org/) License. See `LICENSE` for more information.

# 🔥 Show your support

Give a ⭐️ if this project helped you!

# 📞 Contact

-   Mail: auth@thavo.me
-   Discord: https://discord.com/users/599722407913062417
