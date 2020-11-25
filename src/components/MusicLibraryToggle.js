import React from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMusic } from '@fortawesome/free-solid-svg-icons'

const MusicLibraryToggle = ({ libraryIsOpen, setLibraryIsOpen}) => {
  return (
    <div className="library-toggle" onClick={() => setLibraryIsOpen(!libraryIsOpen)}>
      <span className="library-toggle__text">Library</span>
      <FontAwesomeIcon icon={faMusic} />
    </div>
  )
}

export default MusicLibraryToggle
