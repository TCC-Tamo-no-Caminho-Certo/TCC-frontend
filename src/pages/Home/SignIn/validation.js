import * as Yup from "yup"

const validation = {
  email: Yup.lazy(value => {
    switch (typeof value) {
      case 'string':
        return Yup.string().required("Category not provided!")
      default:
        return Yup.array().of(Yup.string().min(1)).required("Category not provided!")
    }
  }),
  password: Yup.string()
    .notRequired()
    .min(6, "A senha deve conter mais que 6 caracteres!")

}

export default validation
