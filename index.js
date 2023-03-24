//this is note app.

let array = readData() || []
// {
//     name: 'Naruto',
//     desc: 'Strongest in Naruto Verse',
//     strong : true
// },
// {
//     name: 'Sasuke',
//     desc: '2nd Strongest in Naruto Verse',
//     strong : true
// },
// {
//     name: 'Boruto',
//     desc: 'Interesting character',
//     strong : false
// },
// {
//     name: 'Kawaki',
//     desc: 'Chad',
//     strong : false
// },
// {
//     name: 'Eida',
//     desc: 'Simp',
//     strong : false
// }


let searchNote = {
    searchElement: '',
    showWeak: '',
    sortBy : 'LastEdited'
}





search(array, searchNote)

document.querySelector('.inp').addEventListener('input', function (e) {
    searchNote.searchElement = e.target.value
    search(array, searchNote)
})

document.querySelector('.form').addEventListener('submit', function (e) {
    e.preventDefault()
    const id = uuidv4()
    const timeStamp = moment().valueOf()
    array.push({
        id : id,
        createdAt : timeStamp,
        updatedAt : timeStamp,
        name : '',
        body : '',
        strong: false
    })
    saveData(array)
    
    console.log(array)
    search(array, searchNote)
    location.assign(`/other.html#${id}`)
   
})

document.querySelector('.checkbox').addEventListener('change', function (e) {
    // console.log(e.target.checked)
    searchNote.showWeak = e.target.checked
    search(array, searchNote)
})

window.addEventListener('storage', function(e){
    if(e.key === 'array'){
        array = JSON.parse(e.newValue)
    }
    search(array,searchNote)
})

document.querySelector('.select').addEventListener('change', function(e){
    console.log(e.target.value)
    searchNote.sortBy = e.target.value
    search(array,searchNote)
})