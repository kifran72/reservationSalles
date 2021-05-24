("use strict");
var snackbarContainer = document.querySelector("#demo-toast-example");
var loginButton = document.querySelector("#loginButton");
loginButton.addEventListener("click", async function() {
    "use strict";

    let email = $("#email").val();
    let password = $("#password").val();

    try {
        const data = await $.post("/login", {
            email: email,
            password: password,
        }).then((resp) => {
            if (resp.error) {
                var data = { message: `Email ou mot de passe incorrect` };
                snackbarContainer.MaterialSnackbar.showSnackbar(data);
            } else {
                var data = { message: `Connexion en cours` };
                snackbarContainer.MaterialSnackbar.showSnackbar(data);
                setTimeout(() => {
                    $("#login").hide();
                    $("#loader").show();
                    setTimeout(() => {
                        window.location.href = "/";
                    }, 8000);
                }, 1000);
                setTimeout(() => {
                    var data = {
                        message: `Bonjour ${email}, comment allez vous aujourd'hui ?`,
                    };
                    snackbarContainer.MaterialSnackbar.showSnackbar(data);
                }, 2000);
                setTimeout(() => {
                    var data = {
                        message: `Resté hydraté !`,
                    };
                    snackbarContainer.MaterialSnackbar.showSnackbar(data);
                }, 3000);
            }
        });
    } catch (e) {
        console.error(e);
    }
});

const login = async() => {};

const snackBar = (message) => {};