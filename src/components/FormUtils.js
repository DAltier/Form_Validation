export const UPDATE_FORM = "UPDATE_FORM"

export const onInputChange = (name, value, dispatch, state) => {
  const { hasError, error } = validateInput(name, value)
  let isFormValid = true
  
  for (const key in state) {
    const item = state[key]
    if (key === name && hasError) {
      isFormValid = false
      break
    } else if (key !== name && item.hasError) {
      isFormValid = false
      break
    }
  }
  dispatch({
    type: UPDATE_FORM,
    data: { name, value, hasError, error, isFormValid},
  })
}


export const validateInput = (name, value) => {
  let hasError = false, 
    error = ""
  switch (name) {
    case "firstName":
      if (value.trim().length < 2) {
        hasError = true
        error = "First Name must be at least 2 characters."
      } else if (!/^[a-zA-Z ]+$/.test(value)) {
        hasError = true
        error = "Invalid First Name. Avoid Special Characters"
      } else {
        hasError = false
        error = ""
      }
      break
    case "lastName":
      if (value.trim().length < 2) {
        hasError = true
        error = "Last Name must be at least 2 characters."
      } else if (!/^[a-zA-Z ]+$/.test(value)) {
        hasError = true
        error = "Invalid Last Name. Avoid Special Characters"
      } else {
        hasError = false
        error = ""
      }
      break
    case "email":
      if (value.trim() === "") {
        hasError = true
        error = "Email must be at least 5 characters long."
      } else if (
        !/^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/.test(value)
      ) {
        hasError = true
        error = "Invalid Email"
      } else {
        hasError = false
        error = ""
      }
      break
    case "password":
      if (value.trim() === "") {
        hasError = true
        error = "Password cannot be empty"
      } else if (value.trim().length < 8) {
        hasError = true
        error = "Password must have at least 8 characters"
      } else {
        hasError = false
        error = ""
      }
      break
    default:
      break
  }
  return { hasError, error }
}