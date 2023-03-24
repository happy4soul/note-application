// console.log(uuidv4())

//reading data from localStorage

let readData = function () {
    let arrayJSON = localStorage.getItem('array')
    if (arrayJSON !== null) {
        return JSON.parse(arrayJSON)
    }
    else {
        return []
    }
}

//saving data into localStorage

let saveData = function (array) {
    localStorage.setItem('array', JSON.stringify(array))
}

//removing a note

let removingNote = function (id) {
    let findIndexOfCurrentNote = array.findIndex(function (item) {
        return item.id === id
    })
    if (findIndexOfCurrentNote > -1) {
        array.splice(findIndexOfCurrentNote, 1)
    }
}

//toggleStrongValue

let toggleStrongValue = function (id) {
    let item = array.find(function (item) {
        return item.id === id
    })
    if (item !== undefined) {
        item.strong = !item.strong
    }
}

//displaying available options in search

let displayAvailableOptions = function (item) {
    //creating  new div
    let newDiv = document.createElement('div')

    //creating a span

    let p = document.createElement('a')
    p.setAttribute('href', `/other.html#${item.id}`)

    //creating a button
    let button = document.createElement('button')
    button.textContent = 'x'
    button.addEventListener('click', function (e) {
        removingNote(item.id)
        saveData(array)
        search(array, searchNote)
    })

    //creating a checkbox
    let anotherCheckbox = document.createElement('input')
    anotherCheckbox.setAttribute('type', 'checkbox')
    anotherCheckbox.checked = item.strong
    anotherCheckbox.addEventListener('change', function (e) {
        toggleStrongValue(item.id)
        saveData(array)
        search(array, searchNote)
    })
    if (item.name.length > 0) {
        p.textContent = item.name
    }
    else {
        p.textContent = 'unnamed note'
    }
    newDiv.appendChild(anotherCheckbox)
    newDiv.appendChild(p)
    newDiv.appendChild(button)
    return newDiv
}

//display number of weak characters

let displayWeakChar = function (isNotStrong) {
    let h2 = document.createElement('h2')
    h2.textContent = `there are ${isNotStrong.length} weak characters`
    return h2
}

let search = function (arr, searchNote) {
    array = sortNotes(array, searchNote.sortBy)
    let searching = arr.filter(function (item) {
        return item.name.toLowerCase().includes(searchNote.searchElement.toLowerCase())
    })
    searching = searching.filter(function (item) {
        if (searchNote.showWeak) {
            return !item.strong
        }
        else {
            return true
        }
    })
    let isNotStrong = searching.filter(function (item) {
        return !item.strong
    })
    document.querySelector('.division').innerHTML = ''
    let h2 = displayWeakChar(isNotStrong)
    document.querySelector('.division').appendChild(h2)

    searching.filter(function (item) {
        let p = displayAvailableOptions(item)

        document.querySelector('.division').appendChild(p)
    })
}

let generateLastEdited = function (timeStamp) {
    return `last edited ${moment(timeStamp).fromNow()}`
}

//sorting notes by 1 of the  methods in the select option in other.html

let sortNotes = function (array, sortBy) {
    if (sortBy === 'LastEdited') {
       return  array.sort(function (a, b) {
            if (a.updatedAt > b.updatedAt) {
                return -1
            }
            else if (b.updatedAt > a.updatedAt) {
                return 1
            }
            else {
                return 0
            }
        })
    }
    else if (sortBy === 'Alphabetically') {
      return   array.sort(function (a, b) {
            if (a.name.toLowerCase() < b.name.toLowerCase()) {
                return -1
            }
            else if (a.name.toLowerCase() > b.name.toLowerCase()) {
                return 1
            }
            else {
                return 0
            }
        })

    }
    else if(sortBy === 'LastCreated'){
      return   array.sort(function(a,b){
            if(a.createdAt > b.createdAt){
                return -1
            }
            else if(a.createdAt < b.createdAt){
                return 1
            }
            else{
                return 0
            }
        })
    }
    else{
        return array
    }

}
