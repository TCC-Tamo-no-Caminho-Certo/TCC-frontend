/* eslint-disable jsx-a11y/aria-role */
import React, { useEffect, useState } from 'react'
import Form from './styles'

import Container from '../Container'

import { emailSchema, receiptSchema } from 'utils/validations/addRoleForms/student'

import AlertIcon from 'assets/Inputs/AlertIcon'

import { File, Select, Submit, Text } from 'components/Form'

import { AnimatePresence, motion, Variants } from 'framer-motion'

const emailSize = 35
const receiptSize = 88

const universityOptions = [
  { value: 'universidade-anhembi-morumbi', label: 'Universidade Anhembi Morumbi' },
]

const courseOptions = [
  { value: 'computer-engineering', label: 'Engenharia da Computação' },
  { value: 'computer-science', label: 'Ciência da Computação' },
]

const semesterOptions = [
  { value: 'first', label: '1° Semestre' },
  { value: 'second', label: '2° Semestre' },
  { value: 'third', label: '3° Semestre' },
  { value: 'room', label: '4° Semestre' },
  { value: 'fifth', label: '5° Semestre' },
  { value: 'sixth', label: '6° Semestre' },
  { value: 'seventh', label: '7° Semestre' },
  { value: 'eighth', label: '8° Semestre' },
  { value: 'ninth', label: '9° Semestre' },
  { value: 'tenth', label: '10° Semestre' },
]

const inputs: Variants = {
  initial: { height: 0 },
  email: { height: emailSize },
  receipt: { height: receiptSize },
}

const StudentForm: React.FC = () => {
  const [wayOfSignup, setWayOfSignup] = useState<undefined | 'email' | 'receipt'>(undefined)

  const method: Variants = {
    initial: {
      opacity: 0,
      height: 0,
    },
    open: {
      opacity: 1,
      x: wayOfSignup === 'email' ? [-300, 0] : [300, 0],
      transition: {
        type: 'tween',
        duration: 0.4,
      },
    },
    closed: {
      opacity: 0,
      x: wayOfSignup === 'email' ? [0, -300] : [0, 300],
      transition: {
        type: 'tween',
        duration: 0.2,
      },
    },
  }

  useEffect(() => {
    setTimeout(() => {
      window.scrollTo(0, document.body.scrollHeight)
    }, 100)
  }, [])

  return (
    <Container role='student'>
      <Form
        path='user/addRole/student'
        schema={wayOfSignup === 'email' ? emailSchema : receiptSchema}
        loading
      >
        <Select name='university' placeholder='Universidade' options={universityOptions} />
        <Select name='course' placeholder='Curso' options={courseOptions} />
        <Select name='semester' placeholder='Semestre' options={semesterOptions} />
        <div id='ways'>
          <span id='label'>Forma de registro</span>

          <div id='buttons'>
            <button type='button' onClick={() => setWayOfSignup('email')}>
              E-mail institucional
            </button>

            <button type='button' onClick={() => setWayOfSignup('receipt')}>
              Enviar comprovante
            </button>
          </div>

          <motion.div
            id='inputs'
            initial='initial'
            variants={inputs}
            animate={wayOfSignup}
            transition={{ type: 'tween', duration: 0.3 }}
          >
            <AnimatePresence>
              {wayOfSignup === 'email' && (
                <motion.div variants={method} exit='closed' animate='open'>
                  <Text name='email' placeholder='E-mail institucional' />
                </motion.div>
              )}
            </AnimatePresence>

            <AnimatePresence>
              {wayOfSignup === 'receipt' && (
                <motion.div id='receipt' variants={method} exit='closed' animate='open'>
                  <div id='warning'>
                    <AlertIcon />

                    <div>
                      Este processo é mais lento pois requer confirmação de um <b>Moderador</b> de
                      sua universidade.
                    </div>
                  </div>

                  <File guides name='receipt' label='Enviar comprovante' />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>

        <Submit id='submit' disabled={wayOfSignup === undefined}>
          Enviar solicitação
        </Submit>
      </Form>
    </Container>
  )
}

export default StudentForm
