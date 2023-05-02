import { useState } from 'react'
import { MantineProvider, Text } from '@mantine/core';
import { Group, Button } from '@mantine/core';


import './App.css'
import List from './containers/list/List'

function App() {
  const [count, setCount] = useState(0)

  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <Text>Welcome to Check.it!</Text>
      <List />
      <Group>
      <Button variant="outline">1</Button>
      <Button variant="outline">2</Button>
      <Button variant="outline">3</Button>
    </Group>
    </MantineProvider>
  )
}

export default App
