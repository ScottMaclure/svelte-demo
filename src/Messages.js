import Config from './config.js'

/**
 * TODO Use a display boolean flag instead?
 */
export function publishMessage(app, message) {

    message.id = message.id || Date.now() // FIXME should be fine...
    message.type = message.type || Config.messages.types.default

    let messages = app.get('messages') || []
    messages.push(message)
    app.set({ messages: messages })

    // Remove this message after N seconds.
    // FIXME Not ideal - better to change in place?
    // TODO Should be easily shared with other, unrelated actions.
    setTimeout(() => {
        let newMessages = app.get('messages').filter((e) => {
            return e.id !== message.id
        })
        app.set({ messages: newMessages })
    }, Config.messages.displayTime);

}