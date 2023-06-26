import React, { FC, useEffect, useState } from 'react'
import Chat from './chat'
import IconFloat from './chat/icon-float'
import { IChat, IRoom, ITheme, IUser } from '../core/types'
import useSocket, { createRoom } from '../core/socket'

const LaikaChatGPT: FC<IChat> = ({ host, open, float, user, autoConnect, theme }) => {
  const socket = useSocket(host, !!autoConnect)
  const [wsConnected, setWSConnected] = useState(false)
  const [openChat, setOpenChat] = useState(!!open)
  const [userData, setUserData] = useState<IUser | null>(user)
  const [themeChat, setThemeChat] = useState<ITheme>(theme || 'light')
  const [room, setRoom] = useState<IRoom | null>(null)
  const [roomLoading, setRoomLoading] = useState(false)
  const [showNotification, setShowNotification] = useState(false)

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
    user && setUserData(user)
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
      />
      <Chat
        socket={socket}
        user={userData}
        open={openChat}
        setOpen={setOpenChat}
        theme={themeChat}
        room={room}
        roomLoading={roomLoading}
        isWSConnectedIn={wsConnected}
        setShowNotification={setShowNotification}
      />
    </>
  )
}

export default LaikaChatGPT
