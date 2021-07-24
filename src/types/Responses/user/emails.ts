export interface EmailType {
  id: number
  main: boolean
  address: string
  university_id: number
  institutional: boolean
  options?: any
}

export type EmailsType = EmailType[]
