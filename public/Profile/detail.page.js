let STATE = {};
// All these modules are are defined in /public/utilities
const RENDER = window.RENDER_MODULE;
const HTTP = window.HTTP_MODULE;
const CACHE = window.CACHE_MODULE;


$(document).ready(onReady);

function onReady() {
	HTTP.updateAuthenticatedUI();
		if(STATE.authUser) {
		HTTP.getUserPets({
			jwtToken: STATE.authUser.jwtToken,
			onSuccess: RENDER.renderPetList
		})
		HTTP.getUserVet({
			jwtToken: STATE.authUser.jwtToken,
			onSuccess: RENDER.renderVetProfile
		})
	}
	$('#logout-btn').on('click', onLogoutBtnClick);
	$('#pet-list').on('click', '.delete-pet-btn', deletePetBtnClick);
	$('#pet-list').on('click', '.pet-card', onPetCardClick);
	$('#vet-list').on('click', '.vet-card', onVetCardClick);
	$('#vet-list').on('click', '.delete-vet-btn', deleteVetClick);
}

function onLogoutBtnClick(event) {
    const confirmation = confirm('Are you sure you want to logout?');
    if (confirmation) {
        CACHE.deleteAuthenticatedUserFromCache();
        window.open('/auth/login.html', '_self');
    }
}

function deletePetBtnClick(event) {
	event.stopImmediatePropagation();
	const petId = $(event.currentTarget)
		.closest('.pet-card')
		.attr('data-pet-id');

	const userSaidYes = confirm('Are you sure you want to delete this pet?');
	if (userSaidYes) {
		HTTP.deletePet({
			petId: petId,
			jwtToken: STATE.authUser.jwtToken,
			onSuccess: () => {
				alert('Pet deleted successfully, reloading results...');
				HTTP.getUserPets({
					jwtToken: STATE.authUser.jwtToken,
					onSuccess: RENDER.renderPetList,
					
				});
			}
		});
	}
}

function deleteVetClick(event) {
	event.stopImmediatePropagation();
	const vetId = $(event.currentTarget)
		.closest('.vet-card')
		.attr('data-vet-id');

	const userSaidYes = confirm('Are you sure you want to delete this vet?');
	if(userSaidYes) {
		HTTP.deleteVet({
			vetId: vetId,
			jwtToken: STATE.authUser.jwtToken,
			onSuccess: () => {
				alert('Vet deleted successfully, reloading results...');
				HTTP.getUserVet({
					jwtToken: STATE.authUser.jwtToken,
					onSuccess: renderVetProfile
				})
			}
		})
	}
}

function onPetCardClick(event) {
	const petId = $(event.currentTarget).attr('data-pet-id');
	window.open(`../pet/detail.html?id=${petId}`, '_self');
}

function onVetCardClick(event) {
	const vetId = $(event.currentTarget).attr('data-vet-id');
	window.open(`../vet/edit.html?id=${vetId}`, '_self');
}