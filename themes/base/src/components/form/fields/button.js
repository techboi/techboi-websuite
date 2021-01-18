import styled from '@emotion/styled'
import tw from 'twin.macro'

import { focusStyle } from './styles'

const Button = styled.button`
  ${tw`rounded bg-gray-200 text-gray-900 px-2 py-1`}

  :disabled {
    ${tw`text-gray-600 cursor-not-allowed`}
  }

  ${focusStyle}

  & + & {
    margin-left: 1rem;
  }
`

export default Button
