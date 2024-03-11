import {SafeAreaProvider} from 'react-native-safe-area-context';
import {enableFreeze, enableScreens} from 'react-native-screens';
import {NavigationContainer} from '@react-navigation/native';
import CharactersStack from './features/Characters';
import {SWRConfig} from 'swr';
import storage from './services/storage';

if (__DEV__) {
  require('./ReactotronConfig');
}

enableFreeze(true);
enableScreens(true);

function App(): React.JSX.Element {
  return (
    <SWRConfig
      value={{
        provider: () => storage,
      }}>
      <SafeAreaProvider>
        <NavigationContainer>
          <CharactersStack />
        </NavigationContainer>
      </SafeAreaProvider>
    </SWRConfig>
  );
}

export default App;
