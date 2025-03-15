import React from 'react';
import { Provider } from 'react-redux';
import { Layout, Splitter } from 'antd';
import store from './store';
import PokemonList from './components/PokemonList';
import PokemonDetails from './components/PokemonDetails';
import './App.css';
import LoginLogoutButton from './components/LoginLogoutButton';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Layout style={{ minHeight: '100vh', minWidth: "100vw" }}>
        <LoginLogoutButton />
        <Splitter style={{ height: "100vh", boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
          <Splitter.Panel defaultSize="30%" min="20%" max="70%">
            <PokemonList />
          </Splitter.Panel>
          <Splitter.Panel>
            <PokemonDetails />
          </Splitter.Panel>
        </Splitter>
      </Layout>
    </Provider>
  );
};

export default App;