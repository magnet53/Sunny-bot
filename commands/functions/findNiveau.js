module.exports = {
	name: 'findNiveau',
	description: "send commands and how to use the bot",
	execute(roles, niveaux) {
        //on suppose qu'on peut avoir qu'un seul rôle du challenge à la fois
        for(var i =0; i<roles.length;i++) {
            for(var j = 0; j<niveaux.length; j++) {
              if (roles[i].name === niveaux[j]) {
                    //on retourne l'indice du niveau
                    return j;
                }
            }
        }
        return 0;
    }
}