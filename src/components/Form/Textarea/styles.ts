import styled from 'styled-components'

const Style = styled.textarea`
  min-height: 128px;
  resize: none;

  border-radius: 8px;
  padding: 8px;
  color: ${({ theme }) => theme.colors.tertiary};

  &:focus {
    color: ${({ theme }) => theme.colors.primary};
  }
`

export default Style

Style.displayName = 'Textarea-Style'
