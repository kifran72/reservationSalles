const newAdmin = async() => {
    try {
        let email = $("#email").val();
        let password = $("#password").val();
        let nickname = $("#nickname").val();

        const data = await $.post("/newAdmin", {
            email: email,
            password: password,
            nickname: nickname,
        }).then((resp) => {
            if (resp.error) {
                toastr.error(`Nom déja utilisé`);
            } else {
                toastr.success(`Bienvenue admin`);
                setTimeout(() => {
                    location.reload();
                }, 1000);
            }
        });
    } catch (e) {
        console.error(e);
    }
};