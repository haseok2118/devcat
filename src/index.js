//리스트 추가 box open
const listBox = document.getElementById("list-inputBox");
const addList = () => {
  listBox.style.display = "block"
}

let pushAddText = document.querySelector(".add-list");
console.log(pushAddText)
pushAddText.addEventListener("click", addList);

// 리스트 추가 box close
const closeList = () => {
  listBox.style.display = "none"
}

let closeListBox = document.querySelector(".close-listBox")
closeListBox.addEventListener("click", closeList);
