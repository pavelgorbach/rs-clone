import jwtDecode from 'jwt-decode'
import React, { useEffect, useState } from 'react'

type decoded = {
  id: string
  login: string
  iat: number
  exp: number
}

export default function LogoutTimer() {
  const [hours, setHours] = useState('00')
  const [minutes, setMinutes] = useState('00')
  const [seconds, setSeconds] = useState('00')

  function getTimeToLogout(): number {
    const rawToken = localStorage.getItem('token')
    const milliseconds = 1000
    if (rawToken) {
      const decode: decoded = jwtDecode(rawToken)
      const date = new Date().getTime()
      return (decode.exp * milliseconds - date) / milliseconds
    }
    return 0
  }

  function getTimeFormattedString() {
    const secondsInOneHour = 3600
    const secondsInOneMinute = 60
    const time = getTimeToLogout()
    const hours = Math.trunc(time / secondsInOneHour)
    const minutes = Math.trunc((time - hours * secondsInOneHour) / secondsInOneMinute)
    const seconds = Math.trunc(time - (hours * secondsInOneHour + minutes * secondsInOneMinute))
    if (time) {
      setHours(hours.toString().padStart(2, '0'))
      setMinutes(minutes.toString().padStart(2, '0'))
      setSeconds(seconds.toString().padStart(2, '0'))
    } else {
      setHours('problems with token')
      setMinutes('')
      setSeconds('')
      clearInterval(interval)
    }
  }

  let interval: number

  function timeHandler() {
    const timeToUpdate = 500
    interval = setInterval(() => {
      getTimeFormattedString()
    }, timeToUpdate)
  }

  useEffect(timeHandler, [])

  return (
    <div>
      {hours}:{minutes}:{seconds}
    </div>
  )
}
