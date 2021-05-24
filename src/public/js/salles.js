const addSalle = async() => {
    let nom_salle = $("#nom_salle").val();
    let sport = $("#sport").val();
    let nb_place = $("#nb_place").val();
    let description = $("#description").val();

    try {
        const data = await $.post("/addSalle", {
            nom_salle: nom_salle,
            sport: sport,
            nb_place: nb_place,
            description: description,
        }).then((resp) => {
            if (resp.error) {
                toastr.error(`Salle ${nom_salle} déja Créée`);
            } else {
                toastr.success(`Salle ${nom_salle} Créée`);
                setTimeout(() => {
                    closeModal();
                    location.reload();
                }, 1000);
            }
        });
    } catch (e) {
        console.error(e);
    }
};

const editSalle = async() => {
    try {
        let id_salle = $("#id_salle").val();
        let nom_salle = $("#nom_salle").val();
        let sport = $("#sport").val();
        let nb_place = $("#nb_place").val();
        let description = $("#description").val();
        const data = await $.post("/editSalle", {
            id_salle: id_salle,
            nom_salle: nom_salle,
            sport: sport,
            nb_place: nb_place,
            description: description,
        }).then((resp) => {
            if (resp.error) {
                toastr.error(`Nom de salle déja utilisé`);
            } else {
                toastr.success(`Salle ${nom_salle} mis a jours`);
                setTimeout(() => {
                    closeModal();
                    location.reload();
                }, 1000);
            }
        });
    } catch (e) {
        console.error(e);
    }
};

const loadSalle = (salle) => {
    $("#id_salle").val(salle.id_salle);
    $("#nom_salle").val(salle.nom_salle);
    $("#sport").val(salle.sport);
    $("#nb_place").val(salle.nb_place);
    $("#description").val(salle.description);
};

const deleteSalle = async(salle) => {
    try {
        const data = await $.post("/deleteSalle", {
            id_salle: salle,
        }).then((resp) => {
            if (resp.error) {
                toastr.error(`Salle non supprimé`);
            } else {
                toastr.success(`Salle supprimé`);
                setTimeout(() => {
                    location.reload();
                }, 1000);
            }
        });
    } catch (e) {
        console.error(e);
    }
};

const getReservation = async(infoReservation) => {
    try {
        let nom_salle = infoReservation.nom_salle;
        const data = await $.post("/reservation", {
            id_salle: infoReservation.id_salle,
            id_user: infoReservation.id_user,
        }).then((resp) => {
            if (resp.error) {
                toastr.error(`Salle ${nom_salle} non reservé`);
            } else {
                toastr.success(`Salle ${nom_salle} reservé`);
                setTimeout(() => {
                    location.reload();
                }, 1000);
            }
        });
    } catch (e) {
        console.error(e);
    }
};

const getDeleteReservation = async(infoDeleteReservation) => {
    try {
        let nom_salle = infoDeleteReservation.nom_salle;
        const data = await $.post("/deleteReservation", {
            id_salle: infoDeleteReservation.id_salle,
            id_user: infoDeleteReservation.id_user,
        }).then((resp) => {
            if (resp.error) {
                toastr.error(`Salle ${nom_salle} reservation non supprimé`);
            } else {
                toastr.success(
                    `La réservation de la salle ${nom_salle} a été supprimé`
                );
                setTimeout(() => {
                    location.reload();
                }, 1000);
            }
        });
    } catch (e) {
        console.error(e);
    }
};