# electiveLogiciel
Projet Élective Logiciel

## Ce projet se retrouve au lien suivant : https://moodle-ingenieurs.cesi.fr/pluginfile.php/491256/mod_resource/content/2/co/ProjetElective.html#aN6

# 1- Sujet

Ce projet a pour but de vous faire concevoir, réaliser, déployer, tester et utiliser une plate forme logicielle distribuée. La vocation métier de cette plateforme est la convergence et le traitement des offres commerciales dans le domaine de la restauration. Plusieurs types d'utilisateurs peuvent consommer les services offerts par cette plate forme : l'utilisateur final, le restaurateur, le livreur, le développeur tiers, le service commercial (entreprise porteuse de l'offre de convergence), le service technique (entreprise porteuse de l'offre de convergence). Il s'agit donc d'un service d'offre de restauration par internet. Elle est le concentrateur technique pour la gestion des workflows. Elle propose une gamme de services variés à destination de profils utilisateurs différents.

Ce projet comporte tous les éléments techniques étudiés lors de votre 4em d'année d'études, mais également fait appel à l'ensemble des autres notions étudiées lors des années précédentes. Il constitue l'aboutissement technique de vos années d'études en informatique en école d'ingénieurs. Il a pour vocation d'être des plus réalistes et donc, comme dans un projet d'ingénierie en entreprise, vous disposez pour le réaliser de certaines connaissances, mais pas toutes. Il vous faudra alors, comme dans un projet réel, vous confronter à des problématiques jusqu'alors inconnues.

Ce projet, fait donc appel à l'ensemble de vos connaissances acquises depuis la première année jusqu'à ce jour. Il comporte des parties non couvertes par le bloc de manière à ressembler le plus possible à un projet réel d'entreprise. Certaines sections sont relativement bien décrites, d'autres non. Il vous faudra analyser le cahier des charges en profondeur, faire remonter les incertitudes et les traiter.

# 2- Phases

### Phase 2 : Analyse du cahier des charges 
     -> A rendre le 09/06
     
### Phase 3 : Présentation de l'analyse
     -> A rendre le 09/06
     
### Phase 4, 6, 8 : Réalisation du projet 
     -> A partir du 16/06 jusqu'au 25/06
     
### Phase 5, 7 : Seances de coaching orga et technique
     -> Le 23/06 et le 25/06
     
### Phase 9 : Soutenance du projet 
     -> A partir du 16/06 jusqu'au 25/06
     
# 3- Spécification techniques

*L'utilisateur final*

Il est le client consommateur (celui qui commande son repas). Il doit être en mesure de :

    Créer, modifier, supprimer, éditer son compte

    Créer, modifier, supprimer, éditer, payer une commande

    Éditer l'historique des commandes

    Suivre une livraison

    Parrainer un ami

    Recevoir des notifications (hors eMail)

*Le restaurateur*

Le restaurateur qui souhaite accroître sa visibilité et son offre commerciale peut bénéficier des services de la plate forme. Il doit être en mesure de :

    Créer, modifier, supprimer, éditer son compte

    Créer, modifier, supprimer, éditer un article (plat, boisson, sauce, accompagnement,)

    Créer, modifier, supprimer, éditer un menu (composition d'articles)

    Visualiser, valider une commande

    Suivre une livraison

    Éditer l'historique des commandes

    Demander des statistiques

    Parrainer un restaurateur

    Recevoir des notifications (hors eMail)

*Le livreur*

Le livreur est comme le restaurateur un indépendant, il peut adhérer à la plate forme pour prendre à son compte des livraisons (courses). Il doit être en mesure de :

    Créer, modifier, supprimer, éditer son compte

    Accepter ou refuser une livraison

    Prendre en charge et acquitter la livraison 
    (bonus : aucune application qui permet de 
    vérifier / Validation : Edition d'un QRcode / 
    pour côté resto et côté client)

    Parrainer un livreur

    Recevoir des notifications (hors eMail)

*Le développeur tiers*

Il est un indépendant ou collaborateur d'une entreprise. Il a la responsabilité d'intégrer des composants logiciels proposés par la plate forme, sur ses propres applications. Ainsi, d'autres applications clients développées par des entreprises ou des indépendants peuvent être intégrer à d'autres solutions clientes ou plate forme tierces (middleware).

    Créer, modifier, supprimer, éditer son compte

    Éditer les composants disponibles

    Télécharger un composant

*Le service commercial*

Elle est la porteuse de l'offre de convergence, mais elle est elle-même cliente 
de sa propre plate forme. Elle doit être en mesure :

    Éditer, suspendre, supprimer des comptes clients

    Demander des statistiques

    Disposer en temps réel de tableaux de bords de suivi de processus de commande 
    (passation commande, acceptation commande, acceptation livraison, acquittement livraison,
    chiffre d'affaires transactionnel global en cours)

    Recevoir des notifications (hors eMail)

*Le service technique*

Il est le garant de la qualité technique des prestations offertes par la plate forme. Il doit être en mesure :

    Ajouter, supprimer des composants réutilisables

    Éditer les logs de connexions

    Éditer les statistiques de performances des serveurs et micro-services

    Éditer les logs de téléchargement des composants réutilisables

    Orchestrer les routes pour les résolutions des demandes entrantes

    Déployer de nouveaux services ou micro-services sans interruption du service client

    Recevoir des notifications (hors eMail)

### Les spécifications d'architecture

*Les applications : livreur – restaurateur – client final – commercial/technique*

Ces applications doivent répondre aux caractéristiques techniques suivantes :

      Ces applications doivent proposer une couche présentation qui 
      permettra à l'utilisateur d'utiliser les fonctionnalités.

      Ces applications doivent proposer une couche de composants locaux. 
      Ils servent à faire les traitement locaux nécessaires au bon fonctionnement 
      de l'application. Elle invoque les services distants

      Ces applications doivent proposer une couche de communication. 
      Elle assure la sécurité de la communication, adhère au protocole de 
      communication imposée par la plate forme, elle fournit les 
      informations de sécurité, elle fournit les informations d'applications

      Uniquement pour les applications commercial/technique, elles doivent 
      être architecturées autour des techniques de composants graphiques 
      réutilisables et elles sont dynamiques

*La plate forme – Le middleware*

La plate forme à construire est une hybridation entre une architecture orientée service, un entreprise service bus et une architecture micro-service. Elle propose une liaison de données sécurisées et asynchrone. Elle est orientée message. Elle est scalable pour anticiper la montée en charge et les dépressions d'activité. Puisque scalable, les modules à forte consommation de cycles processeur seront facilement déployables dans le cloud si nécessaire ; ils seront dans tous les cas conteneurisés.

    Le point de terminaison doit disposer d'une liaison sécurisée. 
    Elle est interopérable pour les systèmes hétérogènes. Il vérifie 
    l'authenticité des applications (token app). Il est asynchrone. 
    Il reçoit un message et retourne un message en réponse.

    La couche services expose tous les services offerts par la plate forme 
    en une seule façade. Elle propose la documentation technique des services 
    aux développeurs.

    Le contrôleur de résolution vérifie les autorisations au travers du 
    token utilisateur. Il autorise ou met un terme à la demande en 
    fonction des droits attribués à l'utilisateur. Il examine la 
    demande contenue dans le message, l'application invocatrice et son 
    numéro de version et redirige alors vers le bon micro service ou 
    méta service.

    Le proxy se chargera de récupérer les statistiques de performances 
    des serveurs virtuels (load balancing) et routera le message sur le 
    serveur le plus disponible.

    Le micro-service ou méta-service (orchestrateur de micro-services) 
    gère les opérations transactionnelles. Il exécute une tâche et compose 
    le message de réponse.

    Les composants proposent des actions spécialisées. Ils sont 
    agrégés par les micro-services

*La plateforme – Les data*

La couche donnée propose la persistance des informations non relationnelles. Un entrepôt est destiné aux sources documentaires et un autre est destiné au stockage des composants réutilisables.

*Le schéma d'architecture*

Vous trouverez ci-après le schéma (grandes mailles) de l'architecture globale de la solution informatique à développer.

![Projet1](https://user-images.githubusercontent.com/44971574/171294416-43f8826d-94fb-489b-81b2-01ee1a5fcf59.png)

### Les spécifications techniques

L'architecture globale à mettre en place concernant la solution informatique d'entreprise doit être un équilibre entre une architecture orientée service et une architecture orientée micro-services.

*Partie Applicative*

Les applications (livreur, restaurateur, client final, service administratif, service technique) doivent être découpées en trois modules :

Le front : en charge de la mise à disposition des fonctionnalités de l'application et de la validation des saisies utilisateurs.

    Chaque composant devra être interchangeable dans chacune des plate formes développées.

    La sécurité devra être gérer à l'aide de routes autorisées et de datas restrictions.

Le middleware local : un ensemble d'Api en charge du traitement local des messages issus de la plate forme (plate forme->application), ou du prétraitement du message à destination de la plate forme (application -> plate forme) et ou de services locaux non proposés par la plate forme (car spécifique à l'application).

    Une couche d'abstraction permettra un appel vers les différentes APIs.

    Les messages (sucess / faillure / pending...) devront être normalisés,
    et proposer des éléments UI spécifiques.

    Le proxy : en charge de la communication avec la plate forme

*Partie plate forme*

La plate forme est composée d'une partie service, d'une partie micro-services virtualisée en deux machines, d'une partie data composée d'un serveur de base de données relationnelles et d'un serveur noSQL.

### Couche services

Un endpoint unique (point d'entrée de toutes les communications)

    Une couche services qui présente l'ensemble des services 
    (qui seront consommés par les applications) ainsi que la 
    documentation développeur nécessaire à l'utilisation des services

    Le contrôleur de résolution, il doit se charger de vérifier 
    (demande entrante) le type d'application, la version de l'application,
    la demande, les droits de l'utilisateur vis à vis de la demande. 
    Il appellera alors en fonction de ces vérifications le bon contrôleur 
    d'exécution transactionnel

    Le proxy, en charge de la communication, il veillera à appeler 
    la bonne machine virtuelle (load-balacing).

### Couche composants (virtualisés X2)

    Un endpoint unique (point d'entrée de toutes les communications)

    Contrôleur d'exécution transactionnel des micros services, 
    en charge d'orchestrer le travail des plugins et de gérer les transactions.

    Les plugins, en charge de la réalisation d'une partie du micro-service.

    Le proxy, qui dirigera la demande sur le type de bases de 
    données nécessaires au traitement de la demande.

### Couche data

    Comporte les systèmes de gestion de base de données (R/noSQL)

    Un système de supervision / reporting devra être en place ; 
    ayant pour but la surveillance et l'optimisation de l'acquisition des données.

### Autres spécifications

Concernant le suivi de livraison, vous pouvez, si possible, utiliser un composant réutilisable type MAP) / Étudiez également la possibilité d'utiliser un socket en temps réel.

La gestion des comptes utilisateurs (notamment utilisable au travers des applications service commercial/technique) doit se faire à l'aide d'une application lourde réalisée en C#. Les données relatives à ces processus doivent être gérées à l'aide d'un système de gestion de base de données relationnelles (Microsoft SQL SERVER). D'autres types de données peuvent y être stockées potentiellement (à voir avec le client). L'authentification sur ce serveur de base de données doit être gérer en mode mixte (SQL SERVER). L'intégrité référentielle doit être déployée pour la gestion des données. Une connexion doit être créée pour chaque utilisateur (Server). La connexion sera mappée sur un compte utilisateur de base de données. Les éléments sécurisables (gestion des privilèges) seront regroupés au travers des rôles de base de données et des schémas utilisateurs. Vous devez gérer les journaux de transactions et le système de sauvegarde au travers d'une stratégie appropriée.

La gestion des données applicatives devront être stockées sur une base no-sql (MongoDB).

La documentation des APIs devra permettre à n'importe quel développeur de consommer les APIs.

Les messages de retour devront être normalisé et faire état de « best practice » défini en amont du projet.

L'application pour le développeur tiers ne tiens pas compte d'une architecture précise (puisque nous n'avons pas la main sur cette dernière). Toutefois, elle doit être en lien avec un service NPM (composants réutilisables).
     
