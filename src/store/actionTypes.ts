export const SET_POKEMON_LIST = 'SET_POKEMON_LIST';
export const ADD_TO_WISHLIST = 'ADD_TO_WISHLIST';
export const REMOVE_FROM_WISHLIST = 'REMOVE_FROM_WISHLIST';
export const SET_SELECTED_POKEMON = 'SET_SELECTED_POKEMON';
export const SET_POKEMON_DETAILS = 'SET_POKEMON_DETAILS';
export const SET_LOADING = 'SET_LOADING';
export const SET_ABILITY_DESCRIPTIONS = 'SET_ABILITY_DESCRIPTIONS';
export const SET_MOVE_DESCRIPTIONS = 'SET_MOVE_DESCRIPTIONS';

export interface Pokemon {
  id: number;
  name: string;
  image: string;
}

export interface PokemonDetails {
  id: number;
  name: string;
  abilities: any[];
  types: any[];
  height: number;
  weight: number;
  base_experience: number;
  stats: any[];
  moves: any[];
}

interface SetPokemonListAction {
  type: typeof SET_POKEMON_LIST;
  payload: Pokemon[];
}

interface AddToWishlistAction {
  type: typeof ADD_TO_WISHLIST;
  payload: Pokemon[];
}

interface RemoveFromWishlistAction {
  type: typeof REMOVE_FROM_WISHLIST;
  payload: Pokemon;
}

interface SetSelectedPokemonAction {
  type: typeof SET_SELECTED_POKEMON;
  payload: Pokemon;
}

interface SetPokemonDetailsAction {
  type: typeof SET_POKEMON_DETAILS;
  payload: PokemonDetails;
}

interface SetLoadingAction {
  type: typeof SET_LOADING;
  payload: boolean;
}

interface SetAbilityDescriptionsAction {
  type: typeof SET_ABILITY_DESCRIPTIONS;
  payload: { [key: string]: string };
}

interface SetMoveDescriptionsAction {
  type: typeof SET_MOVE_DESCRIPTIONS;
  payload: { [key: string]: string };
}



export type PokemonActionTypes =
  | SetPokemonListAction
  | AddToWishlistAction
  | RemoveFromWishlistAction
  | SetSelectedPokemonAction
  | SetPokemonDetailsAction
  | SetLoadingAction
  | SetAbilityDescriptionsAction
  | SetMoveDescriptionsAction;
