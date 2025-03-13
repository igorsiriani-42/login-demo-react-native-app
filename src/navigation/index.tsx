import {
    createStaticNavigation,
    StaticParamList,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Login } from './screens/Login';
import { Profile } from './screens/Profile';
import { NotFound } from './screens/NotFound';


const RootStack = createNativeStackNavigator({
    screens: {
        Login: {
            screen: Login,
            options: {
                title: 'Login',
                headerShown: false,
            },
        },
        Profile: {
            screen: Profile,
            options: {
                title: 'Profile',
                headerShown: false,
            },
            linking: {
                path: ':user(@[a-zA-Z0-9-_]+)',
                parse: {
                    user: (value) => value.replace(/^@/, ''),
                },
                stringify: {
                    user: (value) => `@${value}`,
                },
            },
        },
        NotFound: {
            screen: NotFound,
            options: {
                title: '404',
            },
            linking: {
                path: '*',
            },
        },
    },
});

export const Navigation = createStaticNavigation(RootStack);

type RootStackParamList = StaticParamList<typeof RootStack>;

declare global {
    namespace ReactNavigation {
        interface RootParamList extends RootStackParamList { }
    }
}
