var socket = io();
// Selection pseudo 
socket.emit('set-pseudo', prompt(" Pseudo ? "));

// Variables pour récuperer les éléments HTML
var messages = document.getElementById('messages');
var form = document.getElementById('form');
var input = document.getElementById('input');
var id_salon='salon' ;
var lesMessages=[];


form.addEventListener('submit',(e)=>{
    // completer
 e.preventDefault();
 socket.emit('emission-message', input.value);

});

socket.on('reception_message', (contenu)=>{
// completer
console.log(contenu);
const list=document.createElement('li');
list.innerHTML=contenu;
messages.appendChild(list);

}); 

function salon(id){
    const messageContainer =document.getElementById('message-container');
    messageContainer.innerHTML='';

    lesMessages.forEach((message)=>{
        console.log("Salon"+ message.salon)
        console.log("id"+id)
        console.log("emet id : "+ message.emet_id)
        console.log("l'id courant : "+socket.id)
        const messageElem = document.createElement('div');
        if (message.emet_id === socket.id) {
            console.log("correct")
            messageElem.innerHTML = 'ul style="background-color: #140710; float: right;"> <b>Moi : </b>' +message.
            messageContainer.appendChild(messageElem);
        }
else if (message.emet_id !== socket){
    messageElem.innerHTML = '<ul style="background-color: #292d30; color: #240505 ; float:left; " >' +message.pseudo
    messageContainer.appendChild(messageElem);
}
    })
}
// vérifie les messages non-lus, puis affiche un badge de notification
// incrémenté a côté de l'utiilsateur en question 


function check_unread(node, icon, label) {
    const options = {
      body: 'Vous avez des messages non-lus',
      icon: icon
    };
  
    // Compter le nombre de messages non-lus
    const unreadCount = lesMessages.filter((message) => !message.lu && message.salon === id_salon).length;
  
    if (unreadCount > 0) {
      // Créer le badge de notification
      const badge = document.createElement('span');
      badge.classList.add('badge');
      badge.innerText = unreadCount;
  
      // Ajouter le badge à l'élément HTML
      node.appendChild(badge);
  
      // Afficher la notification
      if ('Notification' in window && Notification.permission === 'granted') {
        const Notification = new Notification(label, options);
      }
    }
  }

  socket.on('reception-utilisateur', (utilisateurs)=>[
    console.log(utilisateurs)
  ])





