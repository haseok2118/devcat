//리스트 추가하는 박스 생성함수
// const makeAddCard = () => {
//   let tmpl = `
//   <div class="card-wrapper">
//   </div>
//   <div class="add-card-wrapper">
//     <div class="open-cardInput-box">+ Add a card</div>
//     <div class="card-input-wrapper">
//       <textarea class="input-card-content" type="text rows="5" placeholder="Enter card text ..." />
//       <div class="input-card-button-box">
//         <button class="add-card-button">Add card</button>
//         <span class="close-input-box">✕</span>
//       </div>
//     </div>
//   </div>
//   `
//   document.querySelector(".add-card-wrapper").addEventListener("click", function (event) {
//     let element = event.target;
//     if (element.classList.contains("open-cardInput-box")) {
//       document.querySelector(".card-input-wrapper").style.display = "block"
//     }
//     if (element.classList.contains("close-input-box")) {
//       document.querySelector(".card-input-wrapper").style.display = "none"
//     }
//     if (element.classList.contains("add-card-button")) {
//       const cardTmpl = `
//       <div class="content-container">
//         <div class="card-content"></div>
//       </div>
//       `
//       let newCard = cardTmpl;
//       let dragged;
//       let cardContent = document.querySelector(".card-content")
//       cardContent.innerText = document.querySelector(".input-card-content").value;
//       cardContent.draggable = "true"
//       document.addEventListener("dragstart", (event) => {
//         dragged = event.target;
//       });
//       document.addEventListener("dragover", (event) => {
//         event.preventDefault();
//       });
//       document.addEventListener("drop", (event) => {
//         event.preventDefault();
//         if (event.target.className === "content-container") {
//           let parent = dragged.parentNode;
//           let node = event.target.firstChild;
//           event.target.appendChild(dragged);
//           parent.appendChild(node)
//         }
//       })
//       document.querySelector(".card-wrapper").appendChild(newCard);
      
//       document.querySelector(".input-card-content").value = ''
//     }
//   })
//   return tmpl;
// }

// add a list 버튼 클릭 후 리스트 박스 생성 함수
const displayTaskBox = () => {
  //여기 안에서 리스트 만들고 카드를 뿌리는 과정이 전부 포함되어야 한다.
  const listTitle = document.getElementById("list-input-box").value
  let Id = Date.now();
  const tmpl = `
  <div class="list-header" id=${Id}>
    <p class="list-box-title">${listTitle}</p>
    <span class="delete-listBox">✕</span>
  </div>
  <div class="card-wrapper" id=${Id + "card-wrapper"}>
  </div>
  <div class="add-card-wrapper" id=${Id}>
    <div class="open-cardInput-box">+ Add a card</div>
    <div class="card-input-wrapper" id=${Id + "card-input-wrapper"}>
      <textarea class="input-card-content" id=${Id + "input-card-content"} type="text" rows="5" placeholder="Enter card text ..." ></textarea>
      <div class="input-card-button-box">
        <button class="add-card-button">Add card</button>
        <span class="close-input-box">✕</span>
      </div>
    </div>
  </div>
  `
  let wrapper = document.createElement("article");
  wrapper.className = "list-box"
  wrapper.innerHTML = tmpl;
  document.getElementById("content-box").insertBefore(wrapper, document.getElementById("content-box").lastElementChild);
  document.getElementById("list-input-box").value = '';
  document.querySelector(".add-list").innerText = "+ Add another list";
  wrapper.addEventListener("click", (event) => {
    let element = event.target;
    if (element.classList.contains("open-cardInput-box")) {
      document.getElementById(`${Id + "card-input-wrapper"}`).style.display = "block"
    }
    if (element.classList.contains("close-input-box")) {
      document.getElementById(`${Id + "card-input-wrapper"}`).style.display = "none"
    }
    if (element.classList.contains("add-card-button")) {
      const text = document.getElementById(`${Id + "input-card-content"}`).value
      let newCard = document.createElement("div");
      let dragged;
      newCard.className = "card-content";
      newCard.draggable = "true";
      newCard.innerText = text;
      document.getElementById(`${Id + "card-wrapper"}`).appendChild(newCard);
      document.getElementById(`${Id + "input-card-content"}`).value = '';
      
      document.addEventListener("dragstart", (event) => {
        dragged = event.target;
      });
      document.addEventListener("dragover", (event) => {
        event.preventDefault();
      });
      document.addEventListener("dragenter", (event) => {
        event.preventDefault();
        // console.log(event.target.className)
        // console.log(dragged)
        let draggedCard = document.createElement("div");
        draggedCard.className = "drag";
        draggedCard.draggable = "true";

        if (event.target.className === "card-content") {
          dragged.style.display = "none";
          event.target.parentNode.appendChild(draggedCard)
         
          console.log(event.target.parentNode)
        }
        if (event.target.className === "open-cardInput-box" ) {
          dragged.style.display = "none";
          event.target.parentNode.appendChild(draggedCard)
        }
      });
      document.addEventListener("dragleave", (event) => {
        event.preventDefault();
        if (event.target.className === "card-content") {
          dragged.style.display = "none";
          event.target.removeChild(draggedCard)
          
        }
        if (event.target.className === "open-cardInput-box" ) {
          dragged.style.display = "none";
          event.target.parentNode.removeChild(draggedCard)
        }
        else {
          dragged.style.display = "block";
        }
      });
      document.addEventListener("drop", (event) => {
        event.preventDefault();
        if (event.target.className === "card-content") {
          event.target.appendChild(dragged);
        }
      })
    }
  })
};

// 리스트 추가 box open
const showList = () => {
  document.getElementById("list-inputBox-wrapper").style.display = "block"
}
// 리스트 추가 box close
const closeList = () => {
  document.getElementById("list-inputBox-wrapper").style.display = "none"
};

document.getElementById("content-box").addEventListener("click", function (event) {
  let element = event.target;
  if (element.classList.contains("add-list")) return showList();
  if (element.classList.contains("close-listBox")) return closeList();
  if (element.classList.contains("add-list-button")) return displayTaskBox();
})

// const app = {
//   server:'',
//   init: () => {
//     app.makeListBox()
//     app.addEventHandlers();
//     app.fetch((json) => {
//       json.results.forEach(app.renderList)
//     });
//   },
//   addEventHandlers: () => {
//     document.getElementById("content-box").addEventListener("click", function (event) {
//       let element = event.target;
//       if (element.classList.contains("add-list")) return app.showList;
//       if (element.classList.contains("close-listBox")) return app.closeList;
//       if (element.classList.contains("add-list-button")) return app.renderList;
//     })
//   },
//   fetchAndRender: () => {
    
//   },
//   fetch: () => {
//     fetch(app.server)
//       .then(resp => {
//         console.log(resp)
//       })
//   },
//   showList: () => {
//     const listBox = document.getElementById("list-inputBox-wrapper");
//     listBox.style.display = "block"
//   },
//   closeList: () => {
//     const listBox = document.getElementById("list-inputBox-wrapper");
//     listBox.style.display = "none"
//   },
//   sendListTitle: (data, callback) => {
//     fetch(app.server, {
//       method: "POST",
//       body: JSON.stringify(data),
//       headers: {
//         "Content-Type": "application/json",
//       },
//     })
//       .then((resp) => {
//       console.log(resp)
//     })
    
//   },
//   sendCardContent: (data, callback) => {
//     fetch(app.server, {
//       method: "POST",
//       body: JSON.stringify(data),
//       headers: {
//         "Content-Type": "application/json",
//       },
//     })
//       .then((resp) => {
//       console.log(resp)
//     })
    
//   },

//   renderList: () => {
//     //여기 안에서 카드가 렌더 되어야 한다는거
//     const temp = `
//     <div class="add-list">
//     </div>
//     `
//     let pushAddText = document.querySelector(".add-list");
//     let listTitle = document.getElementById("list-input-box");
//     let parentNode = document.getElementById("content-box");
//     let container = document.createElement("div");
//     let listHeader = document.createElement("div");
//     let p = document.createElement("p");
//     let span = document.createElement("span");
//     let cardBox = app.renderCard
//     let idSource = Date.now();
    
//     container.classList.add('list-box');

//     let containerId = idSource + container.className
//     container.id = containerId;
//     span.classList.add('delete-listBox');
//     p.classList.add('list-box-title');
//     listHeader.classList.add("list-header");

//     p.innerText = listTitle.value;
//     span.innerText = '✕'

//     container.appendChild(listHeader);
//     listHeader.appendChild(p);
//     listHeader.appendChild(span);
//     container.appendChild(cardBox);

//     parentNode.insertBefore(container, parentNode.lastElementChild)
//     listTitle.value = ''
//     pushAddText.innerText = "+ Add another list"

//     app.sendListTitle({ title: istTitle.value, id: containerId }, () => {
//       app.fetchAndRender();
//     })
//   },
//   renderCard: () => {
//     let wrapper = document.createElement("div");
//     let openAddCardBox = document.createElement("div");
//     let addCardBoxWrapper = document.createElement("div");
//     let inputBox = document.createElement("textarea");
//     let buttonBox = document.createElement("div");
//     let addCardButton = document.createElement("button");
//     let closeButton = document.createElement("span");
//     let wrapperId = Date.now();

//     wrapper.id = wrapperId;
//     wrapper.classList.add("add-card-wrapper");
//     openAddCardBox.classList.add("open-cardInput-box");

//     addCardBoxWrapper.classList.add("card-input-wrapper");
//     addCardBoxWrapper.id = wrapperId + addCardBoxWrapper.className
//     inputBox.classList.add("input-card-content");
//     inputBox.id = wrapperId + inputBox.className
//     buttonBox.classList.add("input-card-button-box");
//     addCardButton.classList.add("add-card-button");
//     addCardButton.id = wrapperId;
//     closeButton.classList.add("close-input-box");
//     closeButton.id = wrapperId;

//     openAddCardBox.innerText = "+ Add a card";
//     inputBox.type = "text";
//     inputBox.rows = "5";
//     inputBox.placeholder = "Enter card text ...";
//     addCardButton.innerText = "Add card";
//     closeButton.innerText = "✕"

//     wrapper.appendChild(openAddCardBox);
//     wrapper.appendChild(addCardBoxWrapper);
//     addCardBoxWrapper.appendChild(inputBox);
//     addCardBoxWrapper.appendChild(buttonBox);
//     buttonBox.appendChild(addCardButton);
//     buttonBox.appendChild(closeButton);
//     console.log(wrapper)

//     wrapper.addEventListener("click", function (event) {
//       let element = event.target;
//       if (element.classList.contains("open-cardInput-box")) {
//         let elementId = element.parentNode.id + document.querySelector(".card-input-wrapper").className;
//         document.getElementById(elementId).style.display = "block"
//       }
//       if (element.classList.contains("close-input-box")) {
//         let elementId = element.id + document.querySelector(".card-input-wrapper").className;
//         document.getElementById(elementId).style.display = "none"
//       }
//       if (element.classList.contains("add-card-button")) {
//         let elementId = element.id + document.querySelector(".input-card-content").className;
        
//         let contentContainer = document.createElement("div");
//         let span = document.createElement("span");
//         let contentContainerId = Date.now()
//         let dragged;
        
//         contentContainer.classList.add('content-container');
//         contentContainer.id = contentContainerId + contentContainer.className;
//         span.classList.add('card-content');
//         span.innerText = document.getElementById(elementId).value;

//         contentContainer.appendChild(span);
        
//         document.addEventListener("dragstart", (event) => {
//           dragged = event.target;
//         });
//         span.draggable = "true"
//         document.addEventListener("dragover", (event) => {
//           event.preventDefault();
//         });
//         document.addEventListener("drop", (event) => {
//           event.preventDefault();
//           if (event.target.className === "content-container") {
//             let parent = dragged.parentNode;
//             let node = event.target.firstChild;
//             event.target.appendChild(dragged);
//             parent.appendChild(node)
//           }
//         })
//         let newCard = contentContainer;
//         let parentNode = wrapper.parentNode;
//         parentNode.insertBefore(newCard, parentNode.lastElementChild)
//         document.getElementById(elementId).value = ''

//         app.sendCardContent({}, () => {
          
//         })
//       }
//     })
//     return wrapper;
//   },
// }

// app.init()