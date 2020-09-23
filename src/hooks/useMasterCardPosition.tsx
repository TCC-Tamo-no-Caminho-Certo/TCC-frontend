import React, { createContext, useState, useContext } from 'react'

interface MasterCardPositionValues {
  masterCardPosition: number
  setMasterCardPosition: React.Dispatch<number>
}

const MasterCardPositionContext = createContext<MasterCardPositionValues>(
  {} as MasterCardPositionValues
)

export const MasterCardPositionProvider: React.FC = ({ children }) => {
  const [masterCardPosition, setMasterCardPosition] = useState(0)

  return (
    <MasterCardPositionContext.Provider value={{ masterCardPosition, setMasterCardPosition }}>
      {children}
    </MasterCardPositionContext.Provider>
  )
}

export const useMasterCardPosition = (): MasterCardPositionValues => {
  const masterCardState = useContext(MasterCardPositionContext)

  if (!masterCardState) throw new Error('useMasterCard must be used within an MasterCardProvider')

  return masterCardState
}
