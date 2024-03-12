import {useRoute, useNavigation} from '@react-navigation/native';
import {Suspense, useCallback, useMemo} from 'react';
import Reactotron from 'reactotron-react-native';
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import ErrorBoundary from 'react-native-error-boundary';
import {
  type EdgeInsets,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import CharacterOverviewError from './components/CharacterOverviewError';
import CharacterOverviewLoading from './components/CharacterOverviewLoading';
import Episode from './components/Episode';
import {useGetCharacter} from './hooks';
import useCharactersStore from '../store';

const CharacterOverviewComponent = () => {
  const edgeInsets = useSafeAreaInsets();
  const {params} = useRoute<any>();

  const {isFavourite, setFavourite, removeFromFavourites} =
    useCharactersStore();

  const isCharacterFavourite = isFavourite(params.id);

  const {goBack} = useNavigation();

  Reactotron.onCustomCommand({
    title: 'Go Back',
    description: 'Goes back',
    command: 'goBack',
    handler: () => {
      Reactotron.log('Going back');
      goBack();
    },
  });
  const styles = useMemo(() => generateStyles(edgeInsets), [edgeInsets]);

  const {data} = useGetCharacter(params.id);

  const onPressGoBack = useCallback(() => {
    goBack();
  }, [goBack]);

  const onPressFavourite = useCallback(() => {
    isCharacterFavourite ? removeFromFavourites(data!) : setFavourite(data!);
  }, [data, isCharacterFavourite, removeFromFavourites, setFavourite]);

  if (!data) {
    return null;
  }

  const {image, name, species, status, episode} = data;
  return (
    <ScrollView style={styles.root} showsVerticalScrollIndicator={false}>
      <Image style={styles.image} source={{uri: image}} />
      <Pressable
        style={styles.backButton}
        onPress={onPressGoBack}
        testID="back-button">
        <Text style={styles.headerButtonText}>←</Text>
      </Pressable>
      <Pressable
        style={styles.favourtieButton}
        onPress={onPressFavourite}
        testID="favourtie-button">
        <Text style={styles.headerButtonText}>
          {isCharacterFavourite ? '★' : '☆'}
        </Text>
      </Pressable>
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{name}</Text>
        <View style={styles.secondaryInfoContainer}>
          <Text style={styles.secondaryInfo}>{species}</Text>
          <Text style={styles.secondaryInfo}>{status}</Text>
        </View>
        <View style={styles.episodesContainer}>
          <Text style={styles.episodesTitle}>Episodes</Text>
          {episode.map(e => (
            <Episode episode={e} key={e} />
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

const generateStyles = ({top}: EdgeInsets) =>
  StyleSheet.create({
    root: {
      flex: 1,
      backgroundColor: 'white',
    },
    backButton: {
      position: 'absolute',
      left: 16,
      top: top + 16,
      backgroundColor: 'white',
      borderRadius: 24,
      height: 48,
      width: 48,
      alignItems: 'center',
      justifyContent: 'center',
    },
    headerButtonText: {
      fontWeight: '600',
      fontSize: 32,
      color: 'green',
    },
    favourtieButton: {
      position: 'absolute',
      right: 16,
      top: top + 16,
      backgroundColor: 'white',
      borderRadius: 24,
      height: 48,
      width: 48,
      alignItems: 'center',
      justifyContent: 'center',
    },
    image: {
      alignSelf: 'stretch',
      height: 320,
    },
    infoContainer: {
      padding: 16,
    },
    name: {
      fontSize: 32,
      color: 'grey',
    },
    secondaryInfoContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginTop: 8,
    },
    secondaryInfo: {
      fontSize: 24,
      color: 'grey',
    },
    episodesContainer: {
      borderTopWidth: 1,
      borderTopColor: 'grey',
      marginVertical: 16,
    },
    episodesTitle: {
      fontSize: 16,
      color: 'grey',
      marginTop: 8,
      marginBottom: 16,
    },
  });

const CharacterOverview = () => (
  <ErrorBoundary FallbackComponent={CharacterOverviewError}>
    <Suspense fallback={<CharacterOverviewLoading />}>
      <CharacterOverviewComponent />
    </Suspense>
  </ErrorBoundary>
);

export default CharacterOverview;
