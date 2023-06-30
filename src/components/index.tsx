import React, { FC, useEffect, useState } from 'react'
import Chat from './chat'
import IconFloat from './chat/icon-float'
import { IChat, IProduct, IRoom, ITheme, IUser } from '../core/types'
import useSocket, { createRoom } from '../core/socket'

const createUserTemp = (): IUser => {
  const id = Math.floor(Math.random() * (100000 - 10000 + 10000) + 100000)
  const user: IUser = {
    id,
    fullname: `User Temp #${id}`,
    email: `${id}@laika.temp`,
    avatar: '',
    userId: id,
    tokenAuth: '',
    socketId: '',
    temp: true,
  }
  return user
}

const LaikaChatGPT: FC<IChat> = ({ host, open, float, user, autoConnect, theme, addProduct }) => {
  const socket = useSocket(host, !!autoConnect)
  const [wsConnected, setWSConnected] = useState(false)
  const [openChat, setOpenChat] = useState(!!open)
  const [userData, setUserData] = useState<IUser | null>(user)
  const [themeChat, setThemeChat] = useState<ITheme>(theme || 'light')
  const [room, setRoom] = useState<IRoom | null>(null)
  const [roomLoading, setRoomLoading] = useState(false)
  const [showNotification, setShowNotification] = useState(false)
  const [lastMessage, setLastMessage] = useState('')
  const [audioEnable, setAudioEnable] = useState(true)

  const addProductInto = (product: IProduct) => {
    console.log(`on addProductInto: `, product)
  }

  const createFirstRoom = (socketId: string) => {
    console.log('createFirstRoom', userData)
    setRoomLoading(true)
    if (userData) {
      createRoom(socketId, userData, null)
    }
  }

  useEffect(() => {
    console.log('userData?.userId', userData?.userId)
    if (userData?.userId) {
      socket.on('connect', () => {
        console.log('connect')
        setWSConnected(true)
        setTimeout(() => {
          console.log('setTimeout')
          createFirstRoom(socket.id)
        }, 800)
      })
      socket.on('connect_error', () => {
        setWSConnected(false)
      })
      socket.on('disconnect', () => {
        setWSConnected(false)
      })
      socket.on('join_room', (room) => {
        console.log('socket.on join_room', room)
        setRoom(room)
        setRoomLoading(false)
      })
      socket.connect()
    }
    return () => {
      socket && socket.off('connect')
      socket && socket.off('disconnect')
      socket && socket.off('chat')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userData])

  useEffect(() => {
    if (user) {
      setUserData(user)
    } else if (user === null) {
      setUserData(createUserTemp())
    }
  }, [user])

  useEffect(() => {
    openChat && setShowNotification(false)
  }, [openChat])

  useEffect(() => {
    setOpenChat(!!open)
  }, [open])

  useEffect(() => {
    theme && setThemeChat(theme)
  }, [theme])

  return (
    <>
      <IconFloat
        float={float || 'right-bottom'}
        open={openChat}
        setOpen={setOpenChat}
        wsConnected={wsConnected}
        showNotification={showNotification}
        title={lastMessage}
        audioEnable={audioEnable}
      />
      <Chat
        socket={socket}
        user={userData}
        open={openChat}
        setOpen={setOpenChat}
        room={room}
        roomLoading={roomLoading}
        isWSConnectedIn={wsConnected}
        setShowNotification={setShowNotification}
        addProduct={addProduct || addProductInto}
        setLastMessage={setLastMessage}
        theme={themeChat}
        setTheme={setThemeChat}
        audioEnable={audioEnable}
        setAudioEnable={setAudioEnable}
      />
    </>
  )
}

export default LaikaChatGPT
