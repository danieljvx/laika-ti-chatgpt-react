import React, { FC } from 'react'
import classNames from 'classnames'
import { useClasses } from '../../core/hooks'

const useStyles = () => ({
  bouncingLoaderShow: {
    visibility: 'visible !important',
  },
  bouncingLoader: {
    position: 'absolute',
    bottom: 60,
    left: '50%',
    transform: 'translateX(-50%)',
    visibility: 'hidden',
    display: 'flex',
    justifyContent: 'center',
    margin: '10px auto',
    '& div': {
      width: 10,
      height: 10,
      margin: 2,
      borderRadius: '50%',
      backgroundColor: '#a3a1a1',
      opacity: 1,
      animation: 'bouncing-loader 0.6s infinite alternate',
      '&:nth-child(2)': {
        animationDelay: '0.2s',
      },
      '&:nth-child(3)': {
        animationDelay: '0.4s',
      },
    },
    '@keyframes bouncing-loader': {
      to: {
        opacity: '0.1',
        transform: 'translateY(-16px)',
      },
    },
  },
})

type Props = {
  show: boolean
}

const BouncingDotsLoader: FC<Props> = ({ show }) => {
  const classes = useClasses(useStyles)
  return (
    <div
      className={classNames(classes.bouncingLoader, {
        [classes.bouncingLoaderShow]: show,
      })}
    >
      <div></div>
      <div></div>
      <div></div>
    </div>
  )
}

export default BouncingDotsLoader
