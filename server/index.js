const express = require('express');
const app = express();
const mysql = require('mysql2'); 
const bodyParser = require('body-parser');
const cors = require('cors');
const multer = require('multer');

const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'proiect_ionut',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

app.use(cors()); // Middleware pentru gestionarea cererilor cross-origin

app.use(express.json()); // Middleware pentru analizarea datelor JSON din cereri

app.use(bodyParser.urlencoded({ extended: true })); // Middleware pentru analizarea datelor url-encoded

// Configurarea pentru încărcarea de fișiere cu Multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '../src/uploads'); // Setarea directorului de destinație pentru fișierele încărcate
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // Utilizarea numelui original al fișierului
  }
});

const upload = multer({ storage });


app.use((req, res, next) => {
  req.db = db.promise();
  next();
});

//editare pret produs
app.post('/update/product_price', upload.single('productAdress'), async (req, res) => {
  try {
    const name = req.body.name;
    const price = req.body.price;

    const addProduct = "UPDATE inventory SET price = ? WHERE title = ?;";
    const result = await req.db.query(addProduct, [price, name]);

    return res.sendStatus(200);
  } catch (err) {
    console.error('An error occurred while inserting the data:', err);
    return console.log('Server error. Please try again later.');
  }
});

//editare cantitate produs
app.post('/update/product_quantity', upload.single('productAdress'), async (req, res) => {
  try {
    const name = req.body.name;
    const quantity = req.body.quantity;

    const addProduct = "UPDATE inventory SET quantity = ? WHERE title = ?;";
    const result = await req.db.query(addProduct, [quantity, name]);

    return res.sendStatus(200);
  } catch (err) {
    console.error('An error occurred while inserting the data:', err);
    return console.log('Server error. Please try again later.');
  }
});

//adaugare cantitate produs
app.post('/add/product_quantity', upload.single('productAdress'), async (req, res) => {
  try {
    const name = req.body.name;
    const quantity = req.body.quantity;

    const addProduct = "UPDATE inventory SET quantity = quantity + ? WHERE title = ?;";
    const result = await req.db.query(addProduct, [quantity, name]);

    return res.sendStatus(200);
  } catch (err) {
    console.error('An error occurred while inserting the data:', err);
    return console.log('Server error. Please try again later.');
  }
});

//scade din cantitate produs
app.post('/decrease/product_quantity', upload.single('productAdress'), async (req, res) => {
  try {
    const name = req.body.name;
    const quantity = req.body.quantity;

    const addProduct = "UPDATE inventory SET quantity = quantity - ? WHERE title = ?;";
    const result = await req.db.query(addProduct, [quantity, name]);

    return res.sendStatus(200);
  } catch (err) {
    console.error('An error occurred while inserting the data:', err);
    return console.log('Server error. Please try again later.');
  }
});

//adaugare produs
app.post('/insert/product', upload.single('productAdress'), async (req, res) => {
  try {
    const productName = req.body.productName;
    const productAdress = req.file.filename; // se aceseaza numele fisierului folosing req.file.filename

    const addProduct = "INSERT INTO inventory (title, adress) VALUES (?, ?);";
    const result = await req.db.query(addProduct, [productName, productAdress]);
    
    return res.sendStatus(200);
  } catch (err) {
    console.error('An error occurred while inserting the data:', err);
    return console.log('Server error. Please try again later.');
  }
});
//obtinerea unui produs
app.post('/get/product', async (req, res) => {
  const { product } = req.body;
  try {
    const getProduct = "SELECT * FROM inventory WHERE title = ?";
    const [result] = await req.db.query(getProduct,[product]);
    
    return res.send(result);
  } catch (err) {
    console.error('An error occurred while getting the data:', err);
    return console.log('Server error. Please try again later.' );
  }
});
//stergere unui produs
app.post('/delete/product', async (req, res) => {
  const { name } = req.body;
  const query = 'DELETE FROM inventory WHERE title = ?';
  
  try {
    const [results, _] = await req.db.query(query, [name]);

    if (results.affectedRows === 1) {
      // confirmare produs sters
      res.json({ success: true, message: 'Product deleted successful!',results });
    } else {
      // esuare stergere produs
      res.json({success: false, message: 'Failed to delete the product.'});
      
    }
  } catch (err) {
    console.error('Error executing query:', err);
    console.log('Server error. Please try again later.' );
  }
});

//adaugare client
app.post('/insert/client', upload.single('productAdress'), async (req, res) => {
  try {
    const clientName = req.body.clientName;
    const clientMail = req.body.clientMail;
    const clientPhone = req.body.clientPhone; 
    const clientAdress = req.body.clientAdress; 

    const addProduct = "INSERT INTO clients (clientsName, clientsMail, clientsPhone, clientsAdress) VALUES (?, ?, ?, ?);";
    const result = await req.db.query(addProduct, [clientName, clientMail, clientPhone, clientAdress]);

    return res.sendStatus(200);
  } catch (err) {
    console.error('An error occurred while inserting the data:', err);
    return console.log('Server error. Please try again later.');
  }
});
//obtinerea clients
app.get('/get/clients', async (req, res) => {
  try {
    const getProduct = "SELECT * FROM clients;";
    const [result] = await req.db.query(getProduct);

    return res.send(result);
  } catch (err) {
    console.error('An error occurred while getting the data:', err);
    return res.status(500).send('Server error. Please try again later.');
  }
});

//obtinere client
app.post('/get/client', upload.single('productAdress'), async (req, res) => {
  try {
    const title = req.body.title;

    const getProduct = "SELECT * FROM clients WHERE clientsName = ?;";
    const [result] = await req.db.query(getProduct, [title]);

    return res.send({ success: true, data: result });
  } catch (err) {
    console.error('An error occurred while getting the data:', err);
    return res.status(500).send({ success: false, error: 'Server error. Please try again later.' });
  }
});


//adaugare workcenter
app.post('/insert/workcenter', upload.single('productAdress'), async (req, res) => {
  try {
    const wcName = req.body.wcName;
    const description = req.body.description; 

    const addProduct = "INSERT INTO workcenters (namewc, descriptionwc) VALUES (?, ?);";
    const result = await req.db.query(addProduct, [wcName, description]);

    return res.sendStatus(200);
  } catch (err) {
    console.error('An error occurred while inserting the data:', err);
    return console.log('Server error. Please try again later.');
  }
});
//obtinerea workcenter
app.get('/get/workcenters', async (req, res) => {
  try {
    const getProduct = "SELECT * FROM workcenters;";
    const [result] = await req.db.query(getProduct);
    return res.send(result);
  } catch (err) {
    console.error('An error occurred while getting the data:', err);
    return console.log('Server error. Please try again later.' );
  }
});

//adaugare in products_materials
app.post('/insert/products_materials', upload.single('productAdress'), async (req, res) => {
  try {
    const title = req.body.title;
    const material = req.body.materials_name; 
    const quantity = req.body.quantity;

    const addProduct = "INSERT INTO products_materials (title, materials_name,quantity) VALUES (?, ?, ?);";
    const result = await req.db.query(addProduct, [title, material, quantity]);

    return res.sendStatus(200);
  } catch (err) {
    console.error('An error occurred while inserting the data:', err);
    return console.log('Server error. Please try again later.');
  }
});


//adaugare material
app.post('/insert/material', upload.single('productAdress'), async (req, res) => {
  try {
    const productName = req.body.productName;
    const productAdress = req.file.filename; // se aceseaza numele fisierului prin req.file.filename

    const addProduct = "INSERT INTO materials (materials_name, adress) VALUES (?, ?);";
    const result = await req.db.query(addProduct, [productName, productAdress]);

    return res.sendStatus(200);
  } catch (err) {
    console.error('An error occurred while inserting the data:', err);
    return res.status(500).json({ error: 'An error occurred while processing your request.' });
  }
});


//obtinerea wc pentru comanda
app.get('/get/order', async (req, res) => {
  const product = req.query.title;
  try {
    const getProduct = "SELECT * FROM products_workcenter WHERE title = ?";
    const [result] = await req.db.query(getProduct, [product]);

    return res.send(result);
  } catch (err) {
    console.error('An error occurred while getting the data:', err);
    return res.status(500).send('Server error. Please try again later.');
  }
});
//adaugare in products_workcenter
app.post('/insert/products_workcenter', upload.single('productAdress'), async (req, res) => {
  try {
    const namewc = req.body.namewc;
    const time = req.body.time; 
    const type = req.body.type;
    const order = req.body.order;
    const title = req.body.title;

    const addProduct = "INSERT INTO products_workcenter (namewc, time, type, `order`, title) VALUES (?, ?, ?, ?, ?);";
    const result = await req.db.query(addProduct, [namewc, time, type, order, title]);

    return res.sendStatus(200);
  } catch (err) {
    console.error('An error occurred while inserting the data:', err);
    return console.log('Server error. Please try again later.');
  }
});
//obtinere manufacturare la un produs
app.post('/get/manufacturing/time', upload.single('productAdress'), async (req, res) => {
  try {
    const title = req.body.title;

    const getProduct = "SELECT * FROM products_workcenter WHERE title = ?;";
    const [result] = await req.db.query(getProduct, [title]);

    return res.send({ success: true, data: result });
  } catch (err) {
    console.error('An error occurred while getting the data:', err);
    return res.status(500).send({ success: false, error: 'Server error. Please try again later.' });
  }
});

//adaugare in to_do
app.post('/insert/to_do', upload.single('productAdress'), async (req, res) => {
  try {
    const wc = req.body.wc;
    const type = req.body.type;
    const order = req.body.order;
    const title = req.body.title;
    const amount = req.body.amount;
    const owned_amount = req.body.owned_amount;
    const client = req.body.client;

    const addProduct = "INSERT INTO to_do (wc, type, `order`, title, amount, owned_amount, client) VALUES (?, ?, ?, ?, ?, ?, ?);";
    const result = await req.db.query(addProduct, [wc, type, order, title, amount,owned_amount,client]);

    return res.sendStatus(200);
  } catch (err) {
    console.error('An error occurred while inserting the data:', err);
    return console.log('Server error. Please try again later.');
  }
});
//obtinere din to do pentru titlu si client
app.post('/get/to_doSelected', upload.single('productAdress'), async (req, res) => {
  try {
    const title = req.body.title;
    const client = req.body.client;

    const addProduct = "Select * FROM to_do WHERE title =? AND client =?;";
    const result = await req.db.query(addProduct, [title,client]);

    return res.send({result});
  } catch (err) {
    console.error('An error occurred while inserting the data:', err);
    return console.log('Server error. Please try again later.');
  }
});
//obtinere ca inainte plus grupare
app.post('/get/to_doSelectedAmount', upload.single('productAdress'), async (req, res) => {
  try {
    const title = req.body.title;
    const client = req.body.client;

    const addProduct = "Select * FROM to_do WHERE title =? AND client =? HAVING amount = owned_amount;";
    const result = await req.db.query(addProduct, [title,client]);

    return res.send({result});
  } catch (err) {
    console.error('An error occurred while inserting the data:', err);
    return console.log('Server error. Please try again later.');
  }
});
//stergerea from to do a ce a fost terminat
app.post('/delete/to_do', upload.single('productAdress'), async (req, res) => {
  try {
    const title = req.body.title;
    const client = req.body.client;

    const addProduct = "DELETE FROM to_do WHERE title =? AND `client` =?";
    const result = await req.db.query(addProduct, [title,client]);

    return res.sendStatus(200);
  } catch (err) {
    console.error('An error occurred while inserting the data:', err);
    return console.log('Server error. Please try again later.');
  }
});
//obtinere manufacturare la un produs
app.get('/get/to_do', async (req, res) => {
  try {
    const getProduct = "SELECT * FROM to_do;";
    const [result] = await req.db.query(getProduct);
    return res.send(result);
  } catch (err) {
    console.error('An error occurred while getting the data:', err);
    return console.log('Server error. Please try again later.' );
  }
});
//update in to_do
app.post('/update/to_do', upload.single('productAdress'), async (req, res) => {
  try {
    const id = req.body.id;

    const addProduct = "UPDATE to_do SET owned_amount = owned_amount + 1 WHERE id = ?;";
    const result = await req.db.query(addProduct, [id]);

    return res.sendStatus(200);
  } catch (err) {
    console.error('An error occurred while inserting the data:', err);
    return console.log('Server error. Please try again later.');
  }
});

//obtinerea unui material
app.post('/get/material', async (req, res) => {
  const { product } = req.body;
  try {
    const getProduct = "SELECT * FROM materials WHERE materials_name = ?";
    const [result] = await req.db.query(getProduct,[product]);
    
    return res.send(result);
  } catch (err) {
    console.error('An error occurred while getting the data:', err);
    return console.log('Server error. Please try again later.' );
  }
});
//obtinerea materialelor necesare unui produs
app.get('/get/materials/needed', async (req, res) => {
  const product = req.query.product;

  try {
    const getProduct = "SELECT * FROM products_materials WHERE title = ?";
    const [result] = await req.db.query(getProduct, [product]);
    
    return res.send(result);
  } catch (err) {
    console.error('An error occurred while getting the data:', err);
    return res.status(500).send('Server error. Please try again later.');
  }
});

//obtinerea centrelor de lucru necesare unui produs
app.get('/get/wc/needed', async (req, res) => {
  const product = req.query.product;

  try {
    const getProduct = "SELECT * FROM products_workcenter WHERE title = ?";
    const [result] = await req.db.query(getProduct, [product]);
    
    return res.send(result);
  } catch (err) {
    console.error('An error occurred while getting the data:', err);
    return res.status(500).send('Server error. Please try again later.');
  }
});

//obtinerea datelor pentru inventar
app.get('/get/pic', async (req, res) => {
  try {
    const getProduct = "SELECT * FROM inventory;";
    const [result] = await req.db.query(getProduct);
    return res.send(result);
  } catch (err) {
    console.error('An error occurred while getting the data:', err);
    return console.log('Server error. Please try again later.' );
  }
});

//obtinerea materiale
app.get('/get/materials', async (req, res) => {
  const getProduct = "SELECT * FROM materials;";
  try {
    const [result] = await req.db.query(getProduct);
    return res.send(result);
  } catch (err) {
    console.error('An error occurred while getting the data:', err);
    return console.log('Server error. Please try again later.' );
  }
});
//logarea
app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const query = 'SELECT * FROM accounts WHERE mail = ? AND password = MD5(?)';
  
  try {
    const [results, _] = await req.db.query(query, [email, password]);

    if (results.length === 1) {
      // Cand datele utilizatorului sunt corecte
      res.json({ success: true, message: 'Login successful!',results });
    } else {
      // Cand datele introduse sunt gresit
      res.json({success: false, message: 'Login failed. Please check your email and password.'});
      
    }
  } catch (err) {
    console.error('Error executing query:', err);
    console.log('Server error. Please try again later.' );
  }
});
//adaugare cont
app.post('/insert/account', upload.single('productAdress'), async (req, res) => {
  try {
    const title = req.body.title;
    const amount = req.body.amount;
    const password = req.body.password; 
    const status = req.body.status; 
    const wc = req.body.wc;
    const salary = req.body.salary;
    
    if(wc){}
    else{
      wc = ' ';
    }

    const addProduct = "INSERT INTO accounts (mail, name, password, user_rank, wc, salary) VALUES (?, ?, MD5(?), ?, ?, ?);";
    const result = await req.db.query(addProduct, [title, amount, password,status, wc, salary]);

    return res.sendStatus(200);
  } catch (err) {
    console.error('An error occurred while inserting the data:', err);
    return console.log('Server error. Please try again later.');
  }
});
//stergere cont
app.post('/delete/account', upload.single('productAdress'), async (req, res) => {
  try {
    const title = req.body.title;

    const addProduct = "DELETE FROM accounts WHERE mail = ?;";
    const result = await req.db.query(addProduct, [title]);

    return res.sendStatus(200);
  } catch (err) {
    console.error('An error occurred while inserting the data:', err);
    return console.log('Server error. Please try again later.');
  }
});
//update cont
app.post('/update/account', upload.single('productAdress'), async (req, res) => {
  try {
    const mail = req.body.mail;
    const nume = req.body.nume;
    const password = req.body.password;
    const job = req.body.job;
    const wc = req.body.wc;
    const mailOg = req.body.mailOg;
    const salary = req.body.salary;

    console.log(mail,nume,password,job,wc,mailOg,salary)
    const addProduct = "UPDATE accounts SET mail = ?, name = ?, password = MD5(?), user_rank = ?, wc = ?, salary = ? WHERE mail = ?;";
    const result = await req.db.query(addProduct, [mail,nume,password,job,wc,salary,mailOg]);
    console.log(result)

    return res.sendStatus(200);
  } catch (err) {
    console.error('An error occurred while inserting the data:', err);
    return console.log('Server error. Please try again later.');
  }
});
//obtinere conturi
app.get('/get/accounts', async (req, res) => {
  try {
    const getProduct = "SELECT * FROM accounts;";
    const [result] = await req.db.query(getProduct);

    return res.send(result);
  } catch (err) {
    console.error('An error occurred while getting the data:', err);
    return res.status(500).send('Server error. Please try again later.');
  }
});
//obtinere cont
app.get('/get/account', async (req, res) => {
  try {
    const mail = req.query.mail; 

    const getProduct = "SELECT * FROM accounts where mail = ?;";
    const [result] = await req.db.query(getProduct, [mail]);

    return res.send(result);
  } catch (err) {
    console.error('An error occurred while getting the data:', err);
    return res.status(500).send('Server error. Please try again later.');
  }
});
//obtinere pret material
app.get('/get/material_price/:name', async (req, res) => {
  try {
    const name = req.params.name;
    const getProduct = "SELECT * FROM materials WHERE materials_name = ?;";
    const [result] = await req.db.query(getProduct, [name]);

    res.json(result); // datele sunt luate inapoi ca un raspuns json
  } catch (err) {
    console.error('An error occurred while getting the data:', err);
    return res.status(500).send('Server error. Please try again later.');
  }
});

//modificare pret material
app.post('/update/material_price', upload.single('productAdress'), async (req, res) => {
  try {
    const name = req.body.name;
    const price = req.body.price;

    const addProduct = "UPDATE materials SET price = ? WHERE materials_name = ?;";
    const result = await req.db.query(addProduct, [price, name]);

    return res.sendStatus(200);
  } catch (err) {
    console.error('An error occurred while inserting the data:', err);
    return console.log('Server error. Please try again later.');
  }
});

//modificare cantitate material
app.post('/update/material_quantity', upload.single('productAdress'), async (req, res) => {
  try {
    const name = req.body.name;
    const quantity = req.body.quantity;

    const addProduct = "UPDATE materials SET quantity = ? WHERE materials_name = ?;";
    const result = await req.db.query(addProduct, [quantity, name]);

    return res.sendStatus(200);
  } catch (err) {
    console.error('An error occurred while inserting the data:', err);
    return console.log('Server error. Please try again later.');
  }
});

//scadere cantitate material
app.post('/decrease/material_quantity', upload.single('productAdress'), async (req, res) => {
  try {
    const name = req.body.name;
    const quantity = req.body.quantity;

    const addProduct = "UPDATE materials SET quantity = quantity - ? WHERE materials_name = ?;";
    const result = await req.db.query(addProduct, [quantity, name]);

    return res.sendStatus(200);
  } catch (err) {
    console.error('An error occurred while inserting the data:', err);
    return console.log('Server error. Please try again later.');
  }
});

//stergerea unui material
app.post('/delete/material', async (req, res) => {
  const { name } = req.body;
  const query = 'DELETE FROM materials WHERE materials_name = ?';
  
  try {
    const [results, _] = await req.db.query(query, [name]);

    if (results.affectedRows === 1) {
      // confirmare produs sters
      res.json({ success: true, message: 'Product deleted successful!',results });
    } else {
      // esuare stergere produs
      res.json({success: false, message: 'Failed to delete the product.'});
      
    }
  } catch (err) {
    console.error('Error executing query:', err);
    console.log('Server error. Please try again later.' );
  }
});


//adaugare comanda
app.post('/insert/order', upload.single('productAdress'), async (req, res) => {
  try {
    const title = req.body.title;
    const amount = req.body.amount;
    const clientsName = req.body.clientsName;
    const estimatedTime = req.body.time; 

    const addProduct = "INSERT INTO orders (title, amount, clientsName, estimatedTime) VALUES (?, ?, ?, ?);";
    const result = await req.db.query(addProduct, [title, amount, clientsName, estimatedTime]);

    return res.sendStatus(200);
  } catch (err) {
    console.error('An error occurred while inserting the data:', err);
    return console.log('Server error. Please try again later.');
  }
});
//adaugare comanda cu status
app.post('/insert/orderStatus', upload.single('productAdress'), async (req, res) => {
  try {
    const title = req.body.title;
    const amount = req.body.amount;
    const clientsName = req.body.clientsName;
    const time = req.body.time; 
    const status = req.body.status; 
    

    const addProduct = "INSERT INTO orders (title, amount, clientsName, status, estimatedTime) VALUES (?, ?, ?, ?, ?);";
    await req.db.query('ALTER TABLE orders AUTO_INCREMENT = 1;');
    const result = await req.db.query(addProduct, [title, amount, clientsName,status, time]);

    return res.sendStatus(200);
  } catch (err) {
    console.error('An error occurred while inserting the data:', err);
    return console.log('Server error. Please try again later.');
  }
});
//schimbarea statusului comenzii
app.post('/update/orderStatus', upload.single('productAdress'), async (req, res) => {
  try {
    const title = req.body.title;
    const clientsName = req.body.clientsName;
    const status = req.body.status; 

    const addProduct = "UPDATE orders SET status = ? WHERE title = ? AND clientsName = ?;";
    await req.db.query('ALTER TABLE orders AUTO_INCREMENT = 1;');
    const result = await req.db.query(addProduct, [status,title,clientsName]);

    return res.sendStatus(200);
  } catch (err) {
    console.error('An error occurred while inserting the data:', err);
    return console.log('Server error. Please try again later.');
  }
});
//obtinere comanda2
app.get('/get/order2', async (req, res) => {
  const getProduct = "SELECT * FROM orders ORDER BY `order_id`;";
  try {
    const [result] = await req.db.query(getProduct);
    return res.send(result);
  } catch (err) {
    console.error('An error occurred while getting the data:', err);
    return console.log('Server error. Please try again later.' );
  }
});
//stergere comanda
app.get('/delete/order', async (req, res) => {
  const deleteQuery = "DELETE FROM orders;";
  try {
    const [result] = await req.db.query(deleteQuery);
    return res.send(result);
  } catch (err) {
    console.error('An error occurred while deleting data:', err);
    return res.status(500).send('Server error. Please try again later.');
  }
});

//adaugare in jurnal
app.post('/insert/auditLog', upload.single('productAdress'), async (req, res) => {
  try {
    const name = req.body.name;
    const action = req.body.action;
    const date = req.body.date;
    const hour = req.body.hour;

    const addProduct = "INSERT INTO audit_log (name, action, date,hour) VALUES (?, ?, ?, ?);";
    await req.db.query('ALTER TABLE orders AUTO_INCREMENT = 1;');
    const result = await req.db.query(addProduct, [name, action, date,hour]);

    return res.sendStatus(200);
  } catch (err) {
    console.error('An error occurred while inserting the data:', err);
    return console.log('Server error. Please try again later.');
  }
});
//obtinere jurnal
app.get('/get/auditlog', async (req, res) => {
  try {

    const getProduct = "SELECT * FROM audit_log;";
    const [result] = await req.db.query(getProduct);

    return res.send(result);
  } catch (err) {
    console.error('An error occurred while getting the data:', err);
    return res.status(500).send('Server error. Please try again later.');
  }
});

//obtinere jurnal dupa luna si an
app.get('/get/auditlog/:month/:year', async (req, res) => {
  try {
    const month = parseInt(req.params.month);
    const year = parseInt(req.params.year);

    const getProduct = "SELECT * FROM audit_log WHERE `date`>= '?-?-01' AND `date`<'?-?-01'";
    const [result] = await req.db.query(getProduct, [year,month,year,month+1]);
    res.json(result);
  } catch (err) {
    //erorile se intampla de multe ori aici, asa ca l-am scos din console log
    
  }
});

//adaugare factura
app.post('/insert/invoice', upload.single('productAdress'), async (req, res) => {
  try {
    const create = req.body.create;
    const due = req.body.due;
    const client = req.body.client;
    const products = req.body.products;
    const address = req.body.address;

    const addProduct = "INSERT INTO invoice (`create`, `due`, client_name,products, address) VALUES (?, ?, ?, ?, ?);";
    const result = await req.db.query(addProduct, [create, due, client,products, address]);

    return res.sendStatus(200);
  } catch (err) {
    console.error('An error occurred while inserting the data:', err);
    return console.log('Server error. Please try again later.');
  }
});

//obtinere factura
app.get('/get/invoice', async (req, res) => {
  try {
    const getProduct = "SELECT * FROM invoice;";
    const [result] = await req.db.query(getProduct);
    res.json(result);
  } catch (err) {
    console.error('An error occurred while getting the data:', err);
    res.status(500).send('Server error. Please try again later.');
  }
});

//obtinere factura dupa luna si an
app.get('/get/invoice/:month/:year', async (req, res) => {
  try {
    const month = parseInt(req.params.month);
    const year = parseInt(req.params.year);
    const getProduct = "SELECT * FROM invoice WHERE STR_TO_DATE(`create`, '%d/%m/%Y') >= STR_TO_DATE(CONCAT('01/', ?, '/', ?), '%d/%m/%Y') AND STR_TO_DATE(`create`, '%d/%m/%Y') < STR_TO_DATE(CONCAT('01/', ?+1, '/', ?), '%d/%m/%Y');";
    const [result] = await req.db.query(getProduct, [month, year, month, year]);
    res.json(result); 
  } catch (err) {
    console.error('An error occurred while getting the data:', err);
    res.status(500).send('Server error. Please try again later.');
  }
});


//obtinere ultimul id al facturi
app.get('/get/lastInvoice', async (req, res) => {
  try {
    const getProduct = "SELECT MAX(id_Invoice) AS max_id FROM invoice;";
    const [result] = await req.db.query(getProduct);
    res.json(result); 
  } catch (err) {
    console.error('An error occurred while getting the data:', err);
    res.status(500).send('Server error. Please try again later.');
  }
});

//adaugare coloana noua in 
app.post('/alter/costs', upload.single('productAdress'), async (req, res) => {
  try {
    const title = req.body.title;

    const addProduct = "ALTER TABLE costs ADD COLUMN ?? INT;";
    const result = await req.db.query(addProduct, [title]);

    return res.sendStatus(200);
  } catch (err) {
    console.error('An error occurred while inserting the data:', err);
    return console.log('Server error. Please try again later.');
  }
});

//adaugare date noi 
app.post('/insert/costs', upload.single('productAdress'), async (req, res) => {
  try {
    const salary = req.body.salary;
    const electricity = req.body.electricity;
    const test = req.body.test;
    const monthYear = req.body.monthYear;

    // se verifica daca sunt randuri cu aceasi data (monthYear)
    const checkExistingRow = "SELECT * FROM costs WHERE date = ?";
    const existingRow = await req.db.query(checkExistingRow, [monthYear]);

    if (existingRow.length > 0) {
      // daca exista atunci se sterge
      const deleteQuery = "DELETE FROM costs WHERE date = ?";
      await req.db.query(deleteQuery, [monthYear]);
    }

    // se adauga noua data
    const addProduct = "INSERT INTO costs (`total_salary`, `Electricity Bill`, `Test Bill`, `date`) VALUES (?, ?, ?, ?);";
    await req.db.query(addProduct, [salary, electricity, test, monthYear]);

    return res.sendStatus(200);
  } catch (err) {
    console.error('An error occurred while inserting the data:', err);
    return res.status(500).send('Server error. Please try again later.');
  }
});

//obtinere coloane din costs diferite de cele default
app.get('/get/costColumns', async (req, res) => {
  try {
    const { date } = req.query;
    const getProduct = "SELECT `Electricity Bill`, `Test Bill` FROM costs WHERE `date` = ?;";
    const [result] = await req.db.query(getProduct, [date]);
    res.json(result);
  } catch (err) {
    console.error('An error occurred while getting the data:', err);
    res.status(500).send('Server error. Please try again later.');
  }
});

// alocare server
app.listen(3001, () => {
  console.log('Server is running on http://localhost:3001');
});