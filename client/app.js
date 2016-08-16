/**
 *
 */

'use strict'

const webrtc2Images = require('./Webrtc2Images')
const messageViewModel = require('./MessageViewModel')
const messageModel = require('./MessageModel')
const messageView = require('./MessageView')

const uuid = require('uuid')
const sessionId = uuid.v4()

const model = messageModel(sessionId)
const viewModel = messageViewModel(webrtc2Images(), model)
messageView(viewModel)
