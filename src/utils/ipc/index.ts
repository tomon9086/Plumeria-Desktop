import { ipcRenderer } from 'electron'
import { Channel } from '@/types/ipc'

export const ipcr = <T, U>(channel: Channel, payload?: T): Promise<U> => new Promise((resolve) => {
  ipcRenderer.once(channel, (_event, args: U) => {
    resolve(args)
  })

  ipcRenderer.send(channel, payload)
})
