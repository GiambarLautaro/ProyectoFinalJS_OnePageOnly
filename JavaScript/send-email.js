// HELP FORM

const btn = document.getElementById("boton");

document.getElementById("form").addEventListener("submit", function (event) {
  event.preventDefault();

  btn.value = "Sending...";

  const serviceID = "default_service";
  const templateID = "template_pl458rv";

  emailjs.sendForm(serviceID, templateID, this).then(
    () => {
      btn.value = "Send Email";
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Your Message Has Been Sent",
        showConfirmButton: false,
        timer: 700,
      });
    },
    (err) => {
      btn.value = "Send Email";
      alert(JSON.stringify(err));
    }
  );
});
