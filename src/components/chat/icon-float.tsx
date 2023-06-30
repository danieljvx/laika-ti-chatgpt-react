import React, { FC, useEffect, useState } from 'react'
import { useClasses } from '../../core/hooks'
import LaikaLogoProfile from '../../core/laika-logo-profile'
import classNames from 'classnames'
import Badge from '@mui/material/Badge'

const useStyles = () => ({
  content: {
    position: 'fixed',
    cursor: 'pointer',
    borderRadius: '50%',
    maxWidth: 250,
    height: 100,
    display: 'flex',
    flexDirection: 'row',
    zIndex: 999,
  },
  leftBottom: {
    left: '2%',
    bottom: '2%',
  },
  rightBottom: {
    right: '2%',
    bottom: '8%',
  },
  leftTop: {
    left: '2%',
    top: '2%',
  },
  rightTop: {
    right: '2%',
    top: '2%',
  },
  red: {
    // boxShadow: "4px 2px 6px 2px rgba(245, 66, 66, 0.5)",
  },
  green: {
    // boxShadow: "4px 2px 6px 2px rgba(66, 245, 108, 0.5)",
  },
  icon: {
    display: 'inline-block',
    height: 85,
    zIndex: 1001,
  },
  shake: {
    animation: 'shake 0.5s',
    animationIterationCount: 'infinite',
    '@keyframes shake': {
      '0%': { transform: 'translate(1px, 1px) rotate(0deg)' },
      '10%': { transform: 'translate(-1px, -2px) rotate(-1deg)' },
      '20%': { transform: 'translate(-3px, 0px) rotate(1deg)' },
      '30%': { transform: 'translate(3px, 2px) rotate(0deg)' },
      '40%': { transform: 'translate(1px, -1px) rotate(1deg)' },
      '50%': { transform: 'translate(-1px, 2px) rotate(-1deg)' },
      '60%': { transform: 'translate(-3px, 1px) rotate(0deg)' },
      '70%': { transform: 'translate(3px, 1px) rotate(-1deg)' },
      '80%': { transform: 'translate(-1px, -1px) rotate(1deg)' },
      '90%': { transform: 'translate(1px, 2px) rotate(0deg)' },
      '100%': { transform: 'translate(1px, -2px) rotate(-1deg)' },
    },
  },
  contentTitle: {
    width: 0,
    borderRadius: 40,
    backgroundColor: '#FFF',
    boxShadow: '0px 0px 24.1131px rgba(39, 25, 56, 0.3)',
    padding: '5px 0 5px 0',
    height: 55,
    marginTop: 10,
    marginRight: '-50px',
    transitionProperty: 'width',
    transitionDuration: '1s',
    overflow: 'hidden',
    zIndex: 1000,
  },
  contentTitleShow: {
    width: 230,
    padding: '5px 35px 5px 15px',
  },
  title: {
    width: 162,
    fontWeight: 600,
    fontSize: 14,
    textAlign: 'center',
    margin: 4,
    transitionProperty: 'opacity',
    transitionDuration: '0.8s',
    opacity: 0,
    userSelect: 'none',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
  },
  titleShow: {
    fontWeight: 600,
    fontSize: 14,
    textAlign: 'center',
    margin: 4,
    opacity: 1,
  },
  iconNotification: {
    '& > span': {
      right: 12,
      top: 12,
      width: 15,
      height: 15,
      borderRadius: '50%',
      transformOrigin: '50% 50%',
    },
  },
})

const audio: HTMLAudioElement | undefined =
  typeof Audio !== 'undefined'
    ? new Audio('https://drive.google.com/uc?export=download&id=1M95VOpto1cQ4FQHzNBaLf0WFQglrtWi7')
    : undefined

type Props = {
  float: string
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  wsConnected: boolean
  title?: string
  showNotification: boolean
  audioEnable: boolean
}

const IconFloat: FC<Props> = ({ float, open, setOpen, wsConnected, title, showNotification, audioEnable }) => {
  const classes = useClasses(useStyles)
  const [showTitle, setShowTitle] = useState(false)
  const [message, setMessage] = useState('')
  const [shake, setShake] = useState(false)

  const play = () => {
    audio?.play()
  }

  useEffect(() => {
    if (audio?.muted) {
      audio.muted = audioEnable
    }
  }, [audioEnable])

  useEffect(() => {
    !open && setShowTitle(false)
  }, [open])

  useEffect(() => {
    if (wsConnected && message !== '') {
      setShowTitle(true)
    }
  }, [message, wsConnected])

  useEffect(() => {
    if (title) {
      setShake(true)
      setShowTitle(false)
      audioEnable && play()
      setTimeout(() => {
        setShake(false)
        setMessage(title)
        setShowTitle(true)
      }, 600)
    }
  }, [audioEnable, message, showNotification, title])

  return (
    <div
      className={classNames(classes.content, {
        [classes.leftBottom]: float === 'left-bottom',
        [classes.rightBottom]: float === 'right-bottom',
        [classes.leftTop]: float === 'left-top',
        [classes.rightTop]: float === 'right-top',
        [classes.red]: !wsConnected,
        [classes.green]: wsConnected,
      })}
      onClick={() => wsConnected && setOpen(true)}
    >
      <div
        className={classNames(classes.contentTitle, {
          [classes.contentTitleShow]: showTitle,
        })}
      >
        <p
          className={classNames(classes.title, {
            [classes.titleShow]: showTitle,
          })}
        >
          {message}
        </p>
      </div>
      <div className={classes.icon}>
        <Badge color='error' variant='dot' invisible={!showNotification} className={classes.iconNotification}>
          <LaikaLogoProfile width={75} height={85} className={shake ? classes.shake : ''} />
        </Badge>
      </div>
    </div>
  )
}

export default IconFloat
