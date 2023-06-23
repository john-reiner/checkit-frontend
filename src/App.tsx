import { useState } from 'react'
import { MantineProvider, Text } from '@mantine/core';

import './App.css'
import AppContainer from './AppContainer'

function App() {
  const [count, setCount] = useState(0)

  return (
    <MantineProvider withGlobalStyles withNormalizeCSS theme={{ colorScheme: 'dark' }}>
      <Text>Welcome to Check.it!</Text>
        <AppContainer />
    </MantineProvider>
  )
}

export default App
