# Utilizar componentes compuestos con el hook useContext para dar mayor flexibilidad 

La versión actual de nuestro Wizard es un componente sencillo que no ofrece flexibilidad de uso al usuario del componente. Tanto el orden de renderizado como los estilos utilizados son definidos por el mismo componente.
Podemos refactorizar este código para ofrecer mayor flexibilidad a la hora de renderizar para ello se comienza por definir la api que se quiere ofrecer.

Después de definir que se exportaron dos botones y un componente central para contener el contenido o páginas es necesario crear los nuevos componentes y buscar un modo de compartir el estado definido en el componente principal con los nuevos componentes.
Para compartir un estado entre componentes relacionados una forma directa ofrecida por React es utilizar la [API Context](https://es.reactjs.org/docs/context.html) esta api permite compartir un valor entre todos los componentes hijos del llamado Provider.
Cada componente hijo bajo el componente provider, en este caso `WizardContext.Provider` podrán consumir los valores del contexto y esto se puede hacer utilizando el hook `useContext`.

El hook `useContext` recibe como parámetro la variable en donde se definió el context y retorna los valores pasados al proveedor.

Usaremos este hook en cada uno de los nuevos componentes.
En el caso del botón Prev se necesita conocer el valor de `activeIndexPage` y acceso a la función `goNextPage`

Para el botón Next se requiere el valor de `activeIndexPage`, `goNextPage` y algún valor que permita definir el límite superior. Es decir, el número de páginas que se deben renderizarán.
Para esto, la forma más sencilla es usar una nueva prop que permita al usuario definir ese valor. Llamaremos a esta prop `steps` y será agregada también al context.
Ahora ese valor es utilizado para definir el límite del botón Next.

En el caso del contenedor `WizardPages` se usa la misma estrategia anterior de manipular los elementos dentro de `children ` y usar `activeIndexPage` desde el context para obtener el `currentPage `

Esto crea una versión más flexible del componente permitiendo al usuario de este definir tanto los estilos como la forma de renderizado. Esto es posible gracias al uso de la API Context para  compartir  un estado entre componentes relacionados, estado que es después consumido con el hook `useContext`.
