import { css } from 'emotion'
import * as animations from './animations'

const useAnimation = ({ show, isVisible }) => {
  if (typeof show !== 'string') {
    return {}
  }

  const animationName = show.split(' ').find((fragment) => animations[fragment])

  let additionalStyles
  if (animationName) {
    show = show.replace(animationName, animations[animationName].keyframes)
    additionalStyles = animations[animationName].styles
  }

  const animationClass = css`
    animation: ${show};
    ${additionalStyles};
    animation-fill-mode: both;
    animation-play-state: ${isVisible ? 'running' : 'paused'};
  `

  return {
    animationClass,
  }
}

export default useAnimation
