// Importa propriedades de navegação e decodificação de JWT
import { StaticScreenProps } from '@react-navigation/native';
import { jwtDecode } from 'jwt-decode';
import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';


/**
 * Componente Profile
 * - Recebe o token JWT via rota e decodifica para extrair o nome do usuário.
 * - Exibe informações do perfil do usuário após login bem-sucedido.
 */
export function Profile({ route }: ProfileProps) {
    // Estado para armazenar o nome do usuário extraído do token
    const [name, setName] = useState('');

    // useEffect para ser executado uma única vez quando o componente for montado
    useEffect(() => {
        // 1. Recupera o token enviado como parâmetro pela rota
        const { token } = route.params;

        // 2. Decodifica o token JWT utilizando a função jwtDecode
        const decoded = jwtDecode(token) as JwtPayload;

        // 3. Atualiza o estado 'name' com o nome extraído do token decodificado
        setName(decoded.name);
    }, []);

    // Renderiza a interface do componente com logo, título e mensagem de boas-vindas
    return (
        <View style={styles.container}>
            {/* Exibe o logotipo do IMT */}
            <Image
                style={styles.logo}
                source={require('../../../assets/logo-IMT.png')}
            />
            {/* Título da tela */}
            <Text style={styles.title}>Login bem sucedido</Text>
            {/* Mensagem de boas-vindas com o nome do usuário */}
            <Text style={styles.welcome}>Bem vindo {name}!</Text>
        </View>
    );
}

// Estilos utilizados na tela do perfil
const styles = StyleSheet.create({
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
