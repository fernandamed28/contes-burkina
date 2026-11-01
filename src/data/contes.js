// Catalogue des récits. Chaque récit est découpé en scènes :
//  - texte     : paragraphe(s) lus à l'écran (et par la voix de synthèse si aucun audio)
//  - ciel/sol  : ambiance du décor illustré
//  - decor     : éléments fixes [type, x]
//  - acteurs   : personnages animés { t, x, vers? }
//  - choix     : embranchements { label, vers: id de scène }
//  - suite     : id de la scène suivante (par défaut, la suivante dans la liste)
//  - fin       : dernière scène d'une branche

export const CATEGORIES = {
  conte: { label: 'Conte', pluriel: 'Contes', couleur: '#e0a526', icone: '✦' },
  legende: { label: 'Légende', pluriel: 'Légendes', couleur: '#c2562f', icone: '◆' },
  histoire: { label: 'Récit historique', pluriel: 'Récits historiques', couleur: '#3f7cac', icone: '▲' },
};

export const LANGUES = {
  fr: 'Français',
  moore: 'Mooré',
  dioula: 'Dioula',
  fulfulde: 'Fulfulde',
  gulmancema: 'Gulmancema',
};

export const CONTES = [
  {
    id: 'yennenga',
    titre: 'Yennenga, la princesse cavalière',
    categorie: 'legende',
    peuple: 'Moose (Mossi)',
    langues: ['fr', 'moore', 'dioula', 'fulfulde'],
    lieu: 'Tenkodogo',
    region: 'Centre-Est',
    coords: [-0.3697, 11.78],
    duree: 6,
    resume:
      "Fille du roi de Gambaga, Yennenga est la meilleure cavalière du royaume. Son père refuse de la marier. Son étalon l'emporte vers le nord, où naîtra Ouédraogo, l'ancêtre des Mossi.",
    morale: "La liberté et le courage fondent des peuples. Le trophée du FESPACO, l'Étalon de Yennenga, porte encore son nom.",
    source:
      "Légende fondatrice du peuple moaga, transmise par les griots et les chroniques royales ; versions recueillies notamment par Yamba Tiendrébéogo (Histoire et coutumes royales des Mossi de Ouagadougou, 1964).",
    scenes: [
      {
        id: 'debut',
        texte:
          "Il y a très longtemps, au royaume de Gambaga, au sud du pays que l'on appelle aujourd'hui le Burkina Faso, régnait le puissant roi Nédéga. De toutes ses épouses, il avait eu de nombreux enfants, mais sa préférée était sa fille, Yennenga. Dès son plus jeune âge, elle avait appris à monter à cheval, à lancer la sagaie et à tirer à l'arc. Bientôt, aucun guerrier du royaume ne maniait la lance et ne montait à cheval aussi bien qu'elle.",
        ciel: 'jour', sol: 'savane',
        decor: [['collines'], ['palais', 560], ['baobab', 140]],
        acteurs: [{ t: 'cavaliere', x: -80, vers: 380 }],
      },
      {
        texte:
          "Quand les ennemis menaçaient Gambaga, c'est Yennenga qui prenait la tête des cavaliers. Elle chargeait la première, les cheveux au vent, et revenait toujours victorieuse. Les soldats l'admiraient et le peuple chantait ses exploits. Mais le roi Nédéga tenait trop à sa fille guerrière. Chaque fois qu'un prétendant venait demander sa main, il le renvoyait : « Sans Yennenga, qui défendra mon royaume ? » Les années passaient, et la princesse voyait ses amies se marier et devenir mères.",
        ciel: 'jour', sol: 'savane',
        decor: [['collines'], ['palais', 600]],
        acteurs: [{ t: 'roi', x: 520 }, { t: 'guerriere', x: 300 }],
      },
      {
        texte:
          "Un jour, pour faire comprendre son chagrin à son père, Yennenga sema un champ de gombo. Elle l'arrosa, le soigna, puis, quand les gousses furent mûres, elle refusa de les cueillir. Le gombo sécha et pourrit sur pied. Le roi, surpris, lui demanda pourquoi elle laissait perdre une si belle récolte. « Père, répondit-elle, je suis comme ce gombo. On me laisse vieillir sans que je puisse donner de fruits. » Le roi comprit le message… mais il ne changea pas d'avis.",
        ciel: 'crepuscule', sol: 'savane',
        decor: [['champ', 400], ['arbre', 700]],
        acteurs: [{ t: 'guerriere', x: 220 }],
        choix: [
          { label: 'Yennenga reste au palais', vers: 'reste' },
          { label: 'Yennenga s’enfuit à cheval', vers: 'fuite' },
        ],
      },
      {
        id: 'reste',
        texte:
          "Si Yennenga était restée au palais, elle aurait continué à combattre pour son père, sans jamais fonder de famille. La légende se serait arrêtée là, et l'histoire des Mossi n'aurait jamais commencé. Mais la tradition raconte qu'elle fit un autre choix, un choix courageux et risqué…",
        ciel: 'nuit', sol: 'savane',
        decor: [['palais', 400]],
        acteurs: [{ t: 'guerriere', x: 380 }],
        suite: 'fuite',
      },
      {
        id: 'fuite',
        texte:
          "Une nuit sans lune, Yennenga se déguisa en homme, sella son étalon blanc et quitta Gambaga en secret. Le cheval galopa des jours et des nuits vers le nord. Il traversa des rivières en crue, longea des collines, et finit par s'enfoncer dans une forêt si épaisse que la lumière y entrait à peine. Là, épuisé, l'étalon s'arrêta enfin. Yennenga, affamée et blessée par les branches, se laissa glisser de sa selle.",
        ciel: 'nuit', sol: 'savane',
        decor: [['arbre', 160], ['arbre', 650], ['riviere']],
        acteurs: [{ t: 'cavaliere', x: -100, vers: 820 }],
      },
      {
        texte:
          "Dans cette forêt vivait un chasseur d'éléphants solitaire nommé Riallé. Il trouva l'inconnue près de son cheval, la conduisit dans sa case, alluma le feu et la soigna. Il crut d'abord avoir recueilli un jeune homme. Quand Yennenga ôta son déguisement, Riallé découvrit une femme, et quelle femme ! Les jours passèrent, puis les saisons. Le chasseur et la princesse s'aimèrent, et de leur union naquit un fils.",
        ciel: 'crepuscule', sol: 'savane',
        decor: [['case', 520], ['feu', 380], ['baobab', 120]],
        acteurs: [{ t: 'chasseur', x: 300 }, { t: 'guerriere', x: 450 }],
      },
      {
        texte:
          "Ils l'appelèrent Ouédraogo, qui signifie « l'étalon », en souvenir du cheval blanc qui avait conduit sa mère jusqu'à eux. L'enfant grandit fort et sage. Plus tard, il se rendit à Gambaga, où son grand-père, réconcilié avec Yennenga, l'accueillit avec joie et lui offrit des chevaux et des guerriers. Devenu adulte, Ouédraogo fonda le royaume de Tenkodogo. De lui descendent les Moose et leurs rois, les Moogho Naaba. Aujourd'hui encore, la statue de Yennenga à cheval veille sur Ouagadougou.",
        ciel: 'aube', sol: 'savane',
        decor: [['collines'], ['cases', 560]],
        acteurs: [{ t: 'cavalier', x: 120, vers: 420 }],
        fin: true,
      },
    ],
    quiz: {
      question: 'Que signifie le nom « Ouédraogo » ?',
      reponses: ["L'étalon", 'Le chasseur', 'La forêt'],
      bonne: 0,
    },
  },

  {
    id: 'crocodiles-sabou',
    titre: 'Les crocodiles sacrés de Sabou',
    categorie: 'legende',
    peuple: 'Moose (Mossi)',
    langues: ['fr', 'moore', 'dioula', 'fulfulde'],
    lieu: 'Sabou',
    region: 'Centre-Ouest',
    coords: [-2.2333, 12.0667],
    duree: 4,
    resume:
      "Perdu en pleine saison sèche, un chasseur est sauvé par un crocodile qui le guide jusqu'à l'eau. Depuis, à Sabou, les crocodiles de la mare ne sont jamais chassés.",
    morale: "La reconnaissance unit les hommes et les animaux. Le pacte protège encore aujourd'hui les crocodiles de la mare.",
    source:
      "Tradition orale du village de Sabou (province du Boulkiemdé). Plusieurs versions existent : on présente ici la plus répandue.",
    scenes: [
      {
        texte:
          "C'était au cœur d'une saison sèche terrible, comme les anciens n'en avaient jamais connu. Les mares étaient vides, les puits ne donnaient plus que de la boue et la terre se fendait sous le soleil. Pour nourrir sa famille, un chasseur de la région de Sabou partit en brousse à la poursuite d'une antilope. Il la suivit si loin, de buisson en buisson, qu'il perdit de vue tous les repères qu'il connaissait.",
        ciel: 'secheresse', sol: 'sable',
        decor: [['arbre-mort', 600], ['rochers', 200]],
        acteurs: [{ t: 'chasseur', x: 80, vers: 360 }],
      },
      {
        texte:
          "Il marcha pendant trois jours sous un soleil brûlant. Sa gourde était vide depuis longtemps, ses lèvres étaient fendues et ses jambes ne le portaient plus. Le soir du troisième jour, il s'écroula à l'ombre d'un arbre mort. « C'est ici que je vais mourir, pensa-t-il, loin des miens, sans que personne ne sache où me trouver. » Il ferma les yeux et attendit.",
        ciel: 'secheresse', sol: 'sable',
        decor: [['arbre-mort', 420]],
        acteurs: [{ t: 'chasseur', x: 380 }],
      },
      {
        texte:
          "Un bruit léger le réveilla. À quelques pas de lui, un grand crocodile le regardait, immobile. Le chasseur saisit son arc, mais il n'avait plus la force de le tendre. Étrangement, l'animal ne l'attaqua pas. Il fit demi-tour, avança de quelques pas, puis s'arrêta et tourna la tête vers lui, comme pour l'attendre. Le chasseur comprit que le crocodile voulait lui montrer quelque chose.",
        ciel: 'jour', sol: 'sable',
        decor: [['arbre-mort', 720]],
        acteurs: [{ t: 'crocodile', x: 300, vers: 560 }, { t: 'chasseur', x: 100, vers: 360 }],
        choix: [
          { label: 'Suivre le crocodile', vers: 'mare' },
          { label: 'Fuir l’animal', vers: 'fuir' },
        ],
      },
      {
        id: 'fuir',
        texte:
          "Le chasseur eut peur et voulut s'enfuir dans la direction opposée, mais il était trop faible : il tomba après quelques pas. Le crocodile revint vers lui, lentement, et s'arrêta encore à quelque distance, patient. Alors l'homme comprit qu'il n'avait rien à craindre. Il rassembla ses dernières forces et se mit à le suivre.",
        ciel: 'jour', sol: 'sable',
        decor: [['arbre-mort', 200]],
        acteurs: [{ t: 'crocodile', x: 500 }, { t: 'chasseur', x: 260 }],
        suite: 'mare',
      },
      {
        id: 'mare',
        texte:
          "Le crocodile le mena entre les rochers jusqu'à une mare cachée, que la sécheresse avait épargnée. L'eau y était fraîche et claire. Le chasseur s'agenouilla et but longuement, puis s'aspergea le visage. Il remercia l'animal, qui s'était glissé dans l'eau et le regardait, seuls ses yeux dépassant de la surface. Le lendemain, reposé, le chasseur retrouva le chemin de son village.",
        ciel: 'jour', sol: 'savane',
        decor: [['mare', 420], ['arbre', 680], ['rochers', 120]],
        acteurs: [{ t: 'crocodile', x: 470 }, { t: 'chasseur', x: 300 }],
      },
      {
        texte:
          "De retour à Sabou, il raconta son aventure devant les anciens réunis. Il leur fit jurer que jamais personne, ni eux ni leurs descendants, ne ferait de mal aux crocodiles de la mare. Les villageois s'installèrent près de l'eau, et le pacte se transmit de génération en génération. Aujourd'hui encore, on dit que les crocodiles de Sabou vivent en paix avec les habitants, et que les enfants peuvent s'en approcher sans crainte. On raconte même que, lorsqu'un vieux crocodile meurt, on l'enterre avec respect, comme un membre de la communauté.",
        ciel: 'crepuscule', sol: 'savane',
        decor: [['mare', 520], ['cases', 160]],
        acteurs: [{ t: 'crocodile', x: 560 }, { t: 'crocodile', x: 420 }, { t: 'foule', x: 160 }],
        fin: true,
      },
    ],
    quiz: {
      question: 'Pourquoi les crocodiles de Sabou sont-ils protégés ?',
      reponses: ['Un crocodile a sauvé un chasseur', 'Ils gardent un trésor', 'Ils ont été offerts par un roi'],
      bonne: 0,
    },
  },

  {
    id: 'soamba-katr',
    titre: 'Soamba le lièvre et Katr la hyène',
    categorie: 'conte',
    peuple: 'Moose (Mossi)',
    langues: ['fr', 'moore', 'dioula', 'fulfulde'],
    lieu: 'Ouahigouya (Yatenga)',
    region: 'Nord',
    coords: [-2.4214, 13.5828],
    duree: 5,
    resume:
      "Pendant la famine, Katr la hyène gloutonne veut garder tout le mil pour elle. Soamba le lièvre, petit mais rusé, lui donne une leçon. C'est à toi de choisir ses ruses.",
    morale: "La ruse du faible vient à bout de la force du glouton. Celui qui veut tout garder finit par tout perdre.",
    source:
      "Adaptation d'un conte de veillée moaga. Soamba (le lièvre) et Katr (la hyène) sont les personnages favoris des contes mossi, racontés le soir au clair de lune.",
    scenes: [
      {
        texte:
          "Au temps où les animaux parlaient encore, la pluie ne tomba pas pendant toute une année. Le mil sécha dans les champs, les greniers se vidèrent un à un et la faim s'installa dans la brousse. Une seule personne ne manquait de rien : Katr, la hyène. L'année précédente, elle avait rempli un immense grenier de mil, et elle le gardait jalousement, assise devant la porte du matin au soir.",
        ciel: 'secheresse', sol: 'sable',
        decor: [['grenier', 520], ['arbre-mort', 160]],
        acteurs: [{ t: 'hyene', x: 400 }],
      },
      {
        texte:
          "Soamba, le lièvre, avait faim, et ses voisins aussi : la pintade, le zébu, la tourterelle, tous maigrissaient de jour en jour. Soamba alla trouver Katr et lui parla poliment : « Grande sœur, prête-nous un peu de mil. À la prochaine récolte, nous te rendrons le double, je t'en donne ma parole. » Katr éclata d'un rire méchant : « Mon mil est à moi seule ! Que chacun se débrouille ! » Et elle lui claqua la porte au nez. Soamba réfléchit. Il était petit, mais il avait beaucoup d'idées…",
        ciel: 'jour', sol: 'sable',
        decor: [['grenier', 560]],
        acteurs: [{ t: 'lievre', x: 220 }, { t: 'hyene', x: 430 }],
        choix: [
          { label: 'Ruse du tambour : faire croire à une fête', vers: 'tambour' },
          { label: 'Ruse de la pluie : annoncer un orage', vers: 'pluie' },
        ],
      },
      {
        id: 'tambour',
        texte:
          "Soamba alla se cacher derrière la colline, prit un tambour et se mit à jouer de toutes ses forces. Entre deux roulements, il cria : « Katr ! Katr ! Le roi des animaux donne un grand festin ! Il y a de la viande grillée pour tous ceux qui arriveront les premiers ! » La gourmande hyène sentit déjà l'odeur de la viande. Elle partit en courant vers le village voisin… sans prendre le temps de fermer son grenier.",
        ciel: 'crepuscule', sol: 'sable',
        decor: [['collines'], ['grenier', 620]],
        acteurs: [{ t: 'lievre', x: 160 }, { t: 'hyene', x: 520, vers: 900 }],
        suite: 'partage',
      },
      {
        id: 'pluie',
        texte:
          "Soamba grimpa sur un grand rocher et regarda le ciel en criant : « Katr ! Katr ! Un orage terrible arrive de l'est ! Ton mil va être mouillé et il va pourrir ! Cours vite au marché acheter des nattes pour couvrir ton grenier ! » Katr regarda le ciel, eut peur pour son trésor et partit en courant vers le marché… sans prendre le temps de fermer son grenier.",
        ciel: 'orage', sol: 'sable',
        decor: [['rochers', 160], ['grenier', 620]],
        acteurs: [{ t: 'lievre', x: 180 }, { t: 'hyene', x: 520, vers: 900 }],
        suite: 'partage',
      },
      {
        id: 'partage',
        texte:
          "Aussitôt, Soamba appela tous les animaux du voisinage. « Chacun prend juste ce qu'il faut pour nourrir sa famille, pas un grain de plus ! » dit-il. La pintade, le zébu et la tourterelle remplirent leurs calebasses. Avant de partir, Soamba compta tout ce qui avait été pris et laissa dans le grenier une calebasse vide avec un message : « Ce que tu refuses de prêter, la brousse le reprend. Nous te rendrons le double. »",
        ciel: 'crepuscule', sol: 'sable',
        decor: [['grenier', 480]],
        acteurs: [{ t: 'lievre', x: 340 }, { t: 'oiseau', x: 600 }, { t: 'zebu', x: 160 }],
      },
      {
        texte:
          "Katr revint le soir, essoufflée et furieuse : il n'y avait eu ni festin ni orage. Elle vit son grenier entamé et hurla toute la nuit. Mais quand la pluie revint enfin et que le mil poussa, chaque animal vint lui rapporter le double de ce qu'il avait pris, comme Soamba l'avait promis. Son grenier n'avait jamais été aussi plein. La hyène comprit, un peu tard, que si elle avait partagé dès le début, elle aurait gagné autant… et des amis en plus.",
        ciel: 'nuit', sol: 'savane',
        decor: [['grenier', 520], ['baobab', 150]],
        acteurs: [{ t: 'hyene', x: 420 }, { t: 'lievre', x: 260 }],
        fin: true,
      },
    ],
    quiz: {
      question: 'Quel est le défaut de Katr la hyène dans ce conte ?',
      reponses: ['La gourmandise et l’égoïsme', 'La paresse', 'La timidité'],
      bonne: 0,
    },
  },

  {
    id: 'faux-depart',
    titre: 'Le faux départ du Moogho Naaba',
    categorie: 'histoire',
    peuple: 'Moose (Mossi)',
    langues: ['fr', 'moore', 'dioula', 'fulfulde'],
    lieu: 'Ouagadougou',
    region: 'Centre',
    coords: [-1.5197, 12.3714],
    duree: 4,
    resume:
      "Chaque vendredi matin, au palais de Ouagadougou, le roi des Mossi s'apprête à partir en guerre, puis renonce. Ce rituel rappelle une histoire ancienne de colère et de sagesse.",
    morale: "Un chef se doit de faire passer la paix de son peuple avant sa colère personnelle.",
    source:
      "Cérémonie du « Nabayius Gou », toujours pratiquée chaque vendredi au palais du Moogho Naaba. Son origine varie selon les récits ; on présente ici la version la plus souvent racontée.",
    scenes: [
      {
        texte:
          "Il y a plusieurs siècles, à Ouagadougou, régnait un Moogho Naaba, roi des Mossi. Il était respecté dans tout le royaume pour sa force et sa justice. Parmi ses épouses, il en aimait une plus que toutes les autres. Un jour, celle-ci demanda la permission d'aller rendre visite à sa famille, dans un royaume voisin. Le roi accepta. Mais les semaines passèrent, puis les mois, et la reine ne revint pas.",
        ciel: 'jour', sol: 'savane',
        decor: [['palais', 500], ['arbre', 120]],
        acteurs: [{ t: 'femme', x: 420, vers: 900 }],
      },
      {
        texte:
          "Le roi envoya des messagers pour la chercher, mais ils revinrent seuls. Alors son cœur se remplit de tristesse, puis de colère. Un matin, à l'aube, il se leva, fit seller son cheval et revêtit sa tenue rouge de guerre. Il fit battre les tambours et rassembla ses guerriers dans la cour du palais : il irait chercher son épouse par les armes, quoi qu'il en coûte.",
        ciel: 'aube', sol: 'savane',
        decor: [['palais', 560]],
        acteurs: [{ t: 'roi', x: 320 }, { t: 'cheval', x: 160 }],
      },
      {
        texte:
          "Mais ses ministres et les dignitaires de la cour se jetèrent à ses pieds. Le plus ancien parla : « Naaba, ta douleur est grande et nous la partageons. Mais si tu pars en guerre pour une affaire de cœur, ce sont les villages qui brûleront, les champs qui seront abandonnés et les mères qui pleureront leurs fils. Le roi n'appartient pas à lui-même : il appartient à son peuple. Reste avec nous. » Le roi resta un long moment silencieux, la main sur la bride de son cheval.",
        ciel: 'aube', sol: 'savane',
        decor: [['palais', 600]],
        acteurs: [{ t: 'roi', x: 420 }, { t: 'foule', x: 200 }],
        choix: [
          { label: 'Le roi part en guerre', vers: 'guerre' },
          { label: 'Le roi écoute ses ministres', vers: 'sagesse' },
        ],
      },
      {
        id: 'guerre',
        texte:
          "S'il était parti, la guerre aurait éclaté entre les deux royaumes. Des villages auraient brûlé, des familles auraient été séparées et des récoltes perdues, tout cela pour la colère d'un seul homme. C'est justement ce que le roi, au fond de lui, ne voulait pas…",
        ciel: 'orage', sol: 'savane',
        decor: [['collines']],
        acteurs: [{ t: 'cavalier', x: 200, vers: 600 }],
        suite: 'sagesse',
      },
      {
        id: 'sagesse',
        texte:
          "Le roi écouta la voix de la sagesse. Lentement, il descendit de cheval. Il retira sa tenue rouge et revêtit le boubou blanc de la paix. Puis il dit à ses ministres : « Vous avez raison. Un roi doit d'abord penser à son peuple. » Il resta à Ouagadougou et continua de gouverner avec justice. Les dignitaires furent soulagés, et le peuple célébra la sagesse de son souverain.",
        ciel: 'jour', sol: 'savane',
        decor: [['palais', 520]],
        acteurs: [{ t: 'roi', x: 360 }, { t: 'foule', x: 160 }],
      },
      {
        texte:
          "Depuis, chaque vendredi matin, le Moogho Naaba rejoue cette scène dans la cour de son palais. Les dignitaires arrivent, assis selon leur rang. Le cheval est sellé, le roi paraît vêtu de rouge, prêt à partir… Les ministres le supplient de rester. Le roi rentre alors dans le palais et revient vêtu de blanc : il a renoncé à la guerre. On appelle cette cérémonie le « faux départ ». Les visiteurs peuvent y assister : c'est une leçon de sagesse vieille de plusieurs siècles.",
        ciel: 'aube', sol: 'savane',
        decor: [['palais', 520], ['baobab', 120]],
        acteurs: [{ t: 'roi', x: 380 }, { t: 'cheval', x: 220 }, { t: 'foule', x: 620 }],
        fin: true,
      },
    ],
    quiz: {
      question: 'Quel jour a lieu la cérémonie du faux départ ?',
      reponses: ['Le vendredi', 'Le dimanche', 'Le premier jour de l’année'],
      bonne: 0,
    },
  },

  {
    id: 'silures-dafra',
    titre: 'Les silures sacrés de Dafra',
    categorie: 'legende',
    peuple: 'Bobo et Dioula',
    langues: ['fr', 'dioula', 'moore', 'fulfulde'],
    lieu: 'Dafra, près de Bobo-Dioulasso',
    region: 'Hauts-Bassins',
    coords: [-4.255, 11.125],
    duree: 4,
    resume:
      "Au creux d'une falaise près de Bobo-Dioulasso, une mare abrite des silures géants. On dit qu'ils portent l'esprit des ancêtres et qu'ils écoutent les vœux des visiteurs.",
    morale: "Respecter la nature, c'est respecter ses ancêtres.",
    source:
      "Tradition orale de la région de Bobo-Dioulasso ; le site de Dafra reste un lieu de culte et de pèlerinage où des offrandes sont faites aux poissons sacrés.",
    scenes: [
      {
        texte:
          "À quelques kilomètres de Bobo-Dioulasso, un étroit sentier descend entre les blocs de grès. Plus on avance, plus l'air devient frais. Au fond d'une faille, une eau claire tombe en petite cascade dans une mare entourée de rochers. C'est Dafra, l'un des lieux les plus sacrés de la région. Les pèlerins y viennent de loin, en silence, guidés par les gardiens du site.",
        ciel: 'jour', sol: 'roche',
        decor: [['falaise'], ['cascade', 520]],
        acteurs: [{ t: 'femme', x: 80, vers: 320 }],
      },
      {
        texte:
          "On raconte qu'autrefois, les ancêtres qui s'installèrent dans la région firent alliance avec les génies de l'eau. Les génies acceptèrent de protéger les hommes, de leur donner l'eau et la fertilité, à une condition : qu'on respecte leur demeure. Pour sceller ce pacte, les esprits prirent la forme de grands silures, ces poissons à moustaches qui vivent au fond de la mare. Certains, dit-on, sont plus vieux que les plus vieux des hommes.",
        ciel: 'crepuscule', sol: 'eau',
        decor: [['falaise'], ['cascade', 520]],
        acteurs: [{ t: 'silure', x: 300, vers: 520 }, { t: 'silure', x: 600, vers: 380 }],
      },
      {
        texte:
          "Depuis, il est strictement interdit de pêcher, de blesser ou même de toucher ces poissons. Ceux qui viennent à Dafra apportent des offrandes, souvent des poulets, et confient leur vœu au gardien : réussir une récolte, avoir un enfant, guérir d'une maladie, réussir un voyage. Le gardien présente l'offrande aux silures et prononce les paroles rituelles. Tout le monde attend, les yeux fixés sur l'eau.",
        ciel: 'jour', sol: 'roche',
        decor: [['falaise'], ['mare', 420]],
        acteurs: [{ t: 'femme', x: 260 }, { t: 'silure', x: 450 }],
        choix: [
          { label: 'Apporter une offrande', vers: 'offrande' },
          { label: 'Observer en silence', vers: 'silence' },
        ],
      },
      {
        id: 'offrande',
        texte:
          "Tu tends ton offrande au gardien du lieu. Il s'avance au bord de l'eau, murmure ton vœu, puis présente l'offrande aux silures. Si les poissons la prennent, dit-on, le vœu sera exaucé ; s'ils la refusent, il faudra revenir. L'eau frémit… Une grande ombre remonte lentement du fond, puis une deuxième. Le gardien sourit : les génies ont entendu.",
        ciel: 'jour', sol: 'eau',
        decor: [['falaise'], ['mare', 420]],
        acteurs: [{ t: 'silure', x: 300, vers: 440 }],
        suite: 'fin',
      },
      {
        id: 'silence',
        texte:
          "Tu restes assis sur un rocher, au bord de la mare, sans faire de bruit. Peu à peu, les silures remontent du fond et glissent sous la surface, si près que tu vois leurs longues moustaches. Le gardien s'assoit à côté de toi et chuchote : « Beaucoup viennent demander. Peu viennent simplement écouter. Les anciens disent que le silence aussi est une offrande. »",
        ciel: 'crepuscule', sol: 'eau',
        decor: [['falaise'], ['mare', 420]],
        acteurs: [{ t: 'silure', x: 500, vers: 300 }],
        suite: 'fin',
      },
      {
        id: 'fin',
        texte:
          "Dafra reste aujourd'hui un lieu sacré, et la légende y joue un rôle très concret. En interdisant de pêcher et de souiller l'eau, elle protège la source, les poissons et toute la vallée. Les anciens avaient compris, bien avant nous, que respecter la nature, c'est se protéger soi-même. Quand tu quittes Dafra, le chemin remonte vers la lumière, et tu emportes avec toi un peu de la fraîcheur de la mare.",
        ciel: 'crepuscule', sol: 'roche',
        decor: [['falaise'], ['cascade', 520]],
        acteurs: [{ t: 'oiseau', x: 100, vers: 700 }],
        fin: true,
      },
    ],
    quiz: {
      question: 'Quels animaux sont sacrés à Dafra ?',
      reponses: ['Des silures (poissons)', 'Des crocodiles', 'Des tortues'],
      bonne: 0,
    },
  },

  {
    id: 'pics-sindou',
    titre: 'Les gardiens de pierre de Sindou',
    categorie: 'legende',
    peuple: 'Sénoufo',
    langues: ['fr', 'dioula', 'moore', 'fulfulde'],
    lieu: 'Sindou',
    region: 'Cascades',
    coords: [-5.1667, 10.6667],
    duree: 4,
    resume:
      "Les aiguilles de grès de Sindou se dressent comme une armée figée. Les Sénoufo y voient un refuge ancestral, habité par des esprits qui protègent le pays.",
    morale: "Les lieux gardent la mémoire de ceux qui les ont habités ; les respecter, c'est se protéger soi-même.",
    source:
      "Tradition orale sénoufo de la région de Sindou. Le site des Pics de Sindou est aujourd'hui protégé et certaines de ses parties sont réservées aux rites.",
    scenes: [
      {
        texte:
          "Tout à l'ouest du Burkina, non loin de la frontière du Mali, se dresse une longue chaîne de pics de grès aux formes étranges. Le vent et la pluie les ont sculptés pendant des millions d'années : certains ressemblent à des tours, d'autres à des champignons géants, d'autres encore à des silhouettes humaines. Ce sont les Pics de Sindou. Au lever du soleil, la pierre devient rose, puis orange, puis dorée.",
        ciel: 'aube', sol: 'roche',
        decor: [['pics', 400]],
        acteurs: [{ t: 'oiseau', x: 60, vers: 760 }],
      },
      {
        texte:
          "Les anciens sénoufo racontent que, lorsque leurs ancêtres arrivèrent dans la région, ils étaient poursuivis par des ennemis plus nombreux et mieux armés. Épuisés, ils se réfugièrent au pied des pics. Les rochers semblèrent s'ouvrir pour les accueillir : les fugitifs se cachèrent dans leurs couloirs étroits, où les ennemis n'osèrent pas les suivre. Pendant des jours, ils vécurent là, protégés par la pierre.",
        ciel: 'crepuscule', sol: 'roche',
        decor: [['pics', 450]],
        acteurs: [{ t: 'foule', x: 120, vers: 380 }],
      },
      {
        texte:
          "Quand le danger fut passé, les ancêtres voulurent remercier ce lieu qui les avait sauvés. Autour du feu, le chef et les sages firent un pacte avec les esprits des pierres : les hommes garderaient ces lieux purs, ne les souilleraient jamais et viendraient y faire leurs sacrifices ; en échange, les esprits protégeraient le village. C'est ainsi que le village de Sindou fut fondé au pied des pics.",
        ciel: 'nuit', sol: 'roche',
        decor: [['pics', 420], ['feu', 300]],
        acteurs: [{ t: 'griot', x: 220 }],
        choix: [
          { label: 'Gravir les pics de nuit', vers: 'nuit' },
          { label: 'Attendre le jour avec le guide', vers: 'guide' },
        ],
      },
      {
        id: 'nuit',
        texte:
          "Tu veux grimper tout de suite, mais le guide te retient par le bras : « La nuit, les pics appartiennent aux esprits. Personne ne s'y aventure sans avoir demandé la permission aux anciens. Ceux qui ont essayé se sont perdus dans les couloirs. » Tu regardes les grandes silhouettes noires qui se découpent sous les étoiles, et tu décides d'attendre l'aube.",
        ciel: 'nuit', sol: 'roche',
        decor: [['pics', 420]],
        acteurs: [{ t: 'chasseur', x: 300 }],
        suite: 'guide',
      },
      {
        id: 'guide',
        texte:
          "Au matin, le guide te conduit entre les aiguilles de grès. Le chemin serpente entre les rochers, monte, descend, passe sous des arches naturelles. Le guide te montre des endroits où l'on ne doit pas marcher et d'autres où l'on fait encore des offrandes. Certaines pierres ressemblent à des guerriers figés, d'autres à des masques. « Ce sont nos gardiens, dit-il simplement. Ils veillent sur nous depuis toujours. »",
        ciel: 'jour', sol: 'roche',
        decor: [['pics', 420]],
        acteurs: [{ t: 'chasseur', x: 120, vers: 360 }, { t: 'griot', x: 60, vers: 280 }],
      },
      {
        texte:
          "Aujourd'hui, les Pics de Sindou sont un site protégé, et des visiteurs du monde entier viennent les admirer. Mais pour les gens de Sindou, ce n'est pas seulement un beau paysage. C'est une mémoire vivante, le lieu où leurs ancêtres ont été sauvés. On s'y promène avec respect, on y écoute les guides du village, et on laisse les lieux sacrés aux esprits qui les habitent.",
        ciel: 'crepuscule', sol: 'roche',
        decor: [['pics', 420], ['cases', 120]],
        acteurs: [],
        fin: true,
      },
    ],
    quiz: {
      question: 'Selon la légende, quel rôle ont joué les pics pour les ancêtres sénoufo ?',
      reponses: ['Un refuge contre leurs ennemis', 'Une mine d’or', 'Un lieu de marché'],
      bonne: 0,
    },
  },

  {
    id: 'diaba-lompo',
    titre: 'Diaba Lompo, le roi venu du ciel',
    categorie: 'histoire',
    peuple: 'Gulmanceba (Gourmantché)',
    langues: ['fr', 'gulmancema', 'moore', 'dioula', 'fulfulde'],
    lieu: "Fada N'Gourma",
    region: 'Est',
    coords: [0.3584, 12.0616],
    duree: 4,
    resume:
      "Les Gourmantché racontent que le fondateur de leur royaume, Diaba Lompo, est descendu du ciel. Récit mi-historique, mi-légendaire, de la naissance du royaume du Gulmu.",
    morale: "Un peuple se rassemble autour d'un récit commun qui donne sens à son histoire.",
    source:
      "Tradition orale gulmance sur l'origine du royaume du Gulmu, dont Fada N'Gourma est la capitale traditionnelle. Les détails varient selon les lignages.",
    scenes: [
      {
        texte:
          "Dans l'est du Burkina Faso, les savanes s'étendent à perte de vue jusqu'aux grandes forêts de la Tapoa, où vivent les éléphants, les buffles et les lions. C'est le Gulmu, le pays des Gourmantché. Autrefois, dit-on, les familles y vivaient dispersées, chacune dans son coin de brousse, sans roi pour les unir ni pour régler leurs disputes.",
        ciel: 'jour', sol: 'savane',
        decor: [['collines'], ['arbre', 200], ['arbre', 620]],
        acteurs: [{ t: 'zebu', x: 300, vers: 480 }],
      },
      {
        texte:
          "Les anciens racontent qu'une nuit, une grande lumière descendit du ciel au-dessus de la savane. Les chasseurs qui étaient en brousse la virent se poser doucement sur la terre. Quand ils s'approchèrent, ils trouvèrent un homme debout au milieu de la lumière. Il était grand, calme, et parlait avec autorité. Il se nommait Diaba Lompo.",
        ciel: 'nuit', sol: 'savane',
        decor: [['collines'], ['lumiere', 400]],
        acteurs: [{ t: 'roi', x: 400 }],
      },
      {
        texte:
          "Les familles dispersées entendirent parler de cet homme venu d'en haut et vinrent le voir. Diaba Lompo les écouta, régla leurs querelles avec justice et leur enseigna à vivre ensemble, à partager la terre et à se défendre. Les chefs de famille, impressionnés par sa sagesse, le reconnurent comme leur roi. Il devint le premier souverain du Gulmu.",
        ciel: 'jour', sol: 'savane',
        decor: [['cases', 560], ['baobab', 120]],
        acteurs: [{ t: 'roi', x: 380 }, { t: 'foule', x: 200 }],
        choix: [
          { label: 'Et si c’était un vrai homme ?', vers: 'histoire' },
          { label: 'Écouter la suite de la légende', vers: 'suite' },
        ],
      },
      {
        id: 'histoire',
        texte:
          "Pour les historiens, Diaba Lompo fut sans doute un chef venu d'une autre région, qui réussit à unifier plusieurs chefferies il y a plusieurs siècles. La légende de la lumière tombée du ciel exprime une idée importante : son pouvoir était sacré. Un roi « venu d'en haut » ne pouvait être contesté par personne. Légende et histoire ne s'opposent pas : elles disent la même chose de deux façons.",
        ciel: 'jour', sol: 'savane',
        decor: [['cases', 400]],
        acteurs: [{ t: 'griot', x: 300 }],
        suite: 'suite',
      },
      {
        id: 'suite',
        texte:
          "Diaba Lompo eut de nombreux descendants. Selon la tradition, ses fils et petits-fils fondèrent de nombreuses chefferies dans tout l'Est du pays. Aujourd'hui encore, le roi du Gulmu, qui siège à Fada N'Gourma, se dit héritier de Diaba Lompo. Chaque fois que les griots chantent la généalogie des rois, c'est par son nom qu'ils commencent.",
        ciel: 'crepuscule', sol: 'savane',
        decor: [['palais', 520], ['arbre', 140]],
        acteurs: [{ t: 'roi', x: 380 }, { t: 'foule', x: 620 }],
        fin: true,
      },
    ],
    quiz: {
      question: 'Quelle ville est la capitale traditionnelle du Gulmu ?',
      reponses: ["Fada N'Gourma", 'Dori', 'Gaoua'],
      bonne: 0,
    },
  },

  {
    id: 'loropeni',
    titre: "Le mystère des ruines de Loropéni",
    categorie: 'histoire',
    peuple: 'Lobi, Koulango et Gan',
    langues: ['fr', 'dioula', 'moore', 'fulfulde'],
    lieu: 'Loropéni',
    region: 'Sud-Ouest',
    coords: [-3.555, 10.3],
    duree: 4,
    resume:
      "De hautes murailles de pierre se cachent dans la brousse du Sud-Ouest. Premier site du Burkina inscrit au patrimoine mondial de l'UNESCO (2009), elles gardent le souvenir du commerce de l'or.",
    morale: "Les pierres parlent à ceux qui prennent le temps de les écouter.",
    source:
      "UNESCO, « Ruines de Loropéni » (inscription 2009) ; traditions orales locales sur l'occupation du site.",
    scenes: [
      {
        texte:
          "Près de Loropéni, dans le Sud-Ouest, au milieu des karités et des hautes herbes, se dressent de grands murs de pierre et de latérite. Certains font plus de six mètres de haut. Ils forment une vaste enceinte où personne n'habite plus depuis longtemps. Les arbres ont poussé à l'intérieur, et les oiseaux nichent dans les fissures. Les habitants des environs passent devant avec respect.",
        ciel: 'jour', sol: 'savane',
        decor: [['murailles', 420], ['arbre', 120]],
        acteurs: [],
      },
      {
        texte:
          "Les archéologues pensent que ces murailles ont plus de mille ans. Elles faisaient partie d'un ensemble de sites fortifiés liés à l'extraction et au commerce de l'or. La région était alors riche en or, et ce métal précieux partait, de marché en marché, jusqu'aux grandes routes caravanières qui traversaient le Sahara vers l'Afrique du Nord.",
        ciel: 'jour', sol: 'savane',
        decor: [['murailles', 420]],
        acteurs: [{ t: 'foule', x: 160 }, { t: 'zebu', x: 620, vers: 760 }],
      },
      {
        texte:
          "Qui a construit ces murs, et pourquoi les a-t-on abandonnés ? Les traditions orales évoquent plusieurs peuples qui se sont succédé sur ce site, dont les Lohron et les Koulango. D'après les recherches, le site aurait été abandonné au début du XIXe siècle. Mais beaucoup de questions restent sans réponse, et chacun a sa version.",
        ciel: 'crepuscule', sol: 'savane',
        decor: [['murailles', 420]],
        acteurs: [{ t: 'griot', x: 220 }],
        choix: [
          { label: 'Écouter la légende du griot', vers: 'legende' },
          { label: 'Écouter l’archéologue', vers: 'science' },
        ],
      },
      {
        id: 'legende',
        texte:
          "Le soir, autour du feu, le griot sourit et baisse la voix : « Certains disent que ces murs gardaient un trésor immense. Quand les hommes devinrent trop avides et se battirent pour l'or, les esprits cachèrent le trésor sous la terre et les habitants durent partir. Depuis, on ne touche pas aux pierres de Loropéni sans raison. Celui qui en emporte une n'a que des malheurs. »",
        ciel: 'nuit', sol: 'savane',
        decor: [['murailles', 420], ['feu', 220]],
        acteurs: [{ t: 'griot', x: 300 }],
        suite: 'fin',
      },
      {
        id: 'science',
        texte:
          "L'archéologue, lui, montre ses carnets de fouille. « Les datations montrent que le site était occupé au moins depuis le XIe siècle. Les murs protégeaient sans doute les habitants, les réserves et peut-être l'or lui-même. Il reste beaucoup à découvrir. C'est pour cela que le site est protégé : pour que les chercheurs puissent continuer à comprendre ceux qui ont vécu ici. »",
        ciel: 'jour', sol: 'savane',
        decor: [['murailles', 420]],
        acteurs: [{ t: 'chasseur', x: 260 }],
        suite: 'fin',
      },
      {
        id: 'fin',
        texte:
          "Légende ou science, les deux racontent la même chose : ici vivait une société riche, organisée et capable de bâtir des ouvrages immenses. En 2009, les ruines de Loropéni sont devenues le premier site du Burkina Faso inscrit au patrimoine mondial de l'UNESCO. Elles rappellent que l'Afrique de l'Ouest avait déjà, il y a mille ans, de grandes cités et un commerce actif.",
        ciel: 'crepuscule', sol: 'savane',
        decor: [['murailles', 420], ['baobab', 700]],
        acteurs: [],
        fin: true,
      },
    ],
    quiz: {
      question: 'En quelle année les ruines de Loropéni ont-elles été inscrites à l’UNESCO ?',
      reponses: ['2009', '1984', '2019'],
      bonne: 0,
    },
  },

  {
    id: 'berger-peul',
    titre: 'Le jeune berger et la vache blanche',
    categorie: 'conte',
    peuple: 'Peuls (Fulɓe)',
    langues: ['fr', 'fulfulde', 'moore', 'dioula'],
    lieu: 'Dori',
    region: 'Sahel',
    coords: [-0.0345, 14.0354],
    duree: 5,
    resume:
      "Dans le Sahel, un jeune berger peul refuse d'abandonner une vieille vache blanche pendant la transhumance. Sa fidélité sera récompensée.",
    morale: "La fidélité et le soin envers ceux qui sont faibles ne sont jamais perdus.",
    source:
      "Conte inspiré des récits pastoraux peuls du Sahel (région de Dori), où la relation entre le berger et son troupeau est centrale. Adaptation du groupe.",
    scenes: [
      {
        texte:
          "Dans le Sahel, autour de Dori, vivait un jeune berger peul nommé Hamadou. Son père, devenu vieux, lui avait confié le troupeau familial : une trentaine de bêtes, des zébus aux longues cornes en forme de lyre. Parmi elles se trouvait une vieille vache blanche, lente et fatiguée, que tout le monde appelait simplement « la Blanche ». Elle avait donné du lait à la famille pendant tant d'années qu'Hamadou ne se souvenait pas d'un temps sans elle.",
        ciel: 'aube', sol: 'sable',
        decor: [['dunes'], ['acacia', 600]],
        acteurs: [{ t: 'berger', x: 200 }, { t: 'zebu', x: 330 }, { t: 'zebu', x: 450 }],
      },
      {
        texte:
          "Vint la saison sèche. L'herbe disparut, les mares s'asséchèrent. Comme chaque année, il fallut partir en transhumance, loin vers le sud, pour trouver de l'herbe et de l'eau. Les autres bergers dirent à Hamadou : « Laisse cette vieille vache au campement. Elle marche trop lentement, elle va retarder tout le monde. De toute façon, elle ne survivra pas au voyage. » Hamadou regarda la Blanche, qui le regardait aussi.",
        ciel: 'secheresse', sol: 'sable',
        decor: [['dunes'], ['acacia', 160]],
        acteurs: [{ t: 'berger', x: 300 }, { t: 'zebu', x: 460 }],
        choix: [
          { label: 'Garder la vieille vache', vers: 'garder' },
          { label: 'L’abandonner', vers: 'abandon' },
        ],
      },
      {
        id: 'abandon',
        texte:
          "Hamadou fit quelques pas sans elle… puis s'arrêta. Il se retourna : la vieille vache était restée immobile et le suivait des yeux. Il se souvint de toutes les années où son lait avait nourri ses frères et sœurs, des soirs où son père lui parlait d'elle avec tendresse. « On n'abandonne pas ceux qui nous ont nourris », se dit-il. Il revint la chercher.",
        ciel: 'secheresse', sol: 'sable',
        decor: [['dunes']],
        acteurs: [{ t: 'berger', x: 500, vers: 320 }, { t: 'zebu', x: 220 }],
        suite: 'garder',
      },
      {
        id: 'garder',
        texte:
          "Hamadou décida de marcher au rythme de la vieille vache. Les autres bergers prirent de l'avance et disparurent bientôt à l'horizon, dans un nuage de poussière. Il se retrouva seul avec ses bêtes au milieu de la brousse. Les jours passèrent. Un soir, il découvrit que sa gourde était vide, et il n'y avait aucun puits à des kilomètres à la ronde. Les bêtes meuglaient de soif.",
        ciel: 'crepuscule', sol: 'sable',
        decor: [['dunes'], ['acacia', 640]],
        acteurs: [{ t: 'berger', x: 260 }, { t: 'zebu', x: 380 }],
      },
      {
        texte:
          "C'est alors que la vieille vache se mit à marcher d'un pas décidé, dans une direction que plus personne ne prenait depuis des années. Elle avait connu ces chemins dans sa jeunesse, avec le père d'Hamadou. Le jeune berger hésita, puis lui fit confiance. Toute la nuit, sous les étoiles, le troupeau suivit la Blanche en silence.",
        ciel: 'nuit', sol: 'sable',
        decor: [['dunes']],
        acteurs: [{ t: 'zebu', x: 160, vers: 520 }, { t: 'berger', x: 40, vers: 400 }],
      },
      {
        texte:
          "À l'aube, la vieille vache s'arrêta au bord d'une mare oubliée, entourée d'herbe verte et d'acacias. Le troupeau but et mangea tout son soûl. Hamadou alla prévenir les autres bergers, qui peinaient plus loin autour d'un puits presque à sec, et les ramena à la mare. Ce jour-là, tous comprirent que la vieille vache portait la mémoire des chemins. Depuis, dit-on, les Peuls n'abandonnent jamais leurs vieilles bêtes : leur sagesse vaut plus que leur force.",
        ciel: 'aube', sol: 'savane',
        decor: [['mare', 460], ['acacia', 700]],
        acteurs: [{ t: 'zebu', x: 400 }, { t: 'berger', x: 260 }, { t: 'zebu', x: 560 }],
        fin: true,
      },
    ],
    quiz: {
      question: 'Pourquoi la vieille vache a-t-elle pu sauver le troupeau ?',
      reponses: ['Elle connaissait les anciens chemins vers l’eau', 'Elle était la plus rapide', 'Elle savait parler'],
      bonne: 0,
    },
  },

  {
    id: 'masques-feuilles',
    titre: 'Do et les masques de feuilles',
    categorie: 'legende',
    peuple: 'Bwaba',
    langues: ['fr', 'dioula', 'moore', 'fulfulde'],
    lieu: 'Dédougou',
    region: 'Boucle du Mouhoun',
    coords: [-3.463, 12.463],
    duree: 4,
    resume:
      "Chez les Bwaba, quand les premières pluies arrivent, des masques couverts de feuilles fraîches sortent de la brousse. Ils incarnent Do, la force qui renouvelle la vie.",
    morale: "La nature se renouvelle chaque année ; les hommes doivent l'accompagner avec respect.",
    source:
      "Traditions bwaba de la Boucle du Mouhoun ; les masques de feuilles sont au cœur des cérémonies de début de saison des pluies et du Festival des masques de Dédougou (FESTIMA).",
    scenes: [
      {
        texte:
          "Dans la Boucle du Mouhoun, chez les Bwaba, la saison sèche touche à sa fin. La terre est dure comme de la pierre, les arbres ont perdu leurs feuilles et la poussière rougit le ciel. Dans les villages, les greniers se vident et tout le monde lève les yeux vers le ciel en attendant les premières pluies. C'est le moment où l'on prépare la grande fête des masques.",
        ciel: 'secheresse', sol: 'savane',
        decor: [['cases', 500], ['arbre-mort', 160]],
        acteurs: [{ t: 'foule', x: 360 }],
      },
      {
        texte:
          "Les Bwaba racontent que Do, la force de la brousse et du renouveau, envoie alors ses messagers parmi les hommes. Les jeunes initiés partent en secret dans la brousse. Ils y cueillent des branches et des feuilles fraîches de certains arbres, puis s'en couvrent entièrement le corps, de la tête aux pieds. Quand ils sortent de la brousse, ce ne sont plus des jeunes gens : ce sont les masques de feuilles de Do.",
        ciel: 'crepuscule', sol: 'savane',
        decor: [['arbre', 300], ['arbre', 600]],
        acteurs: [{ t: 'masque', x: 450 }],
      },
      {
        texte:
          "Au son des tambours et des flûtes, les masques de feuilles entrent au village en dansant. Ils tournent, sautent, balaient le sol avec leurs feuilles. On dit qu'ils chassent les malheurs, les maladies et les impuretés de l'année passée, et qu'ils appellent la pluie. Les femmes chantent, les enfants courent derrière eux en riant, puis s'enfuient quand un masque se retourne.",
        ciel: 'orage', sol: 'savane',
        decor: [['cases', 560]],
        acteurs: [{ t: 'masque', x: 160, vers: 420 }, { t: 'masque', x: 40, vers: 280 }, { t: 'foule', x: 640 }],
        choix: [
          { label: 'Danser avec les masques', vers: 'danse' },
          { label: 'Regarder de loin', vers: 'regarder' },
        ],
      },
      {
        id: 'danse',
        texte:
          "Tu rejoins le cercle au son des tambours. Les masques tournent autour de toi, si près que tu sens l'odeur des feuilles fraîches, une odeur de terre mouillée. Les anciens sourient et battent des mains : la pluie ne tardera plus. Pendant toute la nuit, le village danse avec Do.",
        ciel: 'orage', sol: 'savane',
        decor: [['cases', 560], ['feu', 360]],
        acteurs: [{ t: 'masque', x: 260 }, { t: 'masque', x: 460 }],
        suite: 'fin',
      },
      {
        id: 'regarder',
        texte:
          "Tu observes depuis l'ombre d'un grand karité. Un ancien vient s'asseoir près de toi et t'explique : « Le masque n'est pas un homme déguisé. Quand il porte les feuilles, c'est Do qui marche parmi nous. Il ne parle pas, il ne mange pas, il danse pour nous tous. » Tu regardes les masques avec d'autres yeux.",
        ciel: 'crepuscule', sol: 'savane',
        decor: [['arbre', 200], ['cases', 600]],
        acteurs: [{ t: 'griot', x: 260 }, { t: 'masque', x: 520 }],
        suite: 'fin',
      },
      {
        id: 'fin',
        texte:
          "Le soir même, de gros nuages s'amoncellent et les premières gouttes tombent sur la terre sèche. Les enfants crient de joie. Après la fête, les initiés retournent en brousse et rendent leurs feuilles à la nature : rien de ce qui vient de Do ne doit être gaspillé. Aujourd'hui, les masques bwaba se montrent aussi au Festival international des masques de Dédougou, le FESTIMA, où des troupes de toute l'Afrique de l'Ouest viennent danser.",
        ciel: 'pluie', sol: 'savane',
        decor: [['cases', 500], ['arbre', 160]],
        acteurs: [{ t: 'foule', x: 320 }],
        fin: true,
      },
    ],
    quiz: {
      question: 'À quel moment de l’année sortent les masques de feuilles ?',
      reponses: ['Au début de la saison des pluies', 'En pleine saison sèche', 'À la fin des récoltes'],
      bonne: 0,
    },
  },
  {
    id: 'yempabou-antilope',
    titre: "Yempabou et l'antilope de la Tapoa",
    categorie: 'conte',
    peuple: 'Gulmanceba (Gourmantché)',
    langues: ['fr', 'gulmancema', 'moore', 'dioula', 'fulfulde'],
    lieu: 'Kantchari',
    region: 'Est',
    coords: [1.517, 12.4775],
    duree: 7,
    resume:
      "Pendant une famine, un jeune chasseur gourmantché épargne une antilope blessée. Elle lui offre une calebasse qui se remplit chaque matin, à une condition : ne jamais révéler son secret. Tiendra-t-il parole ?",
    morale: "La parole donnée est sacrée, et le bien que l'on fait en silence finit toujours par être connu.",
    source:
      "Conte écrit par le groupe dans la tradition des récits de chasseurs du Gulmu, région de Kantchari (Tapoa) : la bête de brousse épargnée, le génie protecteur, l'interdit de la parole. Pour des contes recueillis sur place, voir J. Jégu, « Contes gourmantchés de Kantchari et Botou ».",
    scenes: [
      {
        id: 'debut',
        texte:
          "Il y a bien longtemps, à Kantchari, dans le pays gulmu, vivait un jeune chasseur nommé Yempabou. Son père était mort quand il était enfant, et il vivait seul avec sa mère dans une petite case au bord du village. Cette année-là, les pluies s'étaient arrêtées trop tôt. Le mil n'avait pas mûri, les greniers étaient vides, et dans chaque concession on ne faisait plus qu'un repas par jour.",
        ciel: 'secheresse', sol: 'savane',
        decor: [['cases', 560], ['baobab', 140]],
        acteurs: [{ t: 'chasseur', x: 300 }, { t: 'femme', x: 420 }],
      },
      {
        texte:
          "Un matin, sa mère lui dit d'une voix faible : « Mon fils, il ne reste plus rien dans la marmite. » Yempabou prit son arc et ses flèches et partit vers la grande forêt de la Tapoa, là où les anciens disaient que vivaient encore le buffle, l'éléphant et l'antilope. Il marcha toute la journée sans rien voir. Le soir, épuisé, il entendit une plainte derrière un buisson.",
        ciel: 'crepuscule', sol: 'savane',
        decor: [['arbre', 180], ['arbre', 620], ['acacia', 420]],
        acteurs: [{ t: 'chasseur', x: 60, vers: 360 }],
      },
      {
        texte:
          "C'était une antilope magnifique, à la robe rousse et aux longues cornes, avec une étoile blanche sur le front. Sa patte était prise dans un vieux piège. En voyant le chasseur, elle ne chercha pas à fuir : elle le regarda droit dans les yeux. Yempabou pensa à sa mère qui avait faim. Avec cette bête, ils mangeraient pendant des jours…",
        ciel: 'crepuscule', sol: 'savane',
        decor: [['arbre', 640], ['rochers', 160]],
        acteurs: [{ t: 'chasseur', x: 240 }, { t: 'antilope', x: 480 }],
        choix: [
          { label: 'Tirer une flèche', vers: 'tirer' },
          { label: 'Libérer l’antilope', vers: 'liberer' },
        ],
      },
      {
        id: 'tirer',
        texte:
          "Yempabou tendit son arc. Mais au moment de lâcher la flèche, l'antilope parla, d'une voix douce comme celle d'une vieille femme : « Chasseur, si tu me tues, tu nourriras ta mère pendant trois jours. Si tu me laisses la vie, je la nourrirai jusqu'au retour des pluies. » Les mains de Yempabou se mirent à trembler. Il baissa son arc.",
        ciel: 'nuit', sol: 'savane',
        decor: [['arbre', 640]],
        acteurs: [{ t: 'chasseur', x: 240 }, { t: 'antilope', x: 480 }],
        suite: 'liberer',
      },
      {
        id: 'liberer',
        texte:
          "Yempabou posa son arc, s'agenouilla et ouvrit doucement le piège. L'antilope se releva, fit trois pas… et une grande lumière l'entoura. Quand la lumière s'éteignit, une vieille femme se tenait à sa place : c'était un génie de la brousse. Elle lui tendit une petite calebasse : « Chaque matin, elle sera pleine de mil. Mais écoute bien : ne dis jamais à personne d'où vient ce mil, et n'en prends jamais plus qu'il ne faut. » Puis elle disparut entre les arbres.",
        ciel: 'nuit', sol: 'savane',
        decor: [['lumiere', 480], ['arbre', 700]],
        acteurs: [{ t: 'chasseur', x: 260 }, { t: 'femme', x: 480 }],
      },
      {
        texte:
          "Le lendemain matin, la calebasse était pleine de beau mil blanc. Yempabou et sa mère mangèrent à leur faim. Mais le jeune homme vit que les voisins souffraient : les enfants pleuraient de faim, les vieux ne se levaient plus. Alors, chaque soir, sans rien dire, il déposait un peu de mil devant leurs portes. Le village reprit des forces, et tout le monde se demandait d'où venait ce mil mystérieux.",
        ciel: 'aube', sol: 'savane',
        decor: [['cases', 520], ['grenier', 220]],
        acteurs: [{ t: 'chasseur', x: 360 }, { t: 'foule', x: 620 }],
      },
      {
        texte:
          "Le chef du village finit par apprendre que le mil venait de chez Yempabou. Il le fit appeler devant tous les anciens : « Tu es jeune et pauvre, et pourtant tu nourris tout le village. D'où vient ce mil ? Dis-le-nous, et je te donnerai ma fille en mariage et un troupeau de bœufs. Si tu te tais, nous penserons que tu es un voleur ou un sorcier. » Tous les regards se tournèrent vers le jeune chasseur.",
        ciel: 'jour', sol: 'savane',
        decor: [['palais', 560], ['baobab', 120]],
        acteurs: [{ t: 'roi', x: 520 }, { t: 'chasseur', x: 320 }, { t: 'foule', x: 160 }],
        choix: [
          { label: 'Révéler le secret', vers: 'reveler' },
          { label: 'Garder le silence', vers: 'silence' },
        ],
      },
      {
        id: 'reveler',
        texte:
          "Tenté par la promesse du chef, Yempabou raconta tout : l'antilope, le piège, la vieille femme et la calebasse. Le lendemain matin, la calebasse était vide et fendue en deux. Le village retomba dans la faim, et tous reprochèrent à Yempabou d'avoir trop parlé. Le jeune homme retourna dans la forêt demander pardon, mais il ne revit jamais l'antilope à l'étoile blanche.",
        ciel: 'orage', sol: 'savane',
        decor: [['cases', 520], ['arbre-mort', 160]],
        acteurs: [{ t: 'chasseur', x: 340 }],
        suite: 'fin',
      },
      {
        id: 'silence',
        texte:
          "Yempabou baissa la tête et répondit : « Chef, le mil n'est pas volé, et je ne fais de mal à personne. Mais j'ai donné ma parole, et je ne peux rien dire. » Les anciens murmurèrent, certains le traitèrent de sorcier. Yempabou ne répondit pas et continua, chaque soir, à nourrir le village en silence. Quand enfin les pluies revinrent et que le mil reverdit dans les champs, la calebasse resta vide : le génie avait tenu sa promesse jusqu'au bout.",
        ciel: 'pluie', sol: 'savane',
        decor: [['cases', 520], ['champ', 240]],
        acteurs: [{ t: 'chasseur', x: 380 }, { t: 'antilope', x: 700, vers: 900 }],
      },
      {
        texte:
          "Le chef comprit alors que Yempabou avait sauvé le village sans rien demander en retour. Devant tous les anciens, il reconnut son erreur, lui donna sa fille en mariage et fit de lui le chef des chasseurs de Kantchari. Et l'on dit que, certains soirs, au bord de la forêt de la Tapoa, on voit encore passer une antilope rousse avec une étoile blanche sur le front.",
        ciel: 'crepuscule', sol: 'savane',
        decor: [['palais', 580], ['baobab', 120]],
        acteurs: [{ t: 'chasseur', x: 360 }, { t: 'femme', x: 450 }, { t: 'roi', x: 600 }],
        suite: 'fin',
      },
      {
        id: 'fin',
        texte:
          "Ici s'arrête l'histoire de Yempabou. Et le conteur, avant que chacun rentre dormir, dit aux enfants assis autour du feu : « La brousse donne à celui qui la respecte. Mais une parole donnée ne se reprend pas : celui qui la trahit perd tout ce qu'elle lui avait apporté. »",
        ciel: 'nuit', sol: 'savane',
        decor: [['feu', 400], ['cases', 640], ['baobab', 120]],
        acteurs: [{ t: 'griot', x: 300 }, { t: 'foule', x: 500 }],
        fin: true,
      },
    ],
    quiz: {
      question: 'Quelle condition le génie impose-t-il à Yempabou ?',
      reponses: ['Ne jamais révéler d’où vient le mil', 'Ne plus jamais chasser', 'Quitter le village'],
      bonne: 0,
    },
  },
];

export function getConte(id) {
  return CONTES.find((c) => c.id === id);
}
