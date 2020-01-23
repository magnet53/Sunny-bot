function creerRoleDebutant (message, roleDebutant) {
        message.guild.createRole({
            name: roleDebutant,
            color: 'BLUE',
            position: 1,
            hoist: true,
          })
            .then(role => message.member.addRole(role).catch(console.error))
            .catch(console.error)
}

function findRole (roles, niveaux) {
    for(var i =0; i<roles.length;i++) {
        for(var j = 0; j<niveaux.length; j++) {
            if (roles[i].name === niveaux[j]) {
                return true;
            }
        }
    }
    return false;
}

module.exports = {
	name: 'init',
	description: "create new role",
	execute(message, guild, pas, niveaux) {
        if (!guild.available) {
            message.channel.send("Attention problème d'accès");
            return;
        }
        //role : role débutant
        var role = guild.roles.find(e => e.name === niveaux[0]);
        //si le role a déjà été créé
        if (role) {
            //trouve le role du challenge que porte le joueur (role en commun)
            var roleTrouve = findRole(message.member.roles.array(), niveaux);

            if((pas.get(message.member.id) == undefined)&&roleTrouve) {
                //si le compteur n'est pas initialisé mais que le joueur a déjà un role
                //cas quand offline/online lors des tests
                pas.set(message.member.id, 0);
                message.channel.send(`Compteur de pas initialisé`);
                return;
            }
            if(pas.get(message.member.id)&&!roleTrouve) {
                //si on a enlevé le rôle manuellement
                message.member.addRole(role).catch(console.error);
                message.channel.send(`Félicitations ${message.author}, tu es maintenant _${niveaux[0]}_ ! Attention à ne pas modifier les rôles manuellement.\n`+
                                        "Utilise `%me` pour savoir où tu en es.");
                return;
            }
            if(roleTrouve) {
                //si le membre a déjà un des rôles (niveaux)
                message.channel.send("Tu as déjà utilisé cette commande !\n"+
                                        "Si tu souhaites effacer toutes tes données, utilise `%reset`. Sinon, on continue le challenge ensemble !");
                return;
            }
            else {
                //s'il n'a pas rôle ni de compteur de pas, on initialise tout
                message.member.addRole(role).catch(console.error);
                pas.set(message.member.id, 0);
                message.channel.send(`Félicitations ${message.author}, tu es maintenant _${niveaux[0]}_ ! Plus tu marches et plus tu montes en grade.\n`+
                                        "Utilise `%me` pour savoir où tu en es.");
                return;
            }
        }
        else {
            //il faut créer le role
            creerRoleDebutant(message, niveaux[0]);
            pas.set(message.member.id, 0);
            message.channel.send(`Félicitations ${message.author}, tu es maintenant débutant ! Plus tu marches et plus tu montes en grade.\n`+
                                   "Utilise `%me` pour savoir où tu en es.");
            return;
        }
	}
}