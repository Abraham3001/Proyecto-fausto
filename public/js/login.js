document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("form-login");
  const errorDiv = document.getElementById("loginError");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = form.email.value.trim();
    const password = form.password.value;

    errorDiv.textContent = "";

    try {
      const res = await fetch("/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();

      if (res.ok) {
        if (data.rol === "profesor") {
          window.location.href = "/docente";
        } else {
          window.location.href = "/estudiante";
        }
      } else {
        errorDiv.textContent = data.error || "Ocurrió un error";
      }
    } catch (err) {
      console.error(err);
      errorDiv.textContent = "No se pudo conectar al servidor.";
    }
  });
});
