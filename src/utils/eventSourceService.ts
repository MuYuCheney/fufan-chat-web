// eventSourceService.ts
class EventSourceService {
  constructor(url) {
    this.url = url
    this.eventSource = null
  }

  startListening(callback) {
    this.eventSource = new EventSource(this.url)
    this.eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data)
      callback(data)
    }
  }

  stopListening() {
    if (this.eventSource) {
      this.eventSource.close()
    }
  }
}

export default EventSourceService
