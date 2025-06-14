let express = require('express');
const ejs = require('ejs');
const server = express();
const { connectToDatabase } = require('./database/mongooseConnect');
const { Mouse } = require('./schemas/studentSchema');

connectToDatabase();
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.set('view engine', 'ejs');
server.set('views', './views');


server.get('/exam/home', (req, res) => {
    res.render('home');
})

server.get('/exam/login/user', (req, res) => {
    res.render('login.ejs');
})

server.get('/exam/login/student', (req, res) => {
    res.render('login.ejs');
})

server.post('/exam/login/check', async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).send('Username and password are required');
    }

    try {
        const student = await Mouse.findOne({ username });

        if (!student) {
           
            const newStudent = new Mouse({ username, password });
            await Mouse.insertOne(newStudent);
            return res.send('New student registered successfully');
        } else {
          
            if (student.password === password) {
                res.render('StudentDashboard', { username: student.username });

            } else {
               return res.status(401).render('incorrectPassword');

            }
        }
    } catch (err) {
        console.error('Error during login:', err);
        return res.status(500).send('Server error');
    }
});

const port = 3000;
server.listen(port, (req, res) => {
    console.log('Server is running on port ' + port);
})
