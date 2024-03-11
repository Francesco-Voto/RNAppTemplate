import Reactotron from 'reactotron-react-native';

Reactotron.setAsyncStorageHandler(null)
  .configure({})
  .useReactNative()
  .connect();
