import uuid from 'uuid'

import webrtc2Images from './Webrtc2Images'
import messageViewModel from './MessageViewModel'
import messageModel from './MessageModel'
import messageView from './MessageView'

const sessionId = uuid.v4()

messageView(
    messageViewModel(
        webrtc2Images(),
        messageModel(sessionId)
    )
)
