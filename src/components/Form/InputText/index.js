import React, {useState, useEffect, useRef} from "react"
import Style from "./styles"
import FlexBox from "components/FlexBox"
import ErrorMessage from "components/Form/ErrorMessage"
import InputLine from "components/Form/InputLine"
import {useField} from "@unform/core"

export default function InputText({name, line, width, height, ...rest}) {
  const [blur, setBlur] = useState(false)
  const [focus, setFocus] = useState(false)
  const inputTextRef = useRef(null)
  const {fieldName, registerField, error} = useField(name)

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputTextRef.current,
      path: "value",
    })
  }, [fieldName, registerField])

  return (
    <Style className="InputText" width={width} height={height}>
      <FlexBox>
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <input
          ref={inputTextRef}
          onFocus={() => setFocus(!focus)}
          onBlur={() => setBlur(!blur)}
          {...rest}
        />
        <InputLine
          name={line ? line : name}
          width={width}
          blur={blur}
          focus={focus}
        />
      </FlexBox>
    </Style>
  )
}

InputText.defaultProps = {
  width: "258px",
  height: "30px",
  line: false,
}
