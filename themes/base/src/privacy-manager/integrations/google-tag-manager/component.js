import { useEffect, useState } from 'react'
import propTypes from 'prop-types'

import TagManager from 'react-gtm-module'

const GoogleTagManager = ({ children, gtmId, ...tagManagerArgs }) => {
  const [initialized, setInitialized] = useState(false)

  useEffect(() => {
    if (!initialized) {
      TagManager.initialize({ gtmId, ...tagManagerArgs })
      setInitialized(true)
    }
  }, [initialized, gtmId, tagManagerArgs])

  return children
}

GoogleTagManager.propTypes = {
  gtmId: propTypes.string.isRequired,
}

export default GoogleTagManager
