import type { Meta, StoryFn } from '@storybook/react'
import { PokemonTable } from './components/pokemon-table'
import { CodeBlock } from '../../../components/code-block'
import singletonCode from './singleton.ts?raw'
import usePokemonCode from './hooks/use-pokemon.ts?raw'
import { useState } from 'react'

const meta: Meta = {
  title: 'Design Patterns/Creational/Singleton Pattern',
  argTypes: {
    pokemonName: {
      control: 'text',
      table: { type: { summary: 'string' }, defaultValue: { summary: 'pikachu' } },
    },
  },
  parameters: {
    docs: {
      description: {
        component: 'El patrón **Singleton** asegura que exista una sola instancia de una clase y provee un punto de acceso global controlado. Útil cuando un recurso (config, cache, cliente de API) debe compartirse de forma consistente.',
      },
    },
  },
};
export default meta;

export const Implementation: StoryFn = () => {
  return (
    <div className="space-y-8" style={{ padding: '12px' }}>
      <header className="flex items-center gap-3 flex-wrap">
        <h3 className="text-2xl font-semibold tracking-tight">Singleton Pattern</h3>
        <span className="px-2 py-0.5 rounded bg-indigo-100 text-indigo-700 text-xs font-medium">Creacional</span>
      </header>

      {/* Resumen */}
      <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-300">
        <strong>Singleton</strong> restringe la creación de instancias a un único objeto que actúa como fuente compartida. Evita duplicar inicializaciones costosas, mantiene un estado coherente y ofrece un punto central sin que el resto de la aplicación conozca detalles internos de construcción.
      </p>

      <hr className="border-gray-300 dark:border-gray-700" />

      {/* Problemática / Solución General */}
      <section className="grid md:grid-cols-2 gap-6">
        <div className="rounded-xl border border-amber-200 dark:border-amber-700 bg-amber-50 dark:bg-amber-950/40 p-5 shadow-sm space-y-3">
          <h4 className="text-xs font-semibold uppercase tracking-wide text-amber-700 dark:text-amber-300">Problemática General</h4>
          <p className="text-xs sm:text-sm text-amber-900 dark:text-amber-200">
            Algunos servicios (p. ej. cliente HTTP, configuración global, manejador de conexión) se instancian varias veces sin necesidad. Esto provoca consumo extra de memoria, inicializaciones duplicadas, estados inconsistentes y dificultad para coordinar políticas transversales.
          </p>
          <p className="text-xs sm:text-sm text-amber-900/90 dark:text-amber-100/90">
            Sin una instancia compartida, cada parte del código puede crear su propia copia, perdiendo control sobre lifecycle, reintentos o límites de uso, y aumentando la superficie para errores sutiles.
          </p>
        </div>
        <div className="rounded-xl border border-emerald-200 dark:border-emerald-700 bg-emerald-50 dark:bg-emerald-950/40 p-5 shadow-sm space-y-3">
          <h4 className="text-xs font-semibold uppercase tracking-wide text-emerald-700 dark:text-emerald-300">Solución General</h4>
          <p className="text-xs sm:text-sm text-emerald-900 dark:text-emerald-200">
            Encapsular la creación detrás de un acceso estático que construye exactamente una vez y reutiliza después. Un constructor privado bloquea la instanciación externa y un método <code>instance</code> (o getter estático) controla el ciclo de vida. Así se centralizan políticas y se garantiza un único punto de verdad.
          </p>
        </div>
      </section>

      <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-zinc-900 p-5">
          <h5 className="text-sm font-semibold uppercase tracking-wide text-gray-500 mb-3">Diagrama UML</h5>
          <figure>
            <img src="/img/real_singleton.png" alt="Singleton UML Diagram" className="w-full h-auto rounded-md border border-gray-100 dark:border-gray-700 shadow-sm" loading="lazy" />
          </figure>
        </div>

      {/* Caso Específico */}
      <section className="rounded-2xl border border-gray-300 dark:border-gray-700/80 bg-white dark:bg-zinc-900/70 p-6 shadow-sm space-y-8">
        <header className="flex items-center gap-3 flex-wrap">
          <h4 className="text-lg font-semibold tracking-tight">Caso Específico: Cliente de la PokeAPI</h4>
          <span className="px-2 py-0.5 rounded bg-purple-100 text-purple-700 text-xs font-medium">Ejemplo Aplicado</span>
        </header>

        <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white/70 dark:bg-zinc-800/60 p-5 space-y-3">
          <h5 className="text-sm font-semibold uppercase tracking-wide text-gray-500">Problemática Específica</h5>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Queremos consumir la PokeAPI desde múltiples componentes y hooks. Si cada uno creara su propio cliente, duplicaríamos lógica y no podríamos unificar mejoras (headers, retries, métricas). Además, cada instancia podría comportarse diferente en casos de error.
          </p>
        </div>

        <div className="rounded-xl border border-indigo-300 dark:border-indigo-800 bg-indigo-50 dark:bg-indigo-950/40 p-5 space-y-3">
          <h5 className="text-sm font-semibold uppercase tracking-wide text-indigo-600 dark:text-indigo-300">Solución Específica</h5>
          <p className="text-sm text-indigo-900 dark:text-indigo-200">
            Definimos <code>PokemonSingleton</code> con constructor privado y un getter estático <code>instance</code>. La primera llamada crea el cliente; las siguientes reutilizan la misma referencia. Un hook <code>usePokemon()</code> abstrae la obtención de datos y estados (cargando, error, resultado) usando siempre la misma instancia.
          </p>
        </div>

        {/* UML (usar imagen si existe en /public/img) */}
        <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-zinc-900 p-5">
          <h5 className="text-sm font-semibold uppercase tracking-wide text-gray-500 mb-3">Diagrama UML</h5>
          <figure>
            <img src="/img/singleton.png" alt="Singleton UML Diagram" className="w-full h-auto rounded-md border border-gray-100 dark:border-gray-700 shadow-sm" loading="lazy" />
            <figcaption className="mt-2 text-[11px] text-gray-500 dark:text-gray-400 tracking-wide">Estructura básica: clase con constructor privado, almacenamiento estático y punto de acceso.</figcaption>
          </figure>
        </div>

        {/* Código Fuente */}
        <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-zinc-900 p-5 space-y-5">
          <h5 className="text-sm font-semibold uppercase tracking-wide text-gray-500">Código Fuente</h5>
          <details className="group rounded-lg border bg-white dark:bg-zinc-800 open:shadow-inner">
            <summary className="cursor-pointer select-none text-sm font-medium px-4 py-2 bg-gradient-to-r from-indigo-500/10 to-violet-500/10 dark:from-indigo-400/10 dark:to-violet-400/10 border-b flex items-center gap-2">
              <span className="text-indigo-600 dark:text-indigo-300 group-open:font-semibold">Ver implementación Singleton</span>
              <span className="ml-auto text-[10px] uppercase tracking-wide text-gray-400 group-open:hidden">Expandir</span>
              <span className="ml-auto text-[10px] uppercase tracking-wide text-gray-400 hidden group-open:inline">Colapsar</span>
            </summary>
            <div className="p-4 space-y-4">
              <CodeBlock code={singletonCode} title="singleton.ts" />
              <CodeBlock code={usePokemonCode} title="use-pokemon.ts" />
            </div>
          </details>
        </div>
      </section>
    </div>
  );
};

interface PlaygroundArgs { pokemonName: string }
export const Playground: StoryFn<PlaygroundArgs> = (args) => {
  const [input, setInput] = useState(args.pokemonName || 'pikachu')
  const [pokemonName, setPokemonName] = useState(args.pokemonName || 'pikachu')

  const suggestions = ['pikachu','charizard','bulbasaur','squirtle','jigglypuff','mewtwo','eevee','lucario']

  const onSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()
    const next = (input || '').trim().toLowerCase()
    if (next) setPokemonName(next)
  }

  return (
    <div className="space-y-5" style={{ padding: '12px' }}>
      <div className="rounded-lg border border-indigo-200 dark:border-indigo-800 bg-indigo-50/80 dark:bg-indigo-950/30 p-4 text-[12px] leading-relaxed text-indigo-900 dark:text-indigo-200 shadow-sm">
        <h5 className="font-semibold mb-1 tracking-wide text-md uppercase">Cómo interactuar</h5>
        <ol className="list-decimal ml-5 space-y-1">
          <li>Escribe un nombre de Pokémon o selecciona uno de los sugeridos.</li>
          <li>Pulsa <strong>Buscar</strong> para obtener los datos.</li>
        </ol>
      </div>
      <form onSubmit={onSubmit} className="flex gap-2 flex-wrap items-center">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="pikachu, charizard, bulbasaur…"
          className="flex-1 min-w-[220px] px-3 py-2 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-zinc-800 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <button
          type="submit"
          className="px-4 py-2 rounded-md bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium transition"
        >Buscar</button>
      </form>
      <div className="flex gap-2 flex-wrap">
        {suggestions.map(s => (
          <button
            key={s}
            type="button"
            onClick={() => { setInput(s); setPokemonName(s) }}
            className={`px-2 py-1 rounded border text-xs capitalize transition ${s===pokemonName ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white dark:bg-zinc-800 border-gray-300 dark:border-gray-700 hover:bg-indigo-50 dark:hover:bg-zinc-700'}`}
          >{s}</button>
        ))}
      </div>
      <PokemonTable pokemonName={pokemonName} />
    </div>
  )
}
Playground.args = { pokemonName: 'pikachu' }
Playground.parameters = {
  docs: { description: { story: 'Playground interactivo usando una única instancia del cliente (Singleton) a través del hook.' } }
}
