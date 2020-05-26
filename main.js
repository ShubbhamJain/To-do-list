// Div to show list
// let showinfo = document.querySelector('#listinfo');

// Adding list title
// let listtitlebtn = document.querySelector('#addlisttitlebtn');
// listtitlebtn.addEventListener('click',function() {
//   let listname = document.querySelector('#nameoflist').value;
//   if (showinfo.hasChildNodes()) {
//     let h1 = document.createElement('h1');
//     h1.appendChild(document.createTextNode(listname));
//     showinfo.appendChild(h1);
//     showinfo.style.display = "block";
//   }
//   else {
//     showinfo.style.display = "none";
//   }
// });

// Adding items to list
// let items = [];
// let listitembtn = document.querySelector('#additemtolistbtn');
// listitembtn.addEventListener('click',function() {
//   let listitem = document.querySelector('#itemoflist').value;
//   items.push(listitem);
//   items.forEach((item, i) => {
//     let h4 = document.createElement('h4');
//     h4.appendChild(document.createTextNode(item));
//     showinfo.appendChild(h4);
//   });
//   items.pop(listitem);
// });


// Event listener when the button to create list with the title and items are passed by the user.
document.querySelector('#createlistbtn').addEventListener('click',
(e) => {
    e.preventDefault();

    // Values taken which are passed.
    const title = document.querySelector('#nameoflist').value;
    const item = document.querySelector('#itemoflist').value.split(",");

    // Checking if either of the values passed are empty.
    if (title == '' || item == '') {
      UI.showAlert('Please fill all details','danger');
    }
    // If the values are not empty then the else block is executed.
    else {
      // Values are passed on to the class List.
      const list = new List(title,item);

      // Function to create values in the table is executed declared in UI class.
      UI.addItemtoList(list);

      // Once list is created a message is shown.
      UI.showAlert('List created with the items listed','success');

      // Title area and create ist button are hidden.
      document.querySelector('.titletextinput').style.display = 'none';
      document.querySelector('#createlistbtn').style.display = 'none';

      // Button to add items is shown.
      document.querySelector('#additembtn').style.display = 'block';
      document.querySelector('#additembtn').classList.add("additembtn");

      // Button to create an entirely new list is shown.
      document.querySelector('#createnewlistbtn').style.display = 'block';
      document.querySelector('#createnewlistbtn').classList.add("createnewlistbtn");

      document.querySelector('#itemoflist').value = '';
    }
})

// Event listener for the button to add items to the created list.
document.querySelector('#additembtn').addEventListener('click',(e) => {
  e.preventDefault();
  const items = document.querySelector('#itemoflist').value.split(",");
  if (items == '') {
    UI.showAlert('Please list items to add','danger');
  }
  else {
    addtolist(items);

    UI.showAlert('Items added to list','success');

    document.querySelector('#itemoflist').value = '';
  }
})

// Event listener for the button to create an entirely new list is executed.
document.querySelector('#createnewlistbtn').addEventListener('click',(e) => {
  e.preventDefault();

  UI.showAlert('Current list deleted','danger');
  document.querySelector('#additembtn').style.display = 'none';
  document.querySelector('.titletextinput').style.display = 'block';
  document.querySelector('#createlistbtn').style.display = 'block';
  document.querySelector('#createlistbtn').classList.add("createlistbtn");

  document.querySelector('#nameoflist').value = '';
  document.querySelector('#itemoflist').value = '';

  // For deleting title in list which already exists.
  let namelist = document.querySelector('#listname');
  let child = namelist.firstElementChild;
  while (child) {
    namelist.removeChild(child);
    child = namelist.firstElementChild;
  }

  // For deleting items in list which already exists.
  let itemslist = document.querySelector('#listitems');
  let childitem = itemslist.firstElementChild;
  while (childitem) {
    itemslist.removeChild(childitem);
    childitem = itemslist.firstElementChild;
  }

  document.querySelector('#createnewlistbtn').style.display = 'none';
})

// Class List for assigning values.
class List {
  constructor(title,item) {
    this.title = title;
    this.item = item;
  }
}

// class AddItem {
//   constructor(items) {
//     this.items = items;
//     console.log(this.items);
//   }
// }

// class NewList {
//   constructor(title,item) {
//     this.title = title;
//     this.item = item;
//   }
// }

class UI {

  // Function to create the list with the title and items passed when createlist button is clicked.
  static addItemtoList(list) {
    const listtitle = document.querySelector('#listname');
    if (listtitle.children.length == 0) {
      const tr = document.createElement('tr');
      tr.innerHTML = `<th class="display-4" scope="col">${list.title}</th>`;
      listtitle.appendChild(tr);
    }
    else {
      console.log("children already created");
    }

    const listitems = document.querySelector('#listitems');
    for (let i = 0; i < list.item.length; i++) {
      if (list.item[i] == '') {
        console.log("Enter valid item");
      }
      else {
        const row = document.createElement('tr');
        row.innerHTML = `
                         <td scope="row" class="bg-secondary d-flex">
                          <span class="mr-5">${list.item[i]}</span>
                          <a href="#" class="btn btn-sm btn-danger remove ml-auto align-self-end">X</a>
                         </td>
                         <!-- <td><a href="#" class="btn btn-sm btn-danger remove">X</a></td> -->
                        `;
        listitems.appendChild(row);
      }
    }
  }

  // Function to delete list item if it contains remove class.
  static removeItem(el) {
    if (el.classList.contains('remove')) {
      el.parentElement.parentElement.remove();
      UI.showAlert('Item deleted','danger');
    }
  }

  // Function to show small alert messages whenever an event occurs.
  static showAlert(message,className) {
    const div = document.createElement('div');
    div.className = `alert alert-${className}`;

    div.appendChild(document.createTextNode(message));

    const form = document.querySelector('#_form');

    const title = document.querySelector('.titletextinput');

    form.insertBefore(div,title);

    setTimeout(() => document.querySelector('.alert').remove(), 1000);
  }
}

// Event listener for the X-button whenever it is clicked to delete the list item.
document.querySelector('#listitems').addEventListener('click',
(e) => {
  UI.removeItem(e.target);
})

// Function to add items to list whenever the addtolist button is clicked.
function addtolist(additems) {
  for (let i = 0; i < additems.length; i++) {
    if (additems[i] == '') {
      console.log("enter valid value");
    }
    else {
      const row = document.createElement('tr');
      row.innerHTML = `
                       <td scope="row" class="bg-secondary d-flex">
                        <span class="mr-5">${additems[i]}</span>
                        <a href="#" class="btn btn-sm btn-danger remove ml-auto align-self-end">X</a>
                      </td>
                       <!-- <td><a href="#" class="btn btn-sm btn-danger remove">X</a></td> -->
                       `;
      listitems.appendChild(row);
    }
  }
}
