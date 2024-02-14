import { useContext } from "react"
import { ThemeContext } from "@/context"

const ThemeToggle = () => {

  const [ theme, setTheme ] = useContext(ThemeContext)

  return (
    <div className="theme-toggle">
      <div className="theme-toggle-day-bg" />
      <div className="theme-toggle-night-bg" />
      <button
        className="theme-toggle-button"
        onClick={() => setTheme(theme == 'dark' ? 'light' : 'dark')}
        aria-label={`Theme toggle button currently on ${theme} mode`}
      />
    </div>
  )
}

export default ThemeToggle