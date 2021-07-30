import React, {
  createContext,
  Dispatch,
  RefObject,
  SetStateAction,
  useContext,
  useEffect,
  useRef,
  useState
} from 'react'

import './i18n'

import GlobalStyle from 'styles/GlobalStyle'
import { dark, light } from 'styles/themes'

import Routes from 'routes'

import { RootState } from 'store'
import { ThemeState } from 'store/Sync/theme'

import Popup, { PopupMethods } from 'components/Popup'
import Modal, { ModalMethods } from 'components/Modal'

import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { ThemeContext, ThemeProvider } from 'styled-components'

export interface Overflow {
  x?: string
  y?: string
  overflow?: string
}

export interface GlobalContextProps {
  modalRef?: RefObject<ModalMethods>
  popupRef?: RefObject<PopupMethods>
  overflow?: {
    overflow?: Overflow
    setOverflow?: Dispatch<SetStateAction<Overflow>>
  }
}

const allThemes = { dark, light }

export const GlobalContext = createContext<GlobalContextProps>({})

const App = () => {
  const theme = useContext(ThemeContext)
  const { theme: selectedTheme } = useSelector<RootState, ThemeState>(
    ({ theme }) => theme
  )

  const popupRef = useRef<PopupMethods>(null)
  const modalRef = useRef<ModalMethods>(null)

  const [overflow, setOverflow] = useState<Overflow>({ overflow: 'auto' })

  const { i18n } = useTranslation()

  useEffect(() => {
    i18n.changeLanguage('pt-BR')
  }, [i18n])

  return (
    <ThemeProvider theme={allThemes[selectedTheme]}>
      <GlobalContext.Provider
        value={{ modalRef, popupRef, overflow: { overflow, setOverflow } }}
      >
        <GlobalStyle overflow={overflow} theme={theme} />

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
