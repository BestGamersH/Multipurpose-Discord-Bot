import type { BackupData, LoadOptions } from './types';
import type { Emoji, Guild, Role } from 'discord.js';
/**
 * Restores the guild configuration
 */
export declare const loadConfig: (guild: Guild, backupData: BackupData) => Promise<Guild[]>;
/**
 * Restore the guild roles
 */
export declare const loadRoles: (guild: Guild, backupData: BackupData) => Promise<Role[]>;
/**
 * Restore the guild channels
 */
export declare const loadChannels: (guild: Guild, backupData: BackupData, options: LoadOptions) => Promise<unknown[]>;
/**
 * Restore the afk configuration
 */
export declare const loadAFK: (guild: Guild, backupData: BackupData) => Promise<Guild[]>;
/**
 * Restore guild emojis
 */
export declare const loadEmojis: (guild: Guild, backupData: BackupData) => Promise<Emoji[]>;
/**
 * Restore guild bans
 */
export declare const loadBans: (guild: Guild, backupData: BackupData) => Promise<string[]>;
/**
 * Restore embedChannel configuration
 */
export declare const loadEmbedChannel: (guild: Guild, backupData: BackupData) => Promise<Guild[]>;
