// eventSourceService.ts
type TCallback = (data: object) => void

class EventSourceService {
  private url: string = ""
  private eventSource: EventSource | null = null
  constructor(url: string) {
    this.url = url
    this.eventSource = null
  }

  startListening(callback: TCallback) {
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
