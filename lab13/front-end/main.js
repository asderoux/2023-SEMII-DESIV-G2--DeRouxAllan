const endpoint = 'http://localhost:4567'; // Reemplaza 'URL_DEL_ENDPOINT' con tu URL real


function getNotes() {
  
  fetch(`${ endpoint }/notas`)
    .then(response => response.json())
    .then(notes => {
      const notesContainer = document.getElementById('notes-container');
      notesContainer.innerHTML = '<h2>Notas Almacenadas</h2>';
      
      let array = [];
      let HTML = "";
      
      array = notes.data;
      
      array.forEach(element => {
        HTML += `<div class='nota'> ID: ${element.id} &emsp;&emsp;NOTA: ${element.value} </div>` 
        
      });

      HTML += `<div class='nota' style='margin-top:20px;'> PROMEDIO: ${notes.average} </div>` 

      if( array != [] ){

        document.getElementById('notes-container').innerHTML = HTML;
      }

    })
    .catch(error => console.error('Error al obtener notas:', error));
}

function readNote(noteId) {

  fetch(`${endpoint}/notas/${noteId}`)
    .then(response => response.json())
    .then(note => {
      
      const notesContainer = document.getElementById('notes-container');
      notesContainer.innerHTML = '<h2>Notas Almacenadas</h2>';
      
      let array = [];
      let HTML = "";
      
      
      HTML += `<div class='nota'> ID: ${note.id} &emsp;&emsp;NOTA: ${note.value} </div>` 
        
      
      if( array != [] ){
        document.getElementById('notes-container').innerHTML = HTML;
      }
    })
    .catch(error => console.error('Error al leer la nota:', error));
}


const orquestador = () => {
  let value = document.getElementById('nota').value;

  if (value != "" ){
    readNote(value);
  }else{
    getNotes();
  }
}


const addNote = () =>{
  
  let value = document.getElementById('agregar-nota').value;

  value = `{ "nota": "${value}" }`;

  fetch(`${endpoint}/notas`, {
    
    method: 'POST',
    
    headers: {
        
      'Content-Type': 'application/json',
      'access-control-allow-origin' : '*'
    },
    
    body: value
  }).then( () => getNotes() );

}