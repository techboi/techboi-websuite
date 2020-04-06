import React, { useContext } from 'react'
import propTypes from 'prop-types'
import styled from '@emotion/styled'
import { css } from '@emotion/core'

import IconsContext from '@gatsby-mdx-suite/contexts/icons'
import selectColor from '@gatsby-mdx-suite/helpers/styling/select-color'

const IconWrapper = styled.span(
  ({ scale, color, theme }) =>
    css`
      display: inline-block;
      transform-origin: 50% 50%;
      ${color &&
      css`
        color: ${selectColor(theme.colors, color)};
      `}
      ${scale &&
      css`
        transform: scale(${scale});
      `}
    `
)

/**
 * Renders an icon from entypo. Only a subset of all entypo icons are available due to performance reasons.
 *
 * @example
 * <Icon icon="star" />
 * <Icon icon="instagram" />
 * <Icon icon="facebook" color="#4267B2" />
 * <Icon icon="youtube" color="red" />
 */
const Icon = ({ icon, color, ...props }) => {
  const icons = useContext(IconsContext)
  const IconData = icons && icons[icon]
  if (!IconData) {
    throw new Error(`Unable to locate icon "${icon}"`)
  }
  const ActualIcon = IconData.icon
  return (
    <IconWrapper scale={IconData.scale} color={color}>
      <ActualIcon valign="baseline" {...props} />
    </IconWrapper>
  )
}

Icon.propTypes = {
  icon: propTypes.string.isRequired,
  color: propTypes.string,
}

export default Icon