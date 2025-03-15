import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Spin } from 'antd';
import { RootState } from '../store';
import { fetchPokemonDetails } from '../store/actions';
import PokemonCard from './PokemonCard';
import pokemon from '../assets/pokemon.png';
import { ThunkDispatch } from 'redux-thunk';
import { UnknownAction } from 'redux';

// Purpose: A component that displays detailed information of a selected Pokémon, including its stats, abilities, and moves.

const PokemonDetails: React.FC = () => {
    const dispatch: ThunkDispatch<RootState, unknown, UnknownAction> = useDispatch();
    const { selectedPokemon, pokemonDetails } = useSelector((state: RootState) => state.pokemon);

    // Fetch pokemon details if not already available
    useEffect(() => {
        if (selectedPokemon && !pokemonDetails[selectedPokemon.name]) {
            dispatch(fetchPokemonDetails(selectedPokemon.name));
        }
    }, [dispatch, selectedPokemon, pokemonDetails]);

    // Handle case where no pokemon is selected
    if (!selectedPokemon) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <img style={{ height: '200px' }} src={pokemon} alt="pokemon" />
            </div>
        );
    }

    const details = pokemonDetails[selectedPokemon.name];

    // Handle loading state
    if (!details) {
        return (
            <div className="flex justify-center items-center h-screen">
                <Spin size="large" />
            </div>
        );
    }

    // Helper function to extract stat values from the details object
    const getStatValue = (statName: string) => {
        const stat = details.stats.find((stat: { stat: { name: string } }) => stat.stat.name === statName);
        return stat ? stat.base_stat : 0;
    };

    // Extract abilities and moves properly
    const abilities = details.abilities.map((ability: { ability: { name: string } }) => ability.ability.name);
    const moves = details.moves.slice(0, 5).map((move: { move: { name: string } }) => move.move.name);

    return (
        <div className="flex justify-center items-center h-screen">
            <PokemonCard
                name={details.name}
                imageUrl={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${details.id}.png`}
                hp={getStatValue('hp')}
                attack={getStatValue('attack')}
                defense={getStatValue('defense')}
                speed={getStatValue('speed')}
                baseExperience={details.base_experience}
                abilities={abilities}
                moves={moves}
            />
        </div>
    );
};

export default PokemonDetails;
