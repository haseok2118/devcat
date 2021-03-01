//데이터를 배열에 담아서 사용
let data = [];

const listBox = document.getElementById("list-inputBox-wrapper");
const cardInputBox = document.querySelector(".card-input-wrapper");
const pushAddText = document.querySelector(".add-list");
const closeListBox = document.querySelector(".close-listBox");
const addListButton = document.querySelector(".add-list-button");
const listTitle = document.getElementById("list-input-box");
const parentNode = document.getElementById("content-box");

//리스트 추가하는 박스 생성함수
const makeAddCard = () => {
  let wrapper = document.createElement("div");
  let openAddCardBox = document.createElement("div");
  let addCardBoxWrapper = document.createElement("div");
  let inputBox = document.createElement("input");
  let buttonBox = document.createElement("div");
  let addCardButton = document.createElement("button");
  let closeButton = document.createElement("span");
  let wrapperId = Date.now();

  wrapper.id = wrapperId;
  wrapper.classList.add("add-card-wrapper");
  openAddCardBox.classList.add("open-cardInput-box");
  addCardBoxWrapper.classList.add("card-input-wrapper");
  inputBox.classList.add("input-card-content");
  buttonBox.classList.add("input-card-button-box");
  addCardButton.classList.add("add-card-button");
  closeButton.classList.add("close-input-box");

  openAddCardBox.innerText = "+ Add a card";
  inputBox.type = "text";
  inputBox.placeholder = "Enter list title...";
  addCardButton.innerText = "Add card";
  closeButton.innerText = "✕"

  wrapper.appendChild(openAddCardBox);
  wrapper.appendChild(addCardBoxWrapper);
  addCardBoxWrapper.appendChild(inputBox);
  addCardBoxWrapper.appendChild(buttonBox);
  buttonBox.appendChild(addCardButton);
  buttonBox.appendChild(closeButton);

  // document.getElementById("wrapperId").addEventListener("click", function (event) {
    
  //   let element = event.target;
  //   if (element.classList.contains("open-cardInput-box")) return showCardInputBox();
  //   // if (element.classList.contains("close-input-box")) return closeList();
  //   // if (element.classList.contains("add-card-button")) return displayTaskBox();
  // })

  return wrapper;
}


//add a list 버튼 클릭 후 리스트 박스 생성 함수
const displayTaskBox = () => {
  let container = document.createElement("div");
  let listHeader = document.createElement("div");
  let p = document.createElement("p");
  let span = document.createElement("span");
  let cardBox = makeAddCard()
  

  container.classList.add('list-box');
  span.classList.add('delete-listBox');
  p.classList.add('list-box-title');
  listHeader.classList.add("list-header");

  p.innerText = listTitle.value;
  span.innerText = '✕'

  container.appendChild(listHeader);
  listHeader.appendChild(p);
  listHeader.appendChild(span);
  container.appendChild(cardBox);

  parentNode.insertBefore(container, parentNode.lastElementChild)
  listTitle.value = ''
  pushAddText.innerText = "+ Add another list"
};

//리스트 추가 box open
const showList = () => {
  listBox.style.display = "block"
}
//리스트 추가 box open
const showCardInputBox = () => {
  cardInputBox.style.display = "block"
}

// 리스트 추가 box close
const closeList = () => {
  listBox.style.display = "none"
};

// const deleteList = () => {

// }

document.getElementById("content-box").addEventListener("click", function (event) {
  let element = event.target;
  if (element.classList.contains("add-list")) return showList();
  if (element.classList.contains("close-listBox")) return closeList();
  if (element.classList.contains("add-list-button")) return displayTaskBox();
})

