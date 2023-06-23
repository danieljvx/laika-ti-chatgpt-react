import React, { FC } from 'react'
import moment from 'moment'
import { useClasses } from '../../core/hooks'
import Grid from '@mui/material/Grid'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import classNames from 'classnames'
import { ITheme, IUser } from '../../core/types'
import laikaGPTIcon from '../../core/laika-profile.svg'
import Avatar from '@mui/material/Avatar'
import { AccountCircle } from '@mui/icons-material'
import Tooltip from '@mui/material/Tooltip'

const useStyles = () => ({
  text: {
    marginTop: 2,
    marginBottom: 0,
  },
  time: {
    marginTop: 2,
    marginBottom: 2,
  },
  left: {
    textAlign: 'left',
  },
  right: {
    textAlign: 'right',
  },
  messageArea: {},
  messageAreaRight: {
    justifyContent: 'end !important',
  },
  message: {
    width: 'auto',
    maxWidth: 250,
    minWidth: 150,
    borderRadius: 10,
    padding: '0px 10px',
    position: 'relative',
  },
  messageDarkLeft: {
    backgroundColor: '#f7efff',
    color: '#000000',
  },
  messageDarkRight: {
    backgroundColor: '#d2acff',
    color: '#000000',
  },
  messageDarkLeftDark: {
    backgroundColor: '#2b1545',
    color: '#FFFFFF',
  },
  messageDarkRightDark: {
    backgroundColor: '#653F90',
    color: '#FFFFFF',
  },
  iconLeft: {
    position: 'absolute',
    right: '-50px',
    top: '-2px',
    width: '50px !important',
    height: '50px !important',
  },
  iconRight: {
    position: 'absolute',
    left: '-40px',
    top: '-2px',
    width: '35px !important',
    height: '35px !important',
  },
})

type Props = {
  user: IUser
  guest: IUser
  text: string
  time: string
  left?: boolean
  right?: boolean
  theme: ITheme
  isWSConnectedIn: boolean
}

const Message: FC<Props> = ({ user, guest, text, time, left, right, theme, isWSConnectedIn }) => {
  const classes = useClasses(useStyles)
  const getTime = (time: string): string => {
    moment.locale('es')
    return moment(time).fromNow()
  }
  return (
    <ListItem
      key={text}
      className={classNames(classes.messageArea, {
        [classes.messageAreaRight]: right,
      })}
    >
      <Grid
        container
        className={classNames(classes.message, {
          [classes.messageDarkLeft]: left && theme !== 'dark',
          [classes.messageDarkRight]: right && theme !== 'dark',
          [classes.messageDarkLeftDark]: left && theme === 'dark',
          [classes.messageDarkRightDark]: right && theme === 'dark',
        })}
      >
        <Grid item xs={12}>
          <Tooltip title={guest.fullname} placement='bottom' arrow>
            <ListItemText
              className={classNames(classes.text, {
                [classes.left]: left,
                [classes.right]: right,
              })}
              primary={text}
            />
          </Tooltip>
          <>
            {left && <img src={laikaGPTIcon} className={classes.iconLeft} alt='LaikaGPT' />}
            {right && user?.avatar && (
              <Avatar
                alt={user?.fullname}
                src={user?.avatar}
                className={classNames(classes.iconRight, {
                  [classes.avatarConnected]: isWSConnectedIn,
                  [classes.avatarDisconnected]: !isWSConnectedIn,
                })}
              />
            )}
            {right && !user?.avatar && (
              <AccountCircle
                className={classNames(classes.iconRight, {
                  [classes.avatarConnected]: isWSConnectedIn,
                  [classes.avatarDisconnected]: !isWSConnectedIn,
                })}
              />
            )}
          </>
        </Grid>
        <Grid item xs={12}>
          <ListItemText
            className={classNames(classes.time, {
              [classes.left]: !left,
              [classes.right]: !right,
            })}
            secondary={getTime(time)}
          />
        </Grid>
      </Grid>
    </ListItem>
  )
}

export default Message
