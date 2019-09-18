const yargs = require('yargs')
const notes = require('./notes.js') // ./ takes to folder where current file is:note-app,then file name to access.


// process.argv.forEach((val, index) => {
//     console.log(`${index}: ${val}`);
//   });

// console.log(process.argv)
// console.log(yargs.argv) // yargs id proccessed form of process.

// command for add
yargs.command({
    command: 'add',
    describe: 'Add a new note!',
    builder:{   
        title:{
            describe: 'Note Title',
            demandOption: true,
            type: 'string'
        },   
        body:{
            describe: 'Note Body',
            demandOption: true,
            type: 'string'
        }          
    },
    handler(argv){
        notes.addNote(argv.title,argv.body)
    }
})

// command for remove
yargs.command({
    command:'remove',
    describe:'Remove a note!',
    builder:{   
        title:{
            describe: 'Note Title',
            demandOption: true,
            type: 'string'
        }       
    },
    handler(argv){
        notes.removeNote(argv.title)
    }
})

// command for list
yargs.command({               // {} is configuration object that is passed to command.
    command:'list',
    describe:'Lists the notes!',
    builder:{   
        title:{
            describe: 'Note Title',
            demandOption: true,
            type: 'string'
        }       
    },
    handler(){
        notes.listNotes()
    }
}) 


// command for read
yargs.command({
    command:'read',
    describe:'Read a note!',
    builder:{   
        title:{
            describe: 'Note Title',
            demandOption: true,
            type: 'string'
        }       
    },
    handler(argv){
        notes.readNotes(argv.title)
    }
})

yargs.parse() /* it goes through the process of parsing all the args with all of cong. details provided
                 through command calls. */