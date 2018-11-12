let STATE = {};
// All these modules are are defined in /public/utilities
const RENDER = window.RENDER_MODULE;
const HTTP = window.HTTP_MODULE;
const CACHE = window.CACHE_MODULE;
const ETC = window.ETC_MODULE;

$(document).ready(onReady);

function onReady() {
    HTTP.updateAuthenticatedUI();
    STATE.authUser = CACHE.getAuthenticatedUserFromCache();

    $("#logout-btn").on("click", HTTP.onLogoutBtnClick);
    $("#new-visit-form").on("submit", onVisitCreateSubmit);
}

function onVisitCreateSubmit(event) {
    event.preventDefault();
    const newVisit = {
        visitDateStart: $("#date-start-txt").val().slice(0, 10),
        visitDateEnd: $("#date-end-txt").val().slice(0, 10),
        visitLocation: $("#location-txt").val(),
        visitPrice: $("#visit-price").val(),
        visitCareInstructions: $("#care-instructions").val(),
        visitSummary: $("#visit-summary").val()
    };
    HTTP.createVisit({
        jwtToken: STATE.authUser.jwtToken,
        newVisit: newVisit,
        onSuccess: visit => {
            alert("New visit has been added! redirecting to home page...");
            window.open("../index.html", "_self");
        },
        onError: err => {
            alert("Internal Server Error (see console)");
            console.error(err);
        }
    });
}