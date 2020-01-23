module.exports = {
	name: 'randomMessageNiveau',
	description: "return a message",
	execute(message, nbPas) {
        var msg = "Bravo ! Continue comme ça !";

        var petit = [`C'est pas mal ${message.author} ! Demain essaye de marcher 1000 pas de plus !`,
                    `Tu te débrouilles bien ${message.author}. Tu peux essayer d'ajouter une petite marche dans ta journée. \n`+
                    `Réussir à marcher 7 000 pas par jour est un bon objectif.`,
                    "Bien joué ! Si tu es encore en forme, n'hésite pas à faire une petite marche en plus.",
                    `C'est pas mal ${message.author}, mais je sais que tu peux faire mieux demain ! Fighting ~`,
                    `C'est un bon début. Continue comme ça ${message.author} et essaye d'atteindre 10 000 pas par jour !`,
                    ];
        
        var moyen = [`Wow ${message.author} ! N'oublie pas de bien t'hydrater après une marche ;)`,
                    `Bravo ${message.author} ! Tu te débrouilles vraiment bien, tu peux être fier(e) de toi !`,
                    `Bravo ${message.author}, tu as bien marché aujourd'hui ! Tu fais beaucoup de progrès. Continue comme ça !`,
                    `Good job ${message.author} ! Tu te débrouilles bien, continue comme ça :)`
                    ];
        
        var grand = [`Incroyable ! ${message.author} tu as beaucoup marché aujourd'hui, tu peux être fier(e) de toi !`,
                    `Oh wow ${message.author}, tu as tout donné aujourd'hui ! Bravo ! Continue comme ça :)`,
                    ];
        
        if(nbPas < 5000) {
            var ind = Math.floor((Math.random() * petit.length));
            msg = petit[ind];
        }
        if(nbPas >= 5000 && nbPas < 20000) {
            var ind = Math.floor((Math.random() * moyen.length));
            msg = moyen[ind];
        }
        if(nbPas >= 20000) {
            var ind = Math.floor((Math.random() * grand.length));
            msg = grand[ind];
        }
        
        return msg;
    }
}