import React, { FC } from 'react'
import EmojiPicker from 'emoji-picker-react'

type Props = {
  emoji: string
  setEmoji: React.Dispatch<React.SetStateAction<string>>
}

const EmojisPicker: FC<Props> = ({ setEmoji }) => {
  return <EmojiPicker onEmojiClick={(emj) => setEmoji(emj.emoji)} width={300} />
}

export default EmojisPicker
