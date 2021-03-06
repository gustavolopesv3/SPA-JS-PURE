let globalNames = ['one', 'two', 'three', 'Gustavo Lopes'];
let inputName = null;
let currentIndex = null;
let isEditing = false;

window.addEventListener('load', () => {
  inputName = document.querySelector('#name');

  preventFormSubmit();
  activateInput();
  render();
});

function preventFormSubmit() {
  function handleFormSubmit(event) {
    event.preventDefault();
  }

  let Form = document.querySelector('form');
  Form.addEventListener('submit', handleFormSubmit);
}

function activateInput() {
  function insertName(newName) {
    //globalNames.push(newName);
    globalNames = [...globalNames, newName];
  }

  function updateName(newName) {
    globalNames[currentIndex] = newName;
  }

  function handleTyping(e) {
    var hasText = !!e.target.value && e.target.value.trim() !== '';

    if (!hasText) {
      clearInput();
      return;
    }

    if (e.key == 'Enter') {
      if (isEditing) {
        updateName(e.target.value);
      } else {
        insertName(e.target.value);
      }

      render();
      isEditing = false;
      clearInput();
    }
  }

  inputName.addEventListener('keyup', handleTyping);
  inputName.focus();
}

function render() {
  function createDeleteButton(index) {
    function deleteName() {
      //   //globalNames.splice(index, 1);
      //   globalNames = globalNames.filter((name, i) => {
      //     if (i === index) {
      //       return false;
      //     }
      //     return true;
      //   });
      globalNames = globalNames.filter((name, i) => i !== index);
      console.log(i);
      render();
    }

    var button = document.createElement('button');
    button.textContent = 'x';
    button.classList.add('deleteButton');
    button.classList.add('clickable');

    button.addEventListener('click', deleteName);

    return button;
  }

  function createSpan(name, index) {
    function editItem() {
      inputName.value = name;
      inputName.focus();
      isEditing = true;
      currentIndex = index;
    }

    var span = document.createElement('span');
    span.classList.add('clickable');
    span.textContent = name;

    span.addEventListener('click', editItem);

    return span;
  }

  var divNames = document.querySelector('#names');
  divNames.innerHTML = '';

  for (i = 0; i < globalNames.length; i++) {
    var currentName = globalNames[i];

    var li = document.createElement('li');
    var button = createDeleteButton(i);

    var span = createSpan(currentName, i);

    li.appendChild(button);
    li.appendChild(span);
    divNames.appendChild(li);
    clearImput();
  }
}

// function clearInput() {
//   inputName.value = '';
//   inputName.focus();
// }

const clearImput = () => {
  inputName.value = '';
  inputName.focus();
};
