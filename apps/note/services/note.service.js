import { storageService } from '../../../services/async-storage.service.js'
import { storageService as storage  } from '../../../services/storage.service.js'
import { utilService } from '../services/util.service.js'


const NOTES_KEY = 'notesDB'
// var gFilterBy = { title: '', price: 0, publishedDate: 0 }
let notes = [{
    id: 'n101',
    createdAt: 1112222,
    type: 'NoteTxt', isPinned: true,
    style: {
        backgroundColor: '#00d'
    },
    info: {
        txt: 'Fullstack Me Baby!'
    }
},
// {
//     id: 'n102',
//     type: 'NoteImg',
//     isPinned: false,
//     info: {
//         url: 'http://some-img/me',
//         title: 'Bobi and Me'
//     },
//     style: {
//         backgroundColor: '#00d'
//     }
// },
{
    id: 'n103',
    type: 'NoteTodos',
    isPinned: false,
    info:
    {
        title: 'Get my stuff together',
        todos: [
            { txt: 'Driving license', doneAt: null },
            { txt: 'Coding power', doneAt: 187111111 }
        ]
    }
}
]

_createNotes()


export const noteService = {
    query,
    get,
    remove,
    save,
    getEmptyNote,
    // getEmptyReview,
    // getNextBookId,
    // getFilterBy,
    // setFilterBy,
    // getDefaultFilter,
    // addReview,
    // deleteReview,
}



function query(filterBy) {
    return storageService.query(NOTES_KEY).then(notes => {
        //   if (filterBy.title) {
        //     const regex = new RegExp(filterBy.title, 'i')
        //     books = books.filter(book => regex.test(book.title))
        //   }
        //   if (filterBy.price) {
        //     books = books.filter(book => book.listPrice.amount >= filterBy.price)
        //   }
        //   if (filterBy.publishedDate) {
        //     books = books.filter(book => book.publishedDate >= filterBy.publishedDate)
        //   }
        return notes
    })
}

function get(noteId) {
    return storageService.get(NOTES_KEY, noteId)
}

function remove(noteId) {
    return storageService.remove(NOTES_KEY, noteId)
}

function save(note) {
    if (note.id) {
        return storageService.put(NOTES_KEY, note)
    } else {
        return storageService.post(NOTES_KEY, note)
    }
}

function getEmptyNote() {
    return {
        id: '',
        createdAt: 0,
        type: 'NoteTxt',
        isPinned: false,
        style: {
            backgroundColor: '#00d'
        },
        info:{
        title: '',
        txt: ''
        }
    }
}

function _getAllNotes() {
    return notes
}

function _createNotes() {
    let notes = storage.loadFromStorage(NOTES_KEY)
    if (!notes || !notes.length) {
        notes = _getAllNotes()
        storage.saveToStorage(NOTES_KEY, notes)
    }
}

// function saveToStorage(key, val) {
//     localStorage.setItem(key, JSON.stringify(val))
// }

// function loadFromStorage(key) {
//     var val = localStorage.getItem(key)
//     return JSON.parse(val)
// }