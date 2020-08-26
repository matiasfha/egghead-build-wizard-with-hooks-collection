# Utilizar useEffect React hook para definir el total de paginas del componente Wizard

Nuestro componente Wizard ofrece flexibilidad pero en el paso anterior tuvimos que forsozamente agregar una prop al componente principal para conocer el total de pasos o páginas que se desean renderizar. La prop  `steps`.

Podemos eliminar su uso y "automatizar" la obtención de este dato al utilizar el hook `useEffect`.

`useEffect` es el hook utilizado para ejecutar "efectos secundarios" o en general cualquier acción que se requiera ejecutar al momento de renderizar un componente.

`useEffect` recibe dos argumentos, una función callback que define el effecto que queremos ejecutar y un arreglo que define el listado de dependencias del efectos.

En el listado de dependencias deben ir todos los valores utilizados por el efecto para su correcto funcionamiento. React utiliza este listado para definir cuando el efecto es ejecutado o no. Si las dependencias no han cambiado, entonces el efecto no es ejecutado. 

React realiza una comparación por valor de cada una de las dependencias, es decir, hace una comparación simple que no es adecuada para casos en que se utilice un objeto de propiedades anidadas.

