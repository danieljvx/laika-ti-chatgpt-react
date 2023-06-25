import { IUser, ClientToServerEvents, ServerToClientEvents } from './types'
import { Socket, io } from 'socket.io-client'

let socket: Socket<ServerToClientEvents, ClientToServerEvents> | null = null

export const createRoom = (socketId: string, host: IUser, guest: IUser | undefined | null) => {
  console.log('createRoom', {
    socket,
    socketId,
  })
  if (socketId !== '' && socket) {
    console.log('join_room', {
      host: { ...host, ...{ socketId: socketId } },
      guest: guest ? { ...guest, ...{ socketId: socketId } } : null,
    })
    socket.emit('join_room', {
      host: { ...host, ...{ socketId: socketId } },
      guest: guest ? { ...guest, ...{ socketId: socketId } } : null,
    })
  }
}

const useSocket = (host: string, autoConnect: boolean) => {
  if (socket === null) {
    socket = io(host, {
      autoConnect,
    })
  }
  return socket
}

export default useSocket
