//variables
const carrito = document.getElementById('carrito');
const lista_productos = document.getElementById('productos');
const lista_carrito = document.querySelector('#lista-carrito  tbody');
const vaciarCarrito = document.getElementById('vaciar-carrito');



carga_evento_listener();


//listeners
function carga_evento_listener(){
    lista_productos.addEventListener('click',comprar);
    carrito.addEventListener('click',eliminarProducto);
    vaciarCarrito.addEventListener('click',eliminarCarrito);

    //cargar lo que tenga en el localstorage desde el documentohtml
    document.addEventListener('DOMContentLoaded',cargarLocalstorage);

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
    guardarLocalStorage(informacion);
    insertarCarrito(informacion);
    

}

function insertarCarrito(productos){
 let data = document.createElement('tr');
 data.innerHTML = `
 <td><img src= "${productos.imagen}"  width = 100></td>
 <td>${productos.descripcion}</td>
 <td>${productos.precio}</td>
 <td> <a class = "borrar-camisa" data-id = "${productos.id}">X</a></td>`;

lista_carrito.appendChild(data);


}

//eliminar camisa del carrito
function eliminarProducto(e){
    e.preventDefault();

    let producto;
    let id;
    if(e.target.classList.contains('borrar-camisa')){
        e.target.parentElement.parentElement.remove();
        producto = e.target.parentElement.parentElement;
        id = producto.querySelector('a').getAttribute('data-id');
    }
    eliminarProductoLocalStorage(id);
    console.log('eliminado');

}

//eliminar todo el carrito
function eliminarCarrito(){

    while (lista_carrito.firstChild) {

        lista_carrito.removeChild(lista_carrito.firstChild);
    }

    //llamo la funcion vaciar del localstorge
    vaciarLocalStorage();

}

//guardar en localstorage
function guardarLocalStorage(producto){

    let productos;

    productos = traerDatosLocalStorage();
    productos.push(producto);
    localStorage.setItem('productos',JSON.stringify(productos));

}

function traerDatosLocalStorage(){

    let productosLs;

    if(localStorage.getItem('productos')===null){
        productosLs=[];
    }else{
        productosLs = JSON.parse(localStorage.getItem('productos'));
    }

    return productosLs;
}

//funcion para caragar datos guardados en el localstorage
function cargarLocalstorage(){

    let productosLs;
    //traigo los datos que tengo guardados en localdtorage
    productosLs = traerDatosLocalStorage();

    //recorro los datos y los inserto
    for (let index = 0; index < productosLs.length; index++) {
        const element = productosLs[index];
        insertarCarrito(element);
        
    }

}

function eliminarProductoLocalStorage(id){

    let productosLs;
    //traigo datos del localstorage
    productosLs = traerDatosLocalStorage();
     //recorro los datos y busco por id para eliminar
     for (let index = 0; index < productosLs.length; index++) {
        const element = productosLs[index];
        console.log(element.id);
        if(element.id === id){
            //elimino en la posicion y el array del localstorage
            productosLs.splice(index,id);
        }   
    }
    localStorage.setItem('productos',JSON.stringify(productosLs));
}

function vaciarLocalStorage(){
    localStorage.clear();
}