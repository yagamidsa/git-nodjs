const express = require('express');
const router = express.Router();
const pool = require('../database');

const {isLoggedIn} = require('../lib/auth');

router.get('/add',isLoggedIn, (req, res) =>{

    res.render('links/add');
});


//se crean rutas con router

router.post('/add', isLoggedIn, async (req, res) =>{
    const { Titulo, url, description } = req.body;
    const newLink = {
        Titulo,
        url,
        description,
        user_id: req.user.id
    };
   await pool.query('INSERT INTO links set ?', [newLink]);
req.flash('success', 'link guardado satisfactoriamente');
    res.redirect('/links')    
});

// segunda ruta para una nueva vista y mostrar cuando ya ingreso el dato a la base de datos


router.get('/', isLoggedIn, async (req, res) => {
    const links = await pool.query('SELECT * FROM links WHERE user_id = ?', [req.user.id]);
    res.render('links/list', {links});
});

router.get('/delete/:id', isLoggedIn, async (req, res) => {
    const { id } = req.params;
    await pool.query('DELETE FROM links WHERE ID = ?', [id]);
    req.flash('success', 'Link Eliminado satisfactoriamente');
    res.redirect('/links');
});


router.get('/edit/:id', isLoggedIn, async (req, res) => {
    const { id } = req.params;
    const links = await pool.query('SELECT * FROM links Where id = ?', [id]);
    res.render('links/edit', {link: links[0]});
});

router.post('/edit/:id', isLoggedIn, async (req, res) => {
    const { id } = req.params;
    const { Titulo, url, description } = req.body;
    const newLink = {
        Titulo,
        url,
        description
    };
    console.log(newLink);
    await pool.query('UPDATE links set ? WHERE id = ?', [newLink,id]);
    req.flash('success', 'Link editado Satisfactoriamente');
    res.redirect('/links');
});
module.exports = router;

