const loadPhone = async (searchText = '13', isShowAll) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const data = await res.json();
    const phones = data.data;

    displayPhones(phones, isShowAll);
};

const displayPhones = (phones, isShowAll) => {
    const phoneContainer = document.getElementById('phone-container');
    phoneContainer.textContent = '';

    const showAllContainer = document.getElementById('showallContainer');
    if (phones.length > 12 && !isShowAll) {
        showAllContainer.classList.remove('hidden');
    } else {
        showAllContainer.classList.add('hidden');
    }

    if (!isShowAll) {
        phones = phones.slice(0, 12);
    }

    phones.forEach(phone => {
        const PhoneCard = document.createElement('div');
        PhoneCard.classList = `card bg-gray-100 p-4 shadow-xl`;
        PhoneCard.innerHTML = `
            <figure>
                <img src="${phone.image}" alt="Phone Image" />
            </figure>
            <div class="card-body">
                <h2 class="card-title">${phone.phone_name}</h2>
                <p>If a dog chews shoes whose shoes does he choose?</p>
                <div class="card-actions justify-center">
                    <button onclick="handleShowDetails('${phone.slug}')" class="btn btn-primary">Show Details</button>
                    <button class="btn btn-accent" onclick="addToCart('${phone.phone_name}')">Add to Cart</button>
                </div>
            </div>
        `;
        phoneContainer.appendChild(PhoneCard);
    });

    toggleLoadingSpinner(false);
};

const handleSearch = (isShowAll) => {
    toggleLoadingSpinner(true);
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    loadPhone(searchText, isShowAll);
};

const toggleLoadingSpinner = (isLoading) => {
    const LoadingSpinner = document.getElementById("loadingSpinner");
    if (isLoading) {
        LoadingSpinner.classList.remove('hidden');
    } else {
        LoadingSpinner.classList.add('hidden');
    }
};

const handleShowAll = () => {
    handleSearch(true);
};

const handleShowDetails = async (id) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
    const data = await res.json();
    const phone = data.data;
    showPhoneDetails(phone);
};

const showPhoneDetails = (phone) => {
    const showDetailphoneName = document.getElementById('showDetailphoneName');
    showDetailphoneName.innerText = phone.name;

    const showDetailContainer = document.getElementById('show_detail_container');
    showDetailContainer.innerHTML = `
        <img src="${phone.image}" alt="" />
        <p><span>Storage:</span> ${phone?.mainFeatures?.storage}</p>
        <p><span>DisplaySize:</span> ${phone?.mainFeatures?.displaySize}</p>
        <p><span>Chipset:</span> ${phone?.mainFeatures?.chipSet}</p>
        <p><span>Slug:</span> ${phone?.slug}</p>
        <p><span>Release Date:</span> ${phone?.releaseDate || 'No release date available'}</p>
        <p><span>Brand:</span> ${phone?.brand}</p>
        <p><span>GPS:</span> ${phone.others?.GPS || 'No GPS available for this phone'}</p>
    `;

    show_detail_modal.showModal();
};

loadPhone();
