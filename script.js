const tasks = [
  {
    id: Date.now() + Math.random(),
    title: "Выпить кофе",
    body:
      "Сварить вкусный сладкий кофе, добавить сахара и сливок. Выпить с шоколаным пончиком.",
    complited: true,
  },
  {
    id: Date.now() + Math.random(),
    title: "Приготовить обед",
    body:
      "Начистить овощи: свеклу, капусту картошу. Сварить бульон с говядиной. Доваить овощи и варить еще 30 минут",
    complited: false,
  },
  {
    id: Date.now() + Math.random(),
    title: "Создать крутой сайт",
    body:
      "Разработать концепцию и идею. Создать UI при помощи SASS. Переложить все в React, использую функцилнальные компоненты.",
    complited: false,
  },
];

(function (tasks) {
  const container = document.querySelector("#tasks-container");
  let activeFilter = "all";
  const liTemplate = (task) => {
    const li = document.createElement("li");
    li.classList.add("list-group-item");
    li.setAttribute("data-id", task.id);
    const card = document.createElement("div");
    card.classList.add("card");
    const cardBody = document.createElement("div");
    cardBody.classList.add("card-body");
    const title = document.createElement("h4");
    title.classList.add("card-title");
    title.textContent = task.title;
    cardBody.insertAdjacentElement("beforeEnd", title);
    const cardText = document.createElement("p");
    cardText.classList.add("card-text");
    cardText.textContent = task.body;
    cardBody.insertAdjacentElement("beforeEnd", cardText);
    card.insertAdjacentElement("afterbegin", cardBody);
    li.append(card);
    const btn = document.createElement("button");
    btn.setAttribute("id", "toggleStatus");
    if (!task.complited) {
      btn.classList.add("btn", "btn-warning");
      btn.textContent = "Завершить";
    } else {
      btn.classList.add("btn", "btn-danger");
      btn.textContent = "Вернуть в статус незавершенных";
    }
    li.append(btn);
    return li;
  };
  const toggleTaskStatus = (e) => {
    e.preventDefault();
    const parent = e.target.parentNode;
    const id = parent.dataset.id;
    const taskArr = tasks.map((task) => {
      if (task.id == id) {
        task.complited = !task.complited;
      }
      return task;
    });
    console.log(taskArr);
    renderTasks(taskArr);
  };
  const renderTasks = (tasks) => {
    if (!tasks || !tasks.length) {
      const p = document.createElement("p");
      p.classList.add("h4");
      p.textContent = "Задач пока нет";
      container.insertAdjacentElement("beforeEnd", p);
      return;
    }
    container.innerHTML = "";
    const fragment = document.createDocumentFragment();
    let toRenderTasks = [];
    if (activeFilter === "all") {
      const active = tasks.filter((task) => !task.complited);
      const complited = tasks.filter((task) => task.complited);
      toRenderTasks.push(...active.concat(complited));
    } else {
      toRenderTasks.push(...tasks.filter((task) => !task.complited));
    }
    toRenderTasks.map((task) => {
      const li = liTemplate(task);
      fragment.append(li);
    });
    container.append(fragment);
    document
      .querySelectorAll("#toggleStatus")
      .forEach((el) => el.addEventListener("click", toggleTaskStatus));
  };
  const initAlert = () => {
    const alert = document.querySelector("#alert");
    alert.classList.add("alert-active");
    document.querySelector("#alert-close").addEventListener("click", () => {
      alert.classList.remove("alert-active");
    });
  };
  const submitHandler = (e) => {
    e.preventDefault();
    const title = document.querySelector("#title");
    const body = document.querySelector("#body");
    if (!title.value || !body.value) {
      return initAlert();
    }
    const newTask = {
      id: Date.now() + Math.random(),
      title: title.value,
      body: body.value,
      complited: false,
    };
    tasks.push(newTask);
    renderTasks(tasks);
    title.value = "";
    body.value = "";
  };
  const activeTasksFilter = () => {
    activeFilter = "active";
    renderTasks(tasks);
  };
  const alltasksFilter = () => {
    activeFilter = "all";
    renderTasks(tasks);
  };

  document.querySelector("form").addEventListener("submit", submitHandler);
  document
    .querySelector("#taskActive")
    .addEventListener("click", activeTasksFilter);
  document.querySelector("#taskAll").addEventListener("click", alltasksFilter);
  renderTasks(tasks);
})(tasks);
