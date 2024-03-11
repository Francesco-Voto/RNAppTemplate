import {mmkv} from '@services/storage';
import Reactotron, {
  trackGlobalLogs,
  trackGlobalErrors,
} from 'reactotron-react-native';
import type {ReactotronReactNative} from 'reactotron-react-native';
import mmkvPlugin from 'reactotron-react-native-mmkv';

Reactotron.setAsyncStorageHandler(null)
  .configure({})
  .useReactNative()
  .use(trackGlobalLogs() as any)
  .use(trackGlobalErrors() as any)
  .use(mmkvPlugin<ReactotronReactNative>({storage: mmkv}))
  .connect();
