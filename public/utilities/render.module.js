const RENDER_MODULE = {
	renderPetList,
	renderPetDetails,
	renderEditablePet,
	renderVetProfile,
	renderVetEdit
};
window.RENDER_MODULE = RENDER_MODULE;

function renderVetProfile(vets) {
	const vetsHtml = vets.map(vetToHtml).join('<hr/>');
	$('#vet-list').html(vetsHtml);

	function vetToHtml(vet){
		return `
		<div class = "vet-card" data-vet-id="${vet.id}">
			<ul>
				
				<li>${vet.vetName}</li>
				<li>${vet.vetAddress}</li>
				<li>${vet.vetPhone}</li>
			</ul>
			<button class="delete-vet-btn">Delete Vet</button>
		</div>
		`
	}
}
function renderVetEdit(vet) {
	$('#vetname-txt').prop('disabled', false).val(vet.vetName);
	$('#vetaddress-txt').prop('disabled', false).val(vet.vetAddress);
	$('#vetphone-txt').prop('disabled',false).val(vet.vetPhone);
}

function renderPetList(pets) {
	const petsHtml = pets.map(petToHtml).join('<hr/>');
	$('#pet-list').html(petsHtml);

	function petToHtml(pet){
		return `
		<div class = "pet-card" data-pet-id="${pet.id}">
			<h3>${pet.petName} the ${pet.petType}</h3>
			<ul>
				<li>${pet.petBreed}</li>
				<li>${pet.petAge} years old</li>
			</ul>
			<button class="delete-pet-btn">Delete Pet</button>
		</div>
		`
	}
}

function renderPetDetails(pet) {
	$('#pet-profile').html(`
		<a href="/profile/detail.html">back to profile...</a>
		<br>
		<button id="edit-pet-btn">Edit ${pet.petName}'s info</button>
		<h2>${pet.petName} the ${pet.petType}</h2>
		<ul>
				<li>${pet.petBreed}</li>
				<li>${pet.petAge} years old</li>
				<li>Size: ${pet.petSize}</li>
				<li>${pet.petWeight} lbs</li>
				<li>Activitiy Level (1-10):${pet.petActivityLevel}</li>
				<li>${pet.petIntact}</li>
				<li>Dietary restrictions?: ${pet.petDietRestrictions}</li>
				<li>Does ${pet.petName} behave well around other dogs?: ${pet.petBehavior.dogs}</li>
				<li>Does ${pet.petName} behave well around other cats?: ${pet.petBehavior.cats}</li>
				<li>Does ${pet.petName} behave well around children?: ${pet.petBehavior.children}</li>
				<li>Does ${pet.petName} behave well around other kinds of pets? (birds, hamsters, reptiles etc.): ${pet.petBehavior.miscPets}</li>
				<li>Does ${pet.petName} have any other behavior quirks?: ${pet.petBehavior.other}</li>
			</ul>
	`);
}


function renderEditablePet(pet) {
    $('#petname-txt').prop('disabled', false).val(pet.petName);
    $('#pettype-txt').prop('disabled', false).val(pet.petType);
    $('#petbreed-txt').prop('disabled', false).val(pet.petBreed);
    $('#petage-txt').prop('disabled', false).val(pet.petAge);
    $('#petsize-txt').prop('disabled', false).val(pet.petSize);
    $('#petweight-txt').prop('disabled', false).val(pet.petWeight);
    $('#petactivity-txt').prop('disabled', false).val(pet.petActivityLevel);
    $('#petintact-txt').prop('disabled', false).val(pet.petIntact);
    $('#petdiet-txt').prop('disabled', false).val(pet.petDietRestrictions);
    $('#behaviordogs').prop('disabled', false).val(pet.petBehavior.dogs);
    $('#behaviorcats').prop('disabled', false).val(pet.petBehavior.cats);
    $('#behaviorchildren').prop('disabled', false).val(pet.petBehavior.miscPets);
    $('#behaviorother').prop('disabled', false).val(pet.petBehavior.other);
}