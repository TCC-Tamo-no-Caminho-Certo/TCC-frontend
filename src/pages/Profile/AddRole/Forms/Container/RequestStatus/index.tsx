import React, { useEffect, useState } from 'react'
import Style from './styles'

import { StatusTypes } from 'pages/Moderator/Solicitation/Table'

import makeRoleLabel from 'utils/makeRoleLabel'

import { Role } from 'store/user'

import Card from 'components/Card'

import { motion } from 'framer-motion'

interface RequestStatusProps {
  role: Role
  message: string
  status: StatusTypes
}

interface Checks {
  first: boolean | string
  second: boolean | string
  third: boolean | string
}

// initial: ['4%', '4%'],
// middle: ['4%', '27%'],
// final: ['27%', '50%']

// initial: ['24%', '24%'],
// middle: ['24%', '47%'],
// final: ['47%', '70%']

const RequestStatus = ({ role, status, message }: RequestStatusProps) => {
  const [{ first, second, third }, setChecks] = useState<Checks>({
    first: false,
    second: 'nothing',
    third: 'nothing'
  })

  const [{ progressTrue, progressFalse }, setProgress] = useState({
    progressTrue: ['4%', '4%'],
    progressFalse: ['24%', '24%']
  })

  useEffect(() => {
    if (status === 'awaiting') {
      setProgress({
        progressTrue: ['4%', '27%'],
        progressFalse: ['24%', '47%']
      })
      setChecks({
        first: false,
        second: false,
        third: 'nothing'
      })
    } else {
      setProgress({
        progressTrue: ['27%', '50%'],
        progressFalse: ['47%', '70%']
      })

      setChecks({
        first: false,
        second: false,
        third: true
      })
    }
  }, [status])

  return (
    <Style role={role}>
      <Card headerText='Acompanhe sua solicitação'>
        <div id='role'>{makeRoleLabel(role)}</div>

        <div id='requestRow'>
          <div>Solicitação enviada</div>

          <div>Em análise</div>

          <div>Finalizada</div>
        </div>

        <svg
          width='750'
          height='72'
          viewBox='0 0 750 72'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <g id='statusBar' filter='url(#barFilter)'>
            <path
              d='M341 19H61C55.9086 8.07342 44.8494 0 32 0C14.3269 0 0 14.3269 0 32C0 49.6731 14.3269 64 32 64C44.8494 64 55.9086 55.9266 61 45H341C345.983 56.1949 357.956 64 371 64C384.044 64 396.017 56.1949 401 45H681C686.091 55.9266 697.151 64 710 64C727.673 64 742 49.6731 742 32C742 14.3269 727.673 0 710 0C697.151 0 686.091 8.07342 681 19H401C396.017 7.80514 384.044 0 371 0C357.956 0 345.983 7.80514 341 19Z'
              fill='url(#barGradient)'
            />

            {first !== 'nothing' &&
              (first ? (
                <path
                  className='errorIcon'
                  id='firstFail'
                  d='M23 41L42 22M42 41L23 22'
                />
              ) : (
                <path
                  className='checkIcon'
                  id='firstCheck'
                  d='M27.8982 37.5682L21.2604 31.038L19 33.2461L27.8982 42L47 23.2081L44.7555 21L27.8982 37.5682Z'
                />
              ))}

            {third !== 'nothing' &&
              (third ? (
                <path
                  className='errorIcon'
                  id='thirdFail'
                  d='M700 41L719 22M719 41L700 22'
                />
              ) : (
                <path
                  className='checkIcon'
                  id='thirdCheck'
                  d='M704.898 37.5682L698.26 31.038L696 33.2461L704.898 42L724 23.2081L721.756 21L704.898 37.5682Z'
                />
              ))}

            {second !== 'nothing' &&
              (second ? (
                <path
                  className='errorIcon'
                  id='secondFail'
                  d='M361 42L380 23M380 42L361 23'
                />
              ) : (
                <path
                  className='checkIcon'
                  id='secondCheck'
                  d='M365.898 37.5682L359.26 31.038L357 33.2461L365.898 42L385 23.2081L382.756 21L365.898 37.5682Z'
                />
              ))}
          </g>

          <defs>
            <linearGradient
              id='barGradient'
              x1='0%'
              y1='50%'
              x2='200%'
              y2='50%'
            >
              <motion.stop id='true' animate={{ offset: progressTrue }} />

              <motion.stop id='false' animate={{ offset: progressFalse }} />
            </linearGradient>

            <filter
              id='barFilter'
              x='0'
              y='0'
              width='750'
              height='72'
              filterUnits='userSpaceOnUse'
            >
              <feFlood floodOpacity='0' result='BackgroundImageFix' />
              <feColorMatrix
                in='SourceAlpha'
                type='matrix'
                values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
              />
              <feOffset dy='4' dx='4' />
              <feGaussianBlur stdDeviation='2' />
              <feColorMatrix
                type='matrix'
                values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0'
              />
              <feBlend
                mode='normal'
                in2='BackgroundImageFix'
                result='effect1_dropShadow'
              />
              <feBlend
                mode='normal'
                in='SourceGraphic'
                in2='effect1_dropShadow'
                result='shape'
              />
            </filter>
          </defs>
        </svg>

        {status === 'rejected' ? (
          <div id='rejected'>
            <p id='title'>Solicitação rejeitada</p>

            <p>{message}</p>

            <button
              id='scrollButton'
              type='button'
              onClick={() => window.scrollTo(0, 0)}
            >
              Escolher outro papel
            </button>
          </div>
        ) : (
          <></>
        )}
      </Card>
    </Style>
  )
}

export default RequestStatus
