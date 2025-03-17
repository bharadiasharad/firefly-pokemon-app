import { SET_POKEMON_LIST, ADD_TO_WISHLIST, REMOVE_FROM_WISHLIST, SET_SELECTED_POKEMON, SET_POKEMON_DETAILS, SET_LOADING, SET_ABILITY_DESCRIPTIONS, SET_MOVE_DESCRIPTIONS, Pokemon } from './actionTypes';

export interface PokemonState {
  pokemonList: Pokemon[];
  wishlist: Pokemon[];
  selectedPokemon: Pokemon | null;
  pokemonDetails: { [key: string]: any };
  abilityDescriptions: { [key: string]: string };
  moveDescriptions: { [key: string]: string };
  loading: boolean;
}

const initialState: PokemonState = {
  pokemonList: [],
  wishlist: [],
  selectedPokemon: null,
  pokemonDetails: {},
  abilityDescriptions: {},
  moveDescriptions: {},
  loading: false,
};

const pokemonReducer = (state = initialState, action: any): PokemonState => {
  switch (action.type) {
    case SET_POKEMON_LIST:
      return { ...state, pokemonList: Array.from(new Set([...state.pokemonList, ...action.payload])) };
    case SET_LOADING:
      return { ...state, loading: action.payload };
    case ADD_TO_WISHLIST:
      return { ...state, wishlist: Array.from(new Set([...state.wishlist, action.payload])) };
    case REMOVE_FROM_WISHLIST:
      return { ...state, wishlist: state.wishlist.filter(p => p.id !== action.payload.id) };
    case SET_SELECTED_POKEMON:
      return { ...state, selectedPokemon: action.payload };
    case SET_POKEMON_DETAILS:
      return { ...state, pokemonDetails: { ...state.pokemonDetails, [action.payload.name]: action.payload } };
    case SET_ABILITY_DESCRIPTIONS:
      return { ...state, abilityDescriptions: { ...state.abilityDescriptions, ...action.payload } };
    case SET_MOVE_DESCRIPTIONS:
      return { ...state, moveDescriptions: { ...state.moveDescriptions, ...action.payload } };
    default:
      return state;
  }
};

export default pokemonReducer;