import { EventEmitter } from 'events'

export default class Clock extends EventEmitter {
  constructor() {
    super()
    this._scheduleTick = this._scheduleTick.bind(this)
    this._tick = this._tick.bind(this)

    this._scheduleTick()
  }

  _scheduleTick() {
    this._time = new Date()
    setTimeout(this._tick, 1000 - this._time.getMilliseconds())
  }

  _tick() {
    this._scheduleTick()
    this.emit('tick', {
      timestamp: new Date().getTime()
    })
  }
}
