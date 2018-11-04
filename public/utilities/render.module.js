const RENDER_MODULE = {
    renderPetList,
    renderPetDetails,
    renderEditablePet,
    renderVetProfile,
    renderVetEdit,
    renderVisits,
    renderVisitDetails
};
window.RENDER_MODULE = RENDER_MODULE;

function renderVetProfile(vets) {
    const vetsHtml = vets.map(vetToHtml).join("<hr/>");
    $("#vet-list").html(vetsHtml);

    function vetToHtml(vet) {
        return `
		<div class ="vet-card" data-vet-id="${vet.id}">
			<ul>
				<li>${vet.vetName}</li>
				<li>${vet.vetAddress}</li>
				<li>${vet.vetPhone}</li>
			</ul>
			<button class="delete-vet-btn">Delete Vet</button>
		</div>
		`;
    }
}
function renderVetEdit(vet) {
    $("#vetname-txt")
        .prop("disabled", false)
        .val(vet.vetName);
    $("#vetaddress-txt")
        .prop("disabled", false)
        .val(vet.vetAddress);
    $("#vetphone-txt")
        .prop("disabled", false)
        .val(vet.vetPhone);
}
function renderVisits(visits) {
    const visitsHtml = visits.map(visitToHtml).join("<hr/>");
    $("#visit-list").html(visitsHtml);

    function visitToHtml(visit) {
        return `
        <div class ="visit-card" data-visit-id="${visit.id}">
			<ul>
                <li>Date Created: ${visit.timestamps}</li>
                <li>Date Start: ${visit.visitDateStart}</li>
                <li>Date End: ${visit.visitDateEnd}</li>
                <li>Offering Price: ${visit.visitPrice}</li>
                <li>Visit Summary: ${visit.visitSummary}</li>
            </ul>
            <button id="delete-visit">Delete visit</button>
		</div>
		`;
    }
}

function renderVisitDetails(visit) {
    $("#visit-details").html(`
    <a href="/profile/detail.html">back to profile...</a><br>
    <button id="edit-visit-btn">Edit Visit Info</button>
    <ul>
    <li>${visit.user.username} needs pet hosting between  ${visit.visitDateStart} - ${visit.visitDateEnd}</li>
    <li>Visit created: ${visit.timestamps}</li>
    <li>Visit Summary: ${visit.visitSummary}</li>
    <li> ${visit.user.username} is willing to pay $ ${visit.visitPrice} /per night (all pricing is up for discussion)</li>
    <li>${visit.user.username} would prefer his pet be hosted at ${visit.visitLocation}</li>
    <li>Care Instructions: ${visit.visitCareInstructions}</li>
    </ul>
    `);
}

function renderPetList(pets) {
    const petsHtml = pets.map(petToHtml).join("<hr/>");
    $("#pet-list").html(petsHtml);

    function petToHtml(pet) {
        return `
		<div class = "pet-card" data-pet-id="${pet.id}">
			<h3>${pet.petName} the ${pet.petType}</h3>
			<ul>
				<li>${pet.petBreed}</li>
				<li>${pet.petAge} years old</li>
			</ul>
			<button class="delete-pet-btn">Delete Pet</button>
		</div>
		`;
    }
}

function renderPetDetails(pet) {
    $("#pet-profile").html(`
		<a href="/profile/detail.html">back to profile...</a>
		<br>
		<button id="edit-pet-btn">Edit ${pet.petName}'s info</button>
		<h2>${pet.petName} the ${pet.petType}</h2>
		<ul>
				<li>${pet.petBreed}</li>
				<li>${pet.petAge} years old</li>
				<li>Size: ${pet.petSize}</li>
				<li>${pet.petWeight} lbs</li>
				<li>Activity Level (1-10): ${pet.petActivityLevel}</li>
				<li>${pet.petIntact}</li>
				<li>Dietary restrictions?: ${pet.petDietRestrictions}</li>
				<li>Does ${pet.petName} behave well around other dogs?: ${pet.petBehavior.dogs}</li>
				<li>Does ${pet.petName} behave well around other cats?: ${pet.petBehavior.cats}</li>
				<li>Does ${pet.petName} behave well around children?: ${pet.petBehavior.children}</li>
				<li>Does ${pet.petName} behave well around other kinds of pets? (birds, hamsters, reptiles etc.): ${
        pet.petBehavior.miscPets
    }</li>
				<li>Does ${pet.petName} have any other behavior quirks?: ${
        pet.petBehavior.other
    }</li>
			</ul>
	`);
}

function renderEditablePet(pet) {
    $("#petname-txt")
        .prop("disabled", false)
        .val(pet.petName);
    $("#pettype-txt")
        .prop("disabled", false)
        .val(pet.petType);
    $("#petbreed-txt")
        .prop("disabled", false)
        .val(pet.petBreed);
    $("#petage-txt")
        .prop("disabled", false)
        .val(pet.petAge);
    $("#petsize-txt")
        .prop("disabled", false)
        .val(pet.petSize);
    $("#petweight-txt")
        .prop("disabled", false)
        .val(pet.petWeight);
    $("#petactivity-txt")
        .prop("disabled", false)
        .val(pet.petActivityLevel);
    $("#petintact-txt")
        .prop("disabled", false)
        .val(pet.petIntact);
    $("#petdiet-txt")
        .prop("disabled", false)
        .val(pet.petDietRestrictions);
    $("#behaviordogs")
        .prop("disabled", false)
        .val(pet.petBehavior.dogs);
    $("#behaviorcats")
        .prop("disabled", false)
        .val(pet.petBehavior.cats);
    $("#behaviorchildren")
        .prop("disabled", false)
        .val(pet.petBehavior.miscPets);
    $("#behaviorother")
        .prop("disabled", false)
        .val(pet.petBehavior.other);
}
