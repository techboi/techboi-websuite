import React from 'react'
import propTypes from 'prop-types'
import styled from '@emotion/styled'
import { css } from '@emotion/core'

import MenuLevel from '@gatsby-mdx-suite/menu/menu-level'
import LanguageSwitch from '@gatsby-mdx-suite/i18n/language-switch'
import Image from '@gatsby-mdx-suite/mdx-basic/image'
import { centerToContentColumn, applyColorSet } from '@gatsby-mdx-suite/helpers'

import ColorModeSwitch from '../color-mode-switch'

const HeaderWrapper = styled.div(
  ({ hasBackgroundImage, ...restProps }) => css`
    position: relative;

    ${hasBackgroundImage &&
      css`
        ${applyColorSet(restProps)}
        text-shadow: 0 0 5px rgba(0, 0, 0, 0.13);
      `}
  `
)

const HeaderContent = styled.div`
  position: relative;
  min-height: 42vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  ${centerToContentColumn}
`

const HeaderMenu = styled.div(
  ({ theme }) => css`
    position: absolute;
    z-index: 10;
    top: 0;
    left: 0;
    right: 0;
    display: flex;
    justify-content: space-between;
    padding: ${theme.spacing.s1}px;
    align-items: center;
  `
)

const HeaderMenuControls = styled.div`
  display: flex;
  align-items: center;

  & > * {
    padding: 0 1em;
  }
`

const HeaderBackgroundImageWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -3;

  & .gatsby-image-wrapper {
    position: absolute !important;
    z-index: -2;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  &:before {
    content: '';
    display: block;
    position: absolute;
    z-index: -1;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: black;
    opacity: 0.12;
  }
`

const Header = ({ children, backgroundImageId }) => {
  return (
    <HeaderWrapper
      hasBackgroundImage={!!backgroundImageId}
      colorSet="transparent"
    >
      <HeaderMenu>
        <MenuLevel rootMenuItemId="6Id378BoElgMsJJd81IyP3" />
        <HeaderMenuControls>
          <LanguageSwitch />
          <ColorModeSwitch />
        </HeaderMenuControls>
      </HeaderMenu>
      <HeaderContent>{children}</HeaderContent>
      {backgroundImageId && (
        <HeaderBackgroundImageWrapper>
          <Image id={backgroundImageId} contextKey="background" />
        </HeaderBackgroundImageWrapper>
      )}
    </HeaderWrapper>
  )
}

Header.propTypes = {
  children: propTypes.node,
  backgroundImageId: propTypes.string,
}

export default Header