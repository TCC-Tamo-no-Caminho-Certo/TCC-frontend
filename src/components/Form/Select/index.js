import React, {useRef, useEffect} from "react"
import Style from "./styles"
import {useField} from "@unform/core"
import ErrorMessage from "components/Form/ErrorMessage"

export default function Select({options, name, ...rest}) {
  const selectRef = useRef()
  const {fieldName, registerField, error} = useField(name)

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: selectRef.current,
      getValue: (reference) => {
        if (rest.isMulti) {
          if (!reference.state.value) {
            return []
          }
          return reference.state.value.map((option) => option.value)
        }
        if (!reference.state.value) {
          return ""
        }
        return reference.state.value.value
      },
    })
  }, [fieldName, registerField, rest.isMulti])

  return (
    <>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      <Style
        ref={selectRef}
        options={options}
        classNamePrefix="select"
        className="Select"
        placeholder="Selecione..."
        isSearchable={false}
        {...rest}
      />
    </>
  )
}
