const fs = require('fs')
const chalk = require('chalk')

/* Adding process of a note.
   1. load all previous notes
   2. check if not duplicate title add it as new node. */

const addNote = (title,body)=>{
    const notes = loadNotes()
    const duplicateNote = notes.find((note)=> note.title === title ) // shorthand notation of ES6 func.

    // original function.
    // const duplicateNotes = notes.filter(function(note){
    //     return note.title === title
    // })

    if(!duplicateNote){
        notes.push({
            title : title,
            body : body
        })
        saveNotes(notes)
        console.log('Note added successfully!')
    }
    else{
        console.log('Note title already taken!')
    }
}

const saveNotes = (notes)=>{  // saves new note to json file.
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json',dataJSON)
}

const loadNotes = ()=>{   // loads all previous notes
    try{
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
    } 
    catch(err){
        return []
    }
}

const removeNote = (title)=>{
    const notes = loadNotes()
    const notesToKeep = notes.filter((note)=> note.title !== title)

    if(notes.length>notesToKeep.length){
        console.log(chalk.green.inverse('Note removed!'))
        saveNotes(notesToKeep)
    }
    else
        console.log(chalk.red.inverse('Note not removed!'))
}

const listNotes = ()=>{
    const notes = loadNotes()
    notes.forEach((note) => {
      console.log(chalk.blue.inverse(note.title))  
    })
}

const readNotes = (title)=>{
    const notes = loadNotes()
    const note_ava = notes.find((note)=> note.title === title)

    if(note_ava){
        console.log(chalk.green.inverse(note_ava.title))
        console.log(chalk.inverse(note_ava.body))
    }
    else{
        console.log(chalk.red.inverse('Note not found!'))
    }
}

module.exports = {     // returns data needed by other files.
    addNote : addNote,
    removeNote : removeNote,
    listNotes : listNotes,
    readNotes : readNotes
}  