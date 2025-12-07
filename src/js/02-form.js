const storage_key = "feedback-form-state";
const form = document.querySelector(".feedback-form");


const savedData = loadFormData();
if (savedData) {
  form.elements.email.value = savedData.email || "";
  form.elements.message.value = savedData.message || "";
}


form.addEventListener("input", (event) => {
  const { name, value } = event.target;

  if (name !== "email" && name !== "message") return;

  const trimmedValue = value.trim();
  const currentData = loadFormData() || {};
  const newData = { ...currentData, [name]: trimmedValue };

  saveFormData(newData);
});


form.addEventListener("submit", (event) => {
  event.preventDefault();

  const email = form.elements.email.value.trim();
  const message = form.elements.message.value.trim();

  if (!email || !message) {
    alert("Please fill in all fields before submitting the form.");
    return;
  }

  console.log({ email, message });

  localStorage.removeItem(storage_key);
  form.reset();
});


function loadFormData() {
  const saved = localStorage.getItem(storage_key);
  if (!saved) return null;

  try {
    return JSON.parse(saved);
  } catch {
    return null;
  }
}

function saveFormData(data) {
  localStorage.setItem(storage_key, JSON.stringify(data));
}
