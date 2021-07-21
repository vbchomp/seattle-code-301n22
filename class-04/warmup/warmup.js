'use strict';

let h2 = document.getElementById('nameHeader');

// need event handler w/ window into the DOM

// prevent default overrides default HTML behavior
document.getElementById('myForm').addEventListener('submit', function(e){
  e.preventDefault();
  let username = e.target.name.value;
  console.log('username:', username);
  let dob = e.target.dob.value;
  console.log('dob:', dob);
  let year = e.target.year.value;
  console.log('year:', year);
  console.log('submitted');
});

document.querySelector('input[name="name"]').addEventListener('input', e => h2.textContent = `Welcome, ${e.target.value}!`);

document.querySelector('select').addEventListener('change', e => console.log(e.target.value));
