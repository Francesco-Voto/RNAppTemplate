import {getCharactersKey, getCharacters, type Character} from '@services/api';
import useSWRInfinite from 'swr/infinite';
import Reactotron from 'reactotron-react-native';

export function useGetCharactersList() {
  const bench = Reactotron.benchmark('Normalize Characters');

  const {data, size, setSize} = useSWRInfinite(
    getCharactersKey,
    getCharacters,
    {
      suspense: true,
      revalidateFirstPage: false,
    },
  );
  bench.step('Retrieving characters');
  const characters = data?.reduce(
    (acc: Character[], current: {results: Character[]}) => {
      return [...acc, ...current.results];
    },
    [],
  );
  bench.stop('Normalize characters');
  return {
    data: characters,
    size,
    setSize,
  };
}
