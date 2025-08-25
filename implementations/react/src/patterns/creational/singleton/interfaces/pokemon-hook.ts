import type { Pokemon } from "./pokemon";

export interface PokemonHook{
  loading: boolean;
  error?: string;
  pokemon?: Pokemon;
}