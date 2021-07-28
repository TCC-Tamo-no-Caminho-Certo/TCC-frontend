import React, {
  MutableRefObject,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState
} from 'react'
import Style, { Circle, RoleTd } from './styles'

import { ItemProps, TableContext } from '../index'

import { getRoleLabel } from 'utils/roles'

import api from 'services/api'

import Modal, { ModalMethods } from 'components/Modal'

interface TbodyProps {
  items?: any[]
  itemContent?: (_props: ItemProps) => JSX.Element
}

interface InfosState {
  userInfo: any
  selectedInfo: any
}

const Tbody = ({ items, itemContent: ItemContent }: TbodyProps) => {
  const { path, quantity, headerData, setTableState, tableState } =
    useContext(TableContext)

  const tableWrapperRef = useRef() as MutableRefObject<HTMLDivElement>
  const tableRef = useRef() as MutableRefObject<HTMLTableElement>
  const removeRef = useRef<ModalMethods>(null)

  const modalRef = useRef<ModalMethods>(null)

  const [infos, setInfos] = useState<InfosState>()
  const [isClear, setIsClear] = useState(false)

  const makeRequest = useCallback(
    async (page: number) => {
      if (!isClear) {
        const { requests } = await api.get(
          `${path}?page=${page}&per_page=${quantity}`
        )

        if (requests && requests.length !== 0) {
          const tableData = requests

          setTableState(prev => ({
            ...prev,
            showData: prev.showData
              ? [...prev.showData, ...tableData]
              : [...tableData]
          }))
        } else setIsClear(true)
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [isClear, quantity]
  )

  const startRequest = useCallback(async () => {
    const { requests } = await api.get(`${path}?page=1&per_page=${quantity}`)
    const tableData = requests

    setTableState({
      tablePage: 1,
      showData: tableData
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const onTableScroll = () => {
    const table = tableWrapperRef.current
    const element = tableRef.current

    if (table && element) {
      const maxHeight = table.clientHeight
      const position = Math.ceil(table.scrollHeight - table.scrollTop)

      if (position <= maxHeight) {
        tableState.tablePage && makeRequest(tableState.tablePage + 1)

        setTableState(prev => ({
          ...prev,
          tablePage: prev.tablePage + 1
        }))
      }
    }
  }

  const setSelected = async (item: any) => {
    const { users } = await api.get(`users/${item.user_id}`)
    const voucherUrl = item.voucher_uuid
      ? await api.get(`user/role/request/voucher/${item.voucher_uuid}`)
      : undefined

    setInfos({
      userInfo: users,
      selectedInfo: {
        ...item,
        voucherUrl: voucherUrl ? voucherUrl.url : undefined
      }
    })
  }

  useEffect(() => {
    setTableState({
      showData: undefined,
      tablePage: 1
    })

    startRequest()

    return setTableState({
      showData: undefined,
      tablePage: 1
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [startRequest])

  return (
    <>
      <Style ref={tableWrapperRef} onScroll={onTableScroll}>
        <table draggable='false' ref={tableRef}>
          <tbody>
            {items?.map((item, index) => (
              <tr
                key={`${item}-${index}`}
                onClick={() => {
                  modalRef.current?.toggle(true)
                  setSelected(item)
                }}
              >
                {headerData.map(
                  ({ label, name, circle, role, dataManipulation }) => {
                    if (role)
                      return (
                        <RoleTd id={name} key={index} role={item.role}>
                          {getRoleLabel(item.role)}
                        </RoleTd>
                      )

                    if (circle)
                      return (
                        <td id={name} key={name}>
                          <Circle status={item[name]} />
                        </td>
                      )

                    return (
                      <td id={name} key={label}>
                        {dataManipulation
                          ? dataManipulation(item[name])
                          : item[name]}
                      </td>
                    )
                  }
                )}
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
          setInfos({ userInfo: undefined, selectedInfo: undefined })
        }}
      >
        {ItemContent ? (
          <ItemContent
            userInfo={infos?.userInfo}
            selectedInfo={infos?.selectedInfo}
            makeRequest={() => startRequest()}
            onCloseClick={() => {
              modalRef.current?.toggle(false)
              setInfos({ userInfo: undefined, selectedInfo: undefined })
            }}
          />
        ) : (
          <></>
        )}
      </Modal>

      <Modal top='50vh' translateY='-50%' ref={removeRef}>
        <div id='removeModal'>
          Você tem certeza que deseja excluir permanente esta solicitação?
          <button type='button'>Não</button>
          <button type='button'>Cancelar</button>
        </div>
      </Modal>
    </>
  )
}

export default Tbody
