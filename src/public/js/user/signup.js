const signup = async() => {
    let email = $("#email").val();
    let nickname = $("#nickname").val();
    let password = $("#password").val();
    let testUsername, testPassword, testNickname;
    email === "" ?
        toastr.error("Le nom d'utilisateur de doit pas être vide") :
        (testUsername = true);
    nickname === "" ?
        toastr.error("Le nom d'utilisateur de doit pas être vide") :
        (testNickname = true);
    password === "" ?
        toastr.error("Le mot de passe de doit pas être vide") :
        (testPassword = true);

    if (testUsername && testPassword && testNickname) {
        try {
            const data = await $.post("/signup", {
                email: email,
                password: password,
                nickname,
            }).then((resp) => {
                if (resp.error) {
                    toastr.error(`Email: ${email} / ${nickname} déja utilisé`);
                } else {
                    toastr.success(`Bienvenue ${nickname}`);
                    setTimeout(() => {
                        window.location.href = "/";
                    }, 1000);
                }
            });
        } catch (e) {
            console.error(e);
        }
    }
};