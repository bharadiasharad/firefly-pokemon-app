import React from "react";
import { Tooltip } from "antd";

// Purpose: A component that displays a list of Pokémon moves with tooltips showing their descriptions.

interface MoveListProps {
  moves: string[]; // Array of move names
  moveDescriptions: Record<string, string>; // Map of move names to their descriptions
  maxMoves?: number; // Maximum number of moves to display (defaults to 8)
}

const MoveList: React.FC<MoveListProps> = ({ moves, moveDescriptions, maxMoves = 8 }) => (
  <div className="w-full mt-4">
    <p className="text-gray-700 font-semibold">Moves</p>
    <div className="flex flex-wrap justify-center gap-2 mt-2">
      {moves.slice(0, maxMoves).map((move) => (
        <Tooltip
          key={move}
          title={moveDescriptions[move] || "Loading..."} // Fallback if description is not available
          color="purple"
          aria-label={moveDescriptions[move] || `Description for ${move} is loading.`} // Accessible label
        >
          <div className="move-item">
            {move}
          </div>
        </Tooltip>
      ))}
    </div>
  </div>
);

export default MoveList;
