// Importa componentes e funções necessárias de bibliotecas externas
import { Text } from '@react-navigation/elements';
import { StyleSheet, View, Image } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import {
    exchangeCodeAsync,
    makeRedirectUri,
    useAuthRequest,
    useAutoDiscovery,
} from 'expo-auth-session';
import { Tools } from '../../services/services';
import { Button } from '@rneui/themed';


// Verifica e completa a sessão de autenticação, se necessário
WebBrowser.maybeCompleteAuthSession();

// Recupera as variáveis de ambiente para configuração do tenant e do client
const tenantId = process.env.EXPO_PUBLIC_AZURE_TENANT_ID;
const clientId = process.env.EXPO_PUBLIC_AZURE_CLIENT_ID;

/**
 * Componente de Login que realiza a autenticação com a conta Microsoft.
 */
export function Login() {
    // Estado para controlar a exibição do loading durante o processo de login
    const [loading, setLoading] = useState(false);
    // Estado para armazenar o token JWT obtido após a autenticação
    const [token, setToken] = useState<string | null>(null);
    // Hook para navegação entre telas
    const navigation = useNavigation();

    // Descoberta automática do endpoint de autenticação da Azure
    const discovery = useAutoDiscovery(
        `https://login.microsoftonline.com/${tenantId}/v2.0`,
    );

    // Geração da URI de redirecionamento com base na configuração do aplicativo
    const redirectUri = makeRedirectUri({
        scheme: undefined,
        path: 'auth',
    });

    // Configuração da requisição de autenticação com os parâmetros necessários
    const [request, , promptAsync] = useAuthRequest(
        {
            clientId,
            scopes: ['openid', 'profile', 'email', 'offline_access'],
            redirectUri,
        },
        discovery,
    );

    /**
     * Função para tratar o login.
     * - Inicia o fluxo de autenticação.
     * - Troca o código recebido por um token de acesso.
     * - Navega para a tela de perfil com o token.
     */
    const handleLogin = async () => {
        // Inverte o estado de loading para indicar início do processo
        setLoading((loading) => !loading);

        // Inicia o fluxo de autenticação e obtém a resposta com o código
        promptAsync().then((codeResponse) => {
            if (request && codeResponse?.type === 'success' && discovery) {
                // Troca o código de autorização por um token de acesso
                exchangeCodeAsync(
                    {
                        clientId,
                        code: codeResponse.params.code,
                        // Inclui o code verifier, se disponível
                        extraParams: request.codeVerifier
                            ? { code_verifier: request.codeVerifier }
                            : undefined,
                        redirectUri,
                    },
                    discovery,
                ).then((res) => {
                    // Armazena o token de acesso e navega para a tela de perfil
                    setToken(res.accessToken);
                    navigation.navigate('Profile', { token: res.accessToken } as ProfileProps);
                });
            }
        });

        // Adiciona uma espera (delay) de 5 segundos, utilizando uma função do serviço Tools
        await Tools.delay(5000);
        // Inverte o estado de loading para indicar término do processo
        setLoading((loading) => !loading);
    }

    // Efeito para monitorar mudanças no estado de loading e token
    useEffect(() => { }, [loading, token]);

    // Renderiza a interface do componente de Login
    return (
        <View style={styles.container}>
            {/* Exibe o logotipo do IMT */}
            <Image
                style={styles.logo}
                source={require('../../../assets/logo-IMT.png')}
            />
            {/* Título da tela */}
            <Text style={styles.title}>Mauá Login Demo</Text>
            {/* Botão para iniciar o processo de login com a conta Microsoft */}
            <Button
                loading={loading}
                onPress={() => handleLogin()}
                title='Continuar com a conta Microsoft'
                icon={{
                    name: 'microsoft',
                    type: 'font-awesome-5',
                    size: 15,
                    color: 'white',
                }}
                iconContainerStyle={{ marginRight: 10 }}
                titleStyle={{ fontWeight: '700' }}
                buttonStyle={{
                    backgroundColor: 'rgba(90, 154, 230, 1)',
                    borderColor: 'transparent',
                    borderWidth: 0,
                    borderRadius: 30,
                }}
                containerStyle={{
                    width: 300,
                    marginHorizontal: 50,
                    marginVertical: 10, 
                }}
            />
        </View>
    );
}

// Estilos utilizados na tela de Login
export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
        fontWeight: 'bold',
    },
    welcome: {
        fontSize: 18,
        marginBottom: 20,
        fontWeight: 'regular',
    },
    logo: {
        width: 150,
        height: 150,
        marginBottom: 20,
        resizeMode: 'contain',
    },
});
