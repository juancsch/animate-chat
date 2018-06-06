const webrtc2Images = require('./Webrtc2Images')
const messageViewModel = require('./MessageViewModel')
const messageModel = require('./MessageModel')
const messageView = require('./MessageView')

const uuid = require('uuid')
const sessionId = uuid.v4()

messageView(
    messageViewModel(
        webrtc2Images(),
        messageModel(sessionId)
    )
)
