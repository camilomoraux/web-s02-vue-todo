/*
console.log('Hola desde sesion2_contador.js')

let usuarios = [
  'Bruno', 
  'Camilo', 
  'Mariana',
  'Ana', 
  'Luis', 
  'Sofía', 
  'Diego', 
  'Valeria', 
  'Jorge', 
  'Fernanda',
  'Andrés', 
  'Claudia', 
  'Mateo', 
  'Paula', 
  'Ricardo', 
  'Daniela',
  'Santiago', 
  'Gabriela', 
  'Felipe', 
  'Laura'
];

let decirHola = function(nombre) {
  console.log('Hola ' + nombre)
}

/* versión 1.0

for (let i = 0; i < usuarios.length; i++) {
  decirHola(usuarios[i])
}



usuarios.forEach(nombre => {
  decirHola(nombre) 
});

let number = 1;


while(number <= 4) { 
  console.log(number)
  number++
}

*/

let count = 0;
console.log(count)

let add = function() {
  count++
  console.log(count)
  updateValue()
}

let less = function() {
  count--
  console.log(count)
  updateValue()
}

let updateValue = function() {
  value.innerText = count
}

let addButton = document.getElementById('increment');

addButton.addEventListener('click', () => { 
  add();
})

let lessButton = document.getElementById('decrement');

lessButton.addEventListener('click', () => { 
  less();
})

let value = document.getElementById('value');