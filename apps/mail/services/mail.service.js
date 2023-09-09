// mail service
import { utilService } from '../../../services/util.service.js'
import { storageService } from '../../../services/async-storage.service.js'

const MAILS_KEY = 'mailsDB'
_createEmails()

// const email = {
//     id: 'e101',
//     subject: 'Miss you!',
//     body: 'Would love to catch up sometimes',
//     isRead: false,
//     sentAt: 1551133930594,
//     removedAt: null,
//     from: 'momo@momo.com',
//     to: 'user@appsus.com'
// }

const loggedinUser = {
    email: 'user@appsus.com',
    fullname: 'Mahatma Appsus'
}

// const criteria = {
//     status: 'inbox',
//     txt: 'puki', // no need to support complex text search
//     isRead: true, // (optional property, if missing: show all)
//     isStared: true, // (optional property, if missing: show all)
//     lables: ['important', 'romantic'] // has any of the labels
// }

export const mailService = {
    query,
    get,
    remove,
    save,
    getDefaultCriteria,
    getEmptyMail,
}

function query(criteria) {
    return storageService.query(MAILS_KEY).then(mails => {
        if (criteria.status === 'inbox') {
            // console.log('inbox')
            mails = mails.filter(mail => mail.from !== loggedinUser.email && !mail.removedAt)
        }
        if (criteria.status === 'sent') {
            // console.log('sent')
            mails = mails.filter(mail => mail.from === loggedinUser.email && !mail.removedAt && !mail.isDraft)
        }
        if (criteria.status === 'draft') {
            // console.log('draft')
            mails = mails.filter(mail => mail.isDraft && mail.from === loggedinUser.email && !mail.removedAt)
        }
        if (criteria.status === 'trash') {
            // console.log('trash')
            mails = mails.filter(mail => mail.removedAt)
        }
        if (criteria.txt && criteria.status === 'sent') {
            mails = mails.filter(mail => mail.to.toLowerCase().includes(criteria.txt.toLowerCase()))
            // console.log(mails)
        }
        if (criteria.txt && criteria.status !== 'sent') {
            mails = mails.filter(mail => mail.from.toLowerCase().includes(criteria.txt.toLowerCase()))
            // console.log(mails)
        }
        if (criteria.filter === 'unread') {
            mails = mails.filter(mail => !mail.isRead)
        }
        if (criteria.filter === 'read') {
            mails = mails.filter(mail => mail.isRead)
        }
        if (criteria.filter === 'star') {
            mails = mails.filter(mail => mail.isStared)
        }
        if (criteria.sort === 'date') {
            // console.log('date')
            mails = mails.sort((mail1, mail2) => mail2.sentAt - mail1.sentAt)
        }
        if (criteria.sort === 'name') {
            // console.log('name')
            mails = mails.sort((mail1, mail2) => {
                if (mail1.from > mail2.from) return 1
                return -1
            })
        }
        return mails
    })
}

function get(mailId) {
    return storageService.get(MAILS_KEY, mailId)
}

function remove(mailId) {
    return get(mailId).then(mail => {
        if (!mail.removedAt) {
            mail.removedAt = Date.now()
            return storageService.put(MAILS_KEY, mail)
        }
        return storageService.remove(MAILS_KEY, mailId)
    })
}

function save(mail) {
    if (mail.id) {
        return storageService.put(MAILS_KEY, mail)
    } else {
        return storageService.post(MAILS_KEY, mail)
    }
}

function _createEmails() {
    let mails = _loadFromStorage(MAILS_KEY)
    if (!mails || !mails.length) {
        mails = [
            _createEmail(utilService.makeId(), 'Welcome!', 'Some text', true, false, 'user@appsus.com', 'popo@gmail.com'),
            _createEmail(utilService.makeId(), 'New Email!', 'Some more text', true, true, 'gilad@gmail.com'),
            _createEmail(utilService.makeId(), 'Email Confirmation', 'Hey, how are you? We would like to confirm your account', true, true, 'user@appsus.com', 'support@spotify.com', Date.now() - (60 * 10 ** 5), false),
            _createEmail(utilService.makeId(), 'Check This out!', 'Some more longer text', false, false, 'user@appsus.com', 'momo@sello.co.il'),
            _createEmail(utilService.makeId(), 'Security Alert', 'Hey, We would like to inform you', true, false, 'user@appsus.com', 'support@gmail.com', Date.now() - (40 * 10 ** 7), false),
            _createEmail(utilService.makeId(), 'Hello!', 'Long text, with some more text. more, and even more', true, false, 'popo@gmail.com', 'user@appsus.com', Date.now() - (40 * 10 ** 5), false),
            _createEmail(utilService.makeId(), 'Time to go!!', 'More, and more', false, true, 'user@appsus.com', 'lopo12@gmail.com', Date.now() - (40 * 10 ** 6), false),
            _createEmail(utilService.makeId(), 'September Sale', 'September sale is here, and more', false, true, 'user@appsus.com', 'GoBuy@gmail.com', Date.now() - (40 * 10 ** 6), false),
            _createEmail(utilService.makeId(), 'Happy Birthday!', 'Happy birthday, we wish you a great day', true, false, 'user@appsus.com', 'sosa99@walla.com', Date.now() - (40 * 10 ** 6), false),
            _createEmail(utilService.makeId(), 'Last chance', 'last chance to buy our product', true, false, 'user@appsus.com', 'GoBuy@gmail.com', Date.now() - (30 * 10 ** 5), false),
            _createEmail(utilService.makeId(), 'Save 60%', 'Save up to 60% in our flash sale', false, true, 'user@appsus.com', 'jojo10@sello.co.il', Date.now() - (21 * 10 ** 7), false),
            _createEmail(utilService.makeId(), 'Weekly Newsletter', 'Our weekly newsletter with all your favorite updates, and more', true, true, 'user@appsus.com', 'yolo@appsus.com', Date.now() - (40 * 10 ** 6), false),
            _createEmail(utilService.makeId(), 'Another day!', 'Text short', true, true, 'lopo12@gmail.com', 'user@appsus.com', Date.now() - (20 * 10 ** 3), false)
        ]
        _saveToStorage(MAILS_KEY, mails)
    }
}

function _createEmail(id = '', subject = '', body = '', isRead = true, isStared = false, to = '', from = 'user@appsus.com', sentAt = Date.now(), isDraft = true) {
    return {
        id,
        subject,
        body,
        isRead,
        isStared,
        sentAt,
        removedAt: null,
        from,
        to,
        isDraft
    }
}

function getDefaultCriteria() {
    return {
        status: 'inbox',
        txt: '',
        filter: 'all',
        sort: 'date',
        lables: ['important', 'romantic']
    }
}

function getEmptyMail() {
    return _createEmail()
}

function _saveToStorage(key, val) {
    localStorage.setItem(key, JSON.stringify(val))
}

function _loadFromStorage(key) {
    var val = localStorage.getItem(key)
    return JSON.parse(val)
}