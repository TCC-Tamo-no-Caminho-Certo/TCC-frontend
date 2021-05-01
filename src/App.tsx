import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useEffect
} from 'react'

import './i18n'

import GlobalStyle from 'styles/GlobalStyle'

import Routes from 'routes'

import { ThemeState } from 'store/Sync/theme'
import { RootState } from 'store'
import { PopupState } from 'store/Sync/popup'
import { GlobalStyleState } from 'store/Sync/globalStyle'

import Popup from 'components/Popup'

import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'

export interface GlobalContextProps {
  overflow?: {
    overflow?: string
    setOverflow?: Dispatch<SetStateAction<string>>
  }
}

export const GlobalContext = createContext<GlobalContextProps>({})

const App = () => {
  const theme = useSelector<RootState, ThemeState>(({ theme }) => theme)
  const { popupProps, popupRef } = useSelector<RootState, PopupState>(
    ({ popup }) => popup
  )
  const globalStyle = useSelector<RootState, GlobalStyleState>(
    ({ globalStyle }) => globalStyle
  )

  const { i18n } = useTranslation()

  useEffect(() => {
    i18n.changeLanguage('pt-BR')
  }, [i18n])

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle {...globalStyle} />

      <BrowserRouter>
        <Routes />
      </BrowserRouter>

      <Popup ref={popupRef} {...popupProps} />
    </ThemeProvider>
  )
}

export default App
