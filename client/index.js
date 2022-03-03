let uri = window.location.pathname;

!(uri == "/") && getBlog(uri);
uri == "/" && getForm();

// https://stackoverflow.com/questions/454202/creating-a-textarea-with-auto-resize
const tx = document.getElementsByTagName("textarea");
for (let i = 0; i < tx.length; i++) {
  tx[i].setAttribute(
    "style",
    "height:" + tx[i].scrollHeight + "px;overflow-y:hidden;"
  );
  tx[i].addEventListener("input", OnInput, false);
}

function OnInput() {
  this.style.height = "auto";
  this.style.height = this.scrollHeight + "px";
}

async function getBlog(uri) {
  const data = await fetch(`http://localhost:3000${uri}`);
  if(data.ok){
    showBlog(await data.json());
  } else {
    getNotFound()
  }
}

async function createBlog(e) {
  e.preventDefault();

  const data = {
    title: e.target.title.value,
    author: e.target.author.value,
    content: e.target.content.value,
  };

  const options = {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  };

  const res = await fetch("http://localhost:3000/blogs", options);
  const newBlog = await res.json();
  showBlog(newBlog);
  uri = newBlog.route;
}

function showBlog(data) {
  const month = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const date = `${data.day} ${month[data.month - 1]}`;
  const container = document.querySelector("#container");
  container.innerHTML = `
  <div class="card">
    <h1 class="title" id="title"></h1>
    <p id="author" class="author"></p>
    <p id="content" class="content"></p>
    <button type="submit" class="button hidden">EDIT</button>
  </div>
  `;

  const title = document.querySelector("#title");
  const author = document.querySelector("#author");
  const content = document.querySelector("#content");

  title.textContent = data.title;
  author.textContent = `${data.author} - ${date}`;
  content.textContent = data.content;

  window.history.pushState("object or string", "Title", data.route);
}

function getForm() {
 const form = `
  <form action="" class="card">
    <textarea
    class="title"
    name="title"
    id="title"
    placeholder="title"
    rows="1"
    maxlength="50"
    required
    ></textarea>
    <input
    type="text"
    class="author"
    name="author"
    id="author"
    maxlength="50"
    placeholder="your name"
    />
    <textarea
    name="content"
    id="content"
    class="content"
    placeholder="blog"
    maxlength="1000"
    required
    ></textarea>
    <button type="submit" class="button">PUBLISH</button>
  </form>
  `
  const container = document.querySelector("#container");
  container.innerHTML = form;

  const formEvent = document.querySelector("form");
  formEvent.addEventListener("submit", createBlog);
}

function getNotFound() {
  const container = document.querySelector("#container");
  container.innerHTML = `<h1 class="card">404 - Page Not Found</h1>`;
}
