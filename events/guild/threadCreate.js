//The Module
module.exports = async (client, thread) => {
    try{
        if(thread.joinable && !thread.joined){
            await thread.join();
        }
    }catch (e){
        console.log(String(e).grey)
    }
}
/**
 * @INFO
 * Bot Coded by BestGamersHK#9999 | https://discord.gg/4kRxKUbkdP
 * @INFO
 * Work for Milrato Development |  
 * @INFO
 * Please mention him / Milrato Development, when using this Code!
 * @INFO
 */
