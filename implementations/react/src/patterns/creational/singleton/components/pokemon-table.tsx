import { usePokemon } from "../hooks/use-pokemon"
import { PokemonTableView } from "./pokemon-table-view"


export function PokemonTable({ pokemonName }: { pokemonName: string }) {
  const { state } = usePokemon(pokemonName)
  
  if (state.loading) {
    return (
      <div className="p-8 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-2"></div>
          <p>Loading {pokemonName}…</p>
        </div>
      </div>
    )
  }
  
  if (state.error) {
    return (
      <div className="p-6 bg-red-50 border border-red-200 rounded-lg">
        <div className="flex items-center gap-2 text-red-700">
          <span className="text-lg">⚠️</span>
          <div>
            <h3 className="font-semibold">Error loading Pokemon</h3>
            <p className="text-sm">{state.error}</p>
          </div>
        </div>
      </div>
    )
  }

  if (!state.pokemon) {
    return (
      <div className="p-6 text-center text-gray-500">
        <p>No Pokemon data available</p>
      </div>
    )
  }

  return <PokemonTableView pokemon={state.pokemon} />
}
