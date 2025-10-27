import { StyleSheet, Text, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import RootNavigation from './src/navigation/RootNavigation';
import { Provider } from 'react-redux';
import store from './src/redux/store';

function App() {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <GestureHandlerRootView>
          <SafeAreaView style={{ flex: 1 }} edges={['top', 'left', 'right']}>
            <RootNavigation />
          </SafeAreaView>
        </GestureHandlerRootView>
      </SafeAreaProvider>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
