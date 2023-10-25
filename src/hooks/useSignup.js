import { useState } from 'react'

import { useNavigate } from "react-router-dom"; 



export const useSignup = () => {
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(null)
  

  const navigate = useNavigate();

  const signup = async (email, password) => {
    setIsLoading(true)
    setError(null)

    const response = await fetch('https://weather-app-backend123-32642e035139.herokuapp.com/api/user/signup', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ email, password })
    })
    const json = await response.json()

    if (!response.ok) {
      setIsLoading(false)
      setError(json.error)
    }
    if (response.ok) {
      // save the user to local storage
      localStorage.setItem('user', JSON.stringify(json))

      

      // update loading state
      setIsLoading(false)

      navigate('/login');
      alert("User Signed up")
    }
  }

  return { signup, isLoading, error }
}