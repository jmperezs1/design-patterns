
import type { Pokemon } from "../interfaces/pokemon"


export function PokemonTableView({
  pokemon,
}: { pokemon: Pokemon }

) {
  return (
    <div className="w-full max-w-4xl rounded-xl border p-6 shadow-sm">
      <div className="mb-6 flex items-center gap-4">
        <img 
          src={pokemon.sprite} 
          alt={pokemon.name}
          className="w-24 h-24 rounded-lg border bg-gray-50"
        />
        <div>
          <h3 className="text-2xl font-bold capitalize">{pokemon.name}</h3>
          <div className="flex gap-2 mt-2">
            {pokemon.types.map((type) => (
              <span 
                key={type.name}
                className={`px-3 py-1 rounded-full text-sm font-medium ${getTypeColor(type.name)}`}
              >
                {type.name}
              </span>
            ))}
          </div>
          <p className="text-sm text-gray-600 mt-1">
            #{pokemon.id.toString().padStart(3, '0')} • Height: {pokemon.height/10}m • Weight: {pokemon.weight/10}kg
          </p>
        </div>
      </div>

      <div className="mb-6">
        <h4 className="text-lg font-semibold mb-3">Base Stats</h4>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="text-left border-b">
              <tr>
                <th className="py-2 pr-4">Stat</th>
                <th className="py-2 pr-4">Base Value</th>
                <th className="py-2 pr-4">Bar</th>
              </tr>
            </thead>
            <tbody>
              {pokemon.stats.map((stat) => (
                <tr key={stat.name} className="border-b last:border-0">
                  <td className="py-3 pr-4 capitalize font-medium">
                    {stat.name.replace('-', ' ')}
                  </td>
                  <td className="py-3 pr-4 font-mono">
                    {stat.base_stat}
                  </td>
                  <td className="py-3 pr-4">
                    <div className="w-full max-w-[200px] bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${Math.min(100, (stat.base_stat / 150) * 100)}%` }}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div>
        <h4 className="text-lg font-semibold mb-3">Recent Moves (First 10)</h4>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="text-left border-b">
              <tr>
                <th className="py-2 pr-4">Move</th>
                <th className="py-2 pr-4">Level Learned</th>
              </tr>
            </thead>
            <tbody>
              {pokemon.moves.slice(0, 10).map((move, index) => (
                <tr key={`${move.name}-${index}`} className="border-b last:border-0">
                  <td className="py-2 pr-4 capitalize">
                    {move.name.replace('-', ' ')}
                  </td>
                  <td className="py-2 pr-4">
                    {move.level_learned || 'N/A'}
                  </td>
                </tr>
              ))}
              {pokemon.moves.length === 0 && (
                <tr>
                  <td className="py-6 text-gray-500" colSpan={2}>
                    No moves available.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        {pokemon.moves.length > 10 && (
          <p className="text-sm text-gray-500 mt-2">
            Showing 10 of {pokemon.moves.length} total moves
          </p>
        )}
      </div>
    </div>
  )
}

// Helper function to get type-specific colors
function getTypeColor(type: string): string {
  const colors: Record<string, string> = {
    normal: 'bg-gray-400 text-white',
    fire: 'bg-red-500 text-white',
    water: 'bg-blue-500 text-white',
    electric: 'bg-yellow-400 text-black',
    grass: 'bg-green-500 text-white',
    ice: 'bg-blue-300 text-black',
    fighting: 'bg-red-700 text-white',
    poison: 'bg-purple-500 text-white',
    ground: 'bg-yellow-600 text-white',
    flying: 'bg-indigo-400 text-white',
    psychic: 'bg-pink-500 text-white',
    bug: 'bg-green-400 text-black',
    rock: 'bg-yellow-800 text-white',
    ghost: 'bg-purple-700 text-white',
    dragon: 'bg-indigo-700 text-white',
    dark: 'bg-gray-800 text-white',
    steel: 'bg-gray-500 text-white',
    fairy: 'bg-pink-300 text-black',
  }
  return colors[type] || 'bg-gray-400 text-white'
}
