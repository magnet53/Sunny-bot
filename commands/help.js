module.exports = {
	name: 'help',
	description: "send commands and how to use the bot",
	execute(message) {
		message.channel.send(
                  "J'enregistre vos pas chaque jour avec la commande `%done` et je gère les niveaux que vous atteignez. \n\n"+
                  "Mes commandes : \n"+
                  "`%help` : aide et liste des commandes \n" +
                  "`%init` : **nécessaire** pour débuter et initialiser le nombre des pas \n" +
                  "`%hello` : un petit coucou \n" +
                  "`%done <nb de pas>` : enregistre le nombre de vos pas, les <> sont à remplacer par le nombre de tes pas \n" +
                  "`%me` : ton profil \n" +
                  "`%reset` : supprime tous les pas enregistrés pour l'auteur du message"
            );
	}
}