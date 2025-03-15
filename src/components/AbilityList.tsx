import React from "react";
import { Tooltip } from "antd";

// Purpose: A component that displays a list of Pokémon abilities with tooltips showing their descriptions.

interface AbilityListProps {
  abilities: string[]; // Array of ability names
  abilityDescriptions: Record<string, string>; // Map of ability names to their descriptions
}

const AbilityList: React.FC<AbilityListProps> = ({ abilities, abilityDescriptions }) => (
  <div className="w-full mt-4">
    <p className="text-gray-700 font-semibold">Abilities</p>
    <div className="flex flex-wrap justify-center gap-2 mt-1">
      {abilities.map((ability) => (
        <Tooltip
          key={ability}
          title={abilityDescriptions[ability] || "Loading..."} // Fallback if description is not available
          color="blue"
          aria-label={abilityDescriptions[ability] || `Description for ${ability} is loading.`} // Accessible label
        >
          <div className="ability-item">
            {ability}
          </div>
        </Tooltip>
      ))}
    </div>
  </div>
);

export default AbilityList;
