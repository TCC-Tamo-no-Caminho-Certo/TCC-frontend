import React, { useContext, useEffect, useRef, useState } from 'react'
import Style from './styles'

import { FormContext, FormState } from '../'

import { ThemeState } from 'store/theme'
import { RootState } from 'store'

import ErrorTooltip from 'components/Tooltips/ErrorTooltip'

import { lighten } from 'polished'
import { useSelector } from 'react-redux'
import RealSelect, { Theme } from 'react-select'

const Select = ({ isMulti, ...props }: any) => {
  const theme = useSelector<RootState, ThemeState>(state => state.theme)
  const selectRef = useRef(null)
  const [error, setError] = useState<string>()
  const form = useContext<FormState | null>(FormContext)

  useEffect(() => {
    const select = {
      inputRef: selectRef,
      setError,
      type: isMulti ? 'multiSelect' : 'select'
    }

    form?.registerInput(select)

    return () => form?.removeInput(select)
  }, [selectRef, form, isMulti])

  const overridingStyles = {
    menu: (before: any) => ({
      ...before,
      zIndex: 3
    }),
    control: (before: any) => ({
      ...before,
      paddingLeft: error ? 40 : 8
    }),
    valueContainer: (before: any) => ({
      ...before,
      paddingLeft: 0
    }),
    singleValue: (before: any) => ({
      ...before,
      color: theme.colors.primary
    }),
    multiValue: (before: any) => ({
      ...before,
      backgroundColor: theme.colors.primary
    }),
    multiValueLabel: (before: any) => ({
      ...before,
      color: theme.colors.secondary
    }),
    multiValueRemove: (before: any) => ({
      ...before,
      color: theme.colors.secondary,
      ':hover': {
        backgroundColor: theme.colors.tertiary
      }
    })
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
      neutral5: theme.colors.tertiary,
      neutral10: theme.colors.tertiary,
      neutral20: theme.colors.tertiary,
      neutral30: theme.colors.tertiary,
      neutral40: theme.colors.tertiary,
      neutral50: theme.colors.tertiary,
      neutral60: theme.colors.tertiary,
      neutral70: theme.colors.tertiary,
      neutral80: theme.colors.tertiary,
      neutral90: theme.colors.tertiary
    }
  })

  return (
    <Style isErrored={!!error} className='Select'>
      <ErrorTooltip error={!!error} content={error} />

      <RealSelect
        classNamePrefix='Select'
        onBlur={() => setError('')}
        styles={overridingStyles}
        theme={overridingTheme}
        ref={selectRef}
        isMulti={isMulti}
        {...props}
      />
    </Style>
  )
}

export default Select
