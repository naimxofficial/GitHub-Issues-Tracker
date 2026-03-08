let allIssues = [];


async function loadIssues() {
  const res = await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues");
  const data = await res.json();
  allIssues = data.data;
  displayIssues(allIssues);
  updateCount(allIssues.length);
}

function displayIssues(data) {
  const allIssuesContainer = document.getElementById("allIssuesContainer");
  allIssuesContainer.innerHTML = "";
  data.forEach((data) => {
    const div = document.createElement("div");
    div.innerHTML = `<div onclick = "loadModal(${data.id})" class="border-t-4 ${data.status === "open" ? "border-[#00A96E]" : "border-[#A855F7]"} rounded-sm p-4 space-y-3 bg-white drop-shadow-sm">
                <div class=" flex items-center justify-between ">
                    <img src="${data.status === "open" ? "./assets/Open-Status.png" : "./assets/Closed- Status .png"}"  alt="">
                    <h2 class=" rounded-full py-2 px-5 font-medium text-xs ${data.priority === "high" ? "text-[#EF4444] bg-[#FEECEC]" : data.priority === "medium" ? "bg-[#FFF6D1] text-[#F59E0B]" : "bg-gray-200 text-gray-600"}">${data.priority}</h2>
                </div>
                <div>
                    <h2 class="font-semibold">${data.title}</h2>
                    <p class="line-clamp-2 text-xs text-[#64748B]">${data.description}</p>
                </div>
                <div class="flex items-center gap-1">
                    ${labels(data.labels)}
                </div>
                <hr class="opacity-10">
                <div class="text-[#64748B] text-xs">
                    <p>${data.author}</p>
                    <p>${new Date(data.createdAt).toLocaleDateString()}</p>
                </div>
                </div>`;
    allIssuesContainer.appendChild(div);
  });
}

const labels = (arr) => {
  const newHtml = arr.map(
    (item) =>
      `<span class="text-[#7f6e5a] bg-[#FDE68A] rounded-full py-2 px-5 font-medium text-xs">${item}</span>`,
  );
  return newHtml.join(" ");
};

function updateCount(count) {
  document.getElementById("issue-count").innerText = count;
}

function filterIssues(status, event) {
  document
    .querySelectorAll(".btns")
    .forEach((btn) => btn.classList.remove("btn-primary"));
  event.target.classList.add("btn-primary");

  const filtered =
    status === "all"
      ? allIssues
      : allIssues.filter((issue) => issue.status === status);

  displayIssues(filtered);
  updateCount(filtered.length);
}

function loadModal(id) {
  fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`)
    .then((res) => res.json())
    .then((data) => displayModal(data.data));
}

function displayModal(card) {
  const modalContainer = document.getElementById("modalContainer");
  modalContainer.innerHTML = `
    <h2 class="text-[24px] font-bold">${card.title}</h2>
                <div class="flex gap-4">
                    <p class="badge ${card.status === "open" ? "bg-green-500" : "bg-red-500"} text-white text-[12px] rounded-full">${card.status}</p>
                    <p class="text-xs text-[#64748B]">Opened by <span>${card.assignee}</span></p>
                    <p class="text-[12px] text-[#64748B]">${new Date(card.updatedAt).toLocaleDateString()}</p>
                </div>
                <div class="flex gap-2 mt-4">
                    ${labels(card.labels)}
                </div>
                <p class="text-[12px] text-[#64748B] mt-5">${card.description}</p>
                <div class="flex gap-40 mt-6 bg-[#F8FAFC]">
                    <div>
                        <p class="text-[12px] text-[#64748B]">Assignee:</p>
                        <p class="font-bold text-[16px]">${card.assignee}</p>
                    </div>
                    <div>
                        <p class="text-[12px] text-[#64748B]">Priority:</p>
                        <p class="badge ${card.priority === "high" ? "bg-red-500" : card.priority === "medium" ? "bg-amber-500" : "bg-gray-500"} text-white text-[12px] rounded-full">${card.priority}</p>
                    </div>
                </div>
    `;

  document.getElementById("my_modal_5").showModal();
}

loadIssues();
