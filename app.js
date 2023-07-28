const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const {loadContact, findContact, addContact, cekDuplikat} = require('./utils/contact');
const { body, validationResult, check } = require('express-validator');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');
const app = express();
const port = 3000;

//Gunakan ejs
app.set('view engine', 'ejs');

//third party middleware
app.use(expressLayouts);


//built-in middleware
app.use(express.static('public'));
app.use( express.urlencoded({ extended: true }));

//konfigurasi flash
app.use(cookieParser('secret'));
app.use(session({
  cookie:{ maxAge:6000},
  secret: 'secret',
  resave: true,
  saveUninitialized: true,
}));
app.use(flash());

app.get('/', (req, res) => {
  // res.sendFile('./index.html', {root:__dirname});
  const siswa = [
    {
      nama : 'galang Ramadhan',
      email : 'galangramad1113@gmail.com'
    },
    {
      nama : 'galang Ramadh',
      email : 'galangramad1115@gmail.com'
    },
    {
      nama : 'galang sitampan',
      email : 'galangramadhannn18@gmail.com'
    }
  ];
  res.render('index',{
  layout: 'layouts/main-layout',
  nama: 'galang', 
  title: 'halaman home',
  siswa,
});
});
app.get('/about', (req, res) => {
  // res.sendFile('views/about', {root:__dirname});
  res.render('about',{
    layout: 'layouts/main-layout',
    title: 'halaman about',
  });
})
 
;
app.get('/contact', (req, res) => {
  // res.sendFile('./contact.html', {root:__dirname});
  const contacts = loadContact();
  res.render('contact',{
    layout: 'layouts/main-layout',
    title: 'halaman contact',
    contacts,
    msg: req.flash('msg'),
  })
});

//halaman tambah contak
app.get('/contact/add', (req, res) => {
  res.render('add-contact', {
    title : 'Tambah Data Contact',
    layout : 'layouts/main-layout',
  });
});

//proses data contact
app.post('/contact', [ 
  body('nama').custom((value) => { 
    const duplikat = cekDuplikat(value); 
    if(duplikat) { 
      throw new Error('Nama contact sudah digunakan!'); 
    } 
    return true; 
  }), 
  check('email', 'Email tidak valid!').isEmail(), 
  check('noHP', 'No HP tidak valid!!').isMobilePhone('id-ID'),
  ], (req, res) => { 
   const errors = validationResult(req); 
   if(!errors.isEmpty()) { 
    // return  res.status(404).json({ errors: errors.array() }); 
   res.render('add-contact', { 
    title: 'Form Tambah Data Contact', 
    layout: 'layouts/main-layout', 
    errors: errors.array(), 
   }) 
  }else{
    addContact(req.body); 
    //kirimkan flash masage
    req.flash('msg', 'Data Contact Berhasil Ditambahkan!');
    res.redirect('/contact') 
  }
});

//halaman detail
app.get('/contact/:nama', (req, res) => {
  // res.sendFile('./contact.html', {root:__dirname});
  const contact = findContact(req.params.nama);
  res.render('detail',{
    layout: 'layouts/main-layout',
    title: 'Detail Contact',
    contact,
  })
});

app.use('/', (req, res) => {
  res.send('<h1>kamana bang</h1>');
});
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});
