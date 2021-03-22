
const searchBtn = document.querySelector(".search-btn");

searchBtn.addEventListener("click", () => {
    const input = document.querySelector("#search-inp");
    if(!input.value){
        alert("Please enter title")
        return
    }
    
    let search = input.value.split(" ")
    console.log(search)

    for (let i = 0; i < search.length; i++) {
        let url = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=d35156ccc2f80166687a7f4962937964&tags=${search[i]}&max_upload_date=&format=json&nojsoncallback=1`
        fetch(url)
            .then(response => response.json())
            .then(result => {
                let photo = result.photos.photo 
                    if(photo.length > 5){
                        photo = photo.slice(0,5)
                    }
        creatImg(photo, search[i])
    })
    .catch(error => console.log(error))
    input.value = "";  
    }


    // let url = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=d35156ccc2f80166687a7f4962937964&tags=${input.value}&max_upload_date=&format=json&nojsoncallback=1`
    // fetch(url)
    // .then(response => response.json())
    // .then(result => {
    //     let photo = result.photos.photo 
    //     if(photo.length > 10){
    //         photo = photo.slice(0,10)
    //     }
    //     creatImg(photo)
    // })
    // .catch(error => console.log(error))
    // input.value = "";
})

function creatImg(photo, className) {
    if(!photo.length){
        alert("No photo")
        return
    }
    
    let div = document.getElementById("img-section");

    for (let i = 0; i < photo.length; i++) {
        let src = `https://live.staticflickr.com/${photo[i].server}/${photo[i].id}_${photo[i].secret}_q.jpg`
        let imgTag = document.createElement("img");
        imgTag.setAttribute('id', className + i)
        // imgTag.classList.add(className)
        imgTag.setAttribute("src", src)
        imgTag.setAttribute("draggable", true)
        imgTag.setAttribute("ondragstart", 'drag(event)')
        div.append(imgTag);
    }
}


function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev){
    ev.dataTransfer.setData("text", ev.target.id);
}

function dropDog(ev) {
    ev.preventDefault();
  let data = ev.dataTransfer.getData("text");
  if(!data.includes("dog")){
      return
    }else {
        let box = document.getElementById("result-section")
        box.appendChild(document.getElementById(data));
    }
}

function dropCat(ev) {
    ev.preventDefault();
  let data = ev.dataTransfer.getData("text");
  if(!data.includes("cat")){
      return
    }else {
        let box = document.getElementById("result-section")
        box.appendChild(document.getElementById(data));
    }
}