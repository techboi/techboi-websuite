import React, { useRef, useContext, useCallback } from 'react'
import propTypes from 'prop-types'
import styled from '@emotion/styled'
import { css } from '@emotion/core'
import tw from 'twin.macro'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import MdxSuiteContext from '@gatsby-mdx-suite/contexts/mdx-suite'
import LazyComponent from 'gatsby-theme-mdx-suite-base/src/components/lazy/lazy-component'

gsap.registerPlugin(ScrollTrigger)

const VideoWrapper = styled.div(
  ({ aspectRatio, maxWidth }) => css`
    position: relative;
    display: inline-block;
    width: 100%;
    max-width: ${maxWidth};

    ${aspectRatio &&
    css`
      &::before {
        content: '';
        width: 1px;
        margin-left: -1px;
        float: left;
        height: 0;
        padding-top: calc(100% / (${aspectRatio}));
      }
      &::after {
        content: '';
        display: table;
        clear: both;
      }
    `}
  `
)

const VideoTag = styled.video(
  ({ aspectRatio }) => css`
    display: block;
    ${aspectRatio && tw`absolute bg-black inset-0 w-full h-full`}
  `
)

/**
 * Renders an internal video. For external videos use `<YoutubeVideo />` or similar.
 *
 * Autoplay will enforce audio mute due to browser limitations.
 *
 * @example
 * <Video id="randomVideoId" />
 */
export default function Video({
  id,
  screenshotIndex,
  controls,
  autoplay,
  preload,
  muted,
  pauseOnHover,
  maxWidth,
  aspectRatio,
  contextKey,
  className,
  forceRendering,
  ...props
}) {
  const {
    data,
    pageContext: { locale: activeLocale },
  } = useContext(MdxSuiteContext)
  const refVideo = useRef(null)

  const videos = data[contextKey]

  const handleVideoIntersection = useCallback(
    (isActive) => {
      // Autoplay as soon video is visible to the user.
      if (autoplay && isActive && refVideo.current) {
        return refVideo.current.play()
      }
      // Stop video when user leaves the viewport.
      // Only active when controls are enabled to allow background videos to loop.
      if (controls && !isActive && refVideo.current) {
        return refVideo.current.pause()
      }
    },
    [autoplay, controls]
  )

  const handleVideoMouseEnter = useCallback(() => {
    if (autoplay && pauseOnHover) {
      refVideo.current.pause()
    }
  }, [refVideo, autoplay, pauseOnHover])

  const handleVideoMouseLeave = useCallback(() => {
    if (autoplay && pauseOnHover) {
      refVideo.current.play()
    }
  }, [refVideo, autoplay, pauseOnHover])

  const initScrollTrigger = useCallback(
    (node) => {
      if (!node) {
        return
      }
      const scrollTriggerInstance = ScrollTrigger.create({
        trigger: node,
        start: 'top bottom',
        end: 'bottom top',
        onToggle: ({ isActive }) => handleVideoIntersection(isActive),
      })

      return scrollTriggerInstance?.kill
    },
    [handleVideoIntersection]
  )

  if (!videos) {
    console.error(
      new Error(
        `The media context "${contextKey}" does not exist or does not contain any data.`
      )
    )
    return null
  }

  const video = videos.find(
    ({ assetId, locale }) => assetId === id && locale === activeLocale
  )

  if (!video) {
    throw new Error(
      `No data located for video:\n\n${JSON.stringify(arguments[0], null, 2)}`
    )
  }

  const sources = [
    { name: 'videoH265', type: 'video/mp4; codecs=hevc' },
    { name: 'videoVP9', type: 'video/webm; codecs=vp9,opus' },
    { name: 'videoH264', type: 'video/mp4; codecs=avc1.4d4032' },
  ]
    .filter(({ name }) => !!video[name])
    .map(({ name, type }) => (
      <source key={name} src={video[name].path} type={type} />
    ))

  if (!sources) {
    console.error(
      new Error(`No sources found for video:\n\n${JSON.stringify(video)}`)
    )

    return null
  }

  return (
    <LazyComponent forceRendering={true}>
      <VideoWrapper
        maxWidth={maxWidth}
        aspectRatio={aspectRatio}
        className={className}
        ref={initScrollTrigger}
      >
        <VideoTag
          ref={refVideo}
          onMouseEnter={handleVideoMouseEnter}
          onMouseLeave={handleVideoMouseLeave}
          controls={controls}
          playsInline={autoplay || !controls}
          preload={preload}
          muted={autoplay || muted}
          poster={
            video.videoScreenshots &&
            video.videoScreenshots[screenshotIndex].publicURL
          }
          aspectRatio={aspectRatio}
          {...props}
        >
          {sources}
        </VideoTag>
      </VideoWrapper>
    </LazyComponent>
  )
}

Video.defaultProps = {
  screenshotIndex: 0,
  controls: true,
  autoplay: false,
  muted: false,
  pauseOnHover: false,
  preload: 'metadata',
  contextKey: 'screen',
  maxWidth: '100%',
  forceRendering: false,
}

Video.propTypes = {
  /** Id of the video to embed */
  id: propTypes.string.isRequired,
  /** Maximum width the video player will grow to */
  maxWidth: propTypes.oneOfType([propTypes.number, propTypes.string]),
  /** Overwrite the default aspect rati of the video */
  aspectRatio: propTypes.string,
  /** Should the video automatically start playing? **Requires muted**. */
  autoplay: propTypes.bool,
  /** Should the controls be display? */
  controls: propTypes.bool,
  /** Should the audio be muted? */
  muted: propTypes.bool,
  /** Should the video pause when the user hovers the video? */
  pauseOnHover: propTypes.bool,
  /** Select another screenshot */
  screenshotIndex: propTypes.oneOfType([propTypes.number, propTypes.string]),
  /** Preloading behaviour */
  preload: propTypes.string,
  /** Change rendering size of the video */
  contextKey: propTypes.string,
  /** Force video to be rendered, even when user did not scroll close. Useful for components that will be displayed above the fold. */
  forceRendering: propTypes.bool,
}