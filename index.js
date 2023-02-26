const loadPhoneData=async(items,dataLimit)=>{
    const url=`https://openapi.programming-hero.com/api/phones?search=${items}`
    const res= await fetch(url)
    const data = await res.json();
    displayPhones(data.data,dataLimit)
}
const displayPhones=(phones,dataLimit)=>{
    const phonesContainers=document.getElementById('div-container')
    phonesContainers.innerHTML="";
    const showAll=document.getElementById('showAll')

    if( dataLimit && phones.length>10){

        phones=phones.slice(0,10);
        showAll.classList.remove('d-none');
    }
    else{
        showAll.classList.add('d-none')
    }

// if else no phone:::
    const noPhone = document.getElementById('noPhones')
    if(phones.length == 0){
        noPhone.classList.remove('d-none');
    }
    else{                                                                                                                                                                                                                                                                                                      
        noPhone.classList.add('d-none');
    }

    phones.forEach(phone=>{
       const phoneDiv=document.createElement('div')
       phoneDiv.classList.add('col');
       phoneDiv.innerHTML=`
       <div class="card h-100 p-5 ">
                        <img src="${phone.image}" class="card-img-top" alt="...">
                        <div class="card-body">
                          <h5 class="card-title">${phone.phone_name}</h5>
                          <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                          <Button onclick="loadPhonesDetails('${phone.slug}')" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#phoneDetailsModal">Show Details</Button>
                          
                        </div>
                      </div>
                    </div>     
       
       ` ;
       phonesContainers.appendChild(phoneDiv)
    })
    // spinner loader stop
    toggleSpinner(false)
}
const processSearch=(dataLimit)=>{
    toggleSpinner(true)
    const getInput=document.getElementById('input-Field');
    const searchText=getInput.value;
    loadPhoneData(searchText,dataLimit)

}

document.getElementById('btn-Search').addEventListener('click',function(){
   processSearch(10)
})

document.getElementById('input-Field').addEventListener('keypress', function (e) {
    console.log(e.key)
    if (e.key === 'Enter') {
      // code for enter
      processSearch(10)
    }
});
const toggleSpinner=isLoading=>{
    const loaderSection=document.getElementById('loader')
    if(isLoading){
        loaderSection.classList.remove('d-none')
    }
    else{
        loaderSection.classList.add('d-none')
    }
}

document.getElementById('btn-showAll').addEventListener('click', function(){
    processSearch();
})

const loadPhonesDetails= async id=>{
    const url=`https://openapi.programming-hero.com/api/phone/${id}`
    const res= await fetch(url)
    const data= await res.json()
    phoneDetails(data.data)


}
const phoneDetails=phone=>{
    console.log(phone)
    const modalTitle=document.getElementById('phoneDetailsModalLabel');
    modalTitle.innerText=phone.name
    const modalRelease=document.getElementById('modalRelase')
    modalRelease.innerHTML=`
    <p>Release Date: ${phone.releaseDate}</p>
    `;
    const storage=document.getElementById('storage');
    storage.innerHTML=`
        <p> Storage: ${phone.mainFeatures ? phone.mainFeatures.storage: 'No storage'}</p>
        <p> DisplaySize: ${phone.mainFeatures.displaySize}</p>
        <p> MemoryStore: ${phone.mainFeatures.memory}</p>
        <p> Sensor: ${phone.mainFeatures.sensors}</p>
    `
}
loadPhoneData('apple')