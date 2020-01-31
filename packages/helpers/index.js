import { css } from '@emotion/core'

import Cta from '@gatsby-mdx-suite/mdx-basic/cta'

export const applyColorSet = (props) => {
  const { theme, hasImage } = props
  let { backgroundColor, primaryColor, secondaryColor } = props

  const colorSetId =
    !props.colorSet && hasImage ? 'transparent' : props.colorSet

  const colorSet =
    colorSetId &&
    colorSetId in theme.colors.sets &&
    theme.colors.sets[colorSetId]

  if (colorSet) {
    backgroundColor = colorSet.background
    primaryColor = colorSet.primary
    secondaryColor = colorSet.secondary
  }

  return css`
    background: ${backgroundColor};
    color: ${secondaryColor};

    ${Cta} {
      color: ${primaryColor};
      border-color: ${primaryColor};
    }

    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
      color: ${primaryColor};
    }
  `
}