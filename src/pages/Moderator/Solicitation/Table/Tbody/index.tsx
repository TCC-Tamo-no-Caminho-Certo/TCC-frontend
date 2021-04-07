import React, {
  MutableRefObject,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState
} from 'react'
import Style, { Circle, RoleTd } from './styles'

import { HeaderData, ItemData, TableContext } from '../index'
import ResponseContent from './ResponseContent'

import { getStatusLabel, StatusTypes } from 'utils/status'
import { isoToDate } from 'utils/dates'
import makeRoleLabel from 'utils/makeRoleLabel'

import api from 'services/api'

import { Role, RolesState } from 'store/roles'
import { RootState } from 'store'

import Modal, { ModalMethods } from 'components/Modal'

import { useSelector } from 'react-redux'

interface RequestsData {
  role: Role
  name: string
  user_id: number
  role_id: number
  request_id: number
  created_at: string
  status: StatusTypes
  voucher_uuid?: string
  feedback?: string
  data: {
    semester: number
    course_id: number
    campus_id: number
    pretext: string
    university_id: number
  }
}

interface TbodyProps {
  headerData: HeaderData[]
  items: ItemData[] | undefined
  quantity: number
}

interface InfosState {
  userInfo: any
  selectedInfo: ItemData
}

export const transformArray = (
  array: RequestsData[],
  roles: RolesState
): ItemData[] => {
  console.log('tst', array)
  return array.map(
    ({
      name,
      role_id,
      status,
      voucher_uuid,
      created_at,
      request_id,
      feedback,
      user_id,
      data
    }) => ({
      role: roles.roles.find(role => role.role_id === role_id)?.title as any,
      user_id,
      feedback,
      name: name,
      docId: voucher_uuid,
      id: request_id,
      statusCircle: status,
      status: getStatusLabel(status),
      pretext: data.pretext,
      course_id: data.course_id,
      date: isoToDate(created_at, 'day/month')
    })
  )
}

const Tbody = ({ headerData, quantity, items }: TbodyProps) => {
  const tableWrapperRef = useRef() as MutableRefObject<HTMLDivElement>
  const tableRef = useRef() as MutableRefObject<HTMLTableElement>
  const tableContext = useContext(TableContext)
  const modalRef = useRef<ModalMethods>(null)
  const [isClear, setIsClear] = useState(false)
  const roles = useSelector<RootState, RolesState>(state => state.roles)
  const [infos, setInfos] = useState<InfosState | undefined>()

  const setSelected = async (item: ItemData) => {
    console.log('item', item)
    const { url } = await api.get(`user/role/request/voucher/${item.docId}`)
    const { users } = await api.get(`users/${item.user_id}`)

    const newItem: ItemData = {
      ...item,
      voucherUrl: url
    }
    console.log('tst3', newItem)

    setInfos({
      userInfo: users,
      selectedInfo: newItem
    })
  }

  const startRequest = useCallback(
    async (page: number) => {
      if (roles.roles.length !== 0)
        if (!isClear) {
          const { requests } = await api.get(
            `user/role/requests?page=${page}&per_page=${quantity}`
          )

          console.log('req', requests)

          if (requests && requests.length !== 0) {
            const tableData = transformArray(requests, roles)
            console.log('tst2', tableData)

            tableContext?.setTableState(prev => ({
              ...prev,
              showData: [...tableData]
            }))
          } else setIsClear(true)
        }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [isClear, quantity, roles]
  )

  const makeRequest = useCallback(
    async (page: number) => {
      if (roles.roles.length !== 0)
        if (!isClear) {
          const { requests } = await api.get(
            `user/role/requests?page=${page}&per_page=${quantity}`
          )

          if (requests && requests.length !== 0) {
            const tableData = transformArray(requests, roles)

            tableContext?.setTableState(prev => ({
              ...prev,
              showData: prev.showData
                ? [...prev.showData, ...tableData]
                : [...tableData]
            }))
          } else setIsClear(true)
        }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [isClear, quantity, roles]
  )

  const onTableScroll = () => {
    const table = tableWrapperRef.current
    const element = tableRef.current

    if (table && element) {
      const maxHeight = table.clientHeight
      const position = Math.ceil(table.scrollHeight - table.scrollTop)

      if (position <= maxHeight) {
        tableContext?.tableState.tablePage &&
          makeRequest(tableContext?.tableState.tablePage + 1)

        tableContext?.setTableState(prev => ({
          ...prev,
          tablePage: prev.tablePage + 1
        }))
      }
    }
  }

  useEffect(() => {
    startRequest(1)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [startRequest])

  return (
    <>
      <Style ref={tableWrapperRef} onScroll={onTableScroll}>
        <table draggable='false' ref={tableRef}>
          <tbody>
            {items?.map((item, index) => (
              <tr
                key={index}
                onClick={() => {
                  modalRef.current?.toggleModal(true)
                  setSelected(item)
                }}
              >
                {headerData.map(({ label, name }) => {
                  if (name === 'role')
                    return (
                      <RoleTd className='role' role={item[name]} key={index}>
                        {makeRoleLabel(item[name])}
                      </RoleTd>
                    )
                  if (name === 'statusCircle')
                    return (
                      <td className='statusCircle' key={name}>
                        <Circle status={item.statusCircle} />
                      </td>
                    )

                  return (
                    <td key={label} className={name}>
                      {item[name]}
                    </td>
                  )
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </Style>

      <Modal top='50vh' translateY='-50%' ref={modalRef}>
        <ResponseContent
          userInfo={infos?.userInfo}
          selectedInfo={infos?.selectedInfo}
          onCloseClick={() => modalRef.current?.toggleModal(false)}
        />
      </Modal>
    </>
  )
}

export default Tbody
