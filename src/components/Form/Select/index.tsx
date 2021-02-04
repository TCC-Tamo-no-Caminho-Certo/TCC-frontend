import React, { useContext, useEffect, useRef, useState } from 'react'

import FormContext, { FormState } from '../Form/FormContext'

import { ThemeState } from 'store/theme'
import { RootState } from 'store'

import { darken, lighten } from 'polished'
import { useSelector } from 'react-redux'
import RealSelect, { Theme } from 'react-select'

const Select: React.FC<any> = props => {
  const theme = useSelector<RootState, ThemeState>(state => state.theme)
  const selectRef = useRef(null)
  const [error, setError] = useState<string>()
  const form = useContext<FormState | null>(FormContext)

  useEffect(() => {
    const select = {
      input: selectRef,
      setError,
    }

    form?.setRef(select)

    return () => form?.removeRef(select)
  }, [selectRef, form])

  const overridingStyles = {
    singleValue: (before: any) => ({
      ...before,
      color: theme.colors.primary,
    }),
    multiValue: (before: any) => ({
      ...before,
      backgroundColor: theme.colors.primary,
    }),
    multiValueLabel: (before: any) => ({
      ...before,
      color: theme.colors.secondary,
    }),
    multiValueRemove: (before: any) => ({
      ...before,
      color: theme.colors.secondary,
      ':hover': {
        backgroundColor: theme.colors.tertiary,
      },
    }),
  }

  const overridingTheme = (beforeTheme: Theme): Theme => ({
    ...beforeTheme,

    colors: {
      ...beforeTheme.colors,

      danger: theme.colors.red,
      dangerLight: lighten(0.5, theme.colors.red),

      primary: theme.colors.primary,
      primary25: lighten(0.25, theme.colors.primary),
      primary50: lighten(0.5, theme.colors.primary),
      primary75: lighten(0.75, theme.colors.primary),

      neutral0: theme.colors.secondary,
      neutral5: darken(0.05, theme.colors.tertiary),
      neutral10: darken(0.1, theme.colors.tertiary),
      neutral20: darken(0.2, theme.colors.tertiary),
      neutral30: darken(0.3, theme.colors.tertiary),
      neutral40: darken(0.4, theme.colors.tertiary),
      neutral50: darken(0.5, theme.colors.tertiary),
      neutral60: darken(0.6, theme.colors.tertiary),
      neutral70: darken(0.7, theme.colors.tertiary),
      neutral80: darken(0.8, theme.colors.tertiary),
      neutral90: darken(0.9, theme.colors.tertiary),
    },
  })

  return (
    <RealSelect
      classNamePrefix='Select'
      ref={selectRef}
      styles={overridingStyles}
      theme={overridingTheme}
      {...props}
    />
  )
}

export default Select
