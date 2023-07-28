const { rejects } = require('assert');
const fs = require('fs');

// membuat folder data jika belum ada
const dirpath = './data';
if (!fs.existsSync(dirpath)) {
  fs.mkdirSync(dirpath);
}

// membuat file contacts.json jika belum ada
const dataPath = './data/contacts.json';
if (!fs.existsSync(dataPath)) {
  fs.writeFileSync(dataPath, '[]', 'utf-8');
}
const loadContact = () => {
  const fileBuffer = fs.readFileSync('data/contacts.json', 'utf-8');
  const contacts = JSON.parse(fileBuffer);
  return contacts;
}

const findContact= (nama) =>{
    const contacts = loadContact();
    const contact = contacts.find((contact) => contact.nama.toLowerCase() === nama.toLowerCase()
   );
   return contact;
}

//menuliskan file contacts.json data yang baru
const saveContact = (contacts) => {
  fs.writeFileSync('data/contacts.json', JSON.stringify(contacts));
}
//menambahkan data contact baru
const addContact = (contact) => {
  const contacts = loadContact();
  contacts.push(contact);
  saveContact(contacts);
};

//cek nama duplikat
const cekDuplikat = (nama) => { 
  const contacts = loadContact(); 
  return contacts.find((contact) => contact.nama === nama); 
}


module.exports= {
    loadContact, findContact, addContact, cekDuplikat
}; 