export function ws(endpoint, handler) {
  const socket = new WebSocket(endpoint)
  const connect = () => ws(endpoint, handler)
  const send = (eventName, eventData) => socket.send(JSON.stringify({
    eventName,
    ...eventData
  }))
  const ping = () => send('ping')
  const emit = handler(connect, ping)
  socket.onopen = event => emit('open', event)
  socket.onclose = event => emit('close', event)
  socket.onerror = event => emit('error', event)
  socket.onmessage = event => {
    const string = event.data
    const {
      eventName,
      ...eventData
    } = JSON.parse(string)
    emit(eventName, eventData)
  }
}
