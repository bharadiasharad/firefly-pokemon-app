/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { Card, Progress, Row, Col, Divider } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { fetchAbilityDescriptions, fetchMoveDescriptions } from "../store/actions";
import { RootState } from "../store";
import _ from "lodash";
import Stat from "./Stat";
import AbilityList from "./AbilityList";
import MoveList from "./MoveList";
import { ThunkDispatch } from "redux-thunk";
import { UnknownAction } from "redux";

// Purpose: A component that displays detailed information about a Pokémon, including its stats, abilities, and moves.

interface PokemonCardProps {
  name: string;
  imageUrl: string;
  hp: number;
  attack: number;
  defense: number;
  speed: number;
  baseExperience: number;
  abilities: string[];
  moves: string[];
}

const PokemonCard: React.FC<PokemonCardProps> = ({
  name,
  imageUrl,
  hp,
  attack,
  defense,
  speed,
  baseExperience,
  abilities,
  moves,
}) => {
  const dispatch: ThunkDispatch<RootState, unknown, UnknownAction> = useDispatch();

  const { abilityDescriptions, moveDescriptions } = useSelector(
    (state: RootState) => state.pokemon
  );

  // Fetch ability descriptions when abilities change
  useEffect(() => {
    if (abilities.length === 0) return;
    dispatch(fetchAbilityDescriptions(abilities));
  }, [dispatch, JSON.stringify(abilities)]);

  // Fetch move descriptions when moves change
  useEffect(() => {
    if (moves.length === 0) return;
    dispatch(fetchMoveDescriptions(moves));
  }, [dispatch, JSON.stringify(moves)]);

  return (
    <Card className="max-w-2xl transition-transform hover:scale-105 shadow-lg from-white to-gray-500">
      <Row gutter={24} align="middle">
        {/* Left Section: Image, HP, Name, Stats */}
        <Col span={12} className="flex flex-col items-center border-r border-gray-300">
          <div className="relative">
            <img
              src={imageUrl}
              alt={`Image of ${name} the Pokemon`}
              className="w-70 h-70 drop-shadow-xl"
            />
            <div className="absolute top-2 right-2 bg-white text-black px-3 py-1 rounded-full text-sm font-semibold shadow-md">
              HP {hp}
            </div>
          </div>
          <h2 className="text-2xl text-center font-bold mt-4">{_.capitalize(name)}</h2>
          <Divider />
          <div className="flex justify-between w-full mt-3">
            <Stat label="⚔️ Attack" value={attack} />
            <Stat label="🛡 Defense" value={defense} />
            <Stat label="⚡ Speed" value={speed} />
          </div>
        </Col>

        {/* Right Section: XP, Abilities, Moves - Center Aligned */}
        <Col span={10} className="flex flex-col items-center justify-center text-center">
          <div className="my-4">
            <Progress
              type="circle"
              size={80}
              percent={(baseExperience / 351) * 100}
              strokeColor="#ffcc00"
              trailColor="#ccc"
              strokeWidth={10}
              format={() => `${baseExperience} XP`}
            />
          </div>
          <Divider />
          <AbilityList abilities={abilities} abilityDescriptions={abilityDescriptions} />
          <Divider />
          <MoveList moves={moves} moveDescriptions={moveDescriptions} />
        </Col>
      </Row>
    </Card>
  );
};

export default PokemonCard;
