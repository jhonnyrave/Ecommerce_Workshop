//variables
const carrito = document.getElementById('carrito');
const lista_productos = document.getElementById('productos');
const lista_carrito = document.querySelector('#lista-carrito  tbody');



carga_evento_listener();


//listeners
function carga_evento_listener(){
    lista_productos.addEventListener('click',comprar);

}

//funcion que añade el producto al carrito
function comprar(e){
e.preventDefault();
    if(e.target.classList.contains('agregar-carrito')){
        const producto = e.target.parentElement;
      
        obtenerInfo(producto);
    }

}

function obtenerInfo(producto){

    const informacion ={

        imagen: producto.querySelector('img').src,
        descripcion: producto.querySelector('h4').textContent,
        precio: producto.querySelector('p').textContent,
        id: producto.querySelector('input').getAttribute('data-id')

    }
    console.log(informacion);
    insertarCarrito(informacion);

}

function insertarCarrito(productos){
 let data = document.createElement('tr');
 data.innerHTML = `
 <td><img src= "${productos.imagen}"  width = 100></td>
 <td>${productos.descripcion}</td>
 <td>${productos.precio}</td>
 <td> <a class = "borrar-curso" data-id = "${productos.id}">X</a></td>`;

lista_carrito.appendChild(data);

}
