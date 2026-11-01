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
          "Il y a très longtemps, au royaume de Gambaga, au sud du pays que l'on appelle aujourd'hui le Burkina Faso, régnait le roi Nédéga. Il avait une fille, Yennenga. Aucun guerrier ne maniait la lance et ne montait à cheval aussi bien qu'elle.",
        ciel: 'jour', sol: 'savane',
        decor: [['collines'], ['palais', 560], ['baobab', 140]],
        acteurs: [{ t: 'cavaliere', x: -80, vers: 380 }],
      },
      {
        texte:
          "Yennenga menait les armées de son père et revenait toujours victorieuse. Mais le roi tenait trop à sa fille guerrière : il refusait tous les prétendants et ne voulait pas la marier.",
        ciel: 'jour', sol: 'savane',
        decor: [['collines'], ['palais', 600]],
        acteurs: [{ t: 'roi', x: 520 }, { t: 'guerriere', x: 300 }],
      },
      {
        texte:
          "Pour lui faire comprendre son chagrin, Yennenga sema un champ de gombo. Elle le laissa mûrir, puis pourrir sur pied, sans le récolter. « Je suis comme ce gombo, dit-elle à son père : on me laisse vieillir sans que je donne de fruits. »",
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
          "Si Yennenga était restée, la légende s'arrêterait ici, et l'histoire des Mossi n'aurait pas commencé. Mais la tradition raconte qu'elle fit un autre choix…",
        ciel: 'nuit', sol: 'savane',
        decor: [['palais', 400]],
        acteurs: [{ t: 'guerriere', x: 380 }],
        suite: 'fuite',
      },
      {
        id: 'fuite',
        texte:
          "Une nuit, déguisée en homme, Yennenga sauta sur son étalon blanc et quitta Gambaga. Le cheval galopa longtemps vers le nord, traversa des rivières, puis s'enfonça dans une forêt profonde.",
        ciel: 'nuit', sol: 'savane',
        decor: [['arbre', 160], ['arbre', 650], ['riviere']],
        acteurs: [{ t: 'cavaliere', x: -100, vers: 820 }],
      },
      {
        texte:
          "Épuisée, elle fut recueillie par Riallé, un chasseur d'éléphants solitaire. Il la soigna sans savoir qu'elle était une princesse. Ils s'aimèrent et eurent un fils.",
        ciel: 'crepuscule', sol: 'savane',
        decor: [['case', 520], ['feu', 380], ['baobab', 120]],
        acteurs: [{ t: 'chasseur', x: 300 }, { t: 'guerriere', x: 450 }],
      },
      {
        texte:
          "Ils l'appelèrent Ouédraogo, « l'étalon », en souvenir du cheval qui avait conduit sa mère jusqu'à eux. Devenu grand, Ouédraogo fonda le royaume de Tenkodogo. De lui descendent les Moose et leurs rois, les Moogho Naaba.",
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
          "C'était au cœur d'une saison sèche terrible. Les puits étaient vides et la terre craquelée. Un chasseur de la région de Sabou s'était perdu en brousse en poursuivant du gibier.",
        ciel: 'secheresse', sol: 'sable',
        decor: [['arbre-mort', 600], ['rochers', 200]],
        acteurs: [{ t: 'chasseur', x: 80, vers: 360 }],
      },
      {
        texte:
          "Il marcha pendant trois jours. Sa gourde était vide et ses jambes ne le portaient plus. Il s'écroula sous un arbre, persuadé qu'il allait mourir.",
        ciel: 'secheresse', sol: 'sable',
        decor: [['arbre-mort', 420]],
        acteurs: [{ t: 'chasseur', x: 380 }],
      },
      {
        texte:
          "Il vit alors un crocodile qui le regardait. L'animal ne l'attaqua pas : il fit demi-tour, avança de quelques pas, puis s'arrêta pour l'attendre. Le chasseur trouva la force de le suivre.",
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
          "Le chasseur eut peur et voulut s'enfuir, mais il était trop faible. Le crocodile revint vers lui et l'attendit, patient. Alors l'homme comprit qu'il n'avait rien à craindre, et il le suivit.",
        ciel: 'jour', sol: 'sable',
        decor: [['arbre-mort', 200]],
        acteurs: [{ t: 'crocodile', x: 500 }, { t: 'chasseur', x: 260 }],
        suite: 'mare',
      },
      {
        id: 'mare',
        texte:
          "Le crocodile le mena jusqu'à une mare d'eau fraîche, cachée derrière les rochers. Le chasseur but longuement et retrouva la vie.",
        ciel: 'jour', sol: 'savane',
        decor: [['mare', 420], ['arbre', 680], ['rochers', 120]],
        acteurs: [{ t: 'crocodile', x: 470 }, { t: 'chasseur', x: 300 }],
      },
      {
        texte:
          "De retour au village, il raconta son aventure et fit jurer aux siens que jamais personne ne ferait de mal aux crocodiles de la mare. Le pacte s'est transmis de génération en génération. Aujourd'hui encore, on dit que les crocodiles de Sabou vivent en paix avec les habitants.",
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
          "Au temps où les animaux parlaient encore, la pluie ne tomba pas pendant toute une année. Les greniers se vidaient. Seule Katr, la hyène, possédait un grand grenier plein de mil, qu'elle gardait jalousement.",
        ciel: 'secheresse', sol: 'sable',
        decor: [['grenier', 520], ['arbre-mort', 160]],
        acteurs: [{ t: 'hyene', x: 400 }],
      },
      {
        texte:
          "Soamba, le lièvre, avait faim, et ses voisins aussi. Il vint trouver Katr : « Grande sœur, prête-nous un peu de mil, nous te rendrons le double à la prochaine récolte. » Katr éclata de rire : « Mon mil est à moi seule ! »",
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
          "Soamba alla derrière la colline et se mit à battre le tambour. « Katr ! cria-t-il. Le roi des animaux donne un grand festin, il y a de la viande pour tous ceux qui arrivent les premiers ! » La gourmande hyène partit en courant sans fermer son grenier.",
        ciel: 'crepuscule', sol: 'sable',
        decor: [['collines'], ['grenier', 620]],
        acteurs: [{ t: 'lievre', x: 160 }, { t: 'hyene', x: 520, vers: 900 }],
        suite: 'partage',
      },
      {
        id: 'pluie',
        texte:
          "Soamba grimpa sur un rocher et cria : « Katr ! Un orage arrive, ton mil va être mouillé et pourrir ! Va vite chercher des nattes au marché pour couvrir ton grenier ! » Effrayée, la hyène partit en courant sans fermer son grenier.",
        ciel: 'orage', sol: 'sable',
        decor: [['rochers', 160], ['grenier', 620]],
        acteurs: [{ t: 'lievre', x: 180 }, { t: 'hyene', x: 520, vers: 900 }],
        suite: 'partage',
      },
      {
        id: 'partage',
        texte:
          "Aussitôt, Soamba appela tous les animaux du village. Chacun prit juste ce qu'il fallait pour nourrir sa famille, et Soamba laissa dans le grenier une calebasse et un message : « Ce que tu refuses de prêter, la brousse le reprend. »",
        ciel: 'crepuscule', sol: 'sable',
        decor: [['grenier', 480]],
        acteurs: [{ t: 'lievre', x: 340 }, { t: 'oiseau', x: 600 }, { t: 'zebu', x: 160 }],
      },
      {
        texte:
          "Katr revint, furieuse, mais il n'y avait ni festin ni orage. Quand la pluie revint enfin, chaque animal rapporta à Katr le double de ce qu'il avait pris, comme Soamba l'avait promis. La hyène comprit, un peu tard, qu'elle aurait mieux fait de partager dès le début.",
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
          "Il y a plusieurs siècles, à Ouagadougou, régnait un Moogho Naaba, roi des Mossi. Son épouse préférée partit un jour rendre visite à sa famille, dans un royaume voisin, et ne revint pas.",
        ciel: 'jour', sol: 'savane',
        decor: [['palais', 500], ['arbre', 120]],
        acteurs: [{ t: 'femme', x: 420, vers: 900 }],
      },
      {
        texte:
          "Blessé, le roi se mit en colère. Il fit seller son cheval, revêtit sa tenue rouge de guerrier et rassembla ses hommes : il irait la chercher par les armes.",
        ciel: 'aube', sol: 'savane',
        decor: [['palais', 560]],
        acteurs: [{ t: 'roi', x: 320 }, { t: 'cheval', x: 160 }],
      },
      {
        texte:
          "Mais ses ministres et les dignitaires de la cour se jetèrent à ses pieds : « Naaba, si tu pars en guerre pour une affaire de cœur, c'est tout le royaume qui saignera. Reste avec ton peuple. »",
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
          "S'il était parti, des villages auraient brûlé et des familles auraient été séparées, pour la colère d'un seul homme. C'est justement ce que le roi voulut éviter…",
        ciel: 'orage', sol: 'savane',
        decor: [['collines']],
        acteurs: [{ t: 'cavalier', x: 200, vers: 600 }],
        suite: 'sagesse',
      },
      {
        id: 'sagesse',
        texte:
          "Le roi écouta la voix de la sagesse. Il descendit de cheval, retira sa tenue rouge et revêtit le blanc de la paix. Il resta auprès de son peuple.",
        ciel: 'jour', sol: 'savane',
        decor: [['palais', 520]],
        acteurs: [{ t: 'roi', x: 360 }, { t: 'foule', x: 160 }],
      },
      {
        texte:
          "Depuis, chaque vendredi matin, le Moogho Naaba rejoue cette scène dans la cour de son palais, devant les dignitaires et les visiteurs : le cheval est sellé, le roi paraît en rouge… puis il renonce et revient en blanc. C'est le « faux départ ».",
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
          "À quelques kilomètres de Bobo-Dioulasso, un sentier descend entre les rochers jusqu'à une faille où coule une eau claire. C'est Dafra.",
        ciel: 'jour', sol: 'roche',
        decor: [['falaise'], ['cascade', 520]],
        acteurs: [{ t: 'femme', x: 80, vers: 320 }],
      },
      {
        texte:
          "On raconte qu'autrefois, les ancêtres du lieu firent alliance avec les génies de l'eau. Pour sceller ce pacte, les esprits prirent la forme de grands silures, ces poissons à moustaches qui vivent au fond de la mare.",
        ciel: 'crepuscule', sol: 'eau',
        decor: [['falaise'], ['cascade', 520]],
        acteurs: [{ t: 'silure', x: 300, vers: 520 }, { t: 'silure', x: 600, vers: 380 }],
      },
      {
        texte:
          "Depuis, il est interdit de pêcher ou de blesser ces poissons. Ceux qui viennent à Dafra apportent des poulets en offrande et formulent un vœu : réussir une récolte, avoir un enfant, guérir d'une maladie.",
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
          "Tu tends ton offrande au gardien du lieu. Il la présente aux silures. Si les poissons la prennent, dit-on, le vœu sera exaucé. L'eau frémit… et une grande ombre remonte du fond.",
        ciel: 'jour', sol: 'eau',
        decor: [['falaise'], ['mare', 420]],
        acteurs: [{ t: 'silure', x: 300, vers: 440 }],
        suite: 'fin',
      },
      {
        id: 'silence',
        texte:
          "Tu restes assis au bord de la mare, sans bruit. Peu à peu, les silures remontent et glissent sous la surface. Les anciens disent que le silence aussi est une forme de respect.",
        ciel: 'crepuscule', sol: 'eau',
        decor: [['falaise'], ['mare', 420]],
        acteurs: [{ t: 'silure', x: 500, vers: 300 }],
        suite: 'fin',
      },
      {
        id: 'fin',
        texte:
          "Dafra reste aujourd'hui un lieu sacré. La légende y a aussi un rôle très concret : en protégeant les poissons, elle protège la source et la vie de toute la vallée.",
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
          "Tout à l'ouest du Burkina, près de la frontière du Mali, se dresse une longue chaîne de pics de pierre aux formes étranges. Ce sont les Pics de Sindou.",
        ciel: 'aube', sol: 'roche',
        decor: [['pics', 400]],
        acteurs: [{ t: 'oiseau', x: 60, vers: 760 }],
      },
      {
        texte:
          "Les anciens racontent que, lorsque les ancêtres des Sénoufo arrivèrent dans la région, ils étaient poursuivis par des ennemis. Les rochers les accueillirent et les cachèrent dans leurs couloirs.",
        ciel: 'crepuscule', sol: 'roche',
        decor: [['pics', 450]],
        acteurs: [{ t: 'foule', x: 120, vers: 380 }],
      },
      {
        texte:
          "Pour les remercier, les ancêtres firent un pacte avec les esprits des pierres : ils garderaient ces lieux purs, et les esprits protégeraient le village.",
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
          "Le guide te retient par le bras : « La nuit, les pics appartiennent aux esprits. On ne s'y aventure pas sans avoir demandé la permission aux anciens. » Tu redescends et tu attends l'aube.",
        ciel: 'nuit', sol: 'roche',
        decor: [['pics', 420]],
        acteurs: [{ t: 'chasseur', x: 300 }],
        suite: 'guide',
      },
      {
        id: 'guide',
        texte:
          "Au matin, le guide te conduit entre les aiguilles de grès. Certaines ressemblent à des guerriers, d'autres à des masques. « Ce sont nos gardiens », dit-il simplement.",
        ciel: 'jour', sol: 'roche',
        decor: [['pics', 420]],
        acteurs: [{ t: 'chasseur', x: 120, vers: 360 }, { t: 'griot', x: 60, vers: 280 }],
      },
      {
        texte:
          "Aujourd'hui, le site attire les visiteurs du monde entier. Mais pour les gens de Sindou, ce n'est pas seulement un paysage : c'est une mémoire vivante, que l'on visite avec respect.",
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
          "Dans l'est du pays, les savanes s'étendent à perte de vue jusqu'aux forêts de la Tapoa. C'est le pays gulmu, le pays des Gourmantché.",
        ciel: 'jour', sol: 'savane',
        decor: [['collines'], ['arbre', 200], ['arbre', 620]],
        acteurs: [{ t: 'zebu', x: 300, vers: 480 }],
      },
      {
        texte:
          "Les anciens racontent qu'un jour, une lumière descendit du ciel. Quand elle se posa sur la terre, un homme en sortit : il se nommait Diaba Lompo.",
        ciel: 'nuit', sol: 'savane',
        decor: [['collines'], ['lumiere', 400]],
        acteurs: [{ t: 'roi', x: 400 }],
      },
      {
        texte:
          "Les familles dispersées dans la brousse vinrent le voir. Diaba Lompo leur enseigna l'art de gouverner, de rendre la justice et de vivre ensemble. Il devint le premier roi du Gulmu.",
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
          "Pour les historiens, Diaba Lompo est sans doute un chef venu d'ailleurs, qui unifia plusieurs chefferies il y a plusieurs siècles. La légende du ciel exprime la sacralité de son pouvoir : un roi « venu d'en haut » ne peut être contesté.",
        ciel: 'jour', sol: 'savane',
        decor: [['cases', 400]],
        acteurs: [{ t: 'griot', x: 300 }],
        suite: 'suite',
      },
      {
        id: 'suite',
        texte:
          "Ses descendants fondèrent de nombreuses chefferies dans tout l'Est. Aujourd'hui encore, le roi du Gulmu, à Fada N'Gourma, se dit héritier de Diaba Lompo.",
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
          "Près de Loropéni, dans le Sud-Ouest, se dressent de grands murs de latérite et de pierre, hauts de plusieurs mètres. Personne n'y habite plus depuis longtemps.",
        ciel: 'jour', sol: 'savane',
        decor: [['murailles', 420], ['arbre', 120]],
        acteurs: [],
      },
      {
        texte:
          "Les archéologues pensent que ces murailles ont plus de mille ans. Elles faisaient partie d'un réseau lié à l'extraction et au commerce de l'or, qui partait jusqu'aux routes transsahariennes.",
        ciel: 'jour', sol: 'savane',
        decor: [['murailles', 420]],
        acteurs: [{ t: 'foule', x: 160 }, { t: 'zebu', x: 620, vers: 760 }],
      },
      {
        texte:
          "Qui les a construites ? Les traditions orales évoquent plusieurs peuples successifs, dont les Lohron et les Koulango. Le site aurait été abandonné au début du XIXe siècle.",
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
          "Le griot sourit : « Certains disent que ces murs gardaient un trésor, et que les esprits l'ont caché quand les hommes sont devenus trop avides. On ne touche pas aux pierres de Loropéni sans raison. »",
        ciel: 'nuit', sol: 'savane',
        decor: [['murailles', 420], ['feu', 220]],
        acteurs: [{ t: 'griot', x: 300 }],
        suite: 'fin',
      },
      {
        id: 'science',
        texte:
          "L'archéologue explique que les fouilles datent l'occupation du site au moins du XIe siècle. Beaucoup de questions restent ouvertes : c'est pourquoi le site est protégé, pour que les recherches puissent continuer.",
        ciel: 'jour', sol: 'savane',
        decor: [['murailles', 420]],
        acteurs: [{ t: 'chasseur', x: 260 }],
        suite: 'fin',
      },
      {
        id: 'fin',
        texte:
          "Légende ou science, les deux racontent la même chose : ici vivait une société riche et organisée. En 2009, Loropéni est devenu le premier site du Burkina Faso inscrit au patrimoine mondial de l'UNESCO.",
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
          "Dans le Sahel, autour de Dori, vivait un jeune berger peul nommé Hamadou. Son père lui avait confié le troupeau familial, et parmi les bêtes se trouvait une vieille vache blanche, lente et fatiguée.",
        ciel: 'aube', sol: 'sable',
        decor: [['dunes'], ['acacia', 600]],
        acteurs: [{ t: 'berger', x: 200 }, { t: 'zebu', x: 330 }, { t: 'zebu', x: 450 }],
      },
      {
        texte:
          "Vint la saison sèche. Il fallait partir loin vers le sud pour trouver de l'herbe et de l'eau. Les autres bergers dirent à Hamadou : « Laisse cette vieille vache, elle va ralentir tout le troupeau. »",
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
          "Hamadou fit quelques pas sans elle… puis se retourna. La vache le regardait. Il se souvint de toutes les années où elle avait nourri sa famille de son lait. Il revint la chercher.",
        ciel: 'secheresse', sol: 'sable',
        decor: [['dunes']],
        acteurs: [{ t: 'berger', x: 500, vers: 320 }, { t: 'zebu', x: 220 }],
        suite: 'garder',
      },
      {
        id: 'garder',
        texte:
          "Hamadou marcha au rythme de la vieille vache. Les autres bergers prirent de l'avance et il se retrouva seul. Un soir, perdu au milieu de nulle part, il n'avait plus d'eau.",
        ciel: 'crepuscule', sol: 'sable',
        decor: [['dunes'], ['acacia', 640]],
        acteurs: [{ t: 'berger', x: 260 }, { t: 'zebu', x: 380 }],
      },
      {
        texte:
          "Alors la vieille vache se mit à marcher d'un pas décidé, dans une direction que personne ne prenait plus. Elle avait connu ces chemins dans sa jeunesse. Hamadou la suivit toute la nuit.",
        ciel: 'nuit', sol: 'sable',
        decor: [['dunes']],
        acteurs: [{ t: 'zebu', x: 160, vers: 520 }, { t: 'berger', x: 40, vers: 400 }],
      },
      {
        texte:
          "À l'aube, elle s'arrêta au bord d'une mare oubliée, entourée d'herbe verte. Hamadou fit venir tous les bergers. Ce jour-là, on comprit que la vieille vache portait la mémoire des chemins. Depuis, dit-on, les Peuls n'abandonnent jamais leurs vieilles bêtes.",
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
          "Dans la Boucle du Mouhoun, la saison sèche touche à sa fin. La terre est dure, les arbres sont nus, et tout le village attend la pluie.",
        ciel: 'secheresse', sol: 'savane',
        decor: [['cases', 500], ['arbre-mort', 160]],
        acteurs: [{ t: 'foule', x: 360 }],
      },
      {
        texte:
          "Les Bwaba racontent que Do, la force de la brousse, envoie alors ses messagers. Les jeunes initiés partent en brousse et cueillent des feuilles fraîches pour en couvrir entièrement leurs corps.",
        ciel: 'crepuscule', sol: 'savane',
        decor: [['arbre', 300], ['arbre', 600]],
        acteurs: [{ t: 'masque', x: 450 }],
      },
      {
        texte:
          "Les masques de feuilles entrent au village en dansant. Ils balaient le malheur, chassent les impuretés de l'année passée et appellent la pluie.",
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
          "Tu rejoins le cercle au son des tambours et des flûtes. Les masques tournent autour de toi, et les feuilles sentent la terre mouillée. Les anciens sourient : la pluie ne tardera plus.",
        ciel: 'orage', sol: 'savane',
        decor: [['cases', 560], ['feu', 360]],
        acteurs: [{ t: 'masque', x: 260 }, { t: 'masque', x: 460 }],
        suite: 'fin',
      },
      {
        id: 'regarder',
        texte:
          "Tu observes depuis l'ombre d'un karité. Un ancien t'explique : « Le masque n'est pas un homme déguisé. Quand il porte les feuilles, c'est Do qui marche parmi nous. »",
        ciel: 'crepuscule', sol: 'savane',
        decor: [['arbre', 200], ['cases', 600]],
        acteurs: [{ t: 'griot', x: 260 }, { t: 'masque', x: 520 }],
        suite: 'fin',
      },
      {
        id: 'fin',
        texte:
          "Le soir même, les premières gouttes tombent sur la terre sèche. Après la fête, les feuilles des masques sont rendues à la brousse : rien de ce qui vient de la nature ne doit être gaspillé.",
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
];

export function getConte(id) {
  return CONTES.find((c) => c.id === id);
}
