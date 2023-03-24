let itemId = location.hash.substring(1)
let array = readData()
let addingName = document.querySelector('.addingName')
let addingBody = document.querySelector('.addingBody')
let fromNow = document.querySelector('.fromNow')
let removingElement = document.querySelector('.removingElement')
let item = array.find(function (item) {
    return item.id === itemId
})
if (item === undefined) {
    location.assign('/index.html')
}

addingName.value = item.name
addingBody.value = item.body

addingName.addEventListener('input', function (e) {
    item.name = e.target.value
    item.updatedAt = moment().valueOf()
    fromNow.textContent = generateLastEdited(item.updatedAt)
    saveData(array)
})
fromNow.textContent = generateLastEdited(item.updatedAt)

addingBody.addEventListener('input', function (e) {
    item.body = e.target.value
    item.updatedAt = moment().valueOf()
    fromNow.textContent = generateLastEdited(item.updatedAt)
    saveData(array)
})

removingElement.addEventListener('click', function (e) {
    removingNote(item.id)
    saveData(array)
    location.assign('/index.html')
})

window.addEventListener('storage', function (e) {
    if (e.key === 'array') {
        array = JSON.parse(e.newValue)
    }

    item = array.find(function (item) {
        return item.id === itemId
    })
    if (item === undefined) {
        location.assign('/index.html')
    }
    
    addingName.value = item.name
    addingBody.value = item.body
    fromNow.textContent = generateLastEdited(item.updatedAt)

})