import styled from 'styled-components'

interface StyleProps {
  error: boolean
}

export const StyledTextarea = styled.textarea`
  min-height: 128px;
  width: 100%;
  resize: none;

  border-radius: 8px;
  padding: 8px;
  color: ${({ theme }) => theme.colors.tertiary};

  &:focus {
    color: ${({ theme }) => theme.colors.primary};
  }
`

const Style = styled.div<StyleProps>`
  position: relative;

  .Error {
    position: absolute;
    top: 8px;
  }

  ${StyledTextarea} {
    padding-left: ${({ error }) => (error ? '48px' : '8px')};
  }
`

export default Style

Style.displayName = 'Textarea-Style'
