const loadPhone = async (searchinput, isShowAll) => {
    const searchText = searchinput || 'a';
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const data = await res.json();
    const phones = data.data
    placePhones(phones, isShowAll);
}

const placePhones = (phones, isShowAll) =>{
    const phonesContainer = document.getElementById('phones-container');
    const showAllContainer = document.getElementById('show-all-container');
    phonesContainer.textContent = '';
    if(phones.length > 12 && !isShowAll){
        showAllContainer.classList.remove('hidden');
    }
    else{
        showAllContainer.classList.add('hidden');
    }
    if(!isShowAll){
        phones = phones.slice(0,12);
    }
    phones.forEach(phone => {
        const div = document.createElement('div');
        div.innerHTML = `
        <div class="card bg-base-100 shadow-md p-5 mb-8 duration-300">
            <figure class="p-10 bg-[#0D6EFD0D]"><img  src="${phone.image}" alt="Shoes" /></figure>
            <div class="card-body">
                <h2 class="text-center text-2xl font-bold text-[#100F0F]">${phone.phone_name}</h2>
                <p class="text-lg text-[#706F6F] text-center">There are many variations of passages of available, but the majority have suffered</p>
                <h2 class="text-center text-2xl font-bold text-[#100F0F]">$999</h2>
                <div class="card-actions justify-center">
                    <button onclick="showDetails('${phone.slug}')" class="btn bg-blue-600 hover:bg-blue-500 text-white font-medium text-lg capitalize w-1/5 px-16">Details</button>
                </div>
            </div>
        </div>
        `;
        phonesContainer.appendChild(div);
    });
    loading(false);
}
const searchBtn = (isShowAll) =>{
    loading(true);
    const searchBox = document.getElementById('search-box');
    const searchText = searchBox.value;
    loadPhone(searchText, isShowAll);
}

const loading = (isLoading) =>{
   const loading = document.getElementById('loading');
   if(isLoading){
    loading.classList.remove('hidden');
   }
   else{
    loading.classList.add('hidden');
   }
}
const showAll = () =>{
    loading(true);
    searchBtn(true)
}
const showDetails = async(id) =>{
    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
    const data = await res.json();
    const phone = data.data;
    setModal(phone);
}
const setModal = (phone) =>{
    console.log(phone)
    const modalContainer = document.getElementById('modal-container');
    modalContainer.textContent = '';
    const div = document.createElement('div');
    div.innerHTML = `
        <div class="text-center p-12 bg-[#f3f8ff] rounded-lg mb-6">
            <img class="inline" src="${phone.image}" alt="">
        </div>
        <h3 class="text-2xl md:text-4xl font-bold text-[#100F0F] mb-4">${phone.name}</h3>
        <p class="text-base md:text-lg text-[#706F6F] mb-2">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</p>
        <p class="font-semibold text-[#100F0F] text-lg mb-1">Storage : <span class="font-normal text-sm text-[#706F6F]">${phone.mainFeatures?.storage}</span></p>
        <p class="font-semibold text-[#100F0F] text-lg mb-1">Display Size : <span class="font-normal text-sm text-[#706F6F]">${phone.mainFeatures?.displaySize}</span></p>
        <p class="font-semibold text-[#100F0F] text-lg mb-1">Chipset : <span class="font-normal text-sm text-[#706F6F]">${phone.mainFeatures?.chipSet}</span></p>
        <p class="font-semibold text-[#100F0F] text-lg mb-1">Memory : <span class="font-normal text-sm text-[#706F6F]">${phone.mainFeatures?.memory}</span></p>
        <p class="font-semibold text-[#100F0F] text-lg mb-1">Slug : <span class="font-normal text-sm text-[#706F6F]">${phone.slug}</span></p>
        <p class="font-semibold text-[#100F0F] text-lg mb-1">Release data : <span class="font-normal text-sm text-[#706F6F]">${phone.releaseDate}</span></p>
        <p class="font-semibold text-[#100F0F] text-lg mb-1">Brand : <span class="font-normal text-sm text-[#706F6F]">${phone.brand}</span></p>
        <p class="font-semibold text-[#100F0F] text-lg mb-1">GPS : <span class="font-normal text-sm text-[#706F6F]">${phone.others?.GPS || 'Not available'}</span></p>
        <p class="font-semibold text-[#100F0F] text-lg mb-1">Sensors : <span class="font-normal text-sm text-[#706F6F]">${phone.mainFeatures?.sensors}</span></p>
        <div class="modal-action">
            <button class="btn btn-secondary">Close</button>
        </div>
    `;
    modalContainer.appendChild(div);
    show_details_modal.showModal();
}
searchBtn();
