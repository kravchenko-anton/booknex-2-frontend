import Toast from '@/components/toast'
import Alert from '@/components/ui/alert/alert'
import BottomSheet from '@/components/ui/bottom-sheet/bottom-sheet'
import FullScreenLoader from '@/components/ui/loader/big-loader'
import Navigation from '@/navigation/navigation'
import { persistor, store } from '@/redux/store'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { createAsyncStoragePersister } from '@tanstack/query-async-storage-persister'
import { QueryClient } from '@tanstack/react-query'
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client'
import { StatusBar } from 'expo-status-bar'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			cacheTime: 1000 * 60 * 60 * 24,
			networkMode: 'offlineFirst',
			refetchOnWindowFocus: false,
			refetchOnReconnect: false
		}
	}
})

const asyncStoragePersister = createAsyncStoragePersister({
	storage: AsyncStorage
})
export default function App() {
	return (
		<Provider store={store}>
			<PersistGate persistor={persistor} loading={<FullScreenLoader />}>
				<PersistQueryClientProvider
					client={queryClient}
					persistOptions={{ persister: asyncStoragePersister }}>
					<GestureHandlerRootView className='flex-1'>
						<Navigation />
						<BottomSheet />
					</GestureHandlerRootView>
					<Toast />
					<Alert />
					<StatusBar style={'dark'} />
				</PersistQueryClientProvider>
			</PersistGate>
		</Provider>
	)
}
