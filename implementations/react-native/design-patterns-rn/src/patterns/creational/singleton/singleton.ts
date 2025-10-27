class PokemonSingleton {
  private static _instance: PokemonSingleton | null = null;
  private baseUrl: string;
  private constructor() { this.baseUrl = 'https://pokeapi.co/api/v2/pokemon/'; }
  static get instance() { return (this._instance ??= new PokemonSingleton()); }

  async getPokemonData(pokemonName: string) {
    const key = pokemonName.toLowerCase().trim();
    if (!key) throw new Error('pokemonName must not be empty');
    const url = `${this.baseUrl}${key}`;
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`Rate limit exceeded for ${pokemonName}. Please wait before making more requests.`);
    }
    return res.json();
  }
}

const pokemonAPI = PokemonSingleton.instance;
export default pokemonAPI;
