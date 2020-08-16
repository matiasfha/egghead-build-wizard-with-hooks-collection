# construir un componente wizard utilizando `useState` React hooks

En esta lección se define una primera versión sencilla de un componente wizard.
El componente tiene las siguientes características:
* Acepta un número indeterminado de elementos hijos considerados como páginas dentro del Wizard 
* Se despliega solo una página a la vez
* Despliega dos botones que permiten al usuario navegar entre las páginas desplegadas

Para lograr esto. Es necesario que el componente almacena un estado que indica que página debe ser renderizada en cada momento. Para esto,  se utiliza `React.useState`, un hook que permite almacenar un valor cualquiera dentro del estado.
`useState` retorna una tupla , una estructura tipo arreglo pero que indica un par clave, valor. En donde el primer valor es el valor del estado, que puede ser cualquier tipo de dato y como segundo método ofrece una función llamada función dispatch que permite modificar el estado y llamar un renderizado.

 
