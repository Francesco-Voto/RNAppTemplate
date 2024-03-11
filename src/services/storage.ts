import {MMKV} from 'react-native-mmkv';
import {Cache} from 'swr';

export const mmkv = new MMKV();

const storage: Cache = {
  keys: () => mmkv.getAllKeys() as any as IterableIterator<string>,
  set: (key, value) => mmkv.set(key, JSON.stringify(value)),
  get: key => {
    const data = mmkv.getString(key);
    return data ? JSON.parse(data) : undefined;
  },
  delete: mmkv.delete,
};

export default storage;
