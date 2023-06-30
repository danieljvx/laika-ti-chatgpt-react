import React, { FC } from 'react'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListSubheader from '@mui/material/ListSubheader'
import Switch from '@mui/material/Switch'
import VolumeUpIcon from '@mui/icons-material/VolumeUp'
import VolumeOffIcon from '@mui/icons-material/VolumeOff'
import WbSunnyIcon from '@mui/icons-material/WbSunny'
import ModeNightIcon from '@mui/icons-material/ModeNight'
import { useClasses } from '../../core/hooks'
import { ITheme } from '../../core/types'

const useStyles = () => ({
  listItem: {
    margin: '0 auto !important',
  },
})

type Props = {
  theme: ITheme
  setTheme: React.Dispatch<React.SetStateAction<ITheme>>
  audioEnable: boolean
  setAudioEnable: React.Dispatch<React.SetStateAction<boolean>>
}

const Setting: FC<Props> = ({ theme, setTheme, audioEnable, setAudioEnable }) => {
  const classes = useClasses(useStyles)

  return (
    <List
      sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
      subheader={<ListSubheader>Settings</ListSubheader>}
    >
      <ListItem>
        <ListItemIcon className={classes.listItem}>
          <VolumeOffIcon />
        </ListItemIcon>
        <ListItemIcon className={classes.listItem}>
          <Switch
            onChange={() => setAudioEnable(!audioEnable)}
            checked={audioEnable}
            inputProps={{
              'aria-labelledby': 'switch-list-label-wifi',
            }}
          />
        </ListItemIcon>
        <ListItemIcon className={classes.listItem}>
          <VolumeUpIcon />
        </ListItemIcon>
      </ListItem>
      <ListItem>
        <ListItemIcon className={classes.listItem}>
          <WbSunnyIcon />
        </ListItemIcon>
        <ListItemIcon className={classes.listItem}>
          <Switch
            onChange={() => setTheme(theme === 'light' ? 'dark' : 'light')}
            checked={theme === 'dark'}
            inputProps={{
              'aria-labelledby': 'switch-list-label-bluetooth',
            }}
          />
        </ListItemIcon>
        <ListItemIcon className={classes.listItem}>
          <ModeNightIcon />
        </ListItemIcon>
      </ListItem>
    </List>
  )
}
export default Setting
