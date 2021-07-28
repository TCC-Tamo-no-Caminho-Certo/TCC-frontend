import { Response } from '../index'

export type CourseType = {
  name: string
  courses_id: number
  university_id: number
}

export type CoursesType = CourseType[]

export interface CoursesResType extends Response {
  courses: CoursesType
}
