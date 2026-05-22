'use client'
import { createContext, useContext, useState, useEffect } from 'react'
const Ctx = createContext()
export function ThemeProvider({ children }) {
  const [dark, setDark] = useState(false)
  useEffect(() => { if (localStorage.getItem('theme') === 'dark') setDark(true) }, [])
  function toggle() { setDark(p => { localStorage.setItem('theme', !p ? 'dark' : 'light'); return !p }) }
  return <Ctx.Provider value={{ dark, toggle }}><div data-theme={dark ? 'dark' : 'light'} style={{ minHeight: '100vh' }}>{children}</div></Ctx.Provider>
}
export function useTheme() { return useContext(Ctx) }
