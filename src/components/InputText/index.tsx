import React, {
  useRef,
  useEffect,
  useState,
  useCallback,
  InputHTMLAttributes,
  ComponentType,
  useContext,
} from 'react'
import { Style, Tooltip } from './styles'
import datePTBR from 'utils/datePTBR'
import DatePicker, { DayValue, RenderInputProps } from 'react-modern-calendar-datepicker'
import { useField } from '@unform/core'
import { IconBaseProps } from 'react-icons'
import { FcHighPriority } from 'react-icons/fc'
import { ThemeContext } from 'styled-components'
import { IoIosArrowDown } from 'react-icons/io'
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string
  type?: string
  icon?: ComponentType<IconBaseProps>
  size?: number
  eye?: boolean
  date?: boolean
}

const present = {
  year: new Date().getFullYear(),
  month: new Date().getMonth(),
  day: new Date().getDate(),
}

const minimumDate = {
  year: present.year - 120,
  month: present.month + 1,
  day: present.day,
}

const maximumDate = {
  year: present.year - 18,
  month: present.month + 1,
  day: present.day,
}

const InputText: React.FC<InputProps> = ({
  name,
  type,
  icon: Icon,
  size,
  eye = false,
  date = false,
  ...rest
}) => {
  const inputRef = useRef<HTMLInputElement>(null)
  const [isFocused, setIsFocused] = useState(false)
  const [isFilled, setIsFilled] = useState(false)
  const [showInput, setShowInput] = useState(false)
  const dateRef = useRef<HTMLInputElement>(null)
  const [selectedDate, setSelectedDate] = useState<DayValue>(null)
  const themes = useContext(ThemeContext)
  const { defaultValue, fieldName, registerField, error, clearError } = useField(name)

  const formatInputDate = () => {
    if (selectedDate) {
      return selectedDate.month < 10
        ? `${selectedDate.day}/0${selectedDate.month}/${selectedDate.year}`
        : `${selectedDate.day}/${selectedDate.month}/${selectedDate.year}`
    }
    return ''
  }
  useEffect(() => {
    selectedDate && setIsFilled(true)
  }, [selectedDate])

  const onInputFocus = useCallback(() => setIsFocused(true), [])

  const onInputBlur = useCallback(() => {
    setIsFocused(false)
    setIsFilled(!!inputRef.current?.value)
    clearError()
  }, [clearError])

  useEffect(() => {
    date
      ? registerField({
          name: fieldName,
          ref: dateRef.current,
          path: 'value',
        })
      : registerField({
          name: fieldName,
          ref: inputRef.current,
          path: 'value',
        })
    console.log(dateRef)
  }, [fieldName, registerField, date])

  return (
    <Style
      isFilled={isFilled}
      isFocused={isFocused}
      isErrored={!!error}
      hasIcon={!!Icon}
      className='InputText'
      hasDate={date}
      id={name}
    >
      {error ? (
        <Tooltip
          content={error}
          trigger={<FcHighPriority size={23} />}
          position='top left'
        />
      ) : (
        Icon && <Icon size={size} />
      )}

      {date ? (
        <>
          <DatePicker
            value={selectedDate}
            onChange={setSelectedDate}
            locale={datePTBR}
            colorPrimary={themes.primary}
            minimumDate={minimumDate}
            maximumDate={maximumDate}
            selectorStartingYear={present.year - 120}
            selectorEndingYear={present.year}
            formatInputText={formatInputDate}
            wrapperClassName='date'
            inputClassName='date-input'
            calendarClassName='date-calendar'
            shouldHighlightWeekends
          />
          <IoIosArrowDown size={23} />
        </>
      ) : (
        <input
          name={name}
          onFocus={onInputFocus}
          onBlur={onInputBlur}
          ref={inputRef}
          defaultValue={defaultValue}
          type={showInput ? 'text' : type}
          {...rest}
        />
      )}
      {eye &&
        (showInput ? (
          <AiFillEyeInvisible onClick={() => setShowInput(false)} size={22} />
        ) : (
          <AiFillEye onClick={() => setShowInput(true)} size={22} />
        ))}
    </Style>
  )
}

export default InputText
