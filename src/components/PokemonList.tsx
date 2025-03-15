/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useRef, useCallback, useMemo } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { fetchPokemonList, addToWishlist, removeFromWishlist, setSelectedPokemon } from '../store/actions';
import { RootState } from '../store';
import { List, Avatar, Spin, Input, Divider } from 'antd';
import _ from 'lodash';
import { Pokemon } from '../store/actionTypes';
import { HeartFilled, HeartOutlined } from '@ant-design/icons';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import { POKEMON_LIMIT } from '../utility/constants';

const PokemonList: React.FC = () => {
  const dispatch: ThunkDispatch<RootState, void, AnyAction> = useDispatch();

  const { pokemonList, wishlist, loading, selectedPokemon } = useSelector(
    (state: RootState) => state.pokemon,
    shallowEqual
  );

  const [offset, setOffset] = useState(0);
  const [wishlistFilter, setWishlistFilter] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const observer = useRef<IntersectionObserver | null>(null);

  // Handle search term input change
  const handleSearch = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  }, []);

  // Filter Pokemon list based on wishlist and search term
  const filteredPokemon = useMemo(() => {
    const list = wishlistFilter ? wishlist : pokemonList;
    return list.filter((p) => p.name.toLowerCase().includes(searchTerm.toLowerCase()));
  }, [pokemonList, wishlist, searchTerm, wishlistFilter]);

  // Toggle wishlist filter
  const handleWishlistFilterChange = useCallback(() => {
    setWishlistFilter((prev) => !prev);
  }, []);

  // Add Pokemon to wishlist
  const handleAddToWishlist = useCallback(
    (pokemon: Pokemon) => {
      dispatch(addToWishlist(pokemon));
    },
    [dispatch]
  );

  // Remove Pokemon from wishlist
  const handleRemoveFromWishlist = useCallback(
    (pokemon: Pokemon) => {
      dispatch(removeFromWishlist(pokemon));
    },
    [dispatch]
  );

  // Check if a Pokemon is in the wishlist
  const isInWishlist = useCallback(
    (pokemon: Pokemon) => {
      return wishlist.some((item) => item.id === pokemon.id);
    },
    [wishlist]
  );

  // Fetch Pokemon list data when offset changes
  useEffect(() => {
    dispatch(fetchPokemonList(POKEMON_LIMIT, offset));
  }, [offset, dispatch]);

  // Set up intersection observer for infinite scroll
  const lastPokemonElementRef = useCallback((node: Element | null) => {
    if (searchTerm || wishlistFilter) return; // Skip if search or wishlist filter is active
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(
      _.debounce((entries) => {
        if (entries[0].isIntersecting && !loading) {
          setOffset((prevOffset) => prevOffset + 150);
        }
      }, 100),
      { threshold: 1.0 }
    );
    if (node) observer.current.observe(node);
  }, [loading, searchTerm, wishlistFilter]);

  useEffect(() => {
    return () => {
      if (observer.current) observer.current.disconnect();
    };
  }, []);

  return (
    <div style={{ padding: '5px 10px', margin: '10px', zIndex: '999999' }}>

      {/* Search and Wishlist Filter */}
      <div style={{ display: 'flex', alignItems: 'center', width: '98%' }}>
        <Input
          placeholder="Search Pokemon"
          allowClear
          onChange={handleSearch}
          style={{ flex: 1 }} // Takes up available space
        />
        <span style={{ marginLeft: '8px' }}>
          {wishlistFilter ? (
            <HeartFilled style={{ color: 'red', cursor: 'pointer' }} onClick={handleWishlistFilterChange} />
          ) : (
            <HeartOutlined style={{ cursor: 'pointer' }} onClick={handleWishlistFilterChange} />
          )}
        </span>
      </div>

      <Divider />

      {/* Pokemon List */}
      <List
        dataSource={filteredPokemon}
        style={{ cursor: 'pointer' }}
        renderItem={(pokemon: Pokemon, index: number) => (
          <MemoizedPokemonItem
            key={pokemon.id}
            pokemon={pokemon}
            index={index}
            lastPokemonElementRef={index === filteredPokemon.length - 1 ? lastPokemonElementRef : () => {}}
            isInWishlist={isInWishlist}
            handleAddToWishlist={handleAddToWishlist}
            handleRemoveFromWishlist={handleRemoveFromWishlist}
            selectedPokemon={selectedPokemon}
            dispatch={dispatch}
          />
        )}
      />

      {/* Loading Spinner */}
      {loading && (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50px' }}>
          <Spin />
        </div>
      )}
    </div>
  );
};

// Memoized Pokemon Item for performance optimization
const MemoizedPokemonItem = React.memo(
  ({
    pokemon,
    index,
    lastPokemonElementRef,
    isInWishlist,
    handleAddToWishlist,
    handleRemoveFromWishlist,
    selectedPokemon,
    dispatch
  }: {
    pokemon: Pokemon;
    index: number;
    lastPokemonElementRef: (node: Element | null) => void;
    isInWishlist: (pokemon: Pokemon) => boolean;
    handleAddToWishlist: (pokemon: Pokemon) => void;
    handleRemoveFromWishlist: (pokemon: Pokemon) => void;
    selectedPokemon: Pokemon | null;
    dispatch: ThunkDispatch<RootState, void, AnyAction>;
  }) => {
    return (
      <List.Item
        onClick={() => dispatch(setSelectedPokemon(pokemon))}
        ref={lastPokemonElementRef}
        key={index}
        style={{
          paddingRight: '10px',
          transition: 'all 0.1s ease-in-out',
          boxShadow: selectedPokemon?.id === pokemon.id ? '0px 4px 10px rgba(24, 144, 255, 0.2)' : 'none',
        }}
      >
        <List.Item.Meta
          avatar={<Avatar src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`} />}
          title={_.capitalize(pokemon.name)}
        />
        {isInWishlist(pokemon) ? (
          <HeartFilled style={{ color: 'red' }} onClick={() => handleRemoveFromWishlist(pokemon)} />
        ) : (
          <HeartOutlined onClick={() => handleAddToWishlist(pokemon)} />
        )}
      </List.Item>
    );
  }
);

export default PokemonList;
