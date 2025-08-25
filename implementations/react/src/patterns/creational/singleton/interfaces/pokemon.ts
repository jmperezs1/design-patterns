import type { PokemonStat } from "./stat";
import type { PokemonType } from "./type";
import type { PokemonMove } from "./move";

export interface Pokemon {
    name: string
    id: number
    height: number
    weight: number
    base_experience: number
    stats: PokemonStat[]
    types: PokemonType[]
    moves: PokemonMove[]
    sprite: string
}