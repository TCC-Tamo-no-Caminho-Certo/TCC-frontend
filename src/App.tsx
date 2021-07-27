import React, {
  createContext,
  Dispatch,
  RefObject,
  SetStateAction,
  useEffect,
  useRef,
  useState
} from 'react'

import './i18n'

import GlobalStyle from 'styles/GlobalStyle'

import Routes from 'routes'

import { ThemeState } from 'store/Sync/theme'
import { RootState } from 'store'

import Popup, { PopupMethods } from 'components/Popup'
import Modal, { ModalMethods } from 'components/Modal'

import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'

export interface GlobalContextProps {
  modalRef?: RefObject<ModalMethods>
  popupRef?: RefObject<PopupMethods>
  overflow?: {
    overflow?: string
    setOverflow?: Dispatch<SetStateAction<string>>
  }
}

export const GlobalContext = createContext<GlobalContextProps>({})

const App = () => {
  const theme = useSelector<RootState, ThemeState>(({ theme }) => theme)

  const popupRef = useRef<PopupMethods>(null)
  const modalRef = useRef<ModalMethods>(null)

  const [overflow, setOverflow] = useState('visible')

  const { i18n } = useTranslation()

  useEffect(() => {
    i18n.changeLanguage('pt-BR')
  }, [i18n])

  return (
    <ThemeProvider theme={theme}>
      <GlobalContext.Provider
        value={{ modalRef, popupRef, overflow: { overflow, setOverflow } }}
      >
        <GlobalStyle overflow={overflow} />

        <BrowserRouter>
          <Routes />
        </BrowserRouter>

        <Popup ref={popupRef} />

        <Modal ref={modalRef} />
      </GlobalContext.Provider>
    </ThemeProvider>
  )
}

export default App
