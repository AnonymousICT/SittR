let STATE = {};
// All these modules are are defined in /public/utilities
const RENDER = window.RENDER_MODULE;
const HTTP = window.HTTP_MODULE;
const CACHE = window.CACHE_MODULE;

$(document).ready(onReady);

function onReady() {
    HTTP.updateAuthenticatedUI();
    STATE.authUser = CACHE.getAuthenticatedUserFromCache();

    $("#new-vet-form").on("submit", onCreateSubmit);
}

function onCreateSubmit(event) {
    event.preventDefault();
    const newVet = {
        vetName: $("#vetname-txt").val(),
        vetAddress: $("#vetaddress-txt").val(),
        vetPhone: $("#vetphone-txt").val()
    };

    HTTP.createVet({
        jwtToken: STATE.authUser.jwtToken,
        newVet: newVet,
        onSuccess: vet => {
            alert("Vet has been added to your profile! redirecting...");
            window.open(`/profile/detail.html`, "_self");
        },
        onError: err => {
            alert("Internal Server Error (see console)");
            console.error(err);
        }
    });
}
