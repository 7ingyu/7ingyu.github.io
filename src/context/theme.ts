import { createContext } from 'react'
import type { Dispatch, SetStateAction } from 'react'

const ThemeContext = createContext<(string | Dispatch<SetStateAction<string>>)[] | null>(null)

export default ThemeContext