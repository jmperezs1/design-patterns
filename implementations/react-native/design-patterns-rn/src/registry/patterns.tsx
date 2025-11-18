// Factory snippets (RN)
import { factoryCodeSnippets } from '../patterns/creational/factory/code-snippets';
import { FactoryDemo } from '../patterns/creational/factory/demo';
import { PatternEntry } from './types';
import { ClientListRN } from '../patterns/structural/adapter/client';
import { Adapter } from '../patterns/structural/adapter/adapter';
import { Adaptee } from '../patterns/structural/adapter/adaptee';
import { BridgeDemoRN } from '../patterns/structural/bridge/components/bridge-demo';
import DecoratorDemo from '../patterns/structural/decorator/demo';
import AppointmentDemo from '../patterns/structural/facade/demo';
import FlyweightDemo from '../patterns/structural/flyweight/demo';
import ProxyDemo from '../patterns/structural/proxy/demo';
import { SingletonDemo } from '../patterns/creational/singleton/demo';
import { BuilderDemo } from '../patterns/creational/builder/demo';
import { PrototypeDemo } from '../patterns/creational/prototype/demo';
import { AbstractFactoryDemo } from '../patterns/creational/abstract-factory/demo';
import { CommandDemo } from '../patterns/behavioral/command/demo';
import { StateDemo } from '../patterns/behavioral/state/demo';
import { StrategyDemo } from '../patterns/behavioral/strategy/demo';
import { ChainDemo } from '../patterns/behavioral/chain_of_responsibility/demo';
import { MediatorDemo } from '../patterns/behavioral/mediator/demo';
import { InterpreterDemo } from '../patterns/behavioral/interpreter/demo';
import { IteratorDemo } from '../patterns/behavioral/iterator/demo';
import { MementoDemo } from '../patterns/behavioral/memento/demo';
import { ObserverDemo } from '../patterns/behavioral/observer/demo';
import { TemplateDemo } from '../patterns/behavioral/template/demo';
import { VisitorDemo } from '../patterns/behavioral/visitor/demo';
import CompositeDemo from '../patterns/structural/composite/demo';
import { bridgeCodeSnippets } from '../patterns/structural/bridge/code';
import { adapterCodeSnippets } from '../patterns/structural/adapter/code';
import { abstractFactoryCodeSnippets } from '../patterns/creational/abstract-factory/code';
import { builderCodeSnippets } from '../patterns/creational/builder/code';
import { prototypeCodeSnippets } from '../patterns/creational/prototype/code';
import { singletonCodeSnippets } from '../patterns/creational/singleton/code';
import { commandCodeSnippets } from '../patterns/behavioral/command/code';
import { strategyCodeSnippets } from '../patterns/behavioral/strategy/code';
import { stateCodeSnippets } from '../patterns/behavioral/state/code';
import { chainCodeSnippets } from '../patterns/behavioral/chain_of_responsibility/code';

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
    id: 'composite',
    name: 'Composite',
    category: 'Structural',
    Component: CompositeDemo as any,
    resumen: 'Permite tratar objetos individuales y composiciones de forma uniforme. Útil para representar estructuras jerárquicas (árboles) como JSON.',
    problematicaGeneral: 'Sin Composite, el cliente debe distinguir entre nodos hoja y nodos compuestos, complicando el código al recorrer estructuras anidadas.',
    solucionGeneral: 'Definir una interfaz común para componentes y representar tanto elementos simples como compuestos con la misma API. El cliente opera sobre la interfaz sin distinguir tipos concretos.',
    casoEspecifico: 'Representación de un JSON anidado donde los nodos pueden ser primitivos, arrays u objetos. Se puede recorrer la estructura recursivamente aplicando operaciones comunes.',
    solucionEspecifica: 'Implementamos JsonComponent con PrimitiveNode, ArrayNode y ObjectNode y un helper buildNode(json) que construye la jerarquía. La UI muestra el árbol JSON.',
    playgroundExplicacion: 'Explora el JSON anidado y expande los nodos para ver su contenido y preview. El demo demuestra cómo tratar nodos y composiciones de forma uniforme.',
    playgroundComoInteractuar: 'Observa el árbol generado a partir de un JSON de ejemplo; no requiere entrada del usuario para explorar la estructura.',
    images: {
      general: require('../../assets/img/composite.png'),
      specific: require('../../assets/img/real_composite.png'),
    },
  },
  {
    id: 'decorator',
    name: 'Decorator',
    category: 'Structural',
    Component: DecoratorDemo as any,
    resumen: 'Permite añadir responsabilidades a un objeto de forma dinámica envolviéndolo en decoradores que implementan la misma interfaz.',
    problematicaGeneral: 'Sin Decorator el cliente debe crear múltiples subclases o condicionales para combinar responsabilidades; el patrón permite componerlas en tiempo de ejecución.',
    solucionGeneral: 'Definir una interfaz común (Burger), un componente base (PlainBurger) y decoradores que implementan la misma interfaz y delegan/añaden comportamiento.',
    casoEspecifico: 'Hamburguesa base con add-ons: queso, tocineta y extra carne. El cliente construye el pedido aplicando los decoradores deseados en orden.',
    solucionEspecifica: 'Implementamos Burger/BurgerDecorator y Cheese/Bacon/DoublePatty. El demo aplica toggles para envolver la hamburguesa base con los decoradores y muestra el detalle de precio.',
    playgroundExplicacion: 'Activa/desactiva add-ons para ver cómo cambian la descripción y el total del pedido.',
    playgroundComoInteractuar: 'Activa los switches para añadir Queso/Tocineta/Extra carne. Pulsa Limpiar para reiniciar la selección.',
    images: {
      general: require('../../assets/img/decorator.png'),
      specific: require('../../assets/img/real_decorator.png'),
    },
  },
  {
    id: 'facade',
    name: 'Facade',
    category: 'Structural',
    Component: AppointmentDemo as any,
    resumen: 'Expone una interfaz unificada para orquestar subsistemas complejos (CRM, Calendar, Payments, Notifications) y aplicar rollback en fallos.',
    problematicaGeneral: 'Un cliente debe coordinar múltiples servicios y manejar errores/compensaciones; la fachada centraliza la orquestación y simplifica la llamada.',
    solucionGeneral: 'Implementar AppointmentFacade que coordina subsistemas y encapsula la lógica de reserva/rollback.',
    casoEspecifico: 'Reserva de cita: se upserta cliente en CRM, se reserva en Calendar, se autoriza pago, se crea actividad y se notifica. Si falla el pago, se revierte reserva y pago.',
    solucionEspecifica: 'AppointmentFacade.book() ejecuta los pasos en orden y aplica rollback cuando es necesario. El demo permite simular fallo de pago para ver la compensación.',
    playgroundExplicacion: 'Rellena los datos de la cita y pulsa Reservar; activa "Simular fallo" para forzar la reversión.',
    playgroundComoInteractuar: 'Rellena formulario, alterna Simular fallo y pulsa Reservar cita; observa el log de pasos y rollback en caso de error.',
    images: {
      general: require('../../assets/img/facade.png'),
      specific: require('../../assets/img/real_facade.png'),
    },
  },
  {
    id: 'flyweight',
    name: 'Flyweight',
    category: 'Structural',
    Component: FlyweightDemo as any,
    resumen: 'Comparte estado intrínseco entre muchas instancias livianas para ahorrar memoria; el estado extrínseco se pasa en cada operación.',
    problematicaGeneral: 'Renderizar miles de elementos similares provoca duplicación de estado; Flyweight comparte el estado inmutable y recibe datos extrínsecos por uso.',
    solucionGeneral: 'Implementar BadgeFlyweight + BadgeFactory que cachea flyweights por variante y opera pasando texto/posición/color extrínsecos.',
    casoEspecifico: 'Pool de badges (pill, rounded-outline, chip). El demo renderiza N items y muestra cuántos flyweights están en caché.',
    solucionEspecifica: 'BadgeFactory.get(variant).operation({text,x,y,color}) reutiliza flyweights con estilo intrínseco compartido y evita creación masiva de instancias.',
    playgroundExplicacion: 'Ajusta la cantidad de badges y observa que el contador de flyweights en caché permanece bajo (según variantes).',
    playgroundComoInteractuar: 'Cambia la cantidad y pulsa 500/2500/5000 para ver el efecto en el contenedor.',
    images: {
      general: require('../../assets/img/flyweight.png'),
      specific: require('../../assets/img/real_flyweight.png'),
    },
  },
  {
    id: 'proxy',
    name: 'Proxy',
    category: 'Structural',
    Component: ProxyDemo as any,
    resumen: 'Sustituye a un sujeto real y añade responsabilidades transversales (caché, deduplicación de solicitudes).',
    problematicaGeneral: 'Evitar llamadas de red duplicadas y agregar métricas/caché sin cambiar el servicio real.',
    solucionGeneral: 'El Proxy implementa la misma interfaz que el sujeto real, revisa caché, comparte solicitudes en vuelo y delega al sujeto real cuando es necesario.',
    casoEspecifico: 'CachingProductProxy evita múltiples llamadas de red para el mismo ID y comparte solicitudes simultáneas.',
    solucionEspecifica: 'Implementamos CachingProductProxy con cache + inflight map y demo para cargar, ráfaga x5 y ver métricas.',
    playgroundExplicacion: 'Cambia el ID y pulsa Cargar o Ráfaga x5. Observa los contadores de caché y llamadas de red.',
    playgroundComoInteractuar: 'Ingresa un ID y presiona Cargar; usa Ráfaga x5 para ver deduplicación en paralelo; limpia la caché para forzar redes.',
    images: {
      general: require('../../assets/img/proxy.png'),
      specific: require('../../assets/img/real_proxy.png'),
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
    id: 'chain_of_responsibility',
    name: 'Chain of Responsibility',
    category: 'Behavioral',
    Component: ChainDemo,
    resumen: 'Desacopla emisores y receptores permitiendo que varios manejadores intenten procesar la solicitud. Cada manejador decide si la atiende o la delega al siguiente.',
    problematicaGeneral: 'Ruteo progresivo de tickets por reglas; cada handler puede atender o delegar.',
    solucionGeneral: 'Construir una cadena de handlers donde cada uno decide si procesa la solicitud o la pasa al siguiente.',
    casoEspecifico: 'Mesa de ayuda que intenta FAQ → Seguridad → Soporte L1 → Soporte L2 → Gerencia.',
    solucionEspecifica: 'Creamos handlers concretos y los encadenamos con setNext(). El cliente envía un Ticket y recibe el handler que lo atendió y la ruta recorrida.',
    playgroundExplicacion: 'Completa un ticket o usa presets para ver cómo la cadena lo enruta y quién lo atiende.',
    playgroundComoInteractuar: 'Usa los atajos (FAQ, Seguridad, Soporte L1/L2, Escalar) o completa el ticket y pulsa Enviar por la cadena.',
    codeSnippets: chainCodeSnippets,
  },
  {
    id: 'mediator',
    name: 'Mediator',
    category: 'Behavioral',
    Component: MediatorDemo,
    resumen: 'Reduce el acoplamiento centralizando la comunicación entre colegas a través de un objeto mediador.',
    problematicaGeneral: 'Componentes fuertemente acoplados dificultan la evolución; el mediador coordina eventos y evita dependencias directas.',
    solucionGeneral: 'Cada colega notifica al Mediator; el Mediator decide las reacciones entre colegas (refresh, filter, clear, logs).',
    casoEspecifico: 'Buscador con filtro de categoría: SearchBox → Mediator → ResultsList/Filter/Clear',
    solucionEspecifica: 'Implementamos Colleague base, colegas concretos y ConcreteMediator que coordina la búsqueda, el filtrado y el borrado.',
    playgroundExplicacion: 'Escribe una consulta, cambia la categoría o pulsa Clear para ver cómo el mediador coordina las acciones y genera logs.',
    playgroundComoInteractuar: 'Usa el input para buscar, los chips para filtrar por categoría y Clear para restablecer.',
    images: {
      specific: require('../../assets/img/real_mediator.png'),
    },
  },
  {
    id: 'memento',
    name: 'Memento',
    category: 'Behavioral',
    Component: MementoDemo,
    resumen: 'Permite guardar snapshots del estado interno de un objeto y restaurarlos sin exponer su implementación.',
    problematicaGeneral: 'Necesitamos deshacer/rehacer cambios en un editor sin permitir que el cliente manipule directamente el estado interno del objeto.',
    solucionGeneral: 'El Originator crea mementos (snapshots) con su estado. El Caretaker almacena la historia y solicita restauraciones al Originator cuando es necesario.',
    solucionEspecifica: 'Implementamos EditorOriginator que produce EditorMemento; EditorCaretaker guarda checkpoints y maneja undo/redo. La UI guarda y restaura snapshots sin acceder al estado interno directamente.',
    playgroundExplicacion: 'Escribe texto, guarda checkpoints y usa Deshacer/Rehacer para navegar por el historial de snapshots.',
    playgroundComoInteractuar: 'Usa Guardar checkpoint, Deshacer y Rehacer; prueba los presets para ver cómo se crean y restauran snapshots.',
    images: {
      general: require('../../assets/img/memento.png'),
      specific: require('../../assets/img/real_memento.png'),
    },
  },
  {
    id: 'observer',
    name: 'Observer',
    category: 'Behavioral',
    Component: ObserverDemo,
    resumen: 'Define una relación uno-a-muchos entre un sujeto y múltiples observadores que reaccionan a eventos sin acoplamiento fuerte.',
    problematicaGeneral: 'Necesitamos propagar eventos (p. ej. ticks del mercado) a múltiples listeners sin que el sujeto conozca sus detalles internos.',
    solucionGeneral: 'El Subject mantiene una lista de Observer y los notifica con notifyObservers. Observers pueden añadirse o quitarse en runtime.',
    solucionEspecifica: 'MarketDataHub emite cotizaciones; ThresholdAlert, SimpleMovingAverage y TickerSnapshot son observers que reaccionan a los ticks. La UI controla suscripciones y muestra datos/alertas.',
    playgroundExplicacion: 'Inicia la fuente de ticks, activa o desactiva observadores y observa cómo se actualizan las métricas y alertas en tiempo real.',
    playgroundComoInteractuar: 'Usa Iniciar/Detener y los switches para suscribir o quitar observadores. Cambia el símbolo, umbral y ventana del SMA para ver diferencias.',
    images: {
      general: require('../../assets/img/observer.png'),
      specific: require('../../assets/img/real_observer.png'),
    },
  },
  {
    id: 'template',
    name: 'Template Method',
    category: 'Behavioral',
    Component: TemplateDemo,
    resumen: 'Define la estructura de un algoritmo en una clase base y permite que subclases implementen pasos específicos.',
    problematicaGeneral: 'Sin Template Method, el flujo de envío se mezcla con validaciones y llamadas a servicios, dificultando reutilizar pasos comunes.',
    solucionGeneral: 'Extraer la secuencia común al FormTemplate y que las subclases solo implementen validate, send y afterSuccess.',
    solucionEspecifica: 'Implementamos ContactFlow y SignupFlow que heredan de FormTemplate; la UI usa SimpleForm para interactuar con los flows.',
    playgroundExplicacion: 'Rellena los formularios de contacto y signup. Observa cómo el submit reutiliza la plantilla de flujo y cada flow ejecuta pasos específicos.',
    playgroundComoInteractuar: 'Rellena campos y pulsa Submit; verás mensajes de error o success según la validación y el envío simulado.',
    images: {
      general: require('../../assets/img/template.png'),
      specific: require('../../assets/img/real_template.png'),
    },
  },
  {
    id: 'visitor',
    name: 'Visitor',
    category: 'Behavioral',
    Component: VisitorDemo,
    resumen: 'Permite definir operaciones sobre elementos sin modificar sus clases; se añaden visitantes que recorren la estructura y aplican lógica.',
    problematicaGeneral: 'Cuando necesitas múltiples operaciones sobre una estructura de objetos (totales, envío, export), añadir métodos a los elementos rompe SRP y genera duplicación.',
    solucionGeneral: 'Extraer las operaciones a visitantes que implementan visitX methods y permitir que los elementos acepten visitantes.',
    solucionEspecifica: 'Creamos Book/Electronics/Grocery como elementos; TotalPriceVisitor, ShippingEstimatorVisitor y CsvExportVisitor son visitantes que recorren los elementos para calcular resultados.',
    playgroundExplicacion: 'Agrega ítems al carrito y aplica diferentes visitantes: totales, envío o exportar CSV.',
    playgroundComoInteractuar: 'Rellena el formulario de ítems, pulsa Agregar, luego usa Calcular Totales / Estimar Envío / Exportar CSV para ver el resultado.',
    images: {
      general: require('../../assets/img/visitor.png'),
      specific: require('../../assets/img/real_visitor.png'),
    },
  },
  {
    id: 'interpreter',
    name: 'Interpreter',
    category: 'Behavioral',
    Component: InterpreterDemo,
    resumen: 'Define una gramática simple y utiliza un árbol de expresiones (AST) para evaluar sentencias en esa gramática.',
    problematicaGeneral: 'Sin Interpreter, el parsing y la evaluación de expresiones tiende a mezclarse con la lógica de negocio; el patrón separa gramática y evaluación.',
    solucionGeneral: 'Modelar la gramática con expresiones Terminal y NonTerminal que implementan una interfaz interpret(). Construir un AST y llamar interpret() para evaluar.',
    casoEspecifico: 'Mini calculadora que soporta sumas (+), multiplicaciones (*) y paréntesis con precedencia adecuada.',
    solucionEspecifica: 'Tokenizamos la entrada, convertimos a RPN con shunting-yard, construimos el AST y evaluamos con interpret().',
    playgroundExplicacion: 'Escribe una expresión aritmética con dígitos, +, * y paréntesis, luego pulsa Evaluar para ver RPN y resultado.',
    playgroundComoInteractuar: 'Prueba los ejemplos o escribe tu propia expresión. El parser muestra errores en caso de sintaxis inválida.',
    images: {
      general: require('../../assets/img/interpreter.png'),
      specific: require('../../assets/img/real_interpreter.png'),
    },
  },
  {
    id: 'iterator',
    name: 'Iterator',
    category: 'Behavioral',
    Component: IteratorDemo,
    resumen: 'Permite acceder secuencialmente a los elementos de una colección sin exponer su representación interna.',
    problematicaGeneral: 'Sin Iterator, el cliente suele manipular índices y la estructura interna de colecciones; con el patrón la responsabilidad de recorrer queda desacoplada.',
    solucionGeneral: 'Definir interfaces Aggregate/Iterator y crear iteradores concretos que mantengan estado de recorrido.',
    casoEspecifico: 'Playlist con canciones y un iterador que avanza, reinicia y elimina el elemento actual.',
    solucionEspecifica: 'Playlist expone createIterator() y el cliente usa hasNext/next/remove/reset para controlar el recorrido.',
    playgroundExplicacion: 'Agrega canciones, crea un iterador y avanza para reproducir/eliminar elementos.',
    playgroundComoInteractuar: 'Usa los controles Crear iterador / Siguiente / Eliminar / Reiniciar para ver el comportamiento.',
    images: {
      general: require('../../assets/img/iterator.png'),
      specific: require('../../assets/img/real_iterator.png'),
    },
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
