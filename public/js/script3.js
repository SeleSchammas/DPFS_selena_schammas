document.addEventListener("DOMContentLoaded", () => {
  console.log("Script 3 cargado ✅");

  const formCreate = document.querySelector("#formCreate");
  const formEdit = document.querySelector("#formEdit");

  const validateForm = (form) => {
    let valid = true;
    const requiredFields = form.querySelectorAll("[required]");
    requiredFields.forEach((field) => {
      if (!field.value.trim()) {
        field.classList.add("error");
        valid = false;
      } else {
        field.classList.remove("error");
      }
    });
    return valid;
  };

  const handleSubmit = async (form, endpoint) => {
    if (!validateForm(form)) {
      alert("Por favor completá los campos obligatorios.");
      return;
    }
    const formData = new FormData(form);
    try {
      const response = await fetch(endpoint, {
        method: "POST",
        body: formData
      });
      if (response.ok || response.redirected) {
        // si el servidor redirige, aprovechamos
        window.location.href = "/products";
      } else {
        alert("Ocurrió un error al procesar el formulario.");
      }
    } catch (err) {
      console.error("Error al enviar formulario:", err);
      alert("Error de conexión.");
    }
  };

  if (formCreate) {
    formCreate.addEventListener("submit", (e) => {
      e.preventDefault();
      handleSubmit(formCreate, "/products/create");
    });
  }

  if (formEdit) {
    formEdit.addEventListener("submit", (e) => {
      e.preventDefault();
      const id = formEdit.dataset.id;
      handleSubmit(formEdit, `/products/edit/${id}`);
    });
  }
});
