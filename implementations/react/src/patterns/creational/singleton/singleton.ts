/**
 * Singleton para acceder a la API de Pokémon.
 *
 * Proporciona un único punto de acceso para obtener datos de Pokémon desde
 * la API pública de PokéAPI. Maneja la construcción de la URL base y
 * asegura que solo exista una instancia del cliente API.
 *
 * Uso:
 * ```typescript
 * const pokemonAPI = PokemonSingleton.instance;
 * const pikachuData = await pokemonAPI.getPokemonData("pikachu");
 * ```
 */ 
class PokemonSingleton {
    /** Instancia única del singleton */
    private static _instance : PokemonSingleton | null = null;


    /** URL base para la API de Pokémon */
    private baseUrl: string;
    

    private constructor () {
        this.baseUrl = "https://pokeapi.co/api/v2/pokemon/";
    }

    /** Obtiene la instancia única del singleton */
    static get instance() {
        return (this._instance ??= new PokemonSingleton())
    }

    /** Obtiene datos de un Pokémon por nombre */
    async getPokemonData(pokemonName: string) {
        try {
            const url = `${this.baseUrl}${pokemonName.toLowerCase()}`;            
            const response = await fetch(url);  
            if (!response.ok) {
                throw new Error(`Rate limit exceeded for ${pokemonName}. Please wait before making more requests.`);
            }
            const data = await response.json();            
            return data;
        } catch (error) {
            console.error(`Failed to fetch data for ${pokemonName}:`, error);
            throw error;
        }
    }
}


/** Instancia única exportada del singleton */
const pokemonAPI = PokemonSingleton.instance;
export default pokemonAPI
