import type { Meta, StoryObj } from "@storybook/react"
import React, { useState } from "react"
import { PokemonTable } from "./components/pokemon-table"
import { CodeBlock } from "../../../components/code-block"
import singletonCode from './singleton.ts?raw'
import usePokemonCode from './hooks/use-pokemon.ts?raw'

const meta: Meta<typeof PokemonTable> = {
  title: "Design Patterns/Creational/Singleton Pattern",
  component: PokemonTable,
  parameters: {
    layout: "centered",
  },
  args: {
    pokemonName: "pikachu",
  },
  argTypes: {
    pokemonName: { 
      control: "text", 
      description: "Pokemon name (e.g., pikachu, charizard, bulbasaur)" 
    },
  },
}
export default meta

export const Implementation = () => {
    return (
        <div className="space-y-4">
            <h3 className="text-lg font-semibold mb-4">Singleton Pattern</h3>
            <p className="text-sm text-gray-600 mb-4 text-justify">
                Este módulo demuestra el patrón de diseño <strong>Singleton</strong> aplicado a una API de datos.
                La clase <code>PokemonSingleton</code> garantiza que <em>una sola instancia</em> del servicio de API 
                existe en toda la aplicación, proporcionando un punto de acceso global mediante 
                <code>PokemonSingleton.instance</code>. El constructor privado previene la creación directa de instancias,
                mientras que el método estático <code>instance</code> solo crea la instancia si no existe. Esta implementación encapsula la 
                comunicación con la PokeAPI, asegurando un punto de acceso consistente y controlado a los datos 
                de Pokemon a través de toda la aplicación.
            </p>      
            <details className="rounded-lg border bg-white/50 p-3 open:pb-3">
                <summary className="cursor-pointer select-none text-sm font-medium">
                    Ver implementación (singleton.ts)
                </summary>
                <div className="mt-3">
                    <CodeBlock code={singletonCode} title="singleton.ts" />
                </div>
             </details>
             <p className="text-sm text-gray-600 mb-4 text-justify">
                Para la utilización de este singleton, se ha creado un hook personalizado <code>usePokemon(pokemonNxame)</code>
                que maneja la lógica de obtención de datos, estado de carga y errores. Este hook utiliza la instancia singleton de 
                <code>PokemonSingleton</code> para recuperar los datos de Pokemon y exponerlos a los componentes React. Podemos observar 
                que el singleton se utiliza a traves de la instancia global <code>pokemonAPI</code>. 
             </p>
             <details className="rounded-lg border bg-white/50 p-3 open:pb-3">
                <summary className="cursor-pointer select-none text-sm font-medium">
                    Ver implementación del hook (use-pokemon.ts)
                </summary>
                <div className="mt-3">
                    <CodeBlock code={usePokemonCode} title="use-pokemon.ts" />
                </div>
            </details>
        </div>
    )
}

export const Playground: StoryObj<typeof PokemonTable> = {
  render: (args) => {
    const [input, setInput] = useState(args.pokemonName ?? "pikachu")
    const [pokemonName, setPokemonName] = useState(args.pokemonName ?? "pikachu")

    const onSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
      e.preventDefault()
      const next = (input || "").trim().toLowerCase()
      if (next) setPokemonName(next)
    }

    const suggestions = ["pikachu", "charizard", "bulbasaur", "squirtle", "jigglypuff", "mewtwo", "eevee", "lucario"]

    return (
      <div style={{ width: 1000, padding: 16 }}>
        <div style={{ marginBottom: 16 }}>
          <h2 style={{ margin: "0 0 8px 0", fontSize: "1.25rem", fontWeight: "600" }}>
            Pokemon Singleton Pattern Demo
          </h2>
          <p style={{ margin: "0 0 16px 0", color: "#666", fontSize: "0.875rem" }}>
            This demonstrates the Singleton pattern with caching and rate limiting. 
            The same PokemonAPI instance is used across all requests.
          </p>
          
          <form onSubmit={onSubmit} style={{ marginBottom: 12, display: "flex", gap: 8 }}>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Enter Pokemon name (e.g., pikachu, charizard)"
              style={{ 
                flex: 1, 
                padding: "8px 12px", 
                borderRadius: 8, 
                border: "1px solid #ddd",
                fontSize: "14px"
              }}
            />
            <button 
              type="submit" 
              style={{ 
                padding: "8px 16px", 
                borderRadius: 8, 
                border: "1px solid #ddd",
                backgroundColor: "#3b82f6",
                color: "white",
                fontSize: "14px",
                cursor: "pointer"
              }}
            >
              Search
            </button>
          </form>

          <div style={{ marginBottom: 16 }}>
            <p style={{ fontSize: "0.75rem", color: "#666", marginBottom: 8 }}>Quick suggestions:</p>
            <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
              {suggestions.map((suggestion) => (
                <button
                  key={suggestion}
                  onClick={() => {
                    setInput(suggestion)
                    setPokemonName(suggestion)
                  }}
                  style={{
                    padding: "4px 8px",
                    fontSize: "0.75rem",
                    borderRadius: 4,
                    border: "1px solid #e5e5e5",
                    backgroundColor: suggestion === pokemonName ? "#3b82f6" : "#f9f9f9",
                    color: suggestion === pokemonName ? "white" : "#333",
                    cursor: "pointer",
                    textTransform: "capitalize"
                  }}
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* The actual live component */}
        <PokemonTable pokemonName={pokemonName} />
      </div>
    )
  },
}
