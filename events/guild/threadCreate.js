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
 * Bot Coded by bestgamershk_ | https://discord.gg/bestgamershk
 * @INFO
 * Work for BestGamersHK | discord.gg/bestgamershk
 * @INFO
 * Please mention him, when using this Code!
 * @INFO
 */
