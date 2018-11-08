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
    if(STATE.authUser) {
        HTTP.getVisitById({
            visitId: STATE.visitId,
            onSuccess: RENDER.renderVisitDetails
        });
    }
    $("#visit-details").on("click", "#edit-visit-btn", onEditVisitBtnClick)
    $("#logout-btn").on("click", HTTP.onLogoutBtnClick);
}

function onEditVisitBtnClick(event) {
    event.preventDefault();
    window.open(`/visit/edit.html?id=${STATE.visitId}`, "_self");
}
