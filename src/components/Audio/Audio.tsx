import React from 'react'
import './Audio.scss'
import audioFile from '../../audio/audioFile.mp3'

const Audio: React.FC = () => {
  return (
    <audio controls autoPlay loop className="transparent-audio">
      <source src={audioFile} type="audio/mp3" />
      Your browser does not support the audio element.
    </audio>
  )
}

export default Audio
