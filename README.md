﻿# Public Bot and Support Server!

<a href="[https://discord.gg/milratoshop"><img src="https://discord.com/api/guilds/773668217163218944/widget.png?style=banner2"></a>
 

# Important notes and thank ❤️
First of all, thanks for using this Source Code, it was and is a ton of work to create and maintain it!
If you find any errors please create a issue from <a href="https://github.com/BestGamersH/Multipurpose-Discord-Bot/issues">Here</a>

# Installation Guide 🔥

## ✅ Hosting Requirements

<details>
  <summary>Click to expand</summary>

  * [Nodejs](https://nodejs.org) version 18
  * [Discord.js](https://discord.js.org/) version 13.6.0 or higher
    * Latest version `npm install discord.js@latest`
    * Version 13 `npm install discord.js@13`
  * [Python](https://python.org) version 3.10 or higher, to install the database `enmap` (better-sqlite3)
  * A VPS would be adviced, so you don't need to keep your pc/laptop/raspi 24/7 online! [click here for a debian setup](https://github.com/Tomato6966/Debian-Cheat-Sheet-Setup/wiki/)
  * A VM Would also take up less resourceses on your computer
    * [Virtualbox](https://www.virtualbox.org/)
    * [Workstation Player Evaluation](https://www.vmware.com/products/workstation-player/workstation-player-evaluation.html)
  * [Visual studio code](https://visualstudio.microsoft.com/downloads/) latest version, Make sure to select "Desktop development with C++" which should install the necessary components for Node.js native modules.
  * A Text/Code editor
    * [Notpad++](https://notepad-plus-plus.org/)
    * [Sublime Text](https://www.sublimetext.com/)
    * [IntelliJ IDEA](https://www.jetbrains.com/idea/)


</details>

## 🤖 Bot Requirements

<details>
<summary>Click to expand</summary>
To install the Multipurpose Discord Bot:

Download the source code from [GitHub](https://github.com/BestGamersH/Multipurpose-Discord-Bot.git). You can either clone the repository with the following command:

`git clone https://github.com/BestGamersH/Multipurpose-Discord-Bot.git`

Or, you can download the ZIP archive from the latest release or a specific branch.

Make sure your system meets the following requirements:

* At least 2GB of RAM
* At least 700MB of free disk space (1GB is recommended)

If you have downloaded the source code and met the system requirements, you can install and start the bot.
</details>

## 🎶 Music Requirements

<details>
  <summary>Click to expand</summary>

  *To have your Bot able to play music, you need to connect it to a lavalink Station!*
  *There are many public ones out there for example lavalink.eu*
  An example for a public configuration will be listed down below
   
  1. Make sure `Java 11` is installed on your System!
     * [Click here for a Download for **Linux**](https://github.com/Tomato6966/Debian-Cheat-Sheet-Setup/wiki/3.5.2-java-11)
     * [Click here for a Download for **Windows**](https://downloads.milrato.eu/windows/java/jdk-11.0.11.exe) ​
  2. Download [Lavalink.jar](https://github.com/freyacodes/Lavalink/releases/download/3.4/Lavalink.jar)
     * here is a direct link: https://github.com/freyacodes/Lavalink/releases/download/3.4/Lavalink.jar
     * if you are on linux do this: `wget https://github.com/freyacodes/Lavalink/releases/download/3.4/Lavalink.jar` (prep: `apt-get install -y wget`)
  3. Download [application.yml](https://cdn.discordapp.com/attachments/734517910025928765/934084553751015475/application.yml)
     * Download my example, it's the configuration for the lavalink.jar file!
  4. Now put application.yml and Lavalink.jar in the same folder and start it
     * To start lavalink type: `java -jar Lavalink.jar`
     * Make sure to keep your terminal Open!
     * If you want to use something like `npm i -g pm2` to host it without keeping your terminal open type: `pm2 start java -- -jar Lavalink.jar`
  5. The settings like **password** in application.yml and **port** must be provided in the `botconfig/config.json` of the Bot
     * If you used the default settings, than no adjust ments are needed and it should look like this: 
     ```json
     {
        "clientsettings": {
            "nodes": [
                {
                    "host": "localhost",
                    "port": 2333,
                    "password": "youshallnotpass"
                }
            ]
        }
     }
     ```
  6. You don't want to host your own Lavalink?
     * [Here is a list of many free-to-use Lavalink Servers!](https://lavalink.darrennathanael.com/#how2host)
     * Or just use something like this: 
     ```json
     {
        "clientsettings": {
            "nodes": [
                {
                    "host": "lava.link",
                    "port": 80,
                    "password": "Anything for the Password"
                }
            ]
        }
     }
     ```

</details>

## 🤖 Configuration and Starting

<details>
  <summary>Click to expand</summary>

  **NOTE:** *you can do the exact same configuration inside of the `example.env` File, just make sure to rename it to `.env` or use environment variables!*
 
   1. Check `🎶 Music Requirements` that you started lavalink / use a valid public lavalink station
   2. Fill in all required data in `./botconfig/config.json` **NOTE:** *If you're on replit.com, it is exposed to everyone!(use .env instead)*
   3. Fill in all required data in the `.json` Files in `./social_log/` (`./social_log/streamconfig.json` & `./social_log/twitter.json`), if you want the SOCIAL LOGS to work! (the key `authToken` in streamconfig is not needed to be filled in!)
   4. You can adjust some settings in the other `./botconfig/*.json` Files, **BUT PLEASE __KEEP__ MY CREDITS & ADS!** This is the only way on how my hard work is "revenued"
   5. Now start the bot by typing opening a cmd in that folder and type: `node index.js` or `npm start`
     * If you don't want to keep the terminal open or if you're on linux, check out [pm2 (and my tutorial)](https://github.com/Tomato6966/Debian-Cheat-Sheet-Setup/wiki/4-pm2-tutorial) and type: `pm2 start --name Bot_Name index.js`
  
</details>

## ❓ Where to get which Api-Key(s)

<details>
  <summary>Click to expand</summary>

  **NOTE:** *you can do the exact same configuration inside of the `example.env` File, just make sure to rename it to `.env` or use environment variables!*
 
  1. `./botconfig/config.json`
     * `token` you can get from: [discord-Developers](https://discord.com/developers/applications)
     * `memer_api` you can get from: [Meme-Development DC](https://discord.gg/Mc2FudJkgP)
     * `spotify.clientSecret` you can get from: [Spotify-Developer](https://developer.spotify.com)
     * `spotify.clientID` you can get from: [Spotify-Developer](https://developer.spotify.com)
     * `fnbr` is a FNBR token, which you may get from [FNBRO.co](https://fnbr.co/api/docs) (needed for fnshop)
     * `fortnitetracker` is a FORTNITE TRACKER token, which you may get from [fortnitetracker.com](https://fortnitetracker.com/site-api) (needed for fnstats)
  2. `./social_log/streamconfig.json`
     * `twitch_clientID` you can get from: [Twitch-Developer](https://dev.twitch.tv/docs/api) ([developer-console](https://dev.twitch.tv/console))
     * `twitch_secret` you can get from: [Twitch-Developer](https://dev.twitch.tv/docs/api) ([developer-console](https://dev.twitch.tv/console))
     * `authToken` is not required to be filled in --> will be done automatically
  3. `./social_log/twitter.json`
     * `consumer_key` you can get from: [twitter Developers](https://developer.twitter.com)
     * `consumer_secret` you can get from: [twitter Developers](https://developer.twitter.com)
     * `access_token` you can get from: [twitter Developers](https://developer.twitter.com)
     * `access_token_secret` you can get from: [twitter Developers](https://developer.twitter.com)

  4. Optionally, you can change the API key for AIChat by creating your own url at Brainshop.ai: https://brainshop.ai/. This lets you set the name and other details of your AI.
  
</details>

## ✨ Commands List

<details>
  <summary>Click to expand</summary> 
## Commands

This is a list of all the commands that you can use with the Multipurpose Discord Bot.

| Command | Description | Image |
|---|---|---|
| `!help` | Displays a list of all the available commands. | [Image of the help command output] |
| `!ping` | Pings the bot and returns its response time. | [Image of the ping command output] |
| `!play` | Plays a song from YouTube or Spotify. | [Image of the play command output] |
| `!pause` | Pauses the currently playing song. | [Image of the pause command output] |
| `!stop` | Stops the currently playing song. | [Image of the stop command output] |

## SUPPORT me AND MILRATO DEVELOPMENT

> You can always Support me by inviting one of me **own Discord Bots**

# Credits

> If consider using this Bot, make sure to credit me
> This bot was made by https://github.com/Tomato6966 All credits to him, I just fixed the errors in it didn't code it fully.
> Contributors
  * Hotsuop - Edited code to make it work from small errors 
  * BestGamersHK - Did like everthing you see here
  * Tomato6966 For coding the whole thing

