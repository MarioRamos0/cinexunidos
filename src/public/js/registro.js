const ingresar = document.getElementById('ingresar');

ingresar.addEventListener('click', (evt) => {
   const user = document.getElementById("usernameInput").value;
   
   if (user && user.trim().length > 0) {
        document.cookie = `username=${user}`;
      localStorage.setItem("nameUser", JSON.stringify(user));
      window.location.href = "/";
   } else {
      alert("Debes ingresar un nombre de usuario");
   }
});