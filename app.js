// Adquirimos los elementos del DOM donde vamos a ingresar los datos de usuario
const form = document.getElementById('formRegister');
const nameinput = document.getElementById('nameinput');
const dateinput = document.getElementById('dateinput');
const timeinput = document.getElementById('timeinput');

// Donde vamos a pintar los datos de Usuario
const tablebody = document.getElementById('tablebody');

// Para almacenar estos datos en el localStore, al actualizar, no se borre la info
let data = JSON.parse(localStorage.getItem('formData')) || [];

// Creamos función para que al evento "submit" click al botón (agregar), almacene la información en memoria
form.addEventListener('submit', function(event) {
    // Elimina comportamientos por defecto del formulario
    event.preventDefault();
    
    const name = nameinput.value;
    const date = dateinput.value;
    const time = timeinput.value;

    if (name && date && time) {
        const newData = { name, date, time };
        data.push(newData);
        saveDataToLocalStorage();
        renderTable();
        // Función para borrar y volver a iniciar el formulario
        form.reset();
    } else {
        alert('Favor llenar todos los campos');
    }
});

// Función para guardar los datos del formulario
function saveDataToLocalStorage() {
    localStorage.setItem('formData', JSON.stringify(data));
}

// Función para renderizar o actualizar el formulario, limpia el contenido de la tabla para nuevo registro
function renderTable() {
    tablebody.innerHTML = '';

    // Para generar todos los registros del formulario en una tabla necesitamos iterar el "data" (toda la información) y crear la tabla
    data.forEach(function(item, index) {
        const row = document.createElement('tr');
        const nameCell = document.createElement('td');
        const dateCell = document.createElement('td');
        const timeCell = document.createElement('td');
        const actionCell = document.createElement('td');

        // Dentro de la celda "action" o acciones creamos dos botones: editar y eliminar
        const editButton = document.createElement('button');
        const deleteButton = document.createElement('button');
    
        // Agregamos el contenido de la celda: texto para nombre, fecha y hora
        nameCell.textContent = item.name;
        dateCell.textContent = item.date;
        timeCell.textContent = item.time;

        // Agregamos el texto en los botones
        editButton.textContent = 'Editar';
        deleteButton.textContent = 'Eliminar';

        // Asignamos las clases a los botones que aparecen en la celda "acciones"
        editButton.classList.add('button', 'button--secundary');
        deleteButton.classList.add('button', 'button--terciary');

        // Eventos de escucha con funciones para los botones de la celda "acciones" editar y eliminar
        editButton.addEventListener('click', function() {
            editData(index);
        });

        deleteButton.addEventListener('click', function() {
            deleteData(index);
        });

        // Agregamos los botones a la celda de acciones
        actionCell.appendChild(editButton);
        actionCell.appendChild(deleteButton);

        // Creamos las filas o celdas para los textos que capture en la data
        row.appendChild(nameCell);
        row.appendChild(dateCell);
        row.appendChild(timeCell);
        row.appendChild(actionCell);

        // Creamos las filas para nuestro tablebody "la que aparece con la data"
        tablebody.appendChild(row);
    });
}

// Función para editar los datos
function editData(index) {
    const item = data[index];
    nameinput.value = item.name;
    dateinput.value = item.date;
    timeinput.value = item.time;
    data.splice(index, 1); // Elimina el elemento actual del array de datos
    saveDataToLocalStorage(); // Guarda el estado actualizado
    renderTable(); // Renderiza la tabla con los datos actualizados
}

// Función para eliminar datos
function deleteData(index) {
    data.splice(index, 1); // Elimina el elemento actual del array de datos
    saveDataToLocalStorage(); // Guarda el estado actualizado
    renderTable(); // Renderiza la tabla con los datos actualizados
}

// Renderiza la tabla inicialmente
renderTable();