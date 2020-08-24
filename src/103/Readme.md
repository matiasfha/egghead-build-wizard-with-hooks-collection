# Validar el uso de Context en componente compuestos utilizando custom hook y useContext React hook

Nuestro componente entrega cierto grado de flexibilida a la hora de renderizar sus componentes compuestos, permitiendo que el usuario decida donde y como posiciona los componentes básicos del Wizard. Pero, si el usuario utiliza uno de estos componentes compuestos fuera del componente principal `<Wizard>` que implementa `<WizardContext.Provider>` ocurrirá un error que podría ser confuso.

Es posible manejar esta situación proveyendo valores por defecto o validando el uso de nuestros componentes.

La idea de validar si el componente compuesto es hijo directo de `<WizardContext.Provider>` es poder entregar un mensaje de error más adecuado al usuario.

Para esto haremos uso de una de las caracterísiticas escenciales de React hooks: Custom hooks o hooks peronalizados. Ya que los hooks no son más que funciones, es simple pensar en componer funcione más complejas para compartir lógica entre nuetros componentes.

En este ejemplo crearemos un pequeño hook entoro a `useHook` que nos permitirá validar nuestros componentes.

`useWizardHook` es un simple hook que engloba el uso de `useContext`, el acceso a `WizarContext` y una validación que emite un error en caso de fallar.

Este hook es utilizado por nuestros componentes compuestos pero también exportado para que el usuario pueda utilizarlo si así lo desea.
