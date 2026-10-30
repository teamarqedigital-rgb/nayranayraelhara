(() => {
  const form = document.querySelector("#birth-chart-form");
  const status = document.querySelector("#map-form-status");
  const birthDate = document.querySelector("#birth-date");

  if (!form || !status || !birthDate) {
    return;
  }

  const today = new Date();
  const localToday = [
    today.getFullYear(),
    String(today.getMonth() + 1).padStart(2, "0"),
    String(today.getDate()).padStart(2, "0")
  ].join("-");
  birthDate.max = localToday;

  const requiredTextFields = [
    document.querySelector("#birth-name"),
    document.querySelector("#birth-city"),
    document.querySelector("#birth-country")
  ].filter(Boolean);

  requiredTextFields.forEach((field) => {
    field.addEventListener("input", () => {
      field.setCustomValidity("");
      status.textContent = "";
    });
  });

  form.addEventListener("input", () => {
    status.textContent = "";
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    requiredTextFields.forEach((field) => {
      field.setCustomValidity(field.value.trim() ? "" : "Completa este campo.");
    });

    if (!form.reportValidity()) {
      return;
    }

    status.textContent = "Tus datos están completos para esta etapa. El cálculo del mapa aún no está activado; no enviamos ni guardamos tu información.";
  });
})();
