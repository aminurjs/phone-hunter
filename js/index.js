const loadPhone = async (searchText, isShowAll) => {
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
                    <button class="btn bg-blue-600 hover:bg-blue-500 text-white font-medium text-lg capitalize w-1/5 px-16">Details</button>
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
    searchBtn(true)
}