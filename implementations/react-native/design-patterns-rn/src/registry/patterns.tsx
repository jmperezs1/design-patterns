// Factory snippets (RN)
import { factoryCodeSnippets } from '../patterns/creational/factory/code-snippets';
import { FactoryDemo } from '../patterns/creational/factory/demo';
import { PatternEntry } from './types';
import { ClientListRN } from '../patterns/structural/adapter/client';
import { Adapter } from '../patterns/structural/adapter/adapter';
import { Adaptee } from '../patterns/structural/adapter/adaptee';
import { BridgeDemoRN } from '../patterns/structural/bridge/components/bridge-demo';
import { SingletonDemo } from '../patterns/creational/singleton/demo';
import { BuilderDemo } from '../patterns/creational/builder/demo';
import { PrototypeDemo } from '../patterns/creational/prototype/demo';
import { AbstractFactoryDemo } from '../patterns/creational/abstract-factory/demo';
import { CommandDemo } from '../patterns/behavioral/command/demo';
import { StateDemo } from '../patterns/behavioral/state/demo';
import { StrategyDemo } from '../patterns/behavioral/strategy/demo';
import { bridgeCodeSnippets } from '../patterns/structural/bridge/code';
import { adapterCodeSnippets } from '../patterns/structural/adapter/code';
import { abstractFactoryCodeSnippets } from '../patterns/creational/abstract-factory/code';
import { builderCodeSnippets } from '../patterns/creational/builder/code';
import { prototypeCodeSnippets } from '../patterns/creational/prototype/code';
import { singletonCodeSnippets } from '../patterns/creational/singleton/code';
import { commandCodeSnippets } from '../patterns/behavioral/command/code';
import { strategyCodeSnippets } from '../patterns/behavioral/strategy/code';
import { stateCodeSnippets } from '../patterns/behavioral/state/code';

export const patterns: PatternEntry[] = [
    {
    id: 'factory',
    name: 'Factory',
    category: 'Creational',
    Component: FactoryDemo,
    resumen: 'Factory centraliza la creación de elementos a partir de un "variant" (success/alert/info/warning), ocultando los detalles de estilos/estructura al cliente.',
    problematicaGeneral: 'Sin una factory, el cliente suele llenar el código de if/else para decidir colores, iconos y estilos en cada variante, duplicando lógica y complicando el mantenimiento.',
    solucionGeneral: 'Definir una función/componente fábrica que, dado un "variant", construya el elemento con estilos e icono correctos. El cliente sólo expresa la intención (variant) y usa el resultado.',
    casoEspecifico: 'Un Wrapper de notificaciones con icono, color de borde y fondo según la variante. El cliente pasa el contenido (child) y el variant, y la factory arma el envoltorio coherente.',
    solucionEspecifica: 'Implementamos createWrapper(variant, child) y el componente <Wrapper variant> que delega en la misma lógica. El tipo Variant asegura variantes válidas.',
    playgroundExplicacion: 'Mira cómo la misma API genera envoltorios distintos según el variant. El cliente no conoce detalles visuales.',
    playgroundComoInteractuar: 'Cómo interactuar: Observa los ejemplos y cambia el contenido/orden si quieres; la factory mantiene la coherencia visual por variant.',
    codeSnippets: factoryCodeSnippets,
  },
  {
    id: 'adapter',
    name: 'Adapter',
    category: 'Structural',
    Component: (() => <ClientListRN api={new Adapter(new Adaptee())} pageSize={6} />) as any,
    resumen: 'Adapter conecta dos interfaces incompatibles envolviendo un objeto existente con la interfaz esperada por el cliente.',
    problematicaGeneral: 'Una API entrega datos en un formato que el cliente no espera (por ejemplo CSV), forzando a cambiar el cliente o a duplicar lógica de parseo en cada uso.',
    solucionGeneral: 'Introducir un Adaptador que implemente la interfaz objetivo y traduzca las llamadas/datos desde la interfaz del Adaptee al modelo esperado (Target).',
    casoEspecifico: 'Una fuente devuelve usuarios en CSV, pero el cliente espera una lista tipada User[].',
    solucionEspecifica: 'Adaptee.specificRequest() devuelve CSV; Adapter.parsea y expone request(): Promise<User[]> cumpliendo Target. El cliente consume una lista tipada sin conocer el CSV.',
    playgroundExplicacion: 'La tabla permite buscar y paginar usuarios. La fuente real sigue siendo CSV, pero gracias al Adapter el cliente trabaja con User[].',
    playgroundComoInteractuar: 'Cómo interactuar: Escribe en el buscador (id/nombre/email) y usa Anterior/Siguiente para paginar.',
    codeSnippets: adapterCodeSnippets,
    images: {
      general: require('../../assets/img/adapter.png'),
      specific: require('../../assets/img/real_adapter.png'),
    }

  },
  {
    id: 'bridge',
    name: 'Bridge',
    category: 'Structural',
    Component: BridgeDemoRN as any,
    resumen:
      'Bridge desacopla una Abstracción de su Implementación, permitiendo combinarlas libremente sin explosión de clases.',
    problematicaGeneral:
      'Sin Bridge, nuevas variaciones en "qué hago" (Abstracción) y "cómo lo hago" (Implementación) suelen cruzarse creando clases por cada combinación. Las jerarquías quedan acopladas y difíciles de extender.',
    solucionGeneral:
      'Separar responsabilidades: la Abstracción (Report) depende por composición de un Implementor (Exporter). Cada jerarquía evoluciona de forma independiente y el cliente las combina en tiempo de ejecución.',
    casoEspecifico:
      'Reportes de negocio (Órdenes, Inventario) que pueden exportarse en distintos formatos (CSV, JSON).',
    solucionEspecifica:
      'Definimos Exporter (CSV/JSON) como Implementor y Reports concretos (OrdersReport/InventoryReport) como Abstracciones. generateReport() construye los datos y delega la exportación en el Exporter inyectado.',
    playgroundExplicacion:
      'Elige el tipo de reporte y el formato de exportación; al generarlo verás el nombre del archivo, mime y una previsualización del contenido.',
    playgroundComoInteractuar:
      'Cómo interactuar: Alterna entre Órdenes/Inventario y CSV/JSON, luego pulsa Generar. Cambia de combinación para ver cómo Bridge evita duplicación.',
    codeSnippets: bridgeCodeSnippets,
    images: {
      general: require('../../assets/img/bridge.png'),
      specific: require('../../assets/img/real_bridge.png'),
    },
  },
  {
    id: 'abstract_factory',
    name: 'Abstract Factory',
    category: 'Creational',
    Component: AbstractFactoryDemo,
    resumen: 'Abstract Factory crea familias de productos relacionados (por ejemplo, Banner/Toast) sin acoplar al cliente a implementaciones concretas.',
    problematicaGeneral:
      'Cuando necesitas múltiples variantes coherentes de productos (UI, notificaciones, temas), el código cliente suele llenarse de condicionales para decidir qué crear en cada lugar.',
    solucionGeneral:
      'Definir una fábrica abstracta con métodos para cada producto de la familia. Cada fábrica concreta implementa las variantes. El cliente depende de la abstracción y recibe objetos compatibles entre sí.',
    casoEspecifico:
      'Notificaciones en dos familias: Banner y Toast. Cada familia soporta variantes (success/alert/info/warning) con estilos y estructura propios.',
    solucionEspecifica:
      'Creamos NotificationFactory<TProps> con métodos createSuccess/createAlert/createInformative/createWarning. Implementamos bannerFactory y toastFactory que devuelven componentes con estilos consistentes por variante.',
    playgroundExplicacion:
      'Cambia la familia (Banner o Toast) y la variante. Observa cómo el cliente no conoce la implementación concreta: sólo invoca la fábrica abstracta.',
    playgroundComoInteractuar:
      'Cómo interactuar: Toca los chips para elegir familia y variante. En Toast puedes abrir/cerrar la notificación para ver el control del estado.',
    images: {
      general: require('../../assets/img/abstract-factory.png'),
      specific: require('../../assets/img/real_abstract-factory.png'),
    },
    codeSnippets: abstractFactoryCodeSnippets,
  },
  {
    id: 'builder',
    name: 'Builder',
    category: 'Creational',
    Component: BuilderDemo,
    resumen: 'Builder separa la construcción de un objeto complejo de su representación. Permite crear productos paso a paso, con orden y partes opcionales, sin que el cliente conozca detalles internos.',
    problematicaGeneral: 'Construir objetos con múltiples pasos y partes opcionales suele terminar en constructores enormes o en código cliente lleno de condicionales difíciles de mantener.',
    solucionGeneral: 'Introducir un Builder con una API fluida para configurar partes y un Director que orquesta el orden de construcción. El cliente indica intención; el builder materializa los pasos.',
    casoEspecifico: 'Tarjeta de producto con secciones opcionales: título, subtítulo, imagen, cuerpo y pie. No todas las secciones son obligatorias y el orden de armado importa.',
    solucionEspecifica: 'Definimos un CardConcreteBuilder con métodos para cada sección y un CardDirector que conoce el flujo recomendado. Pasando valores opcionales, el director invoca los pasos necesarios y produce un CardProduct listo para renderizar.',
    playgroundExplicacion: 'Completa campos opcionales (título, subtítulo, imagen, cuerpo, pie). El Director orquesta los pasos del Builder y genera la tarjeta final. Quita/añade partes y observa cómo cambia el producto sin tocar la construcción interna.',
    playgroundComoInteractuar: 'Cómo interactuar: Cambia los campos para construir diferentes variantes. El Director coordina los pasos del Builder.',
    images: { 
      general: require('../../assets/img/builder.png'),
      specific: require('../../assets/img/real_builder.png'),
    },
    codeSnippets: builderCodeSnippets,
  },
  {
    id: 'prototype',
    name: 'Prototype',
    category: 'Creational',
    Component: PrototypeDemo,
    resumen: 'Prototype crea nuevos objetos clonando uno existente; útil para evitar costos de construcción y mantener configuraciones base coherentes.',
    problematicaGeneral: 'Cuando necesitas múltiples instancias similares con pequeñas variaciones, construirlas desde cero repite lógica y es propenso a errores. También puede ser costoso si la creación inicial es compleja.',
    solucionGeneral: 'Definir una interfaz Prototype con clone(overrides). A partir de un objeto base, el cliente clona y aplica diferencias. Se simplifica la creación y se preservan invariantes.',
    casoEspecifico: 'Plantillas de email (bienvenida, reset, newsletter) con layout, estilos y tags. Cada envío cambia sólo ciertos campos.',
    solucionEspecifica: 'Implementamos EmailTemplatePrototype: copia profunda de las partes necesarias (layout, tags) y permite overrides superficiales. El cliente elige base y aplica cambios mínimos.',
    playgroundExplicacion: 'Selecciona una plantilla base y edita overrides. El clon resultante aparece en la previsualización y puedes agregarlo a Outbox.',
    playgroundComoInteractuar: 'Cómo interactuar: Cambia el tipo de plantilla con los chips, edita campos (from, subject, body, layout.*) y pulsa “Clonar a Outbox” para generar copias.',
    images: { 
      general: require('../../assets/img/prototype.png'),
      specific: require('../../assets/img/real_prototype.png'),
    },
    codeSnippets: prototypeCodeSnippets,
  },
  {
    id: 'singleton',
    name: 'Singleton',
    category: 'Creational',
    Component: SingletonDemo,
    resumen: 'Singleton garantiza una única instancia global con un punto de acceso controlado.',
    problematicaGeneral: 'Sin un singleton, es fácil crear múltiples instancias de servicios globales (APIs, caches, configuración), provocando estados inconsistentes, más consumo y bugs difíciles de rastrear.',
    solucionGeneral: 'Encapsular la creación con constructor privado y un accesor estático (instance). El cliente usa la misma instancia en toda la app; opcionalmente se añade caché o control de peticiones.',
    casoEspecifico: 'Cliente de la PokeAPI compartido: mismo baseUrl, mismas reglas y control de errores centralizado.',
    solucionEspecifica: 'PokemonSingleton expone instance y un método getPokemonData(name). El constructor es privado y define baseUrl; la app utiliza siempre la misma instancia.',
    playgroundExplicacion: 'Busca distintos Pokémon y observa que todas las búsquedas van por la misma instancia. Si una regla de rate-limit aplica, el error también se centraliza.',
    playgroundComoInteractuar: 'Cómo interactuar: Escribe el nombre del Pokémon y pulsa Buscar. Cambia varias veces para verificar que el estado y la configuración son compartidos.',
    images: { 
      general: require('../../assets/img/singleton.png'),
      specific: require('../../assets/img/real_singleton.png'),
    },
    codeSnippets: singletonCodeSnippets,
  },
  {
    id: 'command',
    name: 'Command',
    category: 'Behavioral',
    Component: CommandDemo,
    resumen: 'Encapsula una petición como un objeto para parametrizar operaciones y desacoplar el invocador del receptor.',
    problematicaGeneral:
      'Sin Command, la UI llama directamente métodos del receptor, mezclando lógica y dificultando deshacer, colas, logs o programar acciones. Cambiar el receptor rompe la UI.',
    solucionGeneral:
      'Definir una interfaz Command con execute(). La UI (Invoker) sólo conoce comandos. Cada comando envuelve al receptor y la acción específica. Se habilitan colas, historial y macros.',
    casoEspecifico: 'Un catálogo donde se agregan/quitan ítems y se limpia el carrito, manteniendo la UI simple y extensible.',
    solucionEspecifica:
      'Receiver administra un Map de ítems. AddItemCommand/RemoveItemCommand/ClearItemsCommand implementan execute() delegando en el Receiver. Invoker setea y ejecuta el comando activo.',
    playgroundExplicacion:
      'Usa chips o el input para añadir, el botón “-” para remover y “Limpiar todo” para vaciar. Observa cómo la UI sólo cambia el comando a ejecutar.',
    playgroundComoInteractuar:
      'Cómo interactuar: Toca un chip para agregar ese ítem. Con “+” incrementas, con “-” decrementas. Escribe un nombre y pulsa Añadir para items libres. “Limpiar todo” borra el carrito.',
    images: { 
      general: require('../../assets/img/command.png'),
      specific: require('../../assets/img/real_command.png')
    },
    codeSnippets: commandCodeSnippets,
  },
  {
    id: 'state',
    name: 'State',
    category: 'Behavioral',
    Component: StateDemo,
    resumen: 'Permite cambiar el comportamiento de un objeto cuando su estado interno cambia, sin if/switch repartidos por toda la app.',
    problematicaGeneral:
      'Sin State, un mismo objeto concentra condicionales por estado (if/switch), lo que hace difícil añadir estados o modificar reglas sin tocar múltiples lugares.',
    solucionGeneral:
      'Modelar estados como objetos que implementan una interfaz común. Un Context delega su comportamiento al estado actual y puede conmutarlo en tiempo de ejecución.',
    casoEspecifico:
      'Flujo de un ticket: Nuevo → En progreso → Cerrado. Cada estado decide qué hacer ante request(): validar borrador, avanzar tareas o reiniciar.',
    solucionEspecifica:
      'TicketContext delega en TicketState. NewState valida y crea tareas; InProgressState marca la siguiente tarea y transiciona al cerrar; ClosedState resetea a borrador.',
    playgroundExplicacion:
      'Completa el borrador (título y tareas) y crea el ticket. Luego, avanza tareas hasta completarlas para cerrar. Finalmente, puedes reiniciar.',
    playgroundComoInteractuar:
      'Cómo interactuar: En "Nuevo" añade título y tareas y pulsa Crear ticket. En "En progreso" usa “Marcar siguiente tarea”. En "Cerrado" pulsa Reiniciar.',
    images: {
      general: require('../../assets/img/state.png'),
      specific: require('../../assets/img/real_state.png'),
    },
    codeSnippets: stateCodeSnippets,
  },
  {
    id: 'strategy',
    name: 'Strategy',
    category: 'Behavioral',
    Component: StrategyDemo,
    resumen: 'Define una familia de algoritmos intercambiables (p.ej., precios/descuentos) encapsulados detrás de una interfaz común.',
    problematicaGeneral:
      'Sin Strategy, elegir el algoritmo (precio, descuento, cálculo) implica condicionales dispersos y difíciles de extender. Cambiar reglas rompe múltiples sitios.',
    solucionGeneral:
      'Encapsular el algoritmo en objetos Strategy que comparten una interfaz. Un Context delega el cálculo a la estrategia seleccionada y permite conmutarla en runtime.',
    casoEspecifico:
      'Precios por tipo de cliente: Standard, Gold, Platinum, VIP; cada uno aplica reglas distintas a unitario y total.',
    solucionEspecifica:
      'PricingStrategy expone getPrice(base, qty). El Context calcula unitario/total usando la Strategy actual. Estrategias concretas ajustan el precio (descuentos).',
    playgroundExplicacion:
      'Cambia el tipo de cliente y modifica cantidades para ver cómo varían el precio unitario y el total según la estrategia.',
    playgroundComoInteractuar:
      'Cómo interactuar: Toca un chip (standard/gold/platinum/vip), ajusta la cantidad con +/- o escribiendo, y observa el recalculo del total.',
    images: {
      general: require('../../assets/img/strategy.png'),
      specific: require('../../assets/img/real_strategy.png'),
    },
    codeSnippets: strategyCodeSnippets,
  },
];

export function groupByCategory(entries = patterns) {
  const map = new Map<string, PatternEntry[]>();
  for (const p of entries) {
    if (!map.has(p.category)) map.set(p.category, []);
    map.get(p.category)!.push(p);
  }
  for (const list of map.values()) list.sort((a,b) => a.name.localeCompare(b.name));
  return Array.from(map.entries()).map(([category, data]) => ({ category, data }));
}
