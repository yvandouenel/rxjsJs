import { from } from "rxjs";

const getData = () => {
  return from(
    fetch("http://localhost:3000/data").then((response) => response.json())
  );
};

const appDiv = document.getElementById("app");

getData().subscribe((data) => {
  data.forEach((item) => {
    const div = document.createElement("div");
    div.textContent = item.item;
    appDiv.appendChild(div);
  });
});
