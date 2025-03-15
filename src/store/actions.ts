import { Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { RootState } from './index';
import { PokemonActionTypes, SET_LOADING, SET_POKEMON_LIST, ADD_TO_WISHLIST, REMOVE_FROM_WISHLIST, SET_SELECTED_POKEMON, SET_POKEMON_DETAILS, SET_ABILITY_DESCRIPTIONS, SET_MOVE_DESCRIPTIONS } from './actionTypes';
import axiosInstance from '../utility/axiosInstance';
import { BASE_URL } from '../utility/constants';

// Fetch Pokemon List with pagination
export const fetchPokemonList = (limit: number = 150, offset: number = 0) => async (dispatch: Dispatch<PokemonActionTypes>) => {
  dispatch({ type: SET_LOADING, payload: true });
  try {
    const response = await axiosInstance.get(`${BASE_URL}/pokemon?limit=${limit}&offset=${offset}`);

    const modifiedResults = response.data.map((pokemon: { name: string; url: string; id: number; thumbnail: string }) => {
      return { id: pokemon.id, name: pokemon.name, image: pokemon.thumbnail };
    });
    dispatch({ type: SET_POKEMON_LIST, payload: modifiedResults });
  } catch (error) {
    console.error('Failed to fetch Pokemon list', error);
  } finally {
    dispatch({ type: SET_LOADING, payload: false });
  }
};

// Fetch Ability Descriptions for given abilities
export const fetchAbilityDescriptions = (abilities: string[]) => async (dispatch: Dispatch<PokemonActionTypes>, getState: () => RootState) => {
  const { abilityDescriptions } = getState().pokemon;
  
  const missingAbilities = abilities.filter(ability => !abilityDescriptions[ability]);
  if (missingAbilities.length === 0) return;

  try {
    const descriptions: { [key: string]: string } = {};
    for (const ability of missingAbilities) {
      const res = await axiosInstance.get(`${BASE_URL}/pokemon/ability/${ability}`);
      const data = res.data;
      descriptions[ability] = data.effect_entries.find((entry: any) => entry.language.name === "en")?.effect || "No description available.";
    }
    dispatch({ type: SET_ABILITY_DESCRIPTIONS, payload: descriptions });
  } catch (error) {
    console.error('Failed to fetch ability descriptions', error);
  }
};

// Fetch Move Descriptions for given moves
export const fetchMoveDescriptions = (moves: string[]) => async (dispatch: Dispatch<PokemonActionTypes>, getState: () => RootState) => {
  const { moveDescriptions } = getState().pokemon;

  const missingMoves = moves.filter(move => !moveDescriptions[move]);
  if (missingMoves.length === 0) return;

  try {
    const descriptions: { [key: string]: string } = {};
    for (const move of missingMoves) {
      const res = await axiosInstance.get(`${BASE_URL}/pokemon/move/${move}`);
      const data = res.data;
      descriptions[move] = data.effect_entries.find((entry: any) => entry.language.name === "en")?.effect || "No description available.";
    }
    dispatch({ type: SET_MOVE_DESCRIPTIONS, payload: descriptions });
  } catch (error) {
    console.error('Failed to fetch move descriptions', error);
  }
};

// Add Pokemon to Wishlist
export const addToWishlist = (pokemon: any) => async (dispatch: Dispatch<PokemonActionTypes>) => {
  const { id } = pokemon;

  try {
    await axiosInstance.post(`${BASE_URL}/pokemon/favorites`, {
      pokemonIds: [id]
    });
  } catch (error) {
    console.error('Failed to add to wishlist', error);
  } finally {
    dispatch({
      type: ADD_TO_WISHLIST,
      payload: [pokemon],
    });
  }
};

// Remove Pokemon from Wishlist
export const removeFromWishlist = (pokemon: any) => async (dispatch: Dispatch<PokemonActionTypes>) => {
  const { id } = pokemon;

  try {
    await axiosInstance.delete(`${BASE_URL}/pokemon/favorites/${id}`);
    dispatch({
      type: REMOVE_FROM_WISHLIST,
      payload: pokemon,
    });
  } catch (error) {
    console.error('Failed to remove from wishlist', error);
  }
};

// Set selected Pokemon
export const setSelectedPokemon = (pokemon: any): PokemonActionTypes => ({
  type: SET_SELECTED_POKEMON,
  payload: pokemon,
});

// Fetch detailed information of a Pokemon
export const fetchPokemonDetails = (name: string): ThunkAction<void, RootState, unknown, PokemonActionTypes> => async (dispatch: Dispatch<PokemonActionTypes>) => {
  try {
    const response = await axiosInstance.get(`${BASE_URL}/pokemon/${name}`);
    dispatch({ type: SET_POKEMON_DETAILS, payload: response.data });
  } catch (error) {
    console.error('Failed to fetch Pokemon details', error);
  }
};

