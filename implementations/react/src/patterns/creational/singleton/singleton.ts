class PokemonSingleton {
    private static _instance : PokemonSingleton | null = null;

    private baseUrl: string;
    

    private constructor () {
        this.baseUrl = "https://pokeapi.co/api/v2/pokemon/";
    }

    static get instance() {
        return (this._instance ??= new PokemonSingleton())
    }

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

const pokemonAPI = PokemonSingleton.instance;
export default pokemonAPI
