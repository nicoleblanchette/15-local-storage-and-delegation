const addItems = document.querySelector('.add-items');
const itemsList = document.querySelector('.plates');
const items = JSON.parse(localStorage.getItem('items')) || [];

const populateList = (plates = [], platesList) => {
  platesList.innerHTML = '';
  let i = 0;
  for (const plate of plates) {
    const li = document.createElement('li');
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.id = `item${i}`;
    checkbox.dataset.index = i;
    checkbox.checked = plate.done;
    const label = document.createElement('label');
    label.htmlFor = `item${i}`;
    label.textContent = plate.text;

    li.append(checkbox, label);
    platesList.append(li);
    i++;
  }
};

const addItem = (e) => {
  e.preventDefault();

  const text = e.target.querySelector('[name=item]').value;
  const item = {
    text,
    done: false
  };
  items.push(item);
  console.log(items);
  populateList(items, itemsList);
  localStorage.setItem('items', JSON.stringify(items));
  e.target.reset();
};

const toggleDone = (e) => {
  if (!e.target.matches('input')) return;
  console.log(e.target);
  const el = e.target;
  const idx = el.dataset.index;
  items[idx].done = !items[idx].done;
  localStorage.setItem('items', JSON.stringify(items));
  populateList(items, itemsList);
};

const main = () => {
  addItems.addEventListener('submit', addItem);
  itemsList.addEventListener('click', toggleDone);
  populateList(items, itemsList);
};
main();
