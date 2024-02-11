const { readdirSync, lstatSync } = require("fs");
const { SlashCommandBuilder } = require('@discordjs/builders');
const config = require(`${process.cwd()}/botconfig/config.json`);

// Array to define the setup for each category or folder
const dirSetup = [
    {
        "Folder": "Info",
        "CmdName": "info",
        "CmdDescription": "Get Informations!"
    },
    {
        "Folder": "Music",
        "CmdName": "music",
        "CmdDescription": "Listen to Music!"
    },
    {
        "Folder": "Admin",
        "CmdName": "admin",
        "CmdDescription": "Administrate the Server!"
    },
    {
        "Folder": "NSFW",
        "CmdName": "nsfw",
        "CmdDescription": "NSFW Content, NSFW CHANNELS only!"
    },
    {
        "Folder": "Fun",
        "CmdName": "fun",
        "CmdDescription": "Fun related Commands!"
    }
];

module.exports = (client) => {
    try {
        client.allCommands = []; // Raw Slash Commands Data

        readdirSync("./slashCommands/").forEach((dir) => {
            if (lstatSync(`./slashCommands/${dir}`).isDirectory()) {
                const groupName = dir;
                const cmdSetup = dirSetup.find(d => d.Folder === dir);

                if (cmdSetup && cmdSetup.Folder) {
                    // Create a new SlashCommandBuilder for the subcommand
                    const subCommand = new SlashCommandBuilder()
                        .setName(String(cmdSetup.CmdName).replace(/\s+/g, '_').toLowerCase())
                        .setDescription(String(cmdSetup.CmdDescription));

                    const slashCommands = readdirSync(`./slashCommands/${dir}/`).filter((file) => file.endsWith(".js"));

                    for (let file of slashCommands) {
                        try {
                            // Dynamically load the slash command from the file
                            let pull = require(`../slashCommands/${dir}/${file}`);

                            if (pull.name && pull.description) {
                                const commandOptions = pull.options || [];

                                // Add a subcommand for each slash command
                                subCommand.addSubcommand((subcommand) => {
                                    subcommand
                                        .setName(String(pull.name).toLowerCase().substring(0, 25))
                                        .setDescription(pull.description.substring(0, 50));

                                    // Handle each option type based on your original code
                                    commandOptions.forEach((option) => {
                                        // Modify this section based on your option structure
                                        // Example: subcommand.addStringOption((op) => op.setName(...).setDescription(...).setRequired(...));
                                    });

                                    return subcommand;
                                });

                                // Store the slash command in a Map for future reference
                                client.slashCommands.set(String(cmdSetup.CmdName).replace(/\s+/g, '_').toLowerCase() + pull.name, pull);
                            } else {
                                console.log(file, `error -> missing a help.name, or help.name is not a string.`.brightRed);
                            }
                        } catch (error) {
                            console.error(`Error while processing file ${file} in folder ${dir}:`, error);
                        }
                    }

                    // Add the subcommand to the array
                    client.allCommands.push(subCommand.toJSON());
                } else {
                    console.log(`The Subcommand-Folder ${dir} is not in the dirSetup Configuration!`);
                }
            }
        });
    } catch (e) {
        console.log(String(e.stack).bgRed);
    }
};
