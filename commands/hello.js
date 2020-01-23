module.exports = {
	name: 'hello',
	description: "greetings",
	execute(message) {
        var phrases = [`Hey ${message.author} ! N'oublie pas de bien t'hydrater après une marche ;)`,
                    `Content de te revoir ${message.author}, j'espère que tu passes une bonne journée.\n`+
                    "Tu peux entrer le nombre de tes pas avec `!done <nb de pas>`, je les ajouterais aux autres !",
                    "Salut ! Si tu es en forme, n'hésite pas à faire une petite marche. L'air frais fait du bien.",
                    `Hello ${message.author} ! Tu te debrouilles bien aujourd'hui, continue comme ça !`,
                    `Hello ${message.author} ! Hey regarde tous les progrès que tu as fait depuis le début. Tu peux être fier/fière de toi !`,
                    `Hey ${message.author} ! Que dirais-tu d'une petite marche  ? Tu pourras me dire ensuite combien de pas tu as fait :)`,
                    `Salut ${message.author} ! Pourquoi ne t'accorderais-tu pas une pause ? Se reposer est important pour reprendre en forme.`,
                    `Hello ${message.author} ! Je suis content que tu passes me voir. Je voulais te dire que je suis fier toi, pour tes efforts.`,
                    ];


      var res = Math.floor((Math.random() * phrases.length));
      message.channel.send(phrases[res]);
	}
}



