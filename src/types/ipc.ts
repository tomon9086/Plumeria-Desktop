export const CHANNEL = {
  ping: 'ping',
  openFileDialog: 'open-file-dialog'
}
export type Channel = typeof CHANNEL[keyof typeof CHANNEL]
