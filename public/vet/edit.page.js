let STATE = {};
const RENDER = window.RENDER_MODULE;
const HTTP = window.HTTP_MODULE;
const CACHE = window.CACHE_MODULE;
const ETC = window.ETC_MODULE;

$(document).ready(onReady);

function onReady() {
	STATE.vetId = ETC.getQueryStringParam('id');
	STATE.authUser = CACHE.getAuthenticatedUserFromCache();

	HTTP.getVetById({
		vetId: STATE.vetId,
		onSuccess: RENDER.renderVetEdit
	});
}