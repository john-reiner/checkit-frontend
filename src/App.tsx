import { useState } from 'react'
import { Center, MantineProvider, Text } from '@mantine/core';


import './App.css'
import List from './containers/list/List'

function App() {
  const [count, setCount] = useState(0)

  return (
    <MantineProvider withGlobalStyles withNormalizeCSS theme={{ colorScheme: 'dark' }}>
      <Text>Welcome to Check.it!</Text>
      <Center>
        <List />
      </Center>
    </MantineProvider>
  )
}

export default App
