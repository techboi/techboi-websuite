import React from 'react'
import propTypes from 'prop-types'

import LazyChunk from 'gatsby-theme-mdx-suite-base/src/components/lazy/lazy-chunk'

const YoutubeVideoRenderer = React.lazy(() =>
  import(
    /* webpackChunkName: "youtube-video-player" */ './youtube-video-renderer'
  )
)

/**
 * Renders a video from YouTube. For internal videos use `<Video />`.
 *
 * Supports all Youtube player parameters:
 * https://developers.google.com/youtube/player_parameters#Parameters
 *
 * @example
 * <YoutubeVideo id="dQw4w9WgXcQ" />
 */
export default function YoutubeVideo(props) {
  return (
    <LazyChunk>
      <YoutubeVideoRenderer {...props} />
    </LazyChunk>
  )
}

YoutubeVideo.displayName = 'YoutubeVideo'

YoutubeVideo.defaultProps = {
  maxWidth: '100%',
  aspectRatio: '16 / 9',
}

YoutubeVideo.propTypes = {
  /** id of the video to embed */
  id: propTypes.string.isRequired,
  /** Aspect ratio of the video player */
  aspectRatio: propTypes.string,
  /** maximum width the video will be embedded as */
  maxWidth: propTypes.oneOfType([propTypes.number, propTypes.string]),
}
