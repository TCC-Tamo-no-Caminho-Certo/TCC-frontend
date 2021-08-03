import React, { MutableRefObject, useContext, useRef, useState } from 'react'
import Style from './styles'

import { ItemProps, TableContext } from '../index'

import Modal, { ModalMethods } from 'components/Modal'

interface TbodyProps<DataType, SelectedData> {
  items?: any[]
  itemContent?: (_props: ItemProps<DataType, SelectedData>) => JSX.Element
}

function Tbody<DataType, SelectedType>({
  items,
  itemContent: ItemContent
}: TbodyProps<DataType, SelectedType>) {
  const tableContext = useContext(TableContext)

  const tableWrapperRef = useRef() as MutableRefObject<HTMLDivElement>
  const tableRef = useRef() as MutableRefObject<HTMLTableElement>
  const removeRef = useRef<ModalMethods>(null)
  const modalRef = useRef<ModalMethods>(null)

  const [selectedData, setSelectedData] = useState()

  const onTrClick = (item: any) => {
    setSelectedData(item)
    modalRef.current?.toggle(true)
  }

  const onTableScroll = () => {
    const table = tableWrapperRef.current
    const element = tableRef.current

    if (table && element) {
      const maxHeight = table.clientHeight
      const position = Math.ceil(table.scrollHeight - table.scrollTop)

      if (position <= maxHeight)
        tableContext?.makeRequest &&
          tableContext?.tableState.page &&
          tableContext?.makeRequest(tableContext?.tableState.page + 1)
    }
  }

  return (
    <>
      <Style ref={tableWrapperRef} onScroll={onTableScroll}>
        <table draggable='false' ref={tableRef}>
          <tbody>
            {items?.map((item, index) => (
              <tr key={index} onClick={() => onTrClick(item)}>
                {tableContext?.headerData.map(({ label, name, component }) => (
                  <td id={name} key={label}>
                    {component ? component(item[name]) : item[name]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </Style>

      <Modal
        top='50vh'
        translateY='-50%'
        ref={modalRef}
        onClose={() => {
          modalRef.current?.toggle(false)
        }}
      >
        {ItemContent ? (
          <ItemContent
            data={selectedData}
            resetTable={() => tableContext?.makeRequest(1)}
            onCloseClick={() => {
              modalRef.current?.toggle(false)
            }}
          />
        ) : (
          <></>
        )}
      </Modal>

      <Modal top='50vh' translateY='-50%' ref={removeRef}>
        <div>
          Você tem certeza que deseja excluir permanente esta solicitação?
          <button type='button'>Não</button>
          <button type='button'>Cancelar</button>
        </div>
      </Modal>
    </>
  )
}

export default Tbody
