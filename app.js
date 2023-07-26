const express = require('express');
var expressLayouts = require('express-ejs-layouts');
const morgan = require('morgan');
const app = express();
const port = 3000;

//Gunakan ejs
app.set('view engine', 'ejs');

//third party middleware
app.use(expressLayouts);
app.use(morgan('dev'));

//built-in middleware
app.use(express.static('public'));


//application level midleware
app.use((req, res, next) => {
  console.log('Time', Date.now());
  next();
})

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
  res.render('contact',{
    layout: 'layouts/main-layout',
    title: 'halaman contact',
  })
});
app.get('/product/:id', (req, res) => {
  res.send(`Product ID :  ${req.params.id} <br>
  Category : ${req.query.category}`);
});
app.use('/', (req, res) => {
  res.send('<h1>kamana bang</h1>');
});
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
// const http = require('http');
// const fs = require('fs');

// const port = 3000;
// const renderHtml = (path, res) => {
//     fs.readFile(path, (err, data)=> {
//         if (err){
//             res.writeHead(404);
//             res.write('Error : File Not Found');
//         }else {
//             res.write(data);
//         }
//         res.end();
//     })
// }

// http
// .createServer((req, res)=> {
   
//     res.writeHead(200, {
//         'Content-Type' : 'text/html',
//     });
// const url = req.url;
// switch(url){
//     case '/about':
//         renderHtml('./about.html', res);
//         break;
//     case '/contact':
//         renderHtml('./contact.html', res);
//          break;
//     default:
//         renderHtml('./index.html', res);
//          break;
// }

// if (url === './about.html'){
//     renderHtml('./about.html', res);
// }else if (url === './contact.html'){
//     renderHtml('./contact.html', res);
// }
// else if (url === './index.html'){
//     renderHtml('./index.html', res);
// };
// })
// .listen(port, () => {
// console.log(`Server is listening on port ${port}..`);
// })
