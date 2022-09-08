"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.clearGuild = exports.loadChannel = exports.loadCategory = exports.fetchTextChannelData = exports.fetchChannelMessages = exports.fetchVoiceChannelData = exports.fetchChannelPermissions = void 0;
const node_fetch_1 = require("node-fetch");
const MaxBitratePerTier = {
    NONE: 64000,
    TIER_1: 128000,
    TIER_2: 256000,
    TIER_3: 384000
};
/**
 * Gets the permissions for a channel
 */
function fetchChannelPermissions(channel) {
    const permissions = [];
    channel.permissionOverwrites.cache
        .filter((p) => p.type === 'role')
        .forEach((perm) => {
        // For each overwrites permission
        const role = channel.guild.roles.cache.get(perm.id);
        if (role) {
            permissions.push({
                roleName: role.name,
                allow: perm.allow.bitfield.toString(),
                deny: perm.deny.bitfield.toString()
            });
        }
    });
    return permissions;
}
exports.fetchChannelPermissions = fetchChannelPermissions;
/**
 * Fetches the voice channel data that is necessary for the backup
 */
async function fetchVoiceChannelData(channel) {
    return new Promise(async (resolve) => {
        const channelData = {
            type: 'GUILD_VOICE',
            name: channel.name,
            bitrate: channel.bitrate,
            userLimit: channel.userLimit,
            parent: channel.parent ? channel.parent.name : null,
            permissions: fetchChannelPermissions(channel)
        };
        /* Return channel data */
        resolve(channelData);
    });
}
exports.fetchVoiceChannelData = fetchVoiceChannelData;
async function fetchChannelMessages(channel, options) {
    let messages = [];
    const messageCount = isNaN(options.maxMessagesPerChannel) ? 10 : options.maxMessagesPerChannel;
    const fetchOptions = { limit: 100 };
    let lastMessageId;
    let fetchComplete = false;
    while (!fetchComplete) {
        if (lastMessageId) {
            fetchOptions.before = lastMessageId;
        }
        const fetched = await channel.messages.fetch(fetchOptions);
        if (fetched.size === 0) {
            break;
        }
        lastMessageId = fetched.last().id;
        await Promise.all(fetched.map(async (msg) => {
            if (!msg.author || messages.length >= messageCount) {
                fetchComplete = true;
                return;
            }
            const files = await Promise.all(msg.attachments.map(async (a) => {
                let attach = a.url;
                if (a.url && ['png', 'jpg', 'jpeg', 'jpe', 'jif', 'jfif', 'jfi'].includes(a.url)) {
                    if (options.saveImages && options.saveImages === 'base64') {
                        attach = (await ((0, node_fetch_1.default)(a.url).then((res) => res.buffer()))).toString('base64');
                    }
                }
                return {
                    name: a.name,
                    attachment: attach
                };
            }));
            messages.push({
                username: msg.author.username,
                avatar: msg.author.displayAvatarURL(),
                content: msg.cleanContent,
                embeds: msg.embeds,
                files,
                pinned: msg.pinned,
                sentAt: msg.createdAt.toISOString(),
            });
        }));
    }
    return messages;
}
exports.fetchChannelMessages = fetchChannelMessages;
/**
 * Fetches the text channel data that is necessary for the backup
 */
async function fetchTextChannelData(channel, options) {
    return new Promise(async (resolve) => {
        const channelData = {
            type: channel.type,
            name: channel.name,
            nsfw: channel.nsfw,
            rateLimitPerUser: channel.type === 'GUILD_TEXT' ? channel.rateLimitPerUser : undefined,
            parent: channel.parent ? channel.parent.name : null,
            topic: channel.topic,
            permissions: fetchChannelPermissions(channel),
            messages: [],
            isNews: channel.type === 'GUILD_NEWS',
            threads: []
        };
        /* Fetch channel threads */
        if (channel.threads.cache.size > 0) {
            await Promise.all(channel.threads.cache.map(async (thread) => {
                const threadData = {
                    type: thread.type,
                    name: thread.name,
                    archived: thread.archived,
                    autoArchiveDuration: thread.autoArchiveDuration,
                    locked: thread.locked,
                    rateLimitPerUser: thread.rateLimitPerUser,
                    messages: []
                };
                try {
                    threadData.messages = await fetchChannelMessages(thread, options);
                    /* Return thread data */
                    channelData.threads.push(threadData);
                }
                catch {
                    channelData.threads.push(threadData);
                }
            }));
        }
        /* Fetch channel messages */
        try {
            channelData.messages = await fetchChannelMessages(channel, options);
            /* Return channel data */
            resolve(channelData);
        }
        catch {
            resolve(channelData);
        }
    });
}
exports.fetchTextChannelData = fetchTextChannelData;
/**
 * Creates a category for the guild
 */
async function loadCategory(categoryData, guild) {
    return new Promise((resolve) => {
        guild.channels.create(categoryData.name, {
            type: 'GUILD_CATEGORY'
        }).then(async (category) => {
            // When the category is created
            const finalPermissions = [];
            categoryData.permissions.forEach((perm) => {
                const role = guild.roles.cache.find((r) => r.name === perm.roleName);
                if (role) {
                    finalPermissions.push({
                        id: role.id,
                        allow: BigInt(perm.allow),
                        deny: BigInt(perm.deny)
                    });
                }
            });
            await category.permissionOverwrites.set(finalPermissions);
            resolve(category); // Return the category
        });
    });
}
exports.loadCategory = loadCategory;
/**
 * Create a channel and returns it
 */
async function loadChannel(channelData, guild, category, options) {
    return new Promise(async (resolve) => {
        const loadMessages = (channel, messages, previousWebhook) => {
            return new Promise(async (resolve) => {
                const webhook = previousWebhook || await channel.createWebhook('MessagesBackup', {
                    avatar: channel.client.user.displayAvatarURL()
                }).catch(() => { });
                if (!webhook)
                    return resolve();
                messages = messages
                    .filter((m) => m.content.length > 0 || m.embeds.length > 0 || m.files.length > 0)
                    .reverse();
                messages = messages.slice(messages.length - options.maxMessagesPerChannel);
                for (const msg of messages) {
                    const sentMsg = await webhook
                        .send({
                        content: msg.content.length ? msg.content : undefined,
                        username: msg.username,
                        avatarURL: msg.avatar,
                        embeds: msg.embeds,
                        files: msg.files,
                        allowedMentions: options.allowedMentions,
                        threadId: channel.isThread() ? channel.id : undefined
                    })
                        .catch((err) => {
                        console.log(err.message);
                    });
                    if (msg.pinned && sentMsg)
                        await sentMsg.pin();
                }
                resolve(webhook);
            });
        };
        const createOptions = {
            type: null,
            parent: category
        };
        if (channelData.type === 'GUILD_TEXT' || channelData.type === 'GUILD_NEWS') {
            createOptions.topic = channelData.topic;
            createOptions.nsfw = channelData.nsfw;
            createOptions.rateLimitPerUser = channelData.rateLimitPerUser;
            createOptions.type =
                channelData.isNews && guild.features.includes('NEWS') ? 'GUILD_NEWS' : 'GUILD_TEXT';
        }
        else if (channelData.type === 'GUILD_VOICE') {
            // Downgrade bitrate
            let bitrate = channelData.bitrate;
            const bitrates = Object.values(MaxBitratePerTier);
            while (bitrate > MaxBitratePerTier[guild.premiumTier]) {
                bitrate = bitrates[Object.keys(MaxBitratePerTier).indexOf(guild.premiumTier) - 1];
            }
            createOptions.bitrate = bitrate;
            createOptions.userLimit = channelData.userLimit;
            createOptions.type = 'GUILD_VOICE';
        }
        guild.channels.create(channelData.name, createOptions).then(async (channel) => {
            /* Update channel permissions */
            const finalPermissions = [];
            channelData.permissions.forEach((perm) => {
                const role = guild.roles.cache.find((r) => r.name === perm.roleName);
                if (role) {
                    finalPermissions.push({
                        id: role.id,
                        allow: BigInt(perm.allow),
                        deny: BigInt(perm.deny)
                    });
                }
            });
            await channel.permissionOverwrites.set(finalPermissions);
            if (channelData.type === 'GUILD_TEXT') {
                /* Load messages */
                let webhook;
                if (channelData.messages.length > 0) {
                    webhook = await loadMessages(channel, channelData.messages).catch(() => { });
                }
                /* Load threads */
                if (channelData.threads.length > 0) { //&& guild.features.includes('THREADS_ENABLED')) {
                    await Promise.all(channelData.threads.map(async (threadData) => {
                        let autoArchiveDuration = threadData.autoArchiveDuration;
                        if (!guild.features.includes('SEVEN_DAY_THREAD_ARCHIVE') && autoArchiveDuration === 10080)
                            autoArchiveDuration = 4320;
                        if (!guild.features.includes('THREE_DAY_THREAD_ARCHIVE') && autoArchiveDuration === 4320)
                            autoArchiveDuration = 1440;
                        return channel.threads.create({
                            name: threadData.name,
                            autoArchiveDuration
                        }).then((thread) => {
                            if (!webhook)
                                return;
                            return loadMessages(thread, threadData.messages, webhook);
                        });
                    }));
                }
                return channel;
            }
            else {
                resolve(channel); // Return the channel
            }
        });
    });
}
exports.loadChannel = loadChannel;
/**
 * Delete all roles, all channels, all emojis, etc... of a guild
 */
async function clearGuild(guild) {
    guild.roles.cache
        .filter((role) => !role.managed && role.editable && role.id !== guild.id)
        .forEach((role) => {
        role.delete().catch(() => { });
    });
    guild.channels.cache.forEach((channel) => {
        channel.delete().catch(() => { });
    });
    guild.emojis.cache.forEach((emoji) => {
        emoji.delete().catch(() => { });
    });
    const webhooks = await guild.fetchWebhooks();
    webhooks.forEach((webhook) => {
        webhook.delete().catch(() => { });
    });
    const bans = await guild.bans.fetch();
    bans.forEach((ban) => {
        guild.members.unban(ban.user).catch(() => { });
    });
    guild.setAFKChannel(null);
    guild.setAFKTimeout(60 * 5);
    guild.setIcon(null);
    guild.setBanner(null).catch(() => { });
    guild.setSplash(null).catch(() => { });
    guild.setDefaultMessageNotifications('ONLY_MENTIONS');
    guild.setWidgetSettings({
        enabled: false,
        channel: null
    });
    if (!guild.features.includes('COMMUNITY')) {
        guild.setExplicitContentFilter('DISABLED');
        guild.setVerificationLevel('NONE');
    }
    guild.setSystemChannel(null);
    guild.setSystemChannelFlags(['SUPPRESS_GUILD_REMINDER_NOTIFICATIONS', 'SUPPRESS_JOIN_NOTIFICATIONS', 'SUPPRESS_PREMIUM_SUBSCRIPTIONS']);
    return;
}
exports.clearGuild = clearGuild;
