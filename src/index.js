//데이터를 배열에 담아서 사용
let data = {};

const listBox = document.getElementById("list-inputBox-wrapper");
const pushAddText = document.querySelector(".add-list");
const closeListBox = document.querySelector(".close-listBox");
const addListButton = document.querySelector(".add-list-button");
const listTitle = document.getElementById("list-input-box");
const parentNode = document.getElementById("content-box");
let count = 1;

//리스트 추가하는 박스 생성함수
const makeAddCard = () => {

  let wrapper = document.createElement("div");
  let openAddCardBox = document.createElement("div");
  let addCardBoxWrapper = document.createElement("div");
  let inputBox = document.createElement("textarea");
  let buttonBox = document.createElement("div");
  let addCardButton = document.createElement("button");
  let closeButton = document.createElement("span");
  let wrapperId = Date.now();

  wrapper.id = wrapperId;
  wrapper.classList.add("add-card-wrapper");
  openAddCardBox.classList.add("open-cardInput-box");

  addCardBoxWrapper.classList.add("card-input-wrapper");
  addCardBoxWrapper.id = wrapperId + addCardBoxWrapper.className
  inputBox.classList.add("input-card-content");
  inputBox.id = wrapperId + inputBox.className
  buttonBox.classList.add("input-card-button-box");
  addCardButton.classList.add("add-card-button");
  addCardButton.id = wrapperId;
  closeButton.classList.add("close-input-box");
  closeButton.id = wrapperId;


  openAddCardBox.innerText = "+ Add a card";
  inputBox.type = "text";
  inputBox.rows = "5";
  inputBox.placeholder = "Enter card text ...";
  addCardButton.innerText = "Add card";
  closeButton.innerText = "✕"

  wrapper.appendChild(openAddCardBox);
  wrapper.appendChild(addCardBoxWrapper);
  addCardBoxWrapper.appendChild(inputBox);
  addCardBoxWrapper.appendChild(buttonBox);
  buttonBox.appendChild(addCardButton);
  buttonBox.appendChild(closeButton);
  console.log(wrapper)

  wrapper.addEventListener("click", function (event) {
    let element = event.target;
    if (element.classList.contains("open-cardInput-box")) {
      let elementId = element.parentNode.id + document.querySelector(".card-input-wrapper").className;
      document.getElementById(elementId).style.display = "block"
    }
    if (element.classList.contains("close-input-box")) {
      let elementId = element.id + document.querySelector(".card-input-wrapper").className;
      document.getElementById(elementId).style.display = "none"
    }
    if (element.classList.contains("add-card-button")) {
      let elementId = element.id + document.querySelector(".input-card-content").className;
      
      let contentContainer = document.createElement("div");
      let span = document.createElement("span");
      let contentContainerId = Date.now()
      let dragged;
      
      contentContainer.classList.add('content-container');
      contentContainer.id = contentContainerId + contentContainer.className;
      span.classList.add('card-content');
      span.innerText = document.getElementById(elementId).value;

      contentContainer.appendChild(span);
      
      document.addEventListener("dragstart", (event) => {
        dragged = event.target;
      });
      // contentContainer.addEventListener("dragenter", (event) => {
      //   console.log(event.target)
      //   let data = event.dataTransfer.getData("text/plain");
      //   console.log(document.getElementById(data))
      //   // if(event.target.style.order > )
      // });
      span.draggable = "true"

      document.addEventListener("dragover", (event) => {
        event.preventDefault();
      });
      document.addEventListener("drop", (event) => {
        event.preventDefault();
        // let data = event.dataTransfer.getData("text/plain");
        // console.log("data!!!!!!!!!!!!" + data)
        // console.log(document.getElementById(data))
        // console.log(event.target.childNodes)
        // let {...childNodes}
        // event.target.insertBefore(document.getElementById(data), event.target.lastElementChild);
        if (event.target.className === "content-container") {
          let parent = dragged.parentNode;
     
          let node = event.target.firstChild;
      
     
          event.target.appendChild(dragged);
          parent.appendChild(node)
        }
      })

      let newCard = contentContainer;
      let parentNode = wrapper.parentNode;

      parentNode.insertBefore(newCard, parentNode.lastElementChild)
      document.getElementById(elementId).value = ''
      // pushAddText.innerText = "+ Add another card"
    }
    
      
  })
  return wrapper;
}

//add a list 버튼 클릭 후 리스트 박스 생성 함수
const displayTaskBox = () => {
  let container = document.createElement("div");
  let listHeader = document.createElement("div");
  let p = document.createElement("p");
  let span = document.createElement("span");
  let cardBox = makeAddCard()
  let containerId = Date.now();
  
  container.classList.add('list-box');
  container.id = containerId + container.className;
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
  // if (element.id === element.parentNode.id) return showCardInputBox();
})

