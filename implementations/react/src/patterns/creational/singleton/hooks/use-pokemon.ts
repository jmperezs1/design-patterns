import type { PokemonMove } from "../interfaces/move";
import pokemonAPI from "../singleton";
import { useEffect, useState } from "react";
import type { PokemonHook } from "../interfaces/pokemon-hook";


export const usePokemon = (pokemonName: string) => {
  const [state, setState] = useState<PokemonHook>({
    loading: true,
  })

  useEffect(() => {
    let alive = true
    setState((s) => ({ ...s, loading: true, error: undefined, pokemon: undefined }))
    
    /** Obtener datos del Pokémon usando el singleton */
    pokemonAPI.getPokemonData(pokemonName)
      .then((data) => {
        if (alive) {
          setState({
            loading: false,
            pokemon: {
              name: data.name,
              id: data.id,
              height: data.height,
              weight: data.weight,
              base_experience: data.base_experience,
              stats: data.stats.map((stat: any) => ({
                name: stat.stat.name,
                base_stat: stat.base_stat,
              })),
              types: data.types.map((type: any) => ({
                name: type.type.name,
                slot: type.slot,
              })),
              moves: data.moves
                .filter((move: any) => move.version_group_details?.[0]?.level_learned_at)
                .map((move: any) => ({
                  name: move.move.name,
                  level_learned: move.version_group_details[0].level_learned_at,
                }))
                .sort((a: PokemonMove, b: PokemonMove) => a.level_learned - b.level_learned),
              sprite: data.sprites?.front_default || data.sprites?.other?.['official-artwork']?.front_default || '',
            },
          })
        }
      })
      .catch((error) => {
        if (alive) {
          setState((s) => ({ ...s, loading: false, error: error.message }))
        }
      })    
    
    return () => {
      alive = false
    }
  }, [pokemonName])

    return { state }
};
