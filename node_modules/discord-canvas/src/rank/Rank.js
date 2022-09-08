const Canvas = require("canvas");
const { formatVariable, applyText } = require("../../utils/functions");

module.exports = class RankCard {
  constructor() {
    this.backgroundImage = `${__dirname}/../../assets/img/1px.png`;
    this.avatar = `${__dirname}/../../assets/img/default-avatar.png`;
    this.level = "1";
    this.rank = "10";
    this.rankName = "rank Name";
    this.reputation = "0";
    this.username = "username";
    this.xpCurrent = 8000;
    this.xpNeeded = 12000;
    this.addonReputation = true;
    this.addonRank = true;
    this.addonRankName = true;
    this.addonBadges = true;
    this.colorBackground = "#000000";
    this.colorLevelBox = "#ff7b4b";
    this.colorReputationBox = "#ff7b4b";
    this.colorLevel = "#ffffff";
    this.colorRank = "#ffffff";
    this.colorRankName = "#ffffff";
    this.colorUsername = "#ffffff";
    this.colorReputation = "#ffffff";
    this.colorBackgroundBar = "#000000";
    this.colorNeededXp = "#ffffff";
    this.colorBar = "#ffffff";
    this.colorNoBadges = "#000000";
    this.colorBadgesBox = "#000000";
    this.radiusCorner = "20";
    this.opacityAvatar = "0.4";
    this.opacityBadges = "0.4";
    this.opacityLevel = "1";
    this.opacityBackgroundBar = "0.4";
    this.opacityReputation = "1";
    this.opacityNoBadges = "0.4";
    this.textLevel = "lvl {level}";
    this.textNeededXp = "{current}/{needed} for next rank";
    this.textReputation = "+{reputation} rep";
    this.badge1 = null;
    this.badge2 = null;
    this.badge3 = null;
    this.badge4 = null;
    this.badge5 = null;
    this.badge6 = null;
    this.badge7 = null;
    this.badge8 = null;
    this.badge9 = null;
  }

  setAvatar(value) {
    this.avatar = value;
    return this;
  }

  setUsername(value) {
    this.username = value;
    return this;
  }

  setRank(value) {
    this.rank = value;
    return this;
  }

  setLevel(value) {
    this.level = value;
    return this;
  }

  setReputation(value) {
    this.reputation = value;
    return this;
  }

  setRankName(value) {
    this.rankName = value;
    return this;
  }

  setBackground(value) {
    this.backgroundImage = value;
    return this;
  }

  setXP(variable, value) {
    const formattedVariable = formatVariable("xp", variable);
    if (this[formattedVariable]) this[formattedVariable] = value;
    return this;
  }

  setColor(variable, value) {
    const formattedVariable = formatVariable("color", variable);
    if (this[formattedVariable]) this[formattedVariable] = value;
    return this;
  }

  setText(variable, value) {
    const formattedVariable = formatVariable("text", variable);
    if (this[formattedVariable]) this[formattedVariable] = value;
    return this;
  }

  setOpacity(variable, value) {
    const formattedVariable = formatVariable("opacity", variable);
    if (this[formattedVariable]) this[formattedVariable] = value;
    return this;
  }

  setAddon(variable, value) {
    const formattedVariable = formatVariable("addon", variable);
    if (this[formattedVariable]) this[formattedVariable] = value;
    return this;
  }

  setBadge(variable, value) {
    if (Number(variable) > 0 && Number(variable) < 10) {
      if (Number(variable) === 1) this.badge1 = value;
      if (Number(variable) === 2) this.badge2 = value;
      if (Number(variable) === 3) this.badge3 = value;
      if (Number(variable) === 4) this.badge4 = value;
      if (Number(variable) === 5) this.badge5 = value;
      if (Number(variable) === 6) this.badge6 = value;
      if (Number(variable) === 7) this.badge7 = value;
      if (Number(variable) === 8) this.badge8 = value;
      if (Number(variable) === 9) this.badge9 = value;
      return this;
    }
  }

  setRadius(value) {
    this.radiusCorner = value;
    return this;
  }

  async toAttachment() {
    let canvas = Canvas.createCanvas(1080, 400),
      ctx = canvas.getContext("2d");

    const lvlText = this.textLevel.replace(/{level}/g, this.level);
    const repText = this.textReputation.replace(
      /{reputation}/g,
      this.reputation
    );

    // Background
    ctx.beginPath();
    ctx.moveTo(0 + Number(this.radiusCorner), 0);
    ctx.lineTo(0 + 1080 - Number(this.radiusCorner), 0);
    ctx.quadraticCurveTo(0 + 1080, 0, 0 + 1080, 0 + Number(this.radiusCorner));
    ctx.lineTo(0 + 1080, 0 + 400 - Number(this.radiusCorner));
    ctx.quadraticCurveTo(
      0 + 1080,
      0 + 400,
      0 + 1080 - Number(this.radiusCorner),
      0 + 400
    );
    ctx.lineTo(0 + Number(this.radiusCorner), 0 + 400);
    ctx.quadraticCurveTo(0, 0 + 400, 0, 0 + 400 - Number(this.radiusCorner));
    ctx.lineTo(0, 0 + Number(this.radiusCorner));
    ctx.quadraticCurveTo(0, 0, 0 + Number(this.radiusCorner), 0);
    ctx.closePath();
    ctx.clip();
    ctx.fillStyle = this.colorBackground;
    ctx.fillRect(0, 0, 1080, 400);
    let background = await Canvas.loadImage(this.backgroundImage);
    ctx.drawImage(background, 0, 0, 1080, 400);
    ctx.restore();

    // Draw layer
    ctx.fillStyle = "#000000";
    ctx.globalAlpha = this.opacityAvatar;
    ctx.fillRect(50, 0, 240, canvas.height);
    ctx.globalAlpha = 1;

    // Avatar
    let avatar = await Canvas.loadImage(this.avatar);
    ctx.drawImage(avatar, 50 + 30, 30, 180, 180);

    // Level
    ctx.fillStyle = this.colorLevelBox;
    ctx.globalAlpha = this.opacityLevel;
    ctx.fillRect(50 + 30, 30 + 180 + 30, 180, 50);
    ctx.globalAlpha = 1;
    ctx.fillStyle = this.colorLevel;
    ctx.font = applyText(canvas, lvlText, 32, 170, "Bold");
    ctx.textAlign = "center";
    ctx.fillText(lvlText, 50 + 30 + 180 / 2, 30 + 180 + 30 + 38);

    // Rep
    if (this.addonReputation) {
      ctx.fillStyle = this.colorReputationBox;
      ctx.globalAlpha = this.opacityReputation;
      ctx.fillRect(50 + 30, 30 + 180 + 30 + 50 + 30, 180, 50);
      ctx.globalAlpha = 1;
      ctx.fillStyle = this.colorReputation;
      ctx.font = applyText(canvas, repText, 32, 170, "Bold");
      ctx.textAlign = "center";
      ctx.fillText(repText, 50 + 30 + 180 / 2, 30 + 180 + 30 + 30 + 50 + 38);
    }

    // Username
    ctx.textAlign = "left";
    ctx.fillStyle = this.colorUsername;
    ctx.font = applyText(canvas, this.username, 45, 460, "Bold");
    ctx.fillText(this.username, 50 + 240 + 45 + 5, 80);

    // Rank
    if (this.addonRank) {
      ctx.textAlign = "right";
      ctx.fillStyle = this.colorRank;
      ctx.font = applyText(canvas, "#" + this.rank, 45, 194, "Bold");
      ctx.fillText("#" + this.rank, canvas.width - 50 - 5, 80);
    }
    if (this.addonRankName) {
      ctx.textAlign = "left";
      ctx.fillStyle = this.colorRankName;
      ctx.font = applyText(canvas, this.rankName, 35, 690, "Bold");
      ctx.fillText(this.rankName, 50 + 240 + 45 + 5, 80 + 45 + 15);
    }

    // Badges
    if (this.addonBadges) {
      ctx.fillStyle = this.colorBadgesBox;
      ctx.globalAlpha = this.opacityBadges;
      ctx.fillRect(240 + 50 + 50, 295, 700, 70);
      ctx.fillStyle = this.colorNoBadges;
      if (!this.badge1) {
        ctx.globalAlpha = this.opacityNoBadges;
        ctx.textAlign = "center";
        ctx.font = applyText(canvas, ".", 120, 50, "Bold");
        ctx.fillText(".", 240 + 50 + 50 + 25 + 50 / 2, 295 + 10 + 35);
      } else {
        ctx.globalAlpha = 1;
        if (
          this.badge1.toLowerCase() === "bronze" ||
          this.badge1.toLowerCase() === "silver" ||
          this.badge1.toLowerCase() === "gold" ||
          this.badge1.toLowerCase() === "diamond"
        ) {
          let badge1 = await Canvas.loadImage(
            `${__dirname}/../../assets/img/rank/bubble_${this.badge1.toLowerCase()}.png`
          );
          ctx.drawImage(badge1, 240 + 50 + 50 + 25, 295 + 10, 50, 50);
        } else {
          let badge1 = await Canvas.loadImage(this.badge1);
          ctx.drawImage(badge1, 240 + 50 + 50 + 25, 295 + 10, 50, 50);
        }
      }
      if (!this.badge2) {
        ctx.globalAlpha = this.opacityNoBadges;
        ctx.textAlign = "center";
        ctx.font = applyText(canvas, ".", 120, 50, "Bold");
        ctx.fillText(".", 240 + 50 + 50 + 25 + 50 + 25 + 50 / 2, 295 + 10 + 35);
      } else {
        ctx.globalAlpha = 1;
        if (
          this.badge2.toLowerCase() === "bronze" ||
          this.badge2.toLowerCase() === "silver" ||
          this.badge2.toLowerCase() === "gold" ||
          this.badge2.toLowerCase() === "diamond"
        ) {
          let badge2 = await Canvas.loadImage(
            `${__dirname}/../../assets/img/rank/speaker_${this.badge2.toLowerCase()}.png`
          );
          ctx.drawImage(badge2, 240 + 50 + 50 + 25 + 50 + 25, 295 + 10, 50, 50);
        } else {
          let badge2 = await Canvas.loadImage(this.badge2);
          ctx.drawImage(badge2, 240 + 50 + 50 + 25 + 50 + 25, 295 + 10, 50, 50);
        }
      }
      if (!this.badge3) {
        ctx.globalAlpha = this.opacityNoBadges;
        ctx.textAlign = "center";
        ctx.font = applyText(canvas, ".", 120, 50, "Bold");
        ctx.fillText(
          ".",
          240 + 50 + 50 + 25 + (50 + 25) * 2 + 50 / 2,
          295 + 10 + 35
        );
      } else {
        ctx.globalAlpha = 1;
        if (
          this.badge3.toLowerCase() === "bronze" ||
          this.badge3.toLowerCase() === "silver" ||
          this.badge3.toLowerCase() === "gold" ||
          this.badge3.toLowerCase() === "diamond"
        ) {
          let badge3 = await Canvas.loadImage(
            `${__dirname}/../../assets/img/rank/stream_${this.badge3.toLowerCase()}.png`
          );
          ctx.drawImage(
            badge3,
            240 + 50 + 50 + 25 + (50 + 25) * 2,
            295 + 10,
            50,
            50
          );
        } else {
          let badge3 = await Canvas.loadImage(this.badge3);
          ctx.drawImage(
            badge3,
            240 + 50 + 50 + 25 + (50 + 25) * 2,
            295 + 10,
            50,
            50
          );
        }
      }
      if (!this.badge4) {
        ctx.globalAlpha = this.opacityNoBadges;
        ctx.textAlign = "center";
        ctx.font = applyText(canvas, ".", 120, 50, "Bold");
        ctx.fillText(
          ".",
          240 + 50 + 50 + 25 + (50 + 25) * 3 + 50 / 2,
          295 + 10 + 35
        );
      } else {
        ctx.globalAlpha = 1;
        if (
          this.badge4.toLowerCase() === "bronze" ||
          this.badge4.toLowerCase() === "silver" ||
          this.badge4.toLowerCase() === "gold" ||
          this.badge4.toLowerCase() === "diamond"
        ) {
          let badge4 = await Canvas.loadImage(
            `${__dirname}/../../assets/img/rank/picture_${this.badge4.toLowerCase()}.png`
          );
          ctx.drawImage(
            badge4,
            240 + 50 + 50 + 25 + (50 + 25) * 3,
            295 + 10,
            50,
            50
          );
        } else {
          let badge4 = await Canvas.loadImage(this.badge4);
          ctx.drawImage(
            badge4,
            240 + 50 + 50 + 25 + (50 + 25) * 3,
            295 + 10,
            50,
            50
          );
        }
      }
      if (!this.badge5) {
        ctx.globalAlpha = this.opacityNoBadges;
        ctx.textAlign = "center";
        ctx.font = applyText(canvas, ".", 120, 50, "Bold");
        ctx.fillText(
          ".",
          240 + 50 + 50 + 25 + (50 + 25) * 4 + 50 / 2,
          295 + 10 + 35
        );
      } else {
        ctx.globalAlpha = 1;
        if (
          this.badge5.toLowerCase() === "bronze" ||
          this.badge5.toLowerCase() === "silver" ||
          this.badge5.toLowerCase() === "gold" ||
          this.badge5.toLowerCase() === "diamond"
        ) {
          let badge5 = await Canvas.loadImage(
            `${__dirname}/../../assets/img/rank/like_${this.badge5.toLowerCase()}.png`
          );
          ctx.drawImage(
            badge5,
            240 + 50 + 50 + 25 + (50 + 25) * 4,
            295 + 10,
            50,
            50
          );
        } else {
          let badge5 = await Canvas.loadImage(this.badge5);
          ctx.drawImage(
            badge5,
            240 + 50 + 50 + 25 + (50 + 25) * 4,
            295 + 10,
            50,
            50
          );
        }
      }
      if (!this.badge6) {
        ctx.globalAlpha = this.opacityNoBadges;
        ctx.textAlign = "center";
        ctx.font = applyText(canvas, ".", 120, 50, "Bold");
        ctx.fillText(
          ".",
          240 + 50 + 50 + 25 + (50 + 25) * 5 + 50 / 2,
          295 + 10 + 35
        );
      } else {
        ctx.globalAlpha = 1;
        if (
          this.badge6.toLowerCase() === "bronze" ||
          this.badge6.toLowerCase() === "silver" ||
          this.badge6.toLowerCase() === "gold" ||
          this.badge6.toLowerCase() === "diamond"
        ) {
          let badge6 = await Canvas.loadImage(
            `${__dirname}/../../assets/img/rank/star_${this.badge6.toLowerCase()}.png`
          );
          ctx.drawImage(
            badge6,
            240 + 50 + 50 + 25 + (50 + 25) * 5,
            295 + 10,
            50,
            50
          );
        } else {
          let badge6 = await Canvas.loadImage(this.badge6);
          ctx.drawImage(
            badge6,
            240 + 50 + 50 + 25 + (50 + 25) * 5,
            295 + 10,
            50,
            50
          );
        }
      }
      if (!this.badge7) {
        ctx.globalAlpha = this.opacityNoBadges;
        ctx.textAlign = "center";
        ctx.font = applyText(canvas, ".", 120, 50, "Bold");
        ctx.fillText(
          ".",
          240 + 50 + 50 + 25 + (50 + 25) * 6 + 50 / 2,
          295 + 10 + 35
        );
      } else {
        ctx.globalAlpha = 1;
        if (
          this.badge7.toLowerCase() === "bronze" ||
          this.badge7.toLowerCase() === "silver" ||
          this.badge7.toLowerCase() === "gold" ||
          this.badge7.toLowerCase() === "diamond"
        ) {
          let badge7 = await Canvas.loadImage(
            `${__dirname}/../../assets/img/rank/boost_${this.badge7.toLowerCase()}.png`
          );
          ctx.drawImage(
            badge7,
            240 + 50 + 50 + 25 + (50 + 25) * 6,
            295 + 10,
            50,
            50
          );
        } else {
          let badge7 = await Canvas.loadImage(this.badge7);
          ctx.drawImage(
            badge7,
            240 + 50 + 50 + 25 + (50 + 25) * 6,
            295 + 10,
            50,
            50
          );
        }
      }
      if (!this.badge8) {
        ctx.globalAlpha = this.opacityNoBadges;
        ctx.textAlign = "center";
        ctx.font = applyText(canvas, ".", 120, 50, "Bold");
        ctx.fillText(
          ".",
          240 + 50 + 50 + 25 + (50 + 25) * 7 + 50 / 2,
          295 + 10 + 35
        );
      } else {
        ctx.globalAlpha = 1;
        if (
          this.badge8.toLowerCase() === "bronze" ||
          this.badge8.toLowerCase() === "silver" ||
          this.badge8.toLowerCase() === "gold" ||
          this.badge8.toLowerCase() === "diamond"
        ) {
          let badge8 = await Canvas.loadImage(
            `${__dirname}/../../assets/img/rank/money_${this.badge8.toLowerCase()}.png`
          );
          ctx.drawImage(
            badge8,
            240 + 50 + 50 + 25 + (50 + 25) * 7,
            295 + 10,
            50,
            50
          );
        } else {
          let badge8 = await Canvas.loadImage(this.badge8);
          ctx.drawImage(
            badge8,
            240 + 50 + 50 + 25 + (50 + 25) * 7,
            295 + 10,
            50,
            50
          );
        }
      }
      if (!this.badge9) {
        ctx.globalAlpha = this.opacityNoBadges;
        ctx.textAlign = "center";
        ctx.font = applyText(canvas, ".", 120, 50, "Bold");
        ctx.fillText(
          ".",
          240 + 50 + 50 + 25 + (50 + 25) * 8 + 50 / 2,
          295 + 10 + 35
        );
      } else {
        ctx.globalAlpha = 1;
        if (
          this.badge9.toLowerCase() === "bronze" ||
          this.badge9.toLowerCase() === "silver" ||
          this.badge9.toLowerCase() === "gold" ||
          this.badge9.toLowerCase() === "diamond"
        ) {
          let badge9 = await Canvas.loadImage(
            `${__dirname}/../../assets/img/rank/bot_${this.badge9.toLowerCase()}.png`
          );
          ctx.drawImage(
            badge9,
            240 + 50 + 50 + 25 + (50 + 25) * 8,
            295 + 10,
            50,
            50
          );
        } else {
          let badge9 = await Canvas.loadImage(this.badge9);
          ctx.drawImage(
            badge9,
            240 + 50 + 50 + 25 + (50 + 25) * 8,
            295 + 10,
            50,
            50
          );
        }
      }
    }

    // XP
    ctx.globalAlpha = 1;
    const latestXP = Number(this.xpNeeded) - Number(this.xpCurrent);
    const textXPEdited = this.textNeededXp
      .replace(/{needed}/g, this.xpNeeded)
      .replace(/{current}/g, this.xpCurrent)
      .replace(/{latest}/g, latestXP);
    ctx.textAlign = "center";
    ctx.fillStyle = this.colorNeededXp;
    ctx.font = applyText(canvas, textXPEdited, 25, 690, "Bold");
    ctx.fillText(
      textXPEdited,
      50 + 240 + 45 + 5 + 690 / 2,
      80 + 45 + 15 + 30 + 90
    );
    ctx.beginPath();
    ctx.moveTo(240 + 50 + 50 + 25, 80 + 45 + 10 + 40);
    ctx.lineTo(240 + 50 + 50 + 700 - 25, 80 + 45 + 10 + 40);
    ctx.quadraticCurveTo(
      240 + 50 + 50 + 700,
      80 + 45 + 10 + 40,
      240 + 50 + 50 + 700,
      80 + 45 + 10 + 40 + 25
    );
    ctx.lineTo(240 + 50 + 50 + 700, 80 + 45 + 10 + 40 + 50 - 25);
    ctx.quadraticCurveTo(
      240 + 50 + 50 + 700,
      80 + 45 + 10 + 40 + 50,
      240 + 50 + 50 + 700 - 25,
      80 + 45 + 10 + 40 + 50
    );
    ctx.lineTo(240 + 50 + 50 + 25, 80 + 45 + 10 + 40 + 50);
    ctx.quadraticCurveTo(
      240 + 50 + 50,
      80 + 45 + 10 + 40 + 50,
      240 + 50 + 50,
      80 + 45 + 10 + 40 + 50 - 25
    );
    ctx.lineTo(240 + 50 + 50, 80 + 45 + 10 + 40 + 25);
    ctx.quadraticCurveTo(
      240 + 50 + 50,
      80 + 45 + 10 + 40,
      240 + 50 + 50 + 25,
      80 + 45 + 10 + 40
    );
    ctx.closePath();
    ctx.clip();
    ctx.fillStyle = this.colorBackgroundBar;
    ctx.globalAlpha = this.opacityBackgroundBar;
    ctx.fillRect(240 + 50 + 50, 80 + 45 + 10 + 40, 700, 50);
    ctx.fillStyle = this.colorBar;
    ctx.globalAlpha = 1;
    const percent = (100 * this.xpCurrent) / this.xpNeeded;
    const progress = (percent * 700) / 100;
    ctx.fillRect(240 + 50 + 50, 80 + 45 + 10 + 40, progress, 50);
    ctx.restore();
    return canvas;
  }
};
