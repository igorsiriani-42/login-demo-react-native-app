# Login Demo

Este é um template de aplicativo feito em React Native com Expo, demonstrando como implementar a autenticação com conta Microsoft (Azure AD). O objetivo deste projeto é servir de base para que futuros aplicativos integrem o login Microsoft de forma simples e escalável.

## Recursos

- **Autenticação com Microsoft:** Implementação de login utilizando Azure AD.
- **Decodificação de Token JWT:** Extração de informações do usuário a partir do token.
- **Navegação:** Uso do React Navigation para transição entre telas (ex.: Login e Perfil).
- **Template Escalável:** Estrutura modular para servir como base para novos projetos.

## Pré-requisitos

- [Node.js](https://nodejs.org/) (recomendado a versão LTS)
- [npm](https://www.npmjs.com/) ou [Yarn](https://yarnpkg.com/)
- [Expo CLI](https://docs.expo.dev/workflow/expo-cli/) instalado globalmente

## Instalação

1. **Clone o repositório:**

   ```bash
   git clone https://github.com/igorsiriani-42/login-demo-react-native-app.git
   cd login-demo-react-native-app
	```
2. **Instale as dependências:**
	```bash	
    npm install	
    ```
    ou, se preferir usar o Yarn:
	```bash	
    yarn install 
    ```
3. **Configure as Variáveis de Ambiente:**	Crie um arquivo .env na raiz do projeto e adicione as seguintes variáveis:
	```bash	
	EXPO_PUBLIC_AZURE_TENANT_ID=seu-tenant-id
	EXPO_PUBLIC_AZURE_CLIENT_ID=seu-client-id
	```
	Substitua seu-tenant-id e seu-client-id pelos valores fornecidos pela equipe do GTI-Mauá.

## Executando o Aplicativo

Para iniciar o aplicativo, execute:
```bash
expo start
```
Isso abrirá o Expo Developer Tools, permitindo que você execute o app em um emulador ou em um dispositivo físico utilizando o Expo Go.

## Estrutura do Projeto

* assets/
Contém imagens e outros recursos estáticos utilizados no aplicativo.
* src/
	* screens/
		* Login.tsx: Tela que implementa o fluxo de autenticação com a conta Microsoft.
		* Profile.tsx: Tela que exibe as informações do usuário após a autenticação.
		* ...
	* services/	Funções e serviços auxiliares, como funções de delay ou outras utilidades.
* README.md: Este arquivo com informações sobre o projeto.

## Considerações Finais

Este template demonstra uma abordagem prática e escalável para implementar o login com Microsoft em aplicativos React Native utilizando Expo. Sinta-se à vontade para personalizar, expandir e integrar novas funcionalidades conforme as necessidades do seu projeto.

## Licença
Este projeto está licenciado sob a [GNU General Public License v3.0](https://github.com/igorsiriani-42/login-demo-react-native-app/blob/main/LICENSE).
