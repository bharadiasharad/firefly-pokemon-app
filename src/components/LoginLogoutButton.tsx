import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { ADD_TO_WISHLIST, Pokemon, SET_POKEMON_LIST } from '../store/actionTypes';
import { useDispatch } from 'react-redux';
import { RootState } from '../store';
import { shallowEqual } from 'react-redux';
import { useSelector } from 'react-redux';
import { BASE_URL } from '../utility/constants';

// Purpose: A component that manages user login/logout, fetches user favorites from the server, and displays them in a list.

const LoginLogoutButton: React.FC = () => {
  const { pokemonList } = useSelector(
    (state: RootState) => state.pokemon,
    shallowEqual
  );
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [favorites, setFavorites] = useState<Pokemon[]>([]); // State to store favorites
  const dispatch = useDispatch();

  // Check if token is available in local storage
  useEffect(() => {
    const token = localStorage.getItem('access_token');
    setIsLoggedIn(!!token); // Set logged in state based on token presence

    if (token) {
      fetchFavorites(token); // Fetch favorites if logged in
    }
  }, []);

  // Fetch favorites after login
  const fetchFavorites = async (token: string) => {
    try {
      const response = await axios.get(`${BASE_URL}/pokemon/favorites`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'accept': 'application/json',
        }
      });

      setFavorites(response.data);

      const filteredFavorites = response.data.favoritePokemon.filter((fav: Pokemon) => {
        // Filter only those favorites that exist in the pokemon list
        const isInPokemonList = pokemonList.some((pokemon: Pokemon) => pokemon.id === fav.id);
        return isInPokemonList;
      });

      // Dispatch to update Pokemon list and favorites
      dispatch({
        type: SET_POKEMON_LIST,
        payload: filteredFavorites,
      });
      dispatch({
        type: ADD_TO_WISHLIST,
        payload: response.data.favoritePokemon,
      });
    } catch (error) {
      console.error('Failed to fetch favorites', error);
    }
  };

  // Handle Login
  const handleLogin = async () => {
    try {
      const response = await axios.post(`${BASE_URL}/auth/login`, {
        email: 'name@example.com',
        password: 'password1',
      });

      if (response.data?.access_token) {
        // Store token in local storage
        localStorage.setItem('access_token', response.data.access_token);
        setIsLoggedIn(true); // Update state to reflect logged in status

        // Fetch favorites after login
        fetchFavorites(response.data.access_token);
      }
    } catch (error) {
      console.error('Login failed', error);
    }
  };

  // Handle Logout
  const handleLogout = () => {
    localStorage.removeItem('access_token');
    setIsLoggedIn(false); // Update state to reflect logged out status
    setFavorites([]); // Clear favorites on logout
  };

  return (
    <div>
      <button
        onClick={isLoggedIn ? handleLogout : handleLogin}
        style={{
          position: 'fixed',
          top: '20px',
          right: '20px',
          padding: '10px 20px',
          backgroundColor: '#007BFF',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
        }}
      >
        {isLoggedIn ? 'Logout' : 'Login'}
      </button>

      {isLoggedIn && favorites.length > 0 && (
        <div>
          <h3>Your Favorites:</h3>
          <ul>
            {favorites.map((pokemon) => (
              <li key={pokemon.id}>{pokemon.name}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default LoginLogoutButton;
