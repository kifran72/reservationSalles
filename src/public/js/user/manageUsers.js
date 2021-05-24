const manageUsers = async() => {
    try {
        let email = $("#email").val();
        let role = $("#role").val();
        const data = await $.post("/manageUsers", {
            email: email,
            role: role,
        }).then((resp) => {
            if (resp.error) {
                toastr.error(`Utilisateur ${$("#email").val()} non mis a jours`);
            } else {
                toastr.success(`Utilisateur ${$("#email").val()} mis a jours`);
                let customClass = "#role" + email + "Liste";
                $(customClass).text(role);
                closeModal();
            }
        });
    } catch (e) {
        console.error(e);
    }
};

const loadUser = async(user) => {
    $("#email").val(user.email);
    $("#role").val(user.role);
};