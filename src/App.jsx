import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Home from './pages/Home'
import ColumnMatcher from './pages/ColumnMatcher'
import SentenceSorter from './pages/SentenceSorter'
import CompleteSentence from './pages/CompleteSentence'
import ListenWrite from './pages/ListenWrite'



function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <ColumnMatcher />
    </div>
  )
}

export default App
