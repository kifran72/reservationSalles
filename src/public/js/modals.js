let userModal = {};

$(".show").on("click", function() {
    $(".mask").addClass("active");
});

const closeModal = () => {
    userModal = {};

    $(".mask").removeClass("active");
};

$(".close, .mask").on("click", function() {
    closeModal();
    $("#nom_salle").val("");
    $("#sport").val("");
    $("#nb_place").val("");
    $("#description").val("");
});

$(document).keyup(function(e) {
    if (e.keyCode == 27) {
        closeModal();
    }
});