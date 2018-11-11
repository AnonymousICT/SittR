const RENDER_MODULE = {
    renderPetList,
    renderPetDetails,
    renderEditablePet,
    renderVetProfile,
    renderVetEdit,
    renderAllVisits,
    renderVisits,
    renderVisitDetails,
    renderVisitEdit
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
			<button class="delete-vet-btn med-red white-txt">Delete Vet</button>
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

function renderAllVisits(visits) {
    const visitsHtml = visits.map(visitToHtml).join("<hr/>");
    $("#visit-list").html(visitsHtml);

    function visitToHtml(visit) {
        let visitSummary = visit.visitSummary;
        if (visitSummary.length > 50) {
            visitSummary = `${visit.visitSummary.substring(0, 50)}...`
        }
        return `
        <div class ="visit-card" data-visit-id="${visit.id}">
			<ul>
                <li>Visit Summary: ${visitSummary}</li>
                <li>Date Start: ${visit.visitDateStart.slice(0, 10)}</li>
                <li>Date End: ${visit.visitDateEnd.slice(0, 10)}</li>
                <li>Offering Price: ${visit.visitPrice}</li>
                <li>Date Created: ${visit.timestamps.slice(0, 10)}</li>
            </ul>
		</div>
		`;
    }
}

function renderVisits(visits) {
    const visitsHtml = visits.map(visitToHtml).join("<hr/>");
    $("#visit-list").html(visitsHtml);

    function visitToHtml(visit) {
        return `
        <div class ="visit-card" data-visit-id="${visit.id}">
			<ul>
                <li><span class="bold">Date Start:</span> ${visit.visitDateStart.slice(0, 10)}</li>
                <li><span class="bold">Date End:</span> ${visit.visitDateEnd.slice(0, 10)}</li>
                <li><span class="bold">Offering Price: $</span> ${visit.visitPrice}</li>
                <li><span class="bold">Date Created:</span> ${visit.timestamps.slice(0, 10)}</li>
            </ul>
            <button class="med-red white-txt" id="delete-visit">Delete visit</button>
		</div>
		`;
    }
}

function renderVisitDetails(visit) {
    $("#visit-details").html(`
    <a href="/profile.html">back to profile...</a><br>
    <button class="med-red white-txt" id="edit-visit-btn">Edit Visit Info</button>
    <h3>Contact ${visit.user.email} for more details!</h3>
    <ul>
    <li><span class="bold">${visit.user.username}</span> needs pet hosting between  <span class="bold">${visit.visitDateStart.slice(0, 10)}</span> - <span class="bold">${visit.visitDateEnd.slice(0, 10)}</span></li>
    <li><span class="bold">Visit Summary:</span> ${visit.visitSummary}</li>
    <li> <span class="bold">${visit.user.username}</span> is willing to pay <span class="bold">$ ${visit.visitPrice} /per night</span> (all pricing is up for discussion)</li>
    <li>Location?: <span class="bold"> ${visit.visitLocation}</span></li>
    <li><span class="bold"> Care Instructions:</span> ${visit.visitCareInstructions}</li>
    <li>Visit created: ${visit.timestamps.slice(0, 10)}</li>
    </ul>
    `);
}

function renderVisitEdit(visit) {
    $("#visit-summary")
        .prop("disabled", false)
        .val(visit.visitSummary);
    $("#date-start-txt")
        .prop("disabled", false)
        .val(visit.visitDateStart.slice(0, 10));
    $("#date-end-txt")
        .prop("disabled", false)
        .val(visit.visitDateEnd.slice(0, 10));
    $("#location-txt")
        .prop("disabled", false)
        .val(visit.visitLocation);
    $("#visit-price")
        .prop("disabled", false)
        .val(visit.visitPrice);
    $('#care-instructions')
        .prop("disabled", false)
        .val(visit.visitCareInstructions);
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
			<button class="delete-pet-btn med-red white-txt">Delete Pet</button>
		</div>
		`;
    }
}

function renderPetDetails(pet) {
    $("#pet-profile").html(`
		<br>
		<button class="med-red white-txt" id="edit-pet-btn">Edit ${pet.petName}'s info</button>
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
        .val(pet.petBehavior.children);
    $("#behaviormiscpets")
        .prop("disabled", false)
        .val(pet.petBehavior.miscPets)
    $("#behaviorother")
        .prop("disabled", false)
        .val(pet.petBehavior.other);
}
