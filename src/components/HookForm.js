import React, { useReducer, useState } from 'react';
import './style.css';
import { UPDATE_FORM, onInputChange, validateInput, } from './FormUtils'

const initialState = {
  firstName: {
    value: "",
    hasError: true,
    error: "",
  },
  lastName: {
    value: "",
    hasError: true,
    error: "",
  },
  email: {
    value: "",
    hasError: true,
    error: "",
  },
  password: {
    value: "",
    hasError: true,
    error: "",
  },
  isFormValid: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case UPDATE_FORM:
      const { name, value, hasError, error, isFormValid } = action.data
      return {
        ...state,
        [name]: { ...state[name], value, hasError, error, isFormValid},
        isFormValid,
      }
    default:
      return state
  }
}

function HookForm() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const [showError, setShowError] = useState(false)

  const formSubmitHandler = e => {
    e.preventDefault() //prevents the form from submitting
    let isFormValid = true

    for (const name in state) {
      const item = state[name]
      const { value } = item
      const { hasError, error } = validateInput(name, value)
      if (hasError) {
        isFormValid = false
      }
      if (name) {
        dispatch({
          type: UPDATE_FORM,
          data: {
            name,
            value,
            hasError,
            error,
            isFormValid,
          },
        })
      }
    }
    if (!isFormValid) {
      setShowError(true)
    } else {
      //Logic to submit the form to backend
    }
    // Hide the error message after 5 seconds
    setTimeout(() => {
      setShowError(false)
    }, 5000)
  }

  return (
    <div className = "App">
      {showError && !state.isFormValid && (<div className="form_error">Please fill all the fields correctly</div>)}
      <form onSubmit = {e => formSubmitHandler(e)}>
        <div className = "form-group">
          <label htmlFor = "lastName">First Name</label>
          <input type = "text" name = "firstName" id = "firstName" value = { state.firstName.value } onChange = { e => { onInputChange("firstName", e.target.value, dispatch, state) } } />
          { (state.firstName.hasError && (<p className="error">{ state.firstName.error }</p>)) }
        </div>

        <div className = "form-group">
          <label htmlFor = "lastName">Last Name</label>
          <input type = "text" name = "lastName" id = "lastName" value = { state.lastName.value } onChange = { e => { onInputChange("lastName", e.target.value, dispatch, state) } }/>
          { (state.lastName.hasError && (<p className="error">{ state.lastName.error }</p>)) }
        </div>

        <div className = "form-group">
          <label htmlFor = "lastName">Email</label>
          <input type = "text" name = "email" id = "email" value = { state.email.value } onChange = { e => { onInputChange("email", e.target.value, dispatch, state) } }/>
          { (state.email.hasError && (<p className="error">{ state.email.error }</p>)) }
        </div>

        <div className="form-group">
          <label htmlFor="lastName">Password</label>
          <input type="password" name="password" id="password" onChange = { e => { onInputChange("password", e.target.value, dispatch, state) } }/>
          { (state.password.hasError && (<p className="error">{ state.password.error }</p>)) }
        </div>

        <button type="submit">Login</button>

      </form>
    </div>
  )
};

export default HookForm;