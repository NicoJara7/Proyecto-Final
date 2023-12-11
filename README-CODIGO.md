Form.jsx

primero creamos un hoistorial para almacenar en el local storage la informacion

luego creamos estados para guardar y actualizar la informacion de nuestros elementos 

mediante un useEfect hacemos el pedido a los json que contienen nuestra informacion y la volcamos al elemento en cuestion

luego filtramos esa informacion mediante map para asi crear unas option las cuales contienen la informacion de los json

creamos una funcion llamada cotizar para realizar la suma de los factores de las opciones que haya seleccionado el usuario

y por ultimo creamos una opcion guardar para guardar el valor que obtuvimos de cotizar en nuestro local storage



historial.jsx


en el historial pedimos la informacion guardada en el json para crear una lista que contenga lo que el usuario a seleccionado mas el valor

luego creamos una funcion para borrar todas las listas mediante un boton

y finalmente una funcion para eliminar a la lista que querramos por separado

