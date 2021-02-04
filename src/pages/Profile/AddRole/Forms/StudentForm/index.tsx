/* eslint-disable jsx-a11y/aria-role */
import React, { useEffect, useState } from 'react'
import Form from './styles'

import Container from '../Container'

import AlertIcon from 'assets/Inputs/AlertIcon'

import { Button, Input, Select } from 'components/Form'

import { AnimatePresence, motion, Variants } from 'framer-motion'

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

const emailSize = 86
const receiptSize = 88

const inputs: Variants = {
  initial: { height: 0 },
  email: { height: emailSize },
  receipt: { height: receiptSize },
}

const StudentForm: React.FC = () => {
  const [wayOfSignup, setWayOfSignup] = useState<undefined | 'email' | 'receipt'>(undefined)

  const insideMethod: Variants = {
    initial: {
      opacity: 0,
      height: 0,
    },
    open: {
      opacity: 1,
      x: wayOfSignup === 'receipt' ? [300, 0] : [-300, 0],
      transition: {
        type: 'tween',
        duration: 0.4,
      },
    },
    closed: {
      opacity: 0,
      x: wayOfSignup === 'receipt' ? [0, 300] : [0, -300],
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
      <Form path='user/complete-register' getData={data => console.log(data)} loading>
        <Select name='university' placeholder='Universidade' options={universityOptions} />
        <Select name='course' placeholder='Curso' options={courseOptions} />
        <Select name='semester' placeholder='Semestre' options={semesterOptions} />

        <div id='method'>
          <div id='methodLabel'>Forma de cadastro</div>

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
            <AnimatePresence presenceAffectsLayout>
              {wayOfSignup === 'email' && (
                <motion.div variants={insideMethod} animate='open' exit='closed' initial='initial'>
                  <Input name='email' placeholder='E-mail institucional' />

                  <Input name='register' placeholder='Registro acadêmico' />
                </motion.div>
              )}
            </AnimatePresence>

            <AnimatePresence presenceAffectsLayout>
              {wayOfSignup === 'receipt' && (
                <motion.div variants={insideMethod} animate='open' exit='closed' initial='initial'>
                  <div id='warning'>
                    <AlertIcon />

                    <div>
                      Este processo é mais lento pois requer confirmação de um <b>Moderador</b> de
                      sua universidade.
                    </div>
                  </div>

                  <Input name='receipt' placeholder='Enviar comprovante' />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>

        <Button id='submit'>Enviar solicitação</Button>
      </Form>
    </Container>
  )
}

export default StudentForm
