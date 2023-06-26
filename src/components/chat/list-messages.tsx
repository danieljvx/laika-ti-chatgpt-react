import React, { forwardRef } from 'react'
import { useClasses } from '../../core/hooks'
import List from '@mui/material/List'
import Message from './message'
import { IMessage, IProduct, ITheme, IUser } from '../../core/types'
import Products from './product/products'

const useStyles = () => ({
  messageArea: {
    height: '60vh',
    overflowY: 'auto',
  },
})

type Props = {
  ref: React.RefObject<HTMLUListElement>
  messages: IMessage[]
  roomLoading: boolean
  user: IUser | null
  theme: ITheme
  isWSConnectedIn: boolean
  setListScrollToDown: () => void
  addProduct: (product: IProduct) => void
}

// eslint-disable-next-line react/display-name
const ListMessages = forwardRef<HTMLUListElement, Props>(
  ({ messages, user, theme, isWSConnectedIn, setListScrollToDown, addProduct }, ref) => {
    const classes = useClasses(useStyles)
    return (
      <List ref={ref} id='chat-list-messages' className={classes.messageArea}>
        {user &&
          messages.map((message, i) => (
            <>
              <Message
                key={`message-${i}-${message.roomId}`}
                left={message.user.id !== user.id}
                right={message.user.id === user.id}
                text={message.message}
                time={message.time.toString()}
                theme={theme}
                user={user}
                guest={message.user}
                isWSConnectedIn={isWSConnectedIn}
                setListScrollToDown={setListScrollToDown}
              />
              {message.products.length > 0 && (
                <Products key={`products-${i}-${message.roomId}`} products={message.products} addProduct={addProduct} />
              )}
            </>
          ))}
      </List>
    )
  },
)

export default ListMessages
