function creerRoleNiv1 (message, nomRole) {
    message.guild.createRole({
        name: nomRole,
        color: 'GREEN',
        position: 2,
        hoist: true,
      })
    .then(role => message.member.addRole(role).catch(console.error))
    .catch(console.error);
}

function creerRoleNiv2 (message, nomRole) {
    message.guild.createRole({
        name: nomRole,
        color: 'PURPLE',
        position: 3,
        hoist: true,
      })
    .then(role => message.member.addRole(role).catch(console.error))
    .catch(console.error);
}

function creerRoleNiv3 (message, nomRole) {
    message.guild.createRole({
        name: nomRole,
        color: 'ORANGE',
        position: 4,
        hoist: true,
      })
    .then(role => message.member.addRole(role).catch(console.error))
    .catch(console.error);
}

function creerRoleNiv4 (message, nomRole) {
    message.guild.createRole({
        name: nomRole,
        color: 'WHITE',
        position: 5,
        hoist: true,
      })
    .then(role => message.member.addRole(role).catch(console.error))
    .catch(console.error);
}

function creerRoleNiv5 (message, nomRole) {
    message.guild.createRole({
        name: nomRole,
        color: 'RED',
        position: 6,
        hoist: true,
      })
    .then(role => message.member.addRole(role).catch(console.error))
    .catch(console.error);
}


module.exports = {
	name: 'creerNiveau',
	description: "create new role",
	execute(message, niveaux, niveau) {
        switch(niveau) { //premier mot
            case 1 : 
                creerRoleNiv1(message,niveaux[niveau]);
                break;
            case 2 :
                creerRoleNiv2(message,niveaux[niveau]);
                break;
            case 3 :
                creerRoleNiv3(message,niveaux[niveau]);
                break;
            case 4 :
                creerRoleNiv4(message,niveaux[niveau]);
                break;
            case 5 :
                creerRoleNiv5(message,niveaux[niveau]);
                break;
            default :
                console.log("Erreur, pas bon niveau précisé impossible de créer rôle");
                return;
        }
    }



}