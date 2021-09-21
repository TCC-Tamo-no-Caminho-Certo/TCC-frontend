import React, {
  forwardRef,
  useContext,
  useEffect,
  useRef,
  useState
} from 'react'
import Style from './styles'

import { FormContext, FormState } from '../'

import ErrorTooltip from 'components/Tooltips/ErrorTooltip'

import { lighten } from 'polished'
import RealSelect, { Theme } from 'react-select'
import { ThemeContext } from 'styled-components'

export interface Option {
  label: string
  value: string | number
}

const Select = forwardRef(
  (
    {
      isMulti,
      styling,
      theming,
      noPortal,
      className = 'Select',
      ...props
    }: any,
    ref
  ) => {
    const form = useContext<FormState | null>(FormContext)
    const { colors } = useContext(ThemeContext)

    const selectRef = useRef(null)

    const [error, setError] = useState<string>()

    const overridingStyles = {
      menu: (before: any) => ({ ...before }),
      valueContainer: (before: any) => ({ ...before, paddingLeft: 0 }),
      control: (before: any) => ({
        ...before,
        paddingLeft: error ? 56 : 8,
        height: 'clamp(40px, 3vh + 2vw, 44px)%',

        backgroundColor: 'transparent'
      }),
      singleValue: (before: any) => ({
        ...before,
        color: colors.primary,
        height: '100%'
      }),
      multiValue: (before: any) => ({
        ...before,
        backgroundColor: colors.primary
      }),
      multiValueLabel: (before: any) => ({
        ...before,
        color: colors.secondary
      }),
      multiValueRemove: (before: any) => ({
        ...before,
        color: colors.secondary,
        ':hover': { backgroundColor: colors.tertiary }
      })
    }

    const overridingTheme = (beforeTheme: Theme): Theme => ({
      ...beforeTheme,
      colors: {
        ...beforeTheme.colors,
        danger: colors.red,
        dangerLight: lighten(0.5, colors.red),
        primary: colors.primary,
        primary25: lighten(0.25, colors.primary),
        primary50: lighten(0.5, colors.primary),
        primary75: lighten(0.75, colors.primary),
        neutral0: colors.secondary,
        neutral5: colors.tertiary,
        neutral10: colors.tertiary,
        neutral20: colors.tertiary,
        neutral30: colors.tertiary,
        neutral40: colors.tertiary,
        neutral50: colors.tertiary,
        neutral60: colors.tertiary,
        neutral70: colors.tertiary,
        neutral80: colors.tertiary,
        neutral90: colors.tertiary
      }
    })

    useEffect(() => {
      const select = {
        setError,
        inputRef: selectRef,
        type: isMulti ? 'multiSelect' : 'select'
      }

      form?.registerInput(select)

      return () => form?.removeInput(select)
    }, [selectRef, form, isMulti])

    return (
      <Style isErrored={!!error} ref={ref as any} className={className}>
        <ErrorTooltip error={!!error} content={error} />

        <RealSelect
          id={props.name}
          ref={selectRef}
          isMulti={isMulti}
          classNamePrefix='Select'
          onBlur={() => setError('')}
          theme={theming || overridingTheme}
          styles={styling || overridingStyles}
          menuPortalTarget={noPortal ? undefined : document.body}
          noOptionsMessage={() => <div id='noOptions'>Nada encontrado</div>}
          {...props}
        />
      </Style>
    )
  }
)

export default Select
