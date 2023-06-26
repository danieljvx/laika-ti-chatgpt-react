import React, { FC, useEffect, useRef, useState } from 'react'
import { Socket } from 'socket.io-client'
import { styled } from '@mui/material/styles'
import Grid from '@mui/material/Grid'
import ListMessages from './list-messages'
import SendMessage from './send-message'
import Slide from '@mui/material/Slide'
import { TransitionProps } from '@mui/material/transitions'
import { ClientToServerEvents, IMessage, IProduct, IRoom, ITheme, IUser, ServerToClientEvents } from '../../core/types'
import { useClasses } from '../../core/hooks'
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'
import DialogActions from '@mui/material/DialogActions'
import BouncingDotsLoader from './bouncing-dots-loader'

const useStyles = () => ({
  dialog: {
    '& .MuiDialog-container': {
      alignItems: 'end',
    },
    '& .MuiDialog-paper': {
      height: '90vh',
      maxWidth: 600,
      maxHeight: '90vh',
      margin: 0,
      padding: 0,
      marginTop: 0,
      borderRadius: '12px 12px 0 0',
      zIndex: 1002,
    },
  },
  dialogTitle: {
    padding: '30px 40px !important',
    textAlign: 'center !important',
    fontSize: '24px !important',
    fontWeight: '700 !important',
    '& button': {
      color: '#000',
      fontSize: 24,
      fontWeight: 700,
      '& svg': {
        fontSize: 28,
      },
    },
  },
  dialogContent: {
    borderTop: 'none !important',
    padding: '0 16px',
  },
  dialogFooter: {
    padding: 0,
  },
})

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction='up' ref={ref} {...props} />
})

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}))

export interface DialogTitleProps {
  id: string
  children?: React.ReactNode
  onClose: () => void
  className: string
}

function BootstrapDialogTitle(props: DialogTitleProps) {
  const { children, onClose, ...other } = props

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label='close'
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  )
}

type Props = {
  socket: Socket<ServerToClientEvents, ClientToServerEvents>
  user: IUser | null
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  theme: ITheme
  room: IRoom | null
  roomLoading: boolean
  isWSConnectedIn: boolean
  setShowNotification: React.Dispatch<React.SetStateAction<boolean>>
  addProduct: (product: IProduct) => void
}

const Chat: FC<Props> = ({
  socket,
  user,
  open,
  setOpen,
  room,
  roomLoading,
  theme,
  isWSConnectedIn,
  setShowNotification,
  addProduct,
}) => {
  const listMessagesRef = useRef<HTMLUListElement>(null)
  const classes = useClasses(useStyles)
  const [loadSocket, setLoadSocket] = useState(false)
  const [messages, setMessages] = useState<IMessage[]>([])
  const [writing, setWriting] = useState(false)

  const sendMessage = (message: string) => {
    console.log('sendMessage', room)
    if (socket && room?.id && user) {
      const msgObject: IMessage = {
        user: user,
        time: new Date(),
        message,
        roomId: room.id,
        products: [],
      }
      socket.emit('chat', msgObject)
    }
  }

  const setListScrollToDown = () => {
    if (listMessagesRef.current) {
      listMessagesRef.current.scrollTop = listMessagesRef.current.scrollHeight
    }
  }

  useEffect(() => {
    console.log('useEffect socket', { socket, loadSocket })
    if (socket) {
      setLoadSocket(true)
      console.log('addMessage socket.on chat', socket)
      const addMessage = (msg: IMessage) => {
        console.log('socket.on chat', msg)
        setMessages((messages) => [...messages, { ...msg }])
        console.log('open', open)
        !open && setShowNotification(true)
      }
      const onWriting = (w: boolean) => {
        setWriting(w)
      }
      socket.on('chat', addMessage)
      socket.on('writing', onWriting)
    }
    return () => {
      socket && socket.removeListener('writing')
      socket && socket.removeListener('chat')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket, open])

  useEffect(() => {
    if (room?.messages) {
      setMessages(room?.messages)
    }
  }, [room])

  return (
    <BootstrapDialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={() => setOpen(false)}
      aria-describedby='alert-dialog-slide-description'
      className={classes.dialog}
      hideBackdrop
    >
      <BootstrapDialogTitle id='customized-dialog-title' onClose={() => setOpen(false)} className={classes.dialogTitle}>
        ¡Te ayudaré a buscar lo que necesita tu mascota!
      </BootstrapDialogTitle>
      <DialogContent dividers className={classes.dialogContent}>
        <Grid item xs={12}>
          <ListMessages
            ref={listMessagesRef}
            messages={messages}
            roomLoading={roomLoading}
            theme={theme}
            user={user}
            isWSConnectedIn={isWSConnectedIn}
            setListScrollToDown={setListScrollToDown}
            addProduct={addProduct}
          />
          <BouncingDotsLoader show={writing} />
        </Grid>
      </DialogContent>
      <DialogActions className={classes.dialogFooter}>
        <SendMessage open={open} room={room} roomLoading={roomLoading} sendMessage={sendMessage} />
      </DialogActions>
    </BootstrapDialog>
  )
}

export default Chat
