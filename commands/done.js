const FindNiveau = require('./functions/findNiveau.js');
const CreerNiveau = require('./functions/creerNiveau.js');
const MessageNiveau = require('./functions/randomMessageNiveau.js');

function ajouterPas (message, args, pas) {
    //tests sur les arguments de la commande
    if(pas.get(message.member.id) == undefined) {
        message.reply("utilise la commande `%init` pour commencer !");
        return;
    }
    if(args.length == 0) {
        message.reply("précise le nombre de pas s'il te plait. Par exemple : `%done 1000`");
        return;
    }
    //nombre de pas !!
    var nb = parseInt(args[0]);
    if (args.length > 1 || isNaN(nb)) {
        message.reply("il faut seulement préciser un nombre de pas après la commande, pas autre chose.\n"+
                        "Exemple : `%done 1000`");
        return;
    }
    //tests sur le nombre de pas
    if(nb < 0) {
        message.reply("impossible d'ajouter un nombre négatif de pas.");
        return;
    }
    if(nb > 40000) {
        message.reply("désolé, il est impossible d'ajouter plus de 40 000 pas en une fois.\n"+
                        "S'il te plaît, recommence avec un nombre plus petit.");
        return;
    }
    //ajout du nombre de pas
    var avant = pas.get(message.member.id);
    pas.set(message.member.id, avant + nb);
    return nb;
}

module.exports = {
	name: 'done',
	description: "manages steps and roles",
	execute(message, args, pas, niveaux, objectifs) {

        //ajout des pas s'il passe tous les tests
        var nbPas = ajouterPas(message, args, pas);
        if(!nbPas) {
            return;
        }
        //changement et/ou création de roles
        var niveau = FindNiveau.execute(message.member.roles.array(), niveaux);
        if((niveau == niveaux.length-1) || ((objectifs[niveau] - pas.get(message.member.id)) > 0)) {
            //si on est au dernier niveau
            message.channel.send(MessageNiveau.execute(message, nbPas));
            return;
        }
        //s'il faut monter de niveau
        else {
            const ancienRole = message.guild.roles.find(e => e.name === niveaux[niveau]);
            niveau++;
            //le role un grade au dessus
            var nouvRole = message.guild.roles.find(e => e.name === niveaux[niveau]);
           
            //si ce rôle a déjà été créé
            if (nouvRole) {
                if(message.member.roles.find(e => e.name === niveaux[niveau])) {
                    message.channel.send(`Tu as déjà le rôle du grade au dessus. Ne changez pas les rôles manuellement s'il vous plaît.`);
                    message.member.removeRole(ancienRole).catch(console.error);
                    return;
                }
                else {
                    //on remplace le rôle avec le suivant
                    message.member.removeRole(ancienRole).catch(console.error);
                    message.member.addRole(nouvRole).catch(console.error);
                    message.channel.send(`Félicitations ${message.author}, tu es maintenant _${nouvRole.name}_ ! Plus tu marches et plus tu montes en grade.\n`+
                                            "Utilise `%me` pour savoir où tu en es.");
                    return;
                }
            }
            else {
                //création du grade suivant et remplacement
                message.member.removeRole(ancienRole).catch(console.error);
                CreerNiveau.execute(message,niveaux, niveau);
                message.channel.send(`Félicitations ${message.author}, tu es maintenant _${niveaux[niveau]}_ ! Plus tu marches et plus tu montes en grade.\n`+
                                            "Utilise `%me` pour savoir où tu en es.");
               return;
            }

        }
	}
}