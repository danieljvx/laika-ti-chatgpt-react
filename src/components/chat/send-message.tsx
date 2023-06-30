import React, { ChangeEvent, FC, FormEvent, useEffect, useRef, useState, MouseEvent } from 'react'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import InputBase from '@mui/material/InputBase'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import SettingsIcon from '@mui/icons-material/Settings'
import AddReactionIcon from '@mui/icons-material/AddReaction'
import { Send } from '@mui/icons-material'
import { IRoom, ITheme } from '../../core/types'
import { useClasses } from '../../core/hooks'
import Popper from '@mui/material/Popper'
import Setting from './setting'
import classNames from 'classnames'
import EmojisPicker from './emojis-picker'

const useStyles = () => ({
  form: {
    backgraundColor: '#FFFFFF',
  },
  formDark: {
    backgroundColor: '#282c34 !important',
    '& input': {
      color: '#FFF',
    },
    '& hr': {
      borderColor: 'rgba(255, 255, 255, 0.12)',
    },
  },
  setting: {
    zIndex: 14000,
    boxShadow: '0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)',
    '& ul': {
      boxRadius: 10,
    },
  },
})

type Props = {
  room: IRoom | null
  roomLoading: boolean
  sendMessage: (message: string) => void
  open: boolean
  theme: ITheme
  setTheme: React.Dispatch<React.SetStateAction<ITheme>>
  audioEnable: boolean
  setAudioEnable: React.Dispatch<React.SetStateAction<boolean>>
}

const SendMessage: FC<Props> = ({ sendMessage, open, theme, setTheme, audioEnable, setAudioEnable }) => {
  const ref = useRef<HTMLDivElement>(null)
  const classes = useClasses(useStyles)
  const [text, setText] = useState('')
  const [anchorElSetting, setAnchorElSetting] = useState<null | HTMLElement>(null)
  const [openSetting, setOpenSetting] = useState(false)
  const [anchorElEmoji, setAnchorElEmoji] = useState<null | HTMLElement>(null)
  const [openEmoji, setOpenEmoji] = useState(false)
  const [emoji, setEmoji] = useState('')

  const onSetting = (event: MouseEvent<HTMLElement>) => {
    setAnchorElSetting(event.currentTarget)
    setOpenSetting(!openSetting)
  }

  const onEmoji = (event: MouseEvent<HTMLElement>) => {
    setAnchorElEmoji(event.currentTarget)
    setOpenEmoji(!openEmoji)
  }

  const onInputText = (e: ChangeEvent<HTMLInputElement>) => {
    setText(e.currentTarget.value)
  }

  const onSendMessage = () => {
    sendMessage(text)
    setText('')
  }

  const onSubmitText = (e: FormEvent) => {
    e.preventDefault()
    onSendMessage()
    return false
  }

  useEffect(() => {
    console.log('ref.current', ref.current)
    if (open && ref.current) {
      const input = ref.current.querySelector('input')
      input && input.focus()
    }
  }, [open])

  useEffect(() => {
    if (emoji !== '') {
      setText(`${text}${emoji}`)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [emoji])

  return (
    <Grid container style={{ padding: 0 }}>
      <Paper
        component='form'
        sx={{
          p: '2px 4px',
          display: 'flex',
          alignItems: 'center',
          width: '100%',
        }}
        className={classNames(classes.form, {
          [classes.formDark]: theme === 'dark',
        })}
        onSubmit={onSubmitText}
      >
        <IconButton color='primary' sx={{ p: '10px' }} aria-label='directions' onClick={onSetting}>
          <SettingsIcon color='info' />
        </IconButton>
        <Popper
          anchorEl={anchorElSetting}
          open={openSetting}
          placement='top-start'
          disablePortal={false}
          className={classes.setting}
          modifiers={[
            {
              name: 'flip',
              enabled: false,
              options: {
                altBoundary: false,
                rootBoundary: 'viewport',
                padding: 8,
              },
            },
            {
              name: 'preventOverflow',
              enabled: false,
              options: {
                altAxis: false,
                altBoundary: false,
                tether: false,
                rootBoundary: 'document',
                padding: 8,
              },
            },
            {
              name: 'arrow',
              enabled: true,
              options: {
                element: null,
              },
            },
          ]}
        >
          <Setting theme={theme} setTheme={setTheme} audioEnable={audioEnable} setAudioEnable={setAudioEnable} />
        </Popper>
        <IconButton sx={{ p: '10px' }} aria-label='menu' onClick={onEmoji}>
          <AddReactionIcon color='warning' />
        </IconButton>
        <Popper
          anchorEl={anchorElEmoji}
          open={openEmoji}
          placement='top-start'
          disablePortal={false}
          className={classes.setting}
          modifiers={[
            {
              name: 'flip',
              enabled: false,
              options: {
                altBoundary: false,
                rootBoundary: 'viewport',
                padding: 8,
              },
            },
            {
              name: 'preventOverflow',
              enabled: false,
              options: {
                altAxis: false,
                altBoundary: false,
                tether: false,
                rootBoundary: 'document',
                padding: 8,
              },
            },
            {
              name: 'arrow',
              enabled: true,
              options: {
                element: null,
              },
            },
          ]}
        >
          <EmojisPicker emoji={emoji} setEmoji={setEmoji} />
        </Popper>
        <Divider sx={{ height: 28, m: 0.5 }} orientation='vertical' />
        <InputBase
          ref={ref}
          autoFocus
          value={text}
          onChange={onInputText}
          sx={{ ml: 1, flex: 1 }}
          placeholder='Escribe un mensaje aquí'
          inputProps={{ 'aria-label': 'search google maps' }}
        />
        <Divider sx={{ height: 28, m: 0.5 }} orientation='vertical' />
        <IconButton
          onClick={onSendMessage}
          disabled={text === ''}
          color='primary'
          sx={{ p: '10px' }}
          aria-label='directions'
        >
          <Send color='success' />
        </IconButton>
      </Paper>
    </Grid>
  )
}

export default SendMessage
