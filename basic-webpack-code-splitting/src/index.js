const container = document.getElementById('container');
const button1 = document.getElementById('button1');
const button2 = document.getElementById('button2');

button1.addEventListener('click', () => {
  System.import('./module1')
    .then(module => {
      container.innerHTML = module.default.text;
    });
});

button2.addEventListener('click', () => {
  System.import('./module2')
    .then(module => {
      container.innerHTML = module.default.text;
    });
});
