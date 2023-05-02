import { useState } from 'react'
import { Center, MantineProvider, Text } from '@mantine/core';
import { datadogRum } from '@datadog/browser-rum';

datadogRum.init({
    applicationId: 'ba1c6d48-8530-4daf-9908-57998cd8d779',
    clientToken: 'pub0bb76854436adc2de96e53075ebcb108',
    site: 'datadoghq.com',
    service:'task.it',
    env:'<ENV_NAME>',
    // Specify a version number to identify the deployed version of your application in Datadog 
    // version: '1.0.0',
    sessionSampleRate: 100,
    sessionReplaySampleRate: 20,
    trackUserInteractions: true,
    trackResources: true,
    trackLongTasks: true,
    defaultPrivacyLevel:'mask-user-input'
});
    
datadogRum.startSessionReplayRecording();



import './App.css'
import List from './containers/list/List'

function App() {
  const [count, setCount] = useState(0)

  return (
    <MantineProvider withGlobalStyles withNormalizeCSS theme={{ colorScheme: 'dark' }}>
      <Text>Welcome to Check.it!</Text>
        <List />
    </MantineProvider>
  )
}

export default App
