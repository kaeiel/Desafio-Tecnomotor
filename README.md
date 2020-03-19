# Desafio Tecnomotor

## Descrição:
O aplicativo é capaz de comunicar com a Web API da Tecnomotor, mostrando as informações recebidas em menus de seleção. O app foi construido utilizando a biblioteca [_React Native_](https://reactnative.dev/docs/getting-started) a qual permite que o código fonte seja escrito em _javascript_, porém, diferentemente da abordagem _apps webview_, o app em _react native_ tem partes compiladas para código nativo de cada dispositivo móvel, seja este iOs ou Android. 

O app está dividido em 5 telas: _home_, seleção de tipo, seleção de montadora, seleção do veículo e uma tela de detalhes expandidos. Tais telas foram construidas utilizando a biblioteca [_React Navigation_](https://reactnavigation.org/docs/getting-started). As telas de seleção apresentam a parte de comunicação com a API fornecida e exibem nas respectivas telas as informações disponíveis. A tela de detalhes expandidos apresenta a capacidade de armazenar a seleção feita pelo usuário em memória persistente. A tela inicial (_home_), além de redirecionar para a tela de seleção de tipo, também apresenta a última seleção salva pelo usuário (da tela de detalhes).


## Comandos
Para executar a versão de desenvolvimento do app
```
npm install -g expo-cli
cd tm-app
npm install
npm start
```

Dependências utilizadas (também encontradas em _package.json_):
```
yarn add @react-navigation/native
expo install react-native-gesture-handler react-native-reanimated react-native-screens react-native-safe-area-context @react-native-community/masked-view
yarn add @react-navigation/stack
```