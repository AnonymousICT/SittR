let STATE = {};
const RENDER = window.RENDER_MODULE;
const HTTP = window.HTTP_MODULE;
const CACHE = window.CACHE_MODULE;
const ETC = window.ETC_MODULE;

$(document).ready(onReady);

function onReady() {
    HTTP.updateAuthenticatedUI();
    STATE.visitId = ETC.getQueryStringParam("id");
    STATE.authUser = CACHE.getAuthenticatedUserFromCache();

    HTTP.getVisitById({
        visitId: STATE.visitId,
        onSuccess: RENDER.renderVisitDetails, 
    });
    $("#logout-btn").on("click", HTTP.onLogoutBtnClick);
    $("#visit-details").on("click", "#edit-visit-btn", onEditVisitBtnClick)
}

function onEditVisitBtnClick(event) {
    event.preventDefault();
    window.open(`/visit/edit.html?id=${STATE.visitId}`, "_self");
}