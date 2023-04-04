// Configuration d u  serveur , et ses modules
const express = require('express');
const app = express();
const http = require('http');
const server =http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
var path = require("path");
const { table } = require('console');
const { connected } = require('process');
let PORT =8080;

// Port d'écoute 
server.listen(PORT, ()=>{
    console.log('Serveur démarré sur le port :'+PORT);

});




//Route page d'accueil
app.get('/', (req, res) =>{
    res.sendFile(path.join(__dirname, '../index.html'));
    
});

app.get('/client.js', (req, res) =>{
    res.sendFile(path.join(__dirname, 'client.js'));
    
});

app.get('/style.css', (req, res) =>{
    res.sendFile(path.join(__dirname, '../css/style.css'));
    
});

const salons = {};
    
// Lancement du gestionnaire d'événements , qui va gérer notre socket 
   io.on('connection', (socket)=>{
    //Saisie du pseudo de l'utilisateur
    socket.on('set-pseudo',(pseudo)=>{
     console.log(pseudo + " vient de se connecter à "+new Date());
     socket.nickname = pseudo;
     const utilisateurs = getUsers(io);
     console.table(utilisateurs);
     io.emit('reception_utilisateur',utilisateurs);
  
    });


    // Rejoindre un salon
    socket.on('rejoindre-salon', (salon) => {
        // Créer le salon s'il n'existe pas encore
        if (!salons[salon]) {
            salons[salon] = [];
        }
  
           // Ajouter l'utilisateur au salon
           salons[salon].push(socket.nickname);
           // Récupérer la liste des utilisateurs dans le salon
           const utilisateurs = salons[salon];
           // Envoyer la liste des utilisateurs dans le salon à tous les utilisateurs
           io.emit('reception-utilisateurs', [...utilisateurs, "Salon"]);
       });

    
    socket.on('emission-message',(message)=>{
        
        socket.emit('reception_message',socket.nickname+" : "+message);
        socket.emit('listmessage', socket.nickname+"(vous): "+ message);
        console.log(message);
        const message = socket.nickname + " : " + data.message;
        const salon = data.salon;
        // Envoyer le message à tous les utilisateurs dans le salon
        io.emit('reception-message', { message, salon });
    });
        
        
        socket.on('disconnect',()=>{
        console.log(socket.nickname +" vient de se déconnecter" + new Date);
        const utilisateurs = getUsers(io);
        console.table(utilisateurs);
        io.emit('reception_utilisateur',utilisateurs);
        });
        
        
         function getUsers(io){
        const utilisateurs = [] ;
        io.sockets.sockets.forEach((socket)=>{
        if (socket.nickname) {
        utilisateurs.push({
        id_client:socket.id,
        pseudo_client: socket.nickname,
        }); 
        }
        });
        return utilisateurs;
        };
    });
