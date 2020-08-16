# Cnstruir un componente wizard utilizando `useState` React hooks

En esta lección se define una primera versión sencilla de un componente wizard.
El componente tiene las siguientes características:
* Acepta un número indeterminado de elementos hijos considerados como páginas dentro del Wizard 
* Se despliega solo una página a la vez
* Despliega dos botones que permiten al usuario navegar entre las páginas desplegadas

Para lograr esto. Es necesario que el componente almacena un estado que indica que página debe ser renderizada en cada momento. Para esto,  se utiliza `React.useState`, un hook que permite almacenar un valor cualquiera dentro del estado.
`useState` retorna una tupla , una estructura tipo arreglo pero que indica un par clave, valor. En donde el primer valor es el valor del estado, que puede ser cualquier tipo de dato y como segundo método ofrece una función llamada función dispatch que permite modificar el estado y llamar un renderizado.

 El valor del estado que en este caso es sólo un valor entero en la variable `activePageIndex` se utiliza para definir que componente hijo se renderizara.
Para esto, primero se utiliza la api `React.Children.toArray` and `React.Children.count` para transformar la estructura opaca de `children` a un arreglo plano,más sobre esta api [aqui](https://es.reactjs.org/docs/react-api.html).

Al trasformar `children` como arreglo es posible manipularlo y acceder a uno de sus elementos por medio del índice. Se utiliza esta característica junto al valor del estado `activeIndexPage` para obtener uno de los elementos del arreglo dentro de `currentPage` para ser renderizado.

También se definen dos funciones que modifican el estado utilizando la función dispatch que llamamos `setActivePage` en su forma de función.
La función de dispatch puede modificar el estado en dos formas:
* recibiendo directamente un valor
* recibiendo una función que tiene como argumento el valor previo del estado.

En este caso se utiliza la forma funcional ya que el nuevo valor del estado depende del valor previo.

Estas funciones son utilizadas en los botones que permiten navegar entre las páginas del Wizard.


En resumen en esta lección se muestra una forma sencilla de utilizar el hook `useState` para mantener un valor como estado y modificarlo mediante el uso de la función dispatch retornada en la tupla.
Además se muestra el uso de la api `React.Children` para manipular la estructura de datos de `children`
