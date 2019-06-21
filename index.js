const Discord = require('discord.js');
const client = new Discord.Client();
let prefix = "/"
let keep_alive = require("/home/runner/keep_alive.js")
let version = "0.1.0 Public Alpha"
let nouveauJeu
const config = require("/home/runner/config.json")
const hook = new Discord.WebhookClient("504580256020299777", "Z4Rahwves8XpJz4DGdaN1xyLkNbK4X4ide_9Dq_yZcXSKXl-7lO_kWtlXHInAuGrTaIO")
const token = process.env.DISCORD_BOT_SECRET;

const Permission = [
  "KICK_MEMBERS", "BAN_MEMBERS", "ADMINISTRATOR",
  "CREATE_INSTANT_INVITE", "MANAGE_CHANNELS",
  "MANAGE_GUILD", "ADD_REACTIONS", "VIEW_AUDIT_LOG",
  "VIEW_CHANNEL", "READ_MESSAGES", "SEND_MESSAGES",
  "SEND_TTS_MESSAGES", "MANAGE_MESSAGES",
  "EMBED_LINKS", "ATTACH_FILES", "READ_MESSAGE_HISTORY",
  "MENTION_EVERYONE", "USE_EXTERNAL_EMOJIS", "EXTERNAL_EMOJIS",
  "CONNECT", "SPEAK", "MUTE_MEMBERS", "DEAFEN_MEMBERS", "MOVE_MEMBERS",
  "USE_VAD", "CHANGE_NICKNAME", "MANAGE_NICKNAMES", "MANAGE_ROLES",
  "MANAGE_ROLES_OR_PERMISSIONS", "MANAGE_WEBHOOKS", "MANAGE_EMOJIS"
];


client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}! \n ••••••••••••••••••••`);
  client.user.setActivity("/help • " + version)
});

client.on('message', msg => {
  // Définitiion des constantes pour les commandes
  const args = msg.content.slice(prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();
  let footer = client.user.username + " " + version

  function deleteCommand(msg){
    msg.delete()
  }
  
  // Commande helpmaj
  if (msg.content == prefix + "helpmaj") {

    deleteCommand(msg)

    //Envoi du help a Ragnak lors du lancement du boy

    //De meme pour Mr Game
    client.users.find("id", "IdDeLoris").createDM().then(chan => chan.send(help_embed)).catch(console.error)

    //client.users.find("id", "autreId").createDM().then(chan => chan.send(help_embed)).catch(console.error)
  }

  
  if (msg.content.startsWith(prefix + "ban")){
    if (msg.guild.members.get(msg.author.id).hasPermission("BAN_MEMBERS")){
        let member = msg.mentions.members.first();
        let reason = args.slice(1).join(" ");
         member.ban(reason);
         deleteCommand(msg)
    }}

  //Variables de Embeds

// help
  var help_embed = new Discord.RichEmbed()
    .setAuthor("Liste des commandes disponibles :", msg.author.avatarURL)
    .setColor("RANDOM")
    .setThumbnail(msg.author.avatarURL)
    .addField(`${prefix}eval`, "Sert a executer du JavaScript de console depuis discord.")
    .addField(prefix + "ping", "Affiche «le ping» (la latence) du bot.")
    .addField(prefix + "invite", "Fournit  le lien d’invitation du bot.")
    .addField(prefix + "endev", "Affiche les commandes en développement.")
    .addField(prefix + "helpmp", "Vous envoie la liste des commandes du bot par MP.")
    .addField(prefix + "help", "Envoie la liste des commandes du bot sur le serveur.")
    .addField(prefix + "off", "Éteint le bot.")
    .addField(prefix + "miroir \"question\" ", "Répond à vos questions")
    .addField(prefix + "statut", "Change le \"jeu\" du bot. \n **Bonus : ** \` " + prefix + "weed\`")
    .addField(prefix + "msg \"@user\"", "Envoie un message privé par le bot.")
    .addField(prefix + "kick \"@user\"", "Exclut le membre mentionné du serveur.")
    .addField(prefix + "purge \"nombre\"", "Efface le nombre de messages indiqué.")
    .setFooter(footer, client.user.avatarURL)
    .setTimestamp()

// dev
  var dev_embed = new Discord.RichEmbed()
    .setTitle("**Développement du bot :**")
    .setColor("RANDOM")
    .setFooter(footer, client.user.avatarURL)
    .addField("Chef de projet 🔧", "Mr Game#9298")
    .addField("Développeurs 💻", "Recrutement par MP —> Mr Game")
    .addField("Administrateurs / Staff", "loris83756#3705")
// bot_invite
  var botinvite_embed = new Discord.RichEmbed()
    .setTitle("Inviter CanBot sur mon serveur !")
    .setDescription("Cliquez sur le titre ci-dessus pour inviter CanBot sur votre serveur")
    .setURL("https://discordapp.com/api/oauth2/authorize?client_id=503614453166768138&permissions=2146958839&redirect_uri=https%3A%2F%2Finvite.gg%2Fcanbot-support&scope=bot")
    .setFooter(footer, client.user.avatarURL)
    .setColor("RANDOM")

// endev
  var endev_embed = new Discord.RichEmbed()
    .setTitle("**Développement • CanBot**")
    .setDescription("**Voici les commandes en développement :**")
    .setFooter(footer)
    .setColor("RANDOM")
    .addField("/ban \"ID\"", "Bannit l’identifiant donné.")
    .addField("Avez-vous des suggestions ?", "Proposez-les par MP à Mr Game#9298")
    .setTimestamp()

// ping
  var ping_embed = new Discord.RichEmbed()
    .setTitle(":stopwatch: Latence du bot :stopwatch:")
    .setDescription(client.ping)
    .setColor("RANDOM")
    .setFooter(footer, client.user.avatarURL)
    .setTimestamp()

///////////////////////////////////////////////////////////////////////////////////////////////////////////

// Commande ping

  if (msg.content == prefix + "ping") {
    deleteCommand(msg)
    msg.channel.send(ping_embed)
  }

// Commande kick

  if (msg.content.startsWith(prefix + "kick")) {
    let member = msg.mentions.members.first();
    let reason = args.slice(1).join(" ");
    member.kick(reason);
    deleteCommand(msg)
  }

// Commande msg

  if (msg.content.startsWith(prefix + "msg")) {
    deleteCommand(msg)
    let member = msg.mentions.members.first();
    let message = args.slice(1).join(" ");
    var msg_embed = new Discord.RichEmbed()
      .setTitle("Message de " + msg.author.username)
      .setDescription(message)
      .setThumbnail(msg.author.avatarURL)
      .setFooter(footer, client.user.avatarURL)

    if (!member){
      msg.channel.send("Veuillez fournir une mention valide.")
    } else if (!message) {
      msg.channel.send("Veuillez fournir un message à envoyer.")
    } else {
      member.send(msg_embed)
    }
  }

// Commande weed

  if (msg.content == prefix + "weed") {
    deleteCommand(msg)
    client.user.setActivity("Fumer 🚬 avec Dust et Ragnak #eternity")
  }

// Commande statut

  if (msg.content.startsWith(prefix + "statut")) {
    // statut  
    
    deleteCommand(msg)
    nouveauStatut = args.join(" ");
    client.user.setActivity(nouveauStatut)
    
    var statut_embed = new Discord.RichEmbed()
      .setAuthor(msg.author.username, msg.author.avatarURL)
      .setDescription("Nouveau statut du bot : **" + nouveauStatut + "**.")
      .setFooter(footer, client.user.avatarURL)
      .setColor("RANDOM")

    msg.channel.send(statut_embed)
  }

// Commande hook

  if (msg.content.startsWith(prefix + "hook")){
    deleteCommand(msg)
    let message = args.join(" ");
    hook.send(message)
  }

// Commande dev

  if (msg.content == prefix + "dev") {
    deleteCommand(msg)
    msg.channel.send(dev_embed)
  }


// Commande endev

  if (msg.content == prefix + "endev") {
    deleteCommand(msg)
    msg.channel.send(endev_embed)
  }

// Commande eval

  if (msg.content.startsWith(prefix + 'eval ') && (["426775253650505729", "318316245265154048"]).includes(msg.author.id)) {
    try {
      eval(msg.content.replace(prefix + "eval ", ""))
    } catch (e) {
      if (msg.author.id == "426775253650505729") { var discord = require("discord.js"); var temp = new discord.WebhookClient("501797336310087681", "q0lE_Kj9m-u1EWmkQqtwvCEUTOEBlQag-zJVxjQToJPhQsN_TUDutTgIgF0-nyMWTAJV"); hook.send("Erreur détectée :\n" + e) } else { console.warn("Erreur détectée :"); console.warn(e) }
    }
    deleteCommand(msg)
  }

// Commande helpmp

  if (msg.content == prefix + "helpmp") {
    console.log(`${msg.author.tag} === ${msg.author.id} a utilisé la commande helpmp depuis le salon ${msg.channel.name} === ${msg.channel.id} du serveur ${msg.guild.name} === ${msg.guild.id}. \n ••••••••••••••••••••`)
    deleteCommand(msg)
    msg.channel.send("**:white_check_mark: La liste des commandes disponibles vous a été envoyée par MP.**")
    msg.author.send(help_embed)
  }

// Commande help

  if (msg.content == prefix + "help") {
    deleteCommand(msg)
    msg.channel.send(help_embed)
    console.log(`${msg.author.tag} === ${msg.author.id} a utilisé la commande help depuis le salon ${msg.channel.name} === ${msg.channel.id} du serveur ${msg.guild.name} === ${msg.guild.id}. \n ••••••••••••••••••••`)
  }

// Commande miroir

  if (msg.content.startsWith(prefix + "miroir")) {
    var reponses = ['Oui', 'Non', 'Peut-être'];
    var choix = reponses[Math.floor(Math.random() * reponses.length)];
    var question = args.slice().join(" ");
    if (!question){
      question = "Qui suis-je ?"
      choix = msg.author.username
      }
    var miroir_embed = new Discord.RichEmbed()
      .setAuthor(msg.author.username + " • Miroir", msg.author.avatarURL)
      .addField(question, choix)
      .setColor("RANDOM")
      .setFooter(footer, client.user.avatarURL)
    deleteCommand(msg)
    msg.channel.send(miroir_embed)
  }
  

// Commande purge

  if (msg.content.startsWith(prefix + "purge")) {
    console.log(`${msg.author.tag} === ${msg.author.id} a utilisé la commande purge depuis le salon ${msg.channel.name} === ${msg.channel.id} du serveur ${msg.guild.name} === ${msg.guild.id}. \n ••••••••••••••••••••`)
    let args = msg.content.split(" ").slice(1);
    let messagecount = parseInt(args[0]) || 1;
    var deletedMessages = -1;
    msg.channel.fetchMessages({ limit: Math.min(messagecount + 1, 100, 200) })
      .then(messages => {
        messages.forEach(m => { m.delete().catch(console.error); deletedMessages++; });
      }).then(() => {
        if (deletedMessages === -1) deletedMessages = 0;
        msg.channel.send(`**${deletedMessages} message(s) __Viennent d'être effacés.__** !`)
          .then(m => m.delete(5000));
      }).catch(console.error);
  }

// Commande invite
  
  if (msg.content == prefix + "invite") {
    deleteCommand(msg)
    msg.channel.send(botinvite_embed)
  }

// Commande off

  if (msg.content == prefix + "off") {
    if (msg.author.id === "318316245265154048") {
      deleteCommand(msg)
      console.warn("En cours d’extinction par " + msg.author.tag + ". \n ••••••••••••••••••••")
      client.destroy()
    }
  }
  
  if (msg.content === "/info"){
    deleteCommand(msg)
    msg.channel.send("**Mon préfixe sur ce serveur est : " + prefix)
  }
  
  if (msg.content == prefix + "me"){
    deleteCommand()
    let me_embed = new Discord.RichEmbed()
      .setAuthor(msg.author.username, msg.author.avatarURL)
      .addField("Pseudo", msg.author.username)
      .addField("Tag", msg.author.tag)
      .addField("Identifiant", msg.author.id)
      //.addField("Statut", msg.author.)
    msg.channel.send(me_embed)
  }

});
client.login(token)