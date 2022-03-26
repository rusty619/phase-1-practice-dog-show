document.addEventListener('DOMContentLoaded', () => {
    request()
})

let request = async() => {
    let dogForm = document.getElementById('dog-form')
    let dogTable = document.getElementById('table-body')
    let dogName = document.getElementById('dog-name')
    let dogBreed = document.getElementById('dog-breed')
    let dogSex = document.getElementById('dog-sex')
    let dogId = document.getElementById('dog-id')

    let req = await fetch('http://localhost:3000/dogs')
    let res = await req.json()
    res.forEach((element) => {
        let tr = document.createElement("tr")
        let td1 = document.createElement("th")
        let td2 = document.createElement("th")
        let td3 = document.createElement("th")
        let btn = document.createElement("button")

        btn.setAttribute('value',element.id)

        td1.innerText = element.name
        td2.innerText = element.breed
        td3.innerText = element.sex
        btn.innerText = "Edit Dog"
        tr.appendChild(td1)
        tr.appendChild(td2)
        tr.appendChild(td3)
        tr.appendChild(btn)
        dogTable.appendChild(tr)

        btn.addEventListener('click', () => {
            dogName.value = element.name
            dogBreed.value = element.breed
            dogSex.value = element.sex
            dogId.value = element.id

        })

    })

    dogForm.addEventListener('submit', (event) => {
        event.preventDefault()
        editRequest(dogId.value, dogName.value, dogBreed.value, dogSex.value)
        dogTable.innerHTML = ""
        newRequest()

    })

    
}

let editRequest = async(id,name,breed,sex) => {
    let req = await fetch(`http://localhost:3000/dogs/${id}`,{
        method: 'PATCH',
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "id": id,
            "name": name,
            "breed": breed,
            "sex": sex
        })
    })
    let res = await req.json()
    console.log(res)
}

let newRequest = async () => {
    
    let newReq = await fetch('http://localhost:3000/dogs')
    let newRes = await newReq.json()
    location.reload()
}
