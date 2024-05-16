var happened;
var enemie;
var monHp;
var monAttack;
var monAttackMin;
var monAttackMax;
var monAttackText;
var monSpeed;
var yourName;
var yourAttack;
var yourSpeed= Math.floor(Math.random() * 10 + 1);
var yourClass;
var yourRace;
var XP = 0;
var level= 1;
var levelCheck;
var curseCheck;
var attackMin;
var attackMax;
var inventory= [];
var structure;
var villageEvent;
var trapDamage;
var dungeonExit;
var answer;
var inDungeon = ("no");
var inVillage = ("no");
var infoText;
var click = 0;
attackMin= 2;
attackMax= 5;
var yourFullHp= 5 + Math.floor(Math.random() * 5 + 1);
var yourCurrentHp = yourFullHp;
yourAttack;
yourClass= pickClass();
yourRace= pickRace();
var saved;
var mystats;
function saveData(){
	localStorage.setItem("saved", "1");
    localStorage.setItem("Level", level);
    localStorage.setItem("XP", XP);
    localStorage.setItem("Race", yourRace);
    localStorage.setItem("Class", yourClass);
    localStorage.setItem("AttackMin", attackMin);
    localStorage.setItem("AttackMax", attackMax);
    localStorage.setItem("FullHp", yourFullHp);
    localStorage.setItem("CurrentHp", yourCurrentHp);
    localStorage.setItem("Speed", yourSpeed);
    document.getElementById("info").innerHTML= "Game saved.";
}
function getData(){
	saved= parseInt(localStorage.getItem("saved"));
    XP= parseInt(localStorage.getItem("XP"));
    level= parseInt(localStorage.getItem("Level"));
    yourRace= localStorage.getItem("Race");
    yourClass= localStorage.getItem("Class");
    attackMin= parseInt(localStorage.getItem("AttackMin"));
    attackMax= parseInt(localStorage.getItem("AttackMax"));
    yourFullHp= parseInt(localStorage.getItem("FullHp"));
    yourCurrentHp= parseInt(localStorage.getItem("CurrentHp"));
    yourSpeed= parseInt(localStorage.getItem("Speed"));
}

function pickClass(){
    return ["Rogue", "Warrior", "Mage"][Math.floor(Math.random() * 3)]
}
function pickRace(){
    return ["Dwarf", "Elf", "Human"][Math.floor(Math.random() * 3)]
}
function yourStats(){
	mystats = "on";
	sessionStorage.setItem("InfoPre", infoText);
    sessionStorage.setItem("PicPre", document.getElementById("pic").src);
    document.getElementById("info").innerHTML= "Level: " + level + "<br> XP: " + XP + " /10 <br> Race: " + yourRace + "<br> Class: " + yourClass + "<br>Speed: " + yourSpeed + "<br>Attack: " + attackMin + "-" + attackMax + "<br>HP: " + yourFullHp;
    if(yourCurrentHp< yourFullHp){
    document.getElementById("info").innerHTML= "Level: " + level + "<br> XP: " + XP + " /10 <br> Race: " + yourRace + "<br> Class: " + yourClass + "<br>Speed: " + yourSpeed + "<br>Attack: " + attackMin + "-" + attackMax + "<br>HP: " + yourFullHp + "<br>Current Hp: " + yourCurrentHp;
    }
    document.getElementById("pic").src= "img/"+ yourRace +" " + yourClass +".jpg"
    document.getElementById("myCharacter").style.display= "none";
    document.getElementById("statClose").style.display= "inline";
}

function statClear(){
	mystats = "off";
	console.log("stat clear");
    document.getElementById("myCharacter").style.display= "inline";
    document.getElementById("statClose").style.display= "none";
    infoText= sessionStorage.getItem("InfoPre");
    infoPic= sessionStorage.getItem("PicPre");
    document.getElementById("pic").src= infoPic;
    document.getElementById("info").innerHTML= infoText;
}
function statClear2(){
	if (mystats === "on"){
		document.getElementById("myCharacter").style.display= "inline";
    	document.getElementById("statClose").style.display= "none";
	}
	document.getElementById("delete2").style.display= "none";
}
function travel() {
    click = 0;
    inDungeon = "no";
    inVillage = "no";
    showButtons();
    document.getElementById("pic").src= "img/blank.png";
    clearScreen(2, 16);
    document.getElementById("itemDrop").innerHTML= " ";
    document.getElementById("levelUp").innerHTML= " ";
    document.getElementById("p1").innerHTML= "<br> You traveld a mile";
    if(yourCurrentHp< yourFullHp){
        yourCurrentHp= yourCurrentHp +1;
        document.getElementById("p2").innerHTML= "Current Hp: " + yourCurrentHp;
    }
    else{
        yourCurrentHp= yourFullHp;
        clearScreen(2, 2);
    }
    happened = pickEvent();
    if (level<4){
    enemie= pickEnemie();
    }    
    if (level>=4 && level <8){
    enemie= pickEnemielv4();
    }  
    if (level>=8 && level <12){
    enemie= pickEnemielv8();
    }
    if (level>=12 && level <16){
    enemie= pickEnemielv12();
        }
    if (level>=16 && level <20){
    enemie= pickEnemielv16();
    }
    document.getElementById("p3").innerHTML= happened;  
    if (happened === "Nothing happened..."){
        clearScreen(4, 9);
        sessionStorage.setItem("InfoPre", "");
    	sessionStorage.setItem("PicPre", "");
    } 
    if (happened === "You are under attack:"){
        clearScreen(8, 12);
        document.getElementById("p4").innerHTML= enemie;
        monHp= enemieData(enemie, "hp");
        monFullHp= monHp;
        monSpeed= enemieData(enemie, "speed");
        monAttackText= enemieData(enemie, "attackMin") + "-" + enemieData(enemie, "attackMax");
        document.getElementById("p5").innerHTML="HP: " + monHp;
        document.getElementById("p6").innerHTML="Attack: " + monAttackText;
        document.getElementById("p7").innerHTML= "Speed: " + monSpeed;
        document.getElementById("save").style.display= "none";
        document.getElementById("travel").style.display= "none";
        document.getElementById("attack").style.display= "inline";
        document.getElementById("run").style.display= "inline";
        infoText= info(enemie);
        document.getElementById("info").innerHTML= infoText;
        infoPic= pic(enemie);
        document.getElementById("pic").innerHTML= infoPic;
    }
    else if (happened === "Someone should have dopped this:"){
        found= pickItemLv1();
        document.getElementById("p4").innerHTML= found;
        inventory.push(found);
        showItemButton(found);
        clearScreen(5, 9);
    }
    else if (happened === "You see a structure here:"){
        document.getElementById("travel").style.display= "none";
        document.getElementById("enter").style.display= "inline";
        document.getElementById("notEnter").style.display= "inline";
        structure= pickStructure();
        if (structure === "dungeon"){
            infoText = pickDungeonDesc();
            document.getElementById("info").innerHTML= infoText;
            infoPic= pic("Dungeon");
            document.getElementById("pic").innerHTML= infoPic;
        }
        else if (structure === "village"){
            infoText = pickVillageDesc();
            document.getElementById("info").innerHTML= infoText;
            infoPic= pic("Village");
            document.getElementById("pic").innerHTML= infoPic;
        }
        document.getElementById("enter").style.display= "inline";
        document.getElementById("p4").innerHTML= "a " + structure;
        clearScreen(5, 9);
    }
}
function combatOrder(yourSpeed, monSpeed){
document.getElementById("p7").innerHTML= "";
document.getElementById("dungeonContinue").style.display= "none";
document.getElementById("dungeonLeave").style.display= "none";
yourAttack= attackMin + Math.floor(Math.random() * 3);
monAttackMin= enemieData(enemie, "attackMin");
monAttackMax= enemieData(enemie, "attackMax");
monAttack= attackConvert(monAttackMin, monAttackMax);
    if(yourSpeed>monSpeed){
        monHp= monHp- yourAttack;
        document.getElementById("boxAttack").innerHTML="you hit: " + yourAttack;
        document.getElementById("boxAttack2").innerHTML=enemie + "'s HP: " + monHp + "/" + monFullHp + " " + "Your HP: " + yourCurrentHp + "/" + yourFullHp;
        if (monHp<=0){
            document.getElementById("boxAttack5").innerHTML= "<p 'style= font-weight: bold;'> You killed the " +enemie + "</p>";
            document.getElementById("travel").style.display= "inline";
            document.getElementById("attack").style.display= "none";
            document.getElementById("run").style.display= "none";
            XP = XP+ 1;
            document.getElementById("levelUp").innerHTML="XP: " + XP + "/10";
            levelUpCheck(XP);
            dropCheck= itemDropRoll();
            if (dropCheck=== "1"){
                loot= pickItemLv1();
                document.getElementById("itemDrop").innerHTML= enemie + " dropped " + loot;
                inventory.push(loot);
                showItemButton(loot);
            }
            if (inDungeon === "yes"){
                document.getElementById("dungeonContinue").style.display= "inline";
                document.getElementById("dungeonLeave").style.display= "inline";
                document.getElementById("travel").style.display= "none";
            }
            if (enemie === "Wess the Mad"){
                document.getElementById("pic").src = "img/boss1.jpg";
                document.getElementById("info").innerHTML= "Ugh! That's just beginner's luck...";
                showButtons();
            }
            if (enemie === "Gulgamath"){
                document.getElementById("pic").src = "img/boss2.jpg";
                document.getElementById("info").innerHTML= "Aww! I wasn't ready!"
            }
            if (enemie === "Cyclopes"){
                document.getElementById("pic").src = "img/boss3.jpg";
                document.getElementById("info").innerHTML= "Ugh..."
            }
            if (enemie === "Seyfendi"){
                document.getElementById("pic").src = "img/DM.jpg";
                document.getElementById("info").innerHTML= "Wow, you're a fast learner..."
            }
            if (enemie === "Riur"){
                document.getElementById("pic").src = "img/Riur.jpg";
                document.getElementById("info").innerHTML= "No! No! I cannot be defeated!"
                setTimeout(() => { credits(); }, 2000);
            }
        }
        else{
        yourCurrentHp= yourCurrentHp- monAttack;
        document.getElementById("boxAttack3").innerHTML=enemie + " hits: " + monAttack;
        document.getElementById("boxAttack4").innerHTML=enemie + "'s HP: " + monHp + "/" + monFullHp + " " + "Your HP: " + yourCurrentHp + "/" + yourFullHp;
        if (yourCurrentHp<=0){
            document.getElementById("boxAttack5").innerHTML= "<p 'style= font-weight: bold;'> You killed by the " +enemie+ " X( </p>";
            localStorage.removeItem("saved");
            localStorage.removeItem("Level");
            localStorage.removeItem("XP");
            localStorage.removeItem("Race");
            localStorage.removeItem("Class");
            localStorage.removeItem("Speed");
            localStorage.removeItem("AttackMin");
            localStorage.removeItem("AttackMax");
            localStorage.removeItem("FullHp");
            localStorage.removeItem("CurrentHp");
            document.getElementById("travel").style.display= "none";
            document.getElementById("attack").style.display= "none";
            document.getElementById("run").style.display= "none";
            document.getElementById("items").style.display= "none";
            document.getElementById("restartDead").style.display= "inline";
            document.getElementById("delete").style.display= "none";
        }
        }
    }
    else if(yourSpeed<=monSpeed){
            yourCurrentHp= yourCurrentHp- monAttack;
            document.getElementById("boxAttack").innerHTML=enemie + " hits: " + monAttack;
            document.getElementById("boxAttack2").innerHTML=enemie + "'s HP: " + monHp + "/" + monFullHp + " " + "Your HP: " + yourCurrentHp + "/" + yourFullHp;
            if (yourCurrentHp<=0){
                document.getElementById("boxAttack5").innerHTML= "<p 'style= font-weight: bold;'> You killed by " +enemie+ " X( </p>";
                document.getElementById("travel").style.display= "none";
                document.getElementById("attack").style.display= "none";
                document.getElementById("run").style.display= "none";
                document.getElementById("items").style.display= "none";
                document.getElementById("restartDead").style.display= "inline";
                document.getElementById("delete").style.display= "none";
            }
            else {
            monHp= monHp- yourAttack;
            document.getElementById("boxAttack3").innerHTML="you hit: " + yourAttack;
            document.getElementById("boxAttack4").innerHTML=enemie + "'s HP: " + monHp + "/" + monFullHp + " " + "Your HP: " + yourCurrentHp + "/" + yourFullHp; 
            if (monHp<=0){
                document.getElementById("boxAttack5").innerHTML= "<p 'style= font-weight: bold;'> You killed the " +enemie + "</p>";      
                document.getElementById("travel").style.display= "inline";
                document.getElementById("attack").style.display= "none";
                document.getElementById("run").style.display= "none";
                XP = XP+ 1;
                levelUpCheck(XP);
                document.getElementById("levelUp").innerHTML="XP: " + XP + "/10";
                dropCheck= itemDropRoll();
                if (dropCheck=== "1"){
                    loot= pickItemLv1();
                    document.getElementById("itemDrop").innerHTML= enemie + " dropped " + loot;
                    inventory.push(loot);
                    showItemButton(loot);
                }
                if (inDungeon === "yes"){
                    document.getElementById("dungeonContinue").style.display= "inline";
                    document.getElementById("dungeonLeave").style.display= "inline";
                    document.getElementById("travel").style.display= "none";
                }
                if (enemie === "Wess the Mad"){
                    document.getElementById("pic").src = "img/boss1.jpg";
                    document.getElementById("info").innerHTML= "Ugh! That's just beginner's luck..."
                    showButtons();
                }
                if (enemie === "Gulgamath"){
                    document.getElementById("pic").src = "img/boss2.jpg";
                    document.getElementById("info").innerHTML= "Aww! I wasn't ready!"
                }
                if (enemie === "Cyclopes"){
                    document.getElementById("pic").src = "img/boss3.jpg";
                    document.getElementById("info").innerHTML= "Ugh..."
                }
                if (enemie === "Seyfendi"){
                document.getElementById("pic").src = "img/DM.jpg";
                document.getElementById("info").innerHTML= "Wow, you're a fast learner..."
            	}
            	if (enemie === "Riur"){
                document.getElementById("pic").src = "img/Riur.jpg";
                document.getElementById("info").innerHTML= "No! No! I cannot be defeated!";
                setTimeout(() => { credits(); }, 2000);
            	}
            }
        }
    }
}
function run(){
    changes= ["1", "2"];
    runcheck= changes[Math.floor(Math.random() * 2)];
    if (runcheck=== "1"){
        document.getElementById("attack").style.display= "none";
        document.getElementById("run").style.display= "none";
        document.getElementById("travel").style.display= "inline";
        document.getElementById("p7").innerHTML= "You escaped succesfully";
        document.getElementById("pic").src= " ";
        document.getElementById("info").innerHTML= " ";
        if (inDungeon === "yes"){
            document.getElementById("travel").style.display= "none";
            document.getElementById("dungeonContinue").style.display= "inline";
            document.getElementById("dungeonLeave").style.display= "inline";
        }
    }
    else{
        document.getElementById("p7").innerHTML= "You failed";
        document.getElementById("run").style.display= "none";
    }
}
function pickEvent(){
    return ["You are under attack:", "You are under attack:", "You are under attack:", "Nothing happened...", "Nothing happened...", "Nothing happened...", "Someone should have dopped this:", "You see a structure here:"][Math.floor(Math.random() * 8)];
}
function pickStructure(){
    return ["dungeon", "village"][Math.floor(Math.random() * 2)];
}
function pickVillageEvent(){
    return ["Villagers want your help to defeat a nearby monster:", "Villagers heal you to full health"][Math.floor(Math.random() * 2)]
}
function pickDungeonEvent(){
    return ["There's an item in this room:", "You are under attack:", "What's happening?!"][Math.floor(Math.random() * 3)];
}
function pickEnemie(){
        return ["Wolf", "Goblin", "Snake", "Bear", "Kobold"][Math.floor(Math.random() * 5)];
}
function pickEnemieDungeon(){
    return ["Snake", "Bear", "Kobold"][Math.floor(Math.random() * 3)];
}
function pickEnemielv4(){
    return ["Dire Wolf", "Hob Goblin", "Morlock", "Skeleton", "Tiefling"][Math.floor(Math.random() * 5)];
}
function pickEnemieDungeonlv4(){
    return ["Morlock", "Skeleton", "Kobold", "Tiefling", "Snake", "Bear"][Math.floor(Math.random() * 6)];
}
function pickEnemielv8(){
    return ["Gargoyle", "Minotaur", "Ghoul", "Night Elf", "Burning Skeleton"][Math.floor(Math.random() * 5)];
}
function pickEnemieDungeonlv8(){
    return ["Gargoyle", "Ghoul", "Morlock", "Skeleton", "Tiefling", "Snake", "Bear"][Math.floor(Math.random() * 7)];
}
function pickEnemielv12(){
    return ["Hill Giant", "Werewolf", "Mammoth", "Skeletal Champion", "Djinni"][Math.floor(Math.random() * 5)];
}
function pickEnemieDungeonlv12(){
    return ["Werewolf", "Skeletal Champion", "Gargoyle", "Ghoul", "Morlock", "Skeleton", "Kobold", "Snake", "Bear"][Math.floor(Math.random() * 9)];
}
function pickEnemielv16(){
    return ["Frost Giant", "Fire Giant", "Lich", "Iron Golem", "Beholder"][Math.floor(Math.random() * 5)];
}
function pickEnemieDungeonlv16(){
    return ["Lich", "Iron Golem", "Beholder", "Werewolf", "Skeletal Champion", "Gargoyle", "Ghoul", "Morlock", "Skeleton", "Kobold", "Snake", "Bear"][Math.floor(Math.random() * 12)];
}

function enemieData(enemie, stat){
    var enemies = {
        "Wolf": {"hp":Math.floor(Math.random() * 3 +4), "attackMin":1, "attackMax":4,"speed":Math.floor(Math.random() * 3 +8)},
        "Goblin": {"hp":Math.floor(Math.random() * 3 +3), "attackMin":1, "attackMax":4, "speed":Math.floor(Math.random() * 7 + 4)},
        "Snake":{"hp":Math.floor(Math.random() * 3 +2), "attackMin":2, "attackMax":6, "speed":Math.floor(Math.random() * 4 + 9)},
        "Bear":{"hp":Math.floor(Math.random() * 3 +8), "attackMin":1, "attackMax":2, "speed":Math.floor(Math.random() * 6 + 4)},
        "Kobold":{"hp":Math.floor(Math.random() * 3 +4), "attackMin":3, "attackMax":5, "speed":Math.floor(Math.random() * 5 + 6)},
        
        "Dire Wolf": {"hp":Math.floor(Math.random() * 8 +14), "attackMin":2, "attackMax":5, "speed":Math.floor(Math.random() * 3 +10)},
        "Hob Goblin": {"hp":Math.floor(Math.random() * 8 +22), "attackMin":2, "attackMax":4, "speed":Math.floor(Math.random() * 5 +4)},
        "Morlock": {"hp": Math.floor(Math.random() * 8 +14), "attackMin":2, "attackMax":5, "speed":Math.floor(Math.random() * 3 +6)},
        "Skeleton":{"hp":Math.floor(Math.random() * 8 +8), "attackMin":2, "attackMax":5, "speed":Math.floor(Math.random() * 3 +4)},
        "Tiefling": {"hp":Math.floor(Math.random() * 10 +16), "attackMin":2, "attackMax":6, "speed":Math.floor(Math.random() * 3 +8)},

        "Gargoyle": {"hp":Math.floor(Math.random() * 10 +24), "attackMin":6, "attackMax":12, "speed":Math.floor(Math.random() * 3 +10)},
        "Minotaur": {"hp":Math.floor(Math.random() * 10 +28), "attackMin":8, "attackMax":16, "speed":Math.floor(Math.random() * 3 +8)},
        "Ghoul": {"hp":Math.floor(Math.random() * 8 +20), "attackMin":2, "attackMax":14, "speed":Math.floor(Math.random() * 3 +12)},
        "Night Elf":{"hp":Math.floor(Math.random() * 10 +16), "attackMin":10, "attackMax":12, "speed":Math.floor(Math.random() * 3 +16)},
        "Burning Skeleton": {"hp":Math.floor(Math.random() * 10 +12), "attackMin":10, "attackMax":15, "speed":Math.floor(Math.random() * 3 +8)},

        "Hill Giant": {"hp":Math.floor(Math.random() * 14 + 28), "attackMin":15, "attackMax":20, "speed":Math.floor(Math.random() * 3 +10)},
        "Werewolf": {"hp":Math.floor(Math.random() * 14 + 12), "attackMin":10, "attackMax":15, "speed":Math.floor(Math.random() * 3 +20)},
        "Mammoth": {"hp":Math.floor(Math.random() * 14 + 36), "attackMin":2, "attackMax":20, "speed":Math.floor(Math.random() * 3 +12)},
        "Skeletal Champion": {"hp":Math.floor(Math.random() * 14 + 12), "attackMin":14, "attackMax":16, "speed":Math.floor(Math.random() * 3 +12)},
        "Djinni": {"hp":Math.floor(Math.random() * 14 + 40), "attackMin":5, "attackMax":15, "speed":Math.floor(Math.random() * 3 +14)},
        
        "Frost Giant": {"hp":Math.floor(Math.random() * 28 + 28), "attackMin":5, "attackMax":20, "speed":Math.floor(Math.random() * 3 +10)},
        "Fire Giant": {"hp":Math.floor(Math.random() * 20 + 16), "attackMin":15, "attackMax":35, "speed":Math.floor(Math.random() * 3 +10)},
        "Lich": {"hp":Math.floor(Math.random() * 12 + 32), "attackMin":10, "attackMax":25, "speed":Math.floor(Math.random() * 3 +14)},
        "Iron Golem": {"hp":Math.floor(Math.random() * 62 + 40), "attackMin":5, "attackMax":15, "speed":Math.floor(Math.random() * 3 +6)},
        "Beholder": {"hp":Math.floor(Math.random() * 24 + 12), "attackMin":15, "attackMax":25, "speed":Math.floor(Math.random() * 3 +20)},

        "Dire Lion": {"hp":Math.floor(Math.random() * 3 +6), "attackMin":4, "attackMax":6, "speed":Math.floor(Math.random() * 9 +2)},
        "Nightmare": {"hp":Math.floor(Math.random() * 3 +7), "attackMin":2, "attackMax":5, "speed":Math.floor(Math.random() * 4 + 9)},

        "Ogre": {"hp":Math.floor(Math.random() * 12 +20), "attackMin":4, "attackMax":8, "speed":Math.floor(Math.random() * 5 +4)},
        "Worg": {"hp":Math.floor(Math.random() * 8 +14), "attackMin":6, "attackMax":10, "speed":Math.floor(Math.random() * 3 +10)},

        "Dragon Turtle": {"hp":Math.floor(Math.random() * 12 +60), "attackMin":2, "attackMax":6, "speed":Math.floor(Math.random() * 3 +2)},
        "yeti": {"hp":Math.floor(Math.random() * 12 +28), "attackMin":16, "attackMax":18, "speed":Math.floor(Math.random() * 3 +16)},

        "Young Dragon": {"hp":Math.floor(Math.random() * 14 +28), "attackMin":20, "attackMax":25, "speed":Math.floor(Math.random() * 3 +30)},
        "Stone Giant": {"hp":Math.floor(Math.random() * 62 +40), "attackMin":5, "attackMax":10, "speed":Math.floor(Math.random() * 3 +6)},

        "Ancient Dragon": {"hp":Math.floor(Math.random() * 24 +36), "attackMin":25, "attackMax":30, "speed":Math.floor(Math.random() * 3 +25)},
        "Tarn Linnorm": {"hp":Math.floor(Math.random() * 24 +28), "attackMin":15, "attackMax":35, "speed":Math.floor(Math.random() * 3 +20)},

        "Wess the Mad": {"hp":Math.floor(Math.random() * 6 +12), "attackMin":5, "attackMax":10, "speed":Math.floor(Math.random() * 5 +10)},
        "Gulgamath": {"hp":Math.floor(Math.random() * 12 +12), "attackMin":8, "attackMax":12, "speed":Math.floor(Math.random() * 5 +15)},
        "Cyclopes": {"hp":Math.floor(Math.random() * 12 +99), "attackMin":10, "attackMax":15, "speed":Math.floor(Math.random() * 5 +5)},
        "Seyfendi": {"hp":Math.floor(Math.random() * 12 +48), "attackMin":20, "attackMax":40, "speed":Math.floor(Math.random() * 5 +15)},
        "Riur": {"hp":100, "attackMin":30, "attackMax":50, "speed":25},
    };
    var enemieStat= enemies[enemie][stat];
    return [enemieStat];
}
function pickEnemieVillage(){
    return["Dire Lion", "Nightmare"][Math.floor(Math.random() * 2)];
}
function pickEnemieVillagelv4(){
    return["Ogre", "Worg", "Dire Lion", "Nightmare"][Math.floor(Math.random() * 4)];
}
function pickEnemieVillagelv8(){
    return["Dragon Turtle", "Yeti", "Ogre", "Worg"][Math.floor(Math.random() * 4)];
}
function pickEnemieVillagelv12(){
    return["Young Dragon", "Stone Giant", "Dragon Turtle", "Yeti"][Math.floor(Math.random() * 4)];
}
function pickEnemieVillagelv16(){
    return["Ancient Dragon", "Tarn Linnorm", "Young Dragon", "Stone Giant"][Math.floor(Math.random() * 4)];
}
function levelUpCheck(hasan){
    if (hasan>="10"){
        level= level+ 1;
        yourFullHp= yourFullHp + Math.floor(Math.random() *6);
        attackMin= attackMin + Math.floor(Math.random() *3);
        attackMax= attackMin + 3;
        yourSpeed= yourSpeed + Math.floor(Math.random() *3);
        XP= XP * 0;
        document.getElementById("levelUp").innerHTML= "Level up!";
        bossFight();
    }
}
function itemDropRoll(){
    return ["1", "2", "2", "2", "2", "2", "2", "2", "2", "2"][Math.floor(Math.random() * 10)];
}
function itemCursedCheck(){
    return ["1", "2", "2", "2", "2"][Math.floor(Math.random() * 4)];
}
function pickItemLv1(){
    return ["healing potion", "escape potion", "a better sword", "a better armor"][Math.floor(Math.random() * 4)];
}
function showItemButton(itemButid){
    document.getElementById(itemButid).style.display= "inline";
}
function useItem(item){
    clearScreen(4, 9);
    inventory.splice(item);
    document.getElementById("p2").innerHTML= "you used: " + item;
    document.getElementById(item).style.display= "none";

    if(item=== "healing potion"){
    yourCurrentHp= yourFullHp;
    document.getElementById("p3").innerHTML= "your current hp: " + yourCurrentHp;
    }

    if(item=== "escape potion"){
        document.getElementById("attack").style.display= "none";
        document.getElementById("run").style.display= "none";
        document.getElementById("travel").style.display= "inline";
        document.getElementById("p3").innerHTML= "You escaped succesfully";
        if (inDungeon === "yes"){
            document.getElementById("travel").style.display= "none";
            document.getElementById("dungeonContinue").style.display= "inline";
            document.getElementById("dungeonLeave").style.display= "inline";
        }
    }
    
    if(item=== "a better sword"){
        curseCheck= itemCursedCheck();
        if (curseCheck=== "1"){
            document.getElementById("p3").innerHTML= "That sword should be cursed! Your attack fell to: ";
            attackMin= attackMin - 1;
            attackMax= attackMin + 3;
            document.getElementById("p4").innerHTML= attackMin + "-" + attackMax;
            }
        else {
        attackMin= attackMin+ 1;
        attackMax= attackMax+ 1;
        document.getElementById("p3").innerHTML= "You deal +1 more damage now.";
        }
    }

    if(item=== "a better armor"){
        curseCheck= itemCursedCheck();
        if (curseCheck=== "1"){
            document.getElementById("p3").innerHTML= "That armor should be cursed! Your maximum HP fell to: ";
            yourFullHp = yourFullHp - 1;
            document.getElementById("p4").innerHTML= yourFullHp;
        }
        else{
        yourFullHp= yourFullHp+1;
        document.getElementById("p3").innerHTML= "You have +1 more maximum HP now.";
        }
    }
}
function enter(){
    document.getElementById("travel").style.display= "none";
    document.getElementById("enter").style.display= "none";
    document.getElementById("notEnter").style.display= "none";
    if (structure=== "dungeon"){
        inDungeon = "yes";
        document.getElementById("p2").innerHTML= ("You entered a dungeon room");
        if (yourCurrentHp< yourFullHp){
        yourCurrentHp= yourCurrentHp +1;
        document.getElementById("currentHp").innerHTML= "Current HP: " + yourCurrentHp;
    }
        dungeonEvent= pickDungeonEvent();
        document.getElementById("p3").innerHTML= dungeonEvent;
        if (dungeonEvent === "You are under attack:"){
        if (level<4){
        enemie= pickEnemieDungeon();
        }    
        if (level>=4 && level <8){
        enemie= pickEnemieDungeonlv4();
        }  
        if (level>=8 && level <12){
        enemie= pickEnemieDungeonlv8();
        }
        if (level>=12 && level <16){
        enemie= pickEnemieDungeonlv12();
        }
        if (level>=16 && level <20){
        enemie= pickEnemieDungeonlv16();
        }
        document.getElementById("p4").innerHTML= enemie;
        monHp= enemieData(enemie, "hp");
        monSpeed= enemieData(enemie, "speed");
        document.getElementById("p5").innerHTML= "HP: " + monHp;
        monFullHp= monHp;
        monAttackText= enemieData(enemie, "attackMin") + "-" + enemieData(enemie, "attackMax");
        document.getElementById("p6").innerHTML= "attack: " + monAttackText;
        document.getElementById("p7").innerHTML= "Speed: " + monSpeed;
        document.getElementById("travel").style.display= "none";
        document.getElementById("save").style.display= "none";
        document.getElementById("attack").style.display= "inline";
        document.getElementById("run").style.display= "inline"; 
        document.getElementById("dungeonContinue").style.display= "none";
        document.getElementById("dungeonLeave").style.display= "none";
        infoText= info(enemie);
        document.getElementById("info").innerHTML= infoText;
        infoPic= pic(enemie);
        document.getElementById("pic").innerHTML= infoPic;
        }
        if (dungeonEvent === "There's an item in this room:"){
            loot= pickItemLv1();
            document.getElementById("p4").innerHTML= "You found " + loot + " in this room.";
            clearScreen(5, 9);
            showItemButton(loot);
            document.getElementById("dungeonContinue").style.display= "inline";
            document.getElementById("dungeonLeave").style.display= "inline";
        }
        if (dungeonEvent === "What's happening?!"){
            trapDamage = Math.floor(Math.random() * 3);
            document.getElementById("p4").innerHTML= "It's a trap! you took " + trapDamage + " damage.";
            yourCurrentHp= yourCurrentHp - trapDamage;
            document.getElementById("dungeonContinue").style.display= "inline";
            document.getElementById("dungeonLeave").style.display= "inline";
            if (yourCurrentHp <= 0){
                document.getElementById("p6").innerHTML= "You died X(";
                localStorage.removeItem("saved");
                localStorage.removeItem("Level");
                localStorage.removeItem("XP");
                localStorage.removeItem("Race");
                localStorage.removeItem("Class");
                localStorage.removeItem("Speed");
                localStorage.removeItem("AttackMin");
                localStorage.removeItem("AttackMax");
                localStorage.removeItem("FullHp");
                localStorage.removeItem("CurrentHp");
                document.getElementById("dungeonContinue").style.display= "none";
                document.getElementById("dungeonLeave").style.display= "none";
                document.getElementById("attack").style.display= "none";
                document.getElementById("restartDead").style.display= "inline";
                document.getElementById("delete").style.display= "none";
            }
        }
    }
    if (structure=== "village"){
        inVillage = "yes";
        villageEvent= pickVillageEvent();
        document.getElementById("p3").innerHTML= "You entered the village,";
            if (villageEvent === "Villagers want your help to defeat a nearby monster:"){
                if (level<4){
                enemie= pickEnemieVillage();
                }    
                if (level>=4 && level <8){
                enemie= pickEnemieVillagelv4();
                }  
                if (level>=8 && level <12){
                enemie= pickEnemieVillagelv8();
                }
                if (level>=12 && level <16){
                enemie= pickEnemieVillagelv12();
                }
                if (level>=16 && level <20){
                enemie= pickEnemieVillagelv16();
                }
                document.getElementById("p4").innerHTML= villageEvent;
                document.getElementById("p5").innerHTML= enemie;
                document.getElementById("accept").style.display= "inline";
                document.getElementById("reject").style.display= "inline";
                infoText= info(enemie);
                document.getElementById("info").innerHTML= infoText;
                pic(enemie);
                } 
            
            if (villageEvent === "Villagers heal you to full health"){
                document.getElementById("p4").innerHTML= villageEvent;
                yourCurrentHp= yourFullHp;
                document.getElementById("p5").innerHTML= yourCurrentHp;
                document.getElementById("travel").style.display= "inline";
            }
        }
}
function villageAccept(){
    document.getElementById("pic").src= "img/villagers.jpg"
    document.getElementById("info").innerHTML= "Villagers are greatful to you, their shaman blesses you, and they give you a gift. Your max health increased and you are healed to full health."
            yourFullHp= yourFullHp +1;
            yourCurrentHp= yourFullHp;
            gift= pickItemLv1();
            inventory.push(gift);
            showItemButton(gift);
            monHp= enemieData(enemie, "hp");
            monAttackText= enemieData(enemie, "attackMin") + "-" + enemieData(enemie, "attackMax");
            monSpeed= enemieData(enemie, "speed");
            document.getElementById("p4").innerHTML= "Villagers gifted you: " + gift;
            document.getElementById("p5").innerHTML= "HP: " + monHp;
            document.getElementById("p6").innerHTML= "Attack: " + monAttackText;
            document.getElementById("p7").innerHTML= "Speed: " + monSpeed;
            document.getElementById("accept").style.display= "none";
            document.getElementById("reject").style.display= "none";
            document.getElementById("attack").style.display= "inline";
            document.getElementById("escape potion").style.display= "none";
}
function villageReject() {
    document.getElementById("p2").innerHTML= "you rejected them, villagers are disappointed on you..."; 
    clearScreen(3, 9);
    document.getElementById("travel").style.display= "inline";
    document.getElementById("accept").style.display= "none";
    document.getElementById("reject").style.display= "none";
}
function dungeonContinue() {
	clearScreen(10, 16);
    localStorage.setItem("Level", level);
    localStorage.setItem("XP", XP);
    localStorage.setItem("Race", yourRace);
    localStorage.setItem("Class", yourClass);
    localStorage.setItem("AttackMin", attackMin);
    localStorage.setItem("AttackMax", attackMax);
    localStorage.setItem("FullHp", yourFullHp);
    localStorage.setItem("CurrentHp", yourCurrentHp);
    structure=== "dungeon";
    enter();
}
function dungeonLeave() {
    document.getElementById("p2").innerHTML= ("You left the dungeon.");
    clearScreen(3, 12);
    document.getElementById("dungeonContinue").style.display= "none";
    document.getElementById("dungeonLeave").style.display= "none";
    document.getElementById("travel").style.display= "inline";
}
function notEnter(){
    document.getElementById("p2").innerHTML= "You walk away.";
    clearScreen(3, 9);
    document.getElementById("enter").style.display= "none";
    document.getElementById("notEnter").style.display= "none";
    document.getElementById("travel").style.display= "inline";
}
//Dictionaries
function info(word) {
    var info= {
        "Wolf": "This powerful canine watches its prey with piercing yellow eyes, darting its tongue across sharp white teeth.",
        "Goblin": "This creature stands barely three feet tall, its scrawny, humanoid body dwarfed by its wide, ungainly head.",
        "Snake": "This brightly colored snake assumes an aggressive posture, its hissing mouth open to display its fangs.",
        "Bear":"Broad, powerful muscles move beneath this massive bear’s brown fur, promising both speed and lethal force.",
        "Kobold": "This short, reptilian humanoid has scaled skin, a snout filled with tiny teeth, and a long tail.",

        "Dire Wolf": "This immense black wolf is the size of a horse, its fangs as large and sharp as knives.",
        "Hob Goblin": "Standing as tall as a human, this muscular, gray-skinned creature peers about with tiny, observant eyes.",
        "Morlock": "Skin pale as a slug’s belly, eyes huge and bulging, this thing crawls down the wall like a spider, but its shape is hideously humanoid.",
        "Skeleton":"The pile of bones suddenly stirs, rising up to take on a human shape. Its long, bony fingers reach out to claw at the living.",
        "Tiefling":"This lanky man sneers as he draws his sword. Tiny horns and a barbed tail reveal that he is something more than human.",

        "Gargoyle": "Seemingly carved from a dark gray stone, this sinister crouching humanoid resembles a horned, winged demon.",
        "Minotaur": "With the body of a powerfully built man and the head of a snarling bull, this creature stomps its hooves as if preparing to charge.",
        "Ghoul": "This humanoid creature has long, sharp teeth, and its pallid flesh is stretched tightly over its starved frame.",
        "Night Elf": "This dark-skinned elf stands in a battle-ready pose, her hair silver and eyes white and pupilless.",
        "Burning Skeleton": "A burning skeleton is surrounded by an aura of flames.",

        "Hill Giant": "This hunched giant exudes power and a crude, stupid anger, its filthy fur clothing bespeaking a brutish and backwoods lifestyle.",
        "Werewolf": "This muscular creature has a man’s body but the snarling head and fur coat of a wolf.",
        "Mammoth": "A mammoth is an elephantine creature with thick fur and long tusks. Stockier and fiercer than normal elephants, mammoths inhabit a wide range of climes, from subarctic to subtropical.",
        "Skeletal Champion": "This armored skeleton stands in a battle-ready pose, its weapon held high as cold blue light shines in its eye sockets.",
        "Djinni": "This creature stands nearly twice as tall as a human, although its lower torso trails away into a vortex of mist and wind.",
        
        "Frost Giant": "This giant looks like a thick, muscular human. It has frost-white skin and long, light blue hair that it wears braided.",
        "Fire Giant": "This giant looks like a thick, muscular human. It has frost-white skin and long, light blue hair that it wears braided.",
        "Lich": "Aggressive, hateful, and greedy, these aberrations dismiss all other creatures as lesser beings, toying with them or destroying them as they choose.",
        "Iron Golem": "This iron automaton stands twice as tall as a normal human. Its heavy footfalls shake the ground with bone-jarring force.",
        "Beholder": "Aggressive, hateful, and greedy, these aberrations dismiss all other creatures as lesser beings, toying with them or destroying them as they choose.",
        
        "Dire Lion": "This immense spotted lion stands as tall as a man at the shoulder, its fur matted with the blood of its victims.",
        "Nightmare": "This eerie horse-like creature’s skin is an inky blackness. Fire spurts from its hair and nostrils, and its hooves spray sparks.",

        "Ogre": "This lumbering giant’s beady eyes are devoid of wit or kindness, and its puffy face features a wide mouth with ill-fitting teeth.",
        "Worg": "This unusually large wolf has an evil, almost intelligent light shining in its deep red eyes.",

        "Dragon Turtle": "This long-tailed aquatic beast resembles a massive snapping turtle with draconic features.",
        "yeti": "This creature stands like a man, yet is half again the height of most men and covered with a coat of thick white fur.",

        "Young Dragon": "Scales the color of emeralds armor this ferocious dragon. A single sharp horn protrudes from the end of its toothy snout.",
        "Stone Giant": "This giant has chiseled, muscular features and a f lat, forward-sloping head, looking almost as if it were carved of stone.",

        "Ancient Dragon": "Hissing green acid drips from the fanged maw of this black-scaled, horned dragon.",
        "Tarn Linnorm": "This nightmarishly huge, snake-like dragon possesses two equally fearsome heads. Its twin jaws seethe with acid and poison.",
    }
    return info[word];
}
function pic(word) {
    document.getElementById("pic").src= "img/"+word+".jpg"
}
function pickDungeonDesc(){
    return [
        "A grand graveyard in a overcast boulder field marks the entrance to this dungeon. Beyond the graveyard lies a narrow, putrid room. It's covered in cobwebs, broken pottery and crawling insects. Your torch allows you to see broken mining equipment, decayed and mutilated by time itself.",
        "A massive graveyard in a murky cliff side marks the entrance to this dungeon. Beyond the graveyard lies a massive, ragged room. It's covered in dirt, remains and bat droppings. Your torch allows you to see warped and molten metal remnants, battered and butchered by time itself.",
        "A tall boulder in a gloomy mountain top marks the entrance to this dungeon. Beyond the boulder lies a narrow, deteriorated room. It's covered in dirt, small bones and broken pottery. Your torch allows you to see the remnants of a pillaged burial chamber, long lost and wiped out by time itself.",
        "A wide granite door in a grim snowland marks the entrance to this dungeon. Beyond the granite door lies a small, shady room. It's covered in roots, cobwebs and rubble. Your torch allows you to see broken mining equipment, frayed and spoiled by time itself.",
        "A massive granite door in a dire wasteland marks the entrance to this dungeon. Beyond the granite door lies a small, dark room. It's covered in ash, crawling insects and bat droppings. Your torch allows you to see remnants of statues, battered and drained by time itself.",
        "A wide granite door in a bleak thicket marks the entrance to this dungeon. Beyond the granite door lies a small, dank room. It's covered in dead insects, dirt and large bones. Your torch allows you to see ruins of what seems to be a crude throne room, tattered and taken by time itself.",
        "A minor dark cave in a dire woodlands marks the entrance to this dungeon. Beyond the dark cave lies a massive, dusty room. It's covered in broken pottery, rat droppings and dirt. Your torch allows you to see the remnants of a pillaged burial chamber, deteriorated and absorbed by time itself.",
        "A tall broken statue in a gloomy morass marks the entrance to this dungeon. Beyond the broken statue lies a modest, timeworn room. It's covered in remains, dead vermin and small bones. Your torch allows you to see rows of tombs and several statues, long lost and butchered by time itself.",
        "A wide fallen tower in a murky thicket marks the entrance to this dungeon. Beyond the fallen tower lies a narrow, putrid room. It's covered in large bones, cobwebs and broken pottery. Your torch allows you to see an overgrown underground garden, frayed and devoured by time itself.",
        "A minor murky cave in a murky grove marks the entrance to this dungeon. Beyond the murky cave lies a small, worn room. It's covered in puddles of water, dead insects and rat droppings. Your torch allows you to see weapons racks and locked crates, busted and mutilated by time itself.",
        
        "A large pair of granite doors in a foggy snowland marks the entrance to this dungeon. Beyond the pair of granite doors lies a massive, humid room. It's covered in cobwebs, remains and dead insects. Your torch allows you to see locked chests, vats, crates and pieces of broken wood, worn and defaced by time itself.",
        "A small boulder in a eerie bog marks the entrance to this dungeon. Beyond the boulder lies a narrow, dank room. It's covered in cobwebs, puddles of water and puddles of water. Your torch allows you to see a pillaged treasury, tattered and devoured by time itself.",
        "A modest worn statue in a foggy snowland marks the entrance to this dungeon. Beyond the worn statue lies a massive, shady room. It's covered in ash, broken pottery and dead insects. Your torch allows you to see drawings and symbols on the walls, worn and butchered by time itself.",
        "A small pair of granite doors in a dire morass marks the entrance to this dungeon. Beyond the pair of granite doors lies a scanty, humid room. It's covered in puddles of water, roots and remains. Your torch allows you to see a broken tomb, weathered and maimed by time itself.",
        "A tall fallen tower in a shady mountain base marks the entrance to this dungeon. Beyond the fallen tower lies a narrow, damp room. It's covered in cobwebs, dead insects and small bones. Your torch allows you to see ruins of what seems to be a crude throne room, forgotten and spoiled by time itself.",
        "A narrow dark cave in a dark snowland marks the entrance to this dungeon. Beyond the dark cave lies a modest, shady room. It's covered in dead insects, dirt and broken stone. Your torch allows you to see remnants of sacks, crates and caskets, deteriorated and wrecked by time itself.",
        "A wide pair of worn statues in a dire cliff side marks the entrance to this dungeon. Beyond the pair of worn statues lies a large, dank room. It's covered in moss, dirt and dead insects. Your torch allows you to see triggered traps and skeletal remains, worn and desolated by time itself.",
        "A modest granite door in a foggy mountain range marks the entrance to this dungeon. Beyond the granite door lies a grand, dusty room. It's covered in moss, rat droppings and broken pottery. Your torch allows you to see broken cages and torture devices, weathered and absorbed by time itself.",
        "A wide dark cave in a misty bog marks the entrance to this dungeon. Beyond the dark cave lies a grand, foggy room. It's covered in large bones, crawling insects and small bones. Your torch allows you to see warped and molten metal remnants, battered and ravished by time itself.",
        "A modest granite door in a dark woodlands marks the entrance to this dungeon. Beyond the granite door lies a narrow, dank room. It's covered in ash, dirt and small bones. Your torch allows you to see what seems like some form of a sacrificial chamber, frayed and absorbed by time itself.",

        "A massive dark cave in a misty wasteland marks the entrance to this dungeon. Beyond the dark cave lies a large, dank room. It's covered in rubble, crawling insects and roots. Your torch allows you to see remnants of what was once a decorated room with a now unknown purpose, wasted and wrecked by time itself.",
        "A large dark cave in a overcast boulder field marks the entrance to this dungeon. Beyond the dark cave lies a grand, humid room. It's covered in broken pottery, dirt and dead vermin. Your torch allows you to see carved out openings filled with pottery, worn and absorbed by time itself.",
        "A tall fallen tower in a overcast forest marks the entrance to this dungeon. Beyond the fallen tower lies a large, putrid room. It's covered in dead insects, small bones and puddles of water. Your torch allows you to see an overgrown underground garden, long lost and devoured by time itself.",
        "A tall waterfall in a eerie marsh marks the entrance to this dungeon. Beyond the waterfall lies a massive, dank room. It's covered in small bones, cobwebs and remains. Your torch allows you to see weapons racks and locked crates, aged and wiped out by time itself.",
        "A wide waterfall in a sinister wasteland marks the entrance to this dungeon. Beyond the waterfall lies a modest, timeworn room. It's covered in small bones, bat droppings and dirt. Your torch allows you to see remnants of statues, wasted and ravaged by time itself.",
        "A tall broken statue in a murky wasteland marks the entrance to this dungeon. Beyond the broken statue lies a modest, dark room. It's covered in dirt, puddles of water and dirt. Your torch allows you to see locked chests, vats, crates and pieces of broken wood, deteriorated and butchered by time itself.",
        "A short worn statue in a misty snowland marks the entrance to this dungeon. Beyond the worn statue lies a grand, clammy room. It's covered in ash, dirt and rubble. Your torch allows you to see carved out openings filled with pottery, busted and ravaged by time itself.",
        "A grand fallen temple in a gloomy boulder field marks the entrance to this dungeon. Beyond the fallen temple lies a narrow, crumbling room. It's covered in ash, dead vermin and bat droppings. Your torch allows you to see rows of tombs and several statues, decayed and maimed by time itself.",
        "A grand murky cave in a gloomy woods marks the entrance to this dungeon. Beyond the murky cave lies a narrow, ragged room. It's covered in crawling insects, bat droppings and large bones. Your torch allows you to see drawings and symbols on the walls, long lost and wiped out by time itself.",
        "A massive boulder in a foggy marsh marks the entrance to this dungeon. Beyond the boulder lies a large, shady room. It's covered in crawling insects, dead insects and broken stone. Your torch allows you to see ruins of what seems to be a crude throne room, weathered and defaced by time itself.",

        "A short waterfall in a dire thicket marks the entrance to this dungeon. Beyond the waterfall lies a narrow, weary room. It's covered in remains, rat droppings and rubble. Your torch allows you to see remnants of what was once a decorated room with a now unknown purpose, deteriorated and butchered by time itself.",
        "A massive pair of granite doors in a dark forest marks the entrance to this dungeon. Beyond the pair of granite doors lies a massive, clammy room. It's covered in dead vermin, cobwebs and broken pottery. Your torch allows you to see empty chests and broken statues, forgotten and absorbed by time itself.",
        "A wide pair of worn statues in a eerie swamp marks the entrance to this dungeon. Beyond the pair of worn statues lies a scanty, dark room. It's covered in broken pottery, remains and ash. Your torch allows you to see an overgrown underground garden, deteriorated and eaten by time itself.",
        "A massive waterfall in a somber wasteland marks the entrance to this dungeon. Beyond the waterfall lies a grand, filthy room. It's covered in small bones, broken stone and large bones. Your torch allows you to see remnants of what once must've been a mess hall of sorts, destroyed and desolated by time itself.",
        "A minor broken statue in a dark woods marks the entrance to this dungeon. Beyond the broken statue lies a modest, broken room. It's covered in dead vermin, roots and remains. Your torch allows you to see remnants of statues, weathered and butchered by time itself.",
        "A narrow murky cave in a dark marsh marks the entrance to this dungeon. Beyond the murky cave lies a scanty, weary room. It's covered in rat droppings, crawling insects and bat droppings. Your torch allows you to see what seems like some form of a sacrificial chamber, tattered and eaten by time itself.",
        "A tall granite door in a somber grove marks the entrance to this dungeon. Beyond the granite door lies a modest, clammy room. It's covered in ash, large bones and dead insects. Your torch allows you to see ruins of what seems to be a crude throne room, pillaged and defaced by time itself.",
        "A large worn statue in a foggy bog marks the entrance to this dungeon. Beyond the worn statue lies a narrow, weary room. It's covered in crawling insects, broken stone and dirt. Your torch allows you to see a broken statue part of a fountain, busted and butchered by time itself.",
        "A wide fallen temple in a misty woods marks the entrance to this dungeon. Beyond the fallen temple lies a small, dusty room. It's covered in crawling insects, ash and dead insects. Your torch allows you to see remnants of statues, tattered and taken by time itself.",
        "A grand pair of worn statues in a grim forest marks the entrance to this dungeon. Beyond the pair of worn statues lies a small, damp room. It's covered in moss, puddles of water and dirt. Your torch allows you to see a pillaged treasury, tattered and maimed by time itself."
    ][Math.floor(Math.random() *40)];
}
function pickVillageDesc(){
    return [
        "Cast beside an island, the outpost of Paethsmouth is home to pirates lead by Captain Massey. This outpost wasn't built by an island by accident, as it has rare resources, which is of great importance to the people of Paethsmouth and its success.",
        "Found on the Southern side of a canal, the port of Easthaven is home to giants lead by Mayor Cawthorn. This port wasn't built by a canal by accident, as it has escape routes, which is of great importance to the people of Easthaven and its success.",
        "Situated on the lowest point of a river, the township of Garen's Well is home to humans lead by Baron Afton. This township wasn't built by a river by accident, as it has body enhancing properties, which is of great importance to the people of Garen's Well and its success.",
        "Designed on the dark side of a forest, the township of Ecrin is home to halflings lead by Lord Locks. This township wasn't built by a forest by accident, as it has a broken, hidden library, which is of great importance to the people of Ecrin and its success.",
        "Raised next to a canyon, the town of Frosthold is home to dwarves lead by Duke Kharnur. This town wasn't built by a canyon by accident, as it has healing properties, which is of great importance to the people of Frosthold and its success.",
        "Positioned above a thicket, the settlement of Dry Gulch is home to pirates lead by Captain Massey. This settlement wasn't built by a thicket by accident, as it has rare plants, which is of great importance to the people of Dry Gulch and its success.",
        "Established beside a stream, the megalopolis of Bolgewotar is home to goblins lead by Earl Karax. This megalopolis wasn't built by a stream by accident, as it has a comfortable weather system, which is of great importance to the people of Bolgewotar and its success.",
        "Positioned next to a bluff, the city of Atalakar is home to trolls lead by Lord Jalai. This city wasn't built by a bluff by accident, as it has rare plants, which is of great importance to the people of Atalakar and its success.",
        "Built next to a jungle, the metropolis of Doonatel is home to humans lead by Mr. Gedman. This metropolis wasn't built by a jungle by accident, as it has an ancient water source, which is of great importance to the people of Doonatel and its success.",
        "Cast on the Eastern side of an ocean, the town of Garen's Well is home to humans lead by Earl Chilton. This town wasn't built by an ocean by accident, as it has ancient burial grounds, which is of great importance to the people of Garen's Well and its success.",

        "Designed in a field, the town of Fandralore is home to elves lead by Baron Elluin. This town wasn't built by a field by accident, as it has ancient burial grounds, which is of great importance to the people of Fandralore and its success.",
        "Set on the Southern side of a cave, the city of Cenorias is home to wood elves lead by Supervisor Elmon. This city wasn't built by a cave by accident, as it has strong metal ores, which is of great importance to the people of Cenorias and its success.",
        "Settled beside a lava stream, the outpost of Hwen is home to humans lead by Duchess Massingale. This outpost wasn't built by a lava stream by accident, as it has an ancient water source, which is of great importance to the people of Hwen and its success.",
        "Settled on the lowest point of a field, the outpost of Easthaven is home to humans lead by Mr. Locks. This outpost wasn't built by a field by accident, as it has unique wildlife, which is of great importance to the people of Easthaven and its success.",
        "Situated around a canyon, the township of Meckotarq is home to gnomes lead by Sergeant Totonk. This township wasn't built by a canyon by accident, as it has natural defences, which is of great importance to the people of Meckotarq and its success.",
        "Designed on the end of a mound, the settlement of Bolgewotar is home to goblins lead by Duchess Rezikmez. This settlement wasn't built by a mound by accident, as it has dark ruins, which is of great importance to the people of Bolgewotar and its success.",
        "Settled around a peninsula, the village of Midsprocket is home to goblins lead by Marshal Greekeels. This village wasn't built by a peninsula by accident, as it has natural defences, which is of great importance to the people of Midsprocket and its success.",
        "Cast on the Eastern side of a lava stream, the port of Hiborane is home to dark elves lead by Warlord Alluin. This port wasn't built by a lava stream by accident, as it has ancient, unexplained statues, which is of great importance to the people of Hiborane and its success.",
        "Positioned on the light side of a jungle, the metropolis of Fool's March is home to humans lead by Baron Barnfield. This metropolis wasn't built by a jungle by accident, as it has natural defences, which is of great importance to the people of Fool's March and its success.",
        "Forged on the light side of a canyon, the city of Garlund is home to orcs lead by Lord Grung. This city wasn't built by a canyon by accident, as it has ancestral grounds, which is of great importance to the people of Garlund and its success.",

        "Set on the top of a mound, the settlement of Garen's Well is home to halflings lead by Duke Barney. This settlement wasn't built by a mound by accident, as it has hidden tunnels, which is of great importance to the people of Garen's Well and its success.",
        "Formed on the Eastern side of a lake, the crossroad of Tirianae is home to dark elves lead by Mrs. Ninleyn. This crossroad wasn't built by a lake by accident, as it has body enhancing properties, which is of great importance to the people of Tirianae and its success.",
        "Formed on the end of a cavern, the megalopolis of Far Water is home to vikings lead by Mayor Eustice. This megalopolis wasn't built by a cavern by accident, as it has rare plants, which is of great importance to the people of Far Water and its success.",
        "Stationed on the left side of a lake, the port of Cenorias is home to blood elves lead by Agent Alre. This port wasn't built by a lake by accident, as it has rare resources, which is of great importance to the people of Cenorias and its success.",
        "Found on the right side of a desert, the burg of Sinashari is home to blood elves lead by Mr. Alduin. This burg wasn't built by a desert by accident, as it has magical properties, which is of great importance to the people of Sinashari and its success.",
        "Rooted on the dark side of a cliff, the city of Zuldazin is home to trolls lead by Director Makas. This city wasn't built by a cliff by accident, as it has body enhancing properties, which is of great importance to the people of Zuldazin and its success.",
        "Engineered around a cliff, the metropolis of Darkwell is home to werewolves lead by Baron Geary. This metropolis wasn't built by a cliff by accident, as it has medicinal plants, which is of great importance to the people of Darkwell and its success.",
        "Established above a vulcano, the burg of Darkwell is home to humans lead by Director Eustice. This burg wasn't built by a vulcano by accident, as it has ancient, lost technologies, which is of great importance to the people of Darkwell and its success.",
        "Engineered around a cliff, the metropolis of Stimwedle is home to goblins lead by Lord Fizink. This metropolis wasn't built by a cliff by accident, as it has body enhancing properties, which is of great importance to the people of Stimwedle and its success.",
        "Found on the top of a cliff, the outpost of Darnassea is home to night elves lead by Marshal Wyninn. This outpost wasn't built by a cliff by accident, as it has an ancient water source, which is of great importance to the people of Darnassea and its success.",

        "Built inside a grotto, the village of Fool's March is home to barbarians lead by Ms. Davenport. This village wasn't built by a grotto by accident, as it has precious gems, which is of great importance to the people of Fool's March and its success.",
        "Rooted inside a mountain, the village of Galowax is home to goblins lead by Marshal Grexmex. This village wasn't built by a mountain by accident, as it has dark ruins, which is of great importance to the people of Galowax and its success.",
        "Located on the bottom of an ocean, the hamlet of Fool's March is home to vampires lead by Major Locks. This hamlet wasn't built by an ocean by accident, as it has ancestral grounds, which is of great importance to the people of Fool's March and its success.",
        "Stationed on the lowest point of a glacier, the hamlet of Haran is home to humans lead by Baron Lockridge. This hamlet wasn't built by a glacier by accident, as it has hidden tunnels, which is of great importance to the people of Haran and its success.",
        "Settled inside an ocean, the port of Kaladorei is home to dark elves lead by Judge Almon. This port wasn't built by an ocean by accident, as it has unique wildlife, which is of great importance to the people of Kaladorei and its success.",
        "Formed inside a lake, the port of Hogsfeet is home to barbarians lead by Director Falkner. This port wasn't built by a lake by accident, as it has an abundance of minerals, which is of great importance to the people of Hogsfeet and its success.",
        "Designed on the peak of a field, the settlement of Sinashari is home to night elves lead by Captain Alduin. This settlement wasn't built by a field by accident, as it has hidden secrets, which is of great importance to the people of Sinashari and its success.",
        "Rooted around a sea, the settlement of Dry Gulch is home to halflings lead by Marshal Geary. This settlement wasn't built by a sea by accident, as it has ancient burial grounds, which is of great importance to the people of Dry Gulch and its success.",
        "Forged behind a field, the crossroad of Fool's March is home to giants lead by Warlord Evatt. This crossroad wasn't built by a field by accident, as it has a broken, hidden library, which is of great importance to the people of Fool's March and its success.",
        "Situated on the bottom of a mound, the city of Ishnuala is home to night elves lead by Lord Almar. This city wasn't built by a mound by accident, as it has magical properties, which is of great importance to the people of Ishnuala and its success."
    ][Math.floor(Math.random() *40)];
}
function deleteCheck(){
    document.getElementById("delete2").style.display= "inline";
}
function delete3(){
	localStorage.removeItem("saved");
    localStorage.removeItem("Level");
    localStorage.removeItem("XP");
    localStorage.removeItem("Race");
    localStorage.removeItem("Class");
    localStorage.removeItem("Speed");
    localStorage.removeItem("AttackMin");
    localStorage.removeItem("AttackMax");
    localStorage.removeItem("FullHp");
    localStorage.removeItem("CurrentHp");
	location.reload();
}
function restart(){
	localStorage.removeItem("saved");
    localStorage.removeItem("Level");
    localStorage.removeItem("XP");
    localStorage.removeItem("Race");
    localStorage.removeItem("Class");
    localStorage.removeItem("Speed");
    localStorage.removeItem("AttackMin");
    localStorage.removeItem("AttackMax");
    localStorage.removeItem("FullHp");
    localStorage.removeItem("CurrentHp");
}
function attackConvert(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
function helpText() {
    if (click === 0) {
    document.getElementById("info").innerHTML= ("Welcome to the game! My name is Seyfendi :D, i am going to teach you how to play this game.");
    }
    if (click === 1){
        document.getElementById("info").innerHTML= ("Seyfendi:<br>Travel: This is the main mechanic of the game. You face enemies, find structures or items while traveling. Also your wounds heal while traveling.");  
    }
    else if (click === 2){
        document.getElementById("info").innerHTML= ("Seyfendi:<br>Combat: Each character deals their damage between their range of attacks, the one with higher speed hits first. If you have equal speed to your enemie, your enemie hits first.");  
    }
    else if (click === 3){
        document.getElementById("info").innerHTML= ("Seyfendi:<br>Runnig: You can try to run from combat, you have %50 change of success. You can't try running more than once in a combat.");  
    }
    else if (click === 4){
        document.getElementById("info").innerHTML= ("Seyfendi:<br>Stats: You can view your stats with my character button.<br>HP: Your maximum health points, Current HP: Your current health points, Attack: The range you deal damage between, Speed: Your speed.");  
    }
    else if (click === 5){
        document.getElementById("info").innerHTML= ("Seyfendi:<br>Level Up: You level up every time you defeat 10 enemies. when you level up, your HP, attack and speed increases randomly, HP between 0 and 5, Attack and Speed between 0 and 2. And enemies you see while traveling changes in every 4 level.");  
    }
    else if (click === 6){
        document.getElementById("info").innerHTML= ("Seyfendi:<br>Items: There are four kind of items in the game. You can find them while traveling, by helping villagers or monsters might drop them when they die.");  
    }
    else if (click === 7){
        document.getElementById("info").innerHTML= ("Seyfendi:<br>Healing Potion: Heals you to full health. Escape Potion: makes you escape from combat. You cant use it while helping villagers. Better Armor: Increases you max health by 1. Better Sword: Increases your attack by 1.");
    }
    else if (click === 8){
        document.getElementById("info").innerHTML= ("Seyfendi:<br>Cursed Items: There is a %20 change that a better sword or armor can be cursed. If you use a cursed item your max hp or your attack drops by 1.");  
    }
    else if (click === 9){
        document.getElementById("info").innerHTML= ("Seyfendi:<br>Villages: Villagers might heal you to full health or ask you for help to defeat a nearby monsters. These monsters are tougher than casual monsters, if you accept to help them their shaman blesses you and your max hp increases by 1, they heal you to full health and they gift you an item.");  
    }
    else if (click === 10){
        document.getElementById("info").innerHTML= ("Seyfendi:<br>Dungeons: You can find items and monsters in dungeons, if you are in a high level, you can find lower level monsters, so they are good to grind XP and items. There also might be traps in dungeons.");  
    }
    else if (click === 11){
        document.getElementById("info").innerHTML= ("Saveing:<br> Your stats save when you click save game. You can load your save whenever you want. Your save deletes automaticly when your character dies.");  
    }
    else if (click === 12){
        document.getElementById("info").innerHTML= ("Good luck!"); 
    }
}
function help(){
    click = 0;
    document.getElementById("pic").src= "img/DM.jpg"; 
    deleteAllButtons();
    document.getElementById("helpSkip").style.display= "inline";
    document.getElementById("helpStop").style.display= "inline";
    helpText();
}   
function helpSkip(){
    click = click + 1;
    if (click < 13){
    helpText();
    }
}
function helpStop() {
    document.getElementById("helpStop").style.display= "none";
    document.getElementById("helpSkip").style.display= "none";
    document.getElementById("help").style.display= "inline";
    document.getElementById("myCharacter").style.display= "inline";
    document.getElementById("travel").style.display= "inline";
    document.getElementById("delete").style.display= "inline";
    click = 15;
    document.getElementById("info").innerHTML= ("Good luck!"); 
    	if (yourCurrentHp <= 0){
    		document.getElementById("p6").innerHTML= "You died X(";
    			localStorage.removeItem("saved");
                localStorage.removeItem("Level");
                localStorage.removeItem("XP");
                localStorage.removeItem("Race");
                localStorage.removeItem("Class");
                localStorage.removeItem("Speed");
                localStorage.removeItem("AttackMin");
                localStorage.removeItem("AttackMax");
                localStorage.removeItem("FullHp");
                localStorage.removeItem("CurrentHp");
                document.getElementById("dungeonContinue").style.display= "none";
                document.getElementById("dungeonLeave").style.display= "none";
                document.getElementById("attack").style.display= "none";
                document.getElementById("restartDead").style.display= "inline";
                document.getElementById("delete").style.display= "none";
                document.getElementById("travel").style.display= "none";
    	}
}
function deleteAllButtons() {
    document.getElementById("statClose").style.display= "none";
    document.getElementById("dungeonContinue").style.display= "none";
    document.getElementById("dungeonLeave").style.display= "none";
    document.getElementById("myCharacter").style.display= "none";
    document.getElementById("attack").style.display= "none";
    document.getElementById("restartDead").style.display= "none";
    document.getElementById("save").style.display= "none";
    document.getElementById("delete").style.display= "none";
    document.getElementById("travel").style.display= "none";
    document.getElementById("run").style.display= "none";
    document.getElementById("items").style.display= "none";
    document.getElementById("help").style.display= "none";
}
function showButtons() {
    document.getElementById("myCharacter").style.display= "inline";
    document.getElementById("save").style.display= "inline";
    document.getElementById("delete").style.display= "inline";
    document.getElementById("travel").style.display= "inline";
    document.getElementById("items").style.display= "inline";
    document.getElementById("help").style.display= "inline";
}
function clearScreen(min, max) {
    clean= {
    "2": {"section": "p2"},
    "3": {"section": "p3"},
    "4": {"section": "p4"},
    "5": {"section": "p5"},
    "6": {"section": "p6"},
    "7": {"section": "p7"},
    "8": {"section": "levelUp"},
    "9": {"section": "itemDrop"},
    "10": {"section": "boxAttack"},
    "11": {"section": "boxAttack2"},
    "12": {"section": "boxAttack3"},
    "13": {"section": "boxAttack4"},
    "14": {"section": "boxAttack5"},
    "15": {"section": "info"},
    //"16": {"section": "pic"},
    }
    for(i=0; i<16; i++){
        if(i >= min && i <= max){
            id= clean[i]["section"];
            document.getElementById(id).innerHTML="";
        }
    }
}
function storyLv1Text(){
    deleteAllButtons();
    if (click === 0){
        document.getElementById("info").innerHTML= "<p style= 'color: yellow; font-size: larger;'>Run! Run!<br>The city is on fire!<br>AAAAAAHHHHH!!!</p>"
        document.getElementById("picStory").src= "img/story1.jpg";
        document.getElementById("pic").src= "img/villagers.jpg";
    }
    else if (click === 1){
        document.getElementById("info").innerHTML= ("<p style= 'color: lightseagreen; font-size: larger;'>Damn... The city is fallen, run prince! Run for your life!</p>"); 
        document.getElementById("pic").src ="img/Godfry.jpg"
    }
    else if (click === 2){
        document.getElementById("info").innerHTML= ("<p style= 'color: lightseagreen; font-size: larger;'>W-what... No, it can't be...</p>");  
        document.getElementById("pic").src ="img/Godfry.jpg"
    }
    else if (click === 3){
        document.getElementById("info").innerHTML= ("<p style= 'color: red; font-size: larger;'>I'm asking you one final time, Sir Godfry. You'd be a perfect companion, Join me! Or die...</p>");  
        document.getElementById("pic").src ="img/Riur.jpg"
    }
    else if (click === 4){
        document.getElementById("info").innerHTML= ("<p style= 'color: lightseagreen; font-size: larger;'>Never, Riur! We'll fight forever!</p>");  
        document.getElementById("pic").src ="img/Godfry.jpg"
    }
    else if (click === 5){
        document.getElementById("info").innerHTML= ("<p style= 'color: red; font-size: larger;'>So be it Godfry... What a waste...</p>");  
        document.getElementById("pic").src ="img/Riur.jpg"
    }
    else if (click === 6){
        document.getElementById("picStory").style.display= "none";
        document.getElementById("pic").style.display= "none";
        document.getElementById("info").innerHTML= "";
        document.getElementById("boxAttack").innerHTML= "<p style= 'color: lightseagreen;'>Sir Godry hits: 27</p>";
        document.getElementById("boxAttack2").innerHTML= "Riur's HP: 73/100, Sir Godfry's HP: 49/49";
    }
    else if (click === 7){
        document.getElementById("pic").style.display= "inline";
        document.getElementById("info").innerHTML= "<p style= 'color: red; font-size: larger;'>Pathetic...</p>";
        document.getElementById("pic").src= "img/Riur.jpg";
    }
    else if (click === 8){
        document.getElementById("picStory").style.display= "none";
        document.getElementById("pic").style.display= "none";
        document.getElementById("info").innerHTML= "";
        document.getElementById("boxAttack3").innerHTML= "<p style= 'color: red;'>Riur hits: 47</p>";
        document.getElementById("boxAttack4").innerHTML= "Riur's HP: 73/100, Sir Godfry's HP: 2/49";
    }
    else if (click === 9){
        document.getElementById("pic").style.display= "inline";
        document.getElementById("info").innerHTML= "<p style= 'color: lightseagreen; font-size: larger;'>Run prince! Run for your life im holding him back!</p>";
        document.getElementById("pic").src= "img/Godfry.jpg";
    }
    else if (click === 10){
        desicion1();
    }
}
function storyLv1() {
    if (level = 1 && XP == 0){
    storyLv1Text();
    }
}
function desicion1() {
    click = 11;
    document.getElementById("choseRun").style.display= "inline";
    document.getElementById("choseStay").style.display= "inline";
}
function choseStayText(){
    if (click === 11) {
    document.getElementById("choseRun").style.display= "none";
    document.getElementById("choseStay").style.display= "none";
    document.getElementById("info").innerHTML= "<p style= 'color: lightseagreen; font-size: larger;'>I said run!</p>";
    document.getElementById("boxAttack").innerHTML= "<p style= 'color: lightseagreen;'>Sir Godry hits: 25</p>";
    document.getElementById("boxAttack2").innerHTML= "you hit: 4";
    document.getElementById("boxAttack3").innerHTML= "<br><p style= 'color: red;'>Riur's HP: 44/100</p>";
    document.getElementById("boxAttack4").innerHTML= "";
    }
    else if (click === 12){
    document.getElementById("info").innerHTML= "";
    document.getElementById("boxAttack").innerHTML= "<p style= 'color: red;'>Riur hits: 39</p>"; 
    document.getElementById("boxAttack2").innerHTML= "<p style= 'color: lightseagreen;'>Sir Godfry's HP: -37/49</p>"; 
    document.getElementById("boxAttack3").innerHTML= "Your HP: " + yourFullHp;
    }
    else if (click === 13){
    document.getElementById("boxAttack").innerHTML= "<p style= 'color: red;'>Riur hits: 39</p>"; 
    document.getElementById("boxAttack2").innerHTML= "<p style= 'color: lightseagreen;'>Sir Godfry's HP: -37/49</p>"; 
    document.getElementById("boxAttack3").innerHTML= "Your HP: " + yourFullHp;
    }
    else if (click === 14){
    document.getElementById("info").innerHTML= "<p style= 'color: lightseagreen; font-size: larger;'>Run, prince! You can't beat him now! You should come back stronger, the king is dead, you are our last hope... NOW GO!</p>";
    }
    else if (click === 15){
    document.getElementById("storySkip1").style.display= "none";
    document.getElementById("staySkip").style.display= "none";
    document.getElementById("choseRun").style.display= "none";
    document.getElementById("choseStay").style.display= "none";
    clearScreen(2, 16);
    document.getElementById("pic").src= "img/"+ yourRace +" " + yourClass +".jpg";
    showButtons();
    }
}
function choseRun() {
    document.getElementById("storySkip1").style.display= "none";
    clearScreen(2, 16);
    document.getElementById("pic").src= "img/"+ yourRace +" " + yourClass +".jpg";
    showButtons();
    document.getElementById("info").innerHTML= "(You escaped, but Sir Godry and the king is dead. As the last member of the royal family, you are the only hope to reunite the empire. You must get stronger to stand against Riur.)"
    document.getElementById("choseRun").style.display= "none";
    document.getElementById("choseStay").style.display= "none";
}
function choseStay(){
    document.getElementById("storySkip1").style.display= "none";
    document.getElementById("staySkip").style.display= "inline";
    choseStayText();
}
function autoload(){
	saved = localStorage.getItem("saved");
	console.log(saved)
	if(saved === "1"){
		getData();
    	clearScreen(2, 15);
    	document.getElementById("pic").src= "img/"+ yourRace +" " + yourClass +".jpg";
    	deleteAllButtons();
    	document.getElementById("picStory").src= "img/story1.jpg";
    	document.getElementById("picStory").style.display= "none";
    	document.getElementById("storySkip1").style.display= "none";
    	showButtons();
    }
    else {
    	storyLv1();
    }
}
function storySkip1(){
    level = 1;
    click = click + 1;
    if (click < 11){
    storyLv1Text();
    }
}
function staySkip(){
    click = click + 1 -1;
    if (click >= 11){
    click = click + 1;
    choseStayText();
    }
}
function bossFight() {
    if (level=== 4) {
    deleteAllButtons();
    clearScreen(2, 16);
    document.getElementById("bossFightSkip").style.display= "inline";
        if (click === 0) {
            document.getElementById("pic").src = "img/" + yourRace + " " + yourClass + ".jpg";
            document.getElementById("info").innerHTML= "Who's there?!"
        }
        else if (click === 1) {
            document.getElementById("pic").src = "img/none.jpg";
            document.getElementById("info").innerHTML= "Lord Riur told me to nip in the bud..."
        }
        else if (click === 2) {
            document.getElementById("pic").src = "img/" + yourRace + " " + yourClass + ".jpg";
            document.getElementById("info").innerHTML= "Show yourself coward!"
        }
        else if (click === 3) {
            enemie= "Wess the Mad";
            monHp= enemieData(enemie, "hp");
            monFullHp= monHp;
            monSpeed= enemieData(enemie, "speed");
            monAttackMin= enemieData(enemie, "attackMin");
            monAttackMax= enemieData(enemie, "attackMax");
            monAttack= attackConvert(monAttackMin, monAttackMax);
            document.getElementById("boxAttack").innerHTML= "<p style= 'color: red;'>Wess the Mad hits: " + monAttack + "<p>";
            yourCurrentHp= yourCurrentHp - monAttack;
            document.getElementById("boxAttack2").innerHTML= "Your HP: " + yourCurrentHp + "/" + yourFullHp + ", " + "<p style= 'color: red;'>Wess the Mad's HP: " + monHp + "/" + monFullHp + "</p>"; 
            document.getElementById("pic").src = "img/boss1.jpg";
            document.getElementById("info").innerHTML= "Prepare to die!"
            document.getElementById("attack").style.display= "inline";
            document.getElementById("myCharacter").style.display= "inline";
            document.getElementById("bossFightSkip").style.display= "none";
        }
    }
    else if (level === 8) {
    	deleteAllButtons();
    	clearScreen(2, 16);
    	document.getElementById("bossFightSkip").style.display= "inline";
        if (click === 0) {
            document.getElementById("pic").src = "img/" + yourRace + " " + yourClass + ".jpg";
            document.getElementById("info").innerHTML= "What's happening?!";
        }
        if (click === 1) {
            document.getElementById("pic").src = "img/boss2.jpg";
            document.getElementById("info").innerHTML= "I curse you little prince! *You have been cursed! (Your hp fell)"
            yourCurrentHp= Math.floor(yourCurrentHp/2);
            document.getElementById("p2").innerHTML= "HP: " + yourCurrentHp + "/" + yourFullHp;
        }
        if (click === 2) {
            enemie= "Gulgamath";
            monHp= enemieData(enemie, "hp");
            monFullHp= monHp;
            monSpeed= enemieData(enemie, "speed");
            monAttackMin= enemieData(enemie, "attackMin");
            monAttackMax= enemieData(enemie, "attackMax");
            monAttack= attackConvert(monAttackMin, monAttackMax);
            document.getElementById("attack").style.display= "inline";
            document.getElementById("myCharacter").style.display= "inline";
            document.getElementById("bossFightSkip").style.display= "none";
        }
    }
    else if (level === 12) {
    	deleteAllButtons();
    	clearScreen(2, 16);
    	document.getElementById("bossFightSkip").style.display= "inline";
        if (click === 0) {
            document.getElementById("pic").src = "img/" + yourRace + " " + yourClass + ".jpg";
            document.getElementById("info").innerHTML= "What?! Gorund is shaking...";
        }
        if (click === 1) {
            document.getElementById("pic").src = "img/boss3.jpg";
            document.getElementById("info").innerHTML= "Ugh... <br> *A single huge eye stares from the forehead of this nine-foot-tall giant. Below this sole orb, an even larger mouth gapes like a cave.*"
   
        }
        if (click === 2) {
            enemie= "Cyclopes";
            monHp= enemieData(enemie, "hp");
            monFullHp= monHp;
            monSpeed= enemieData(enemie, "speed");
            monAttackMin= enemieData(enemie, "attackMin");
            monAttackMax= enemieData(enemie, "attackMax");
            monAttack= attackConvert(monAttackMin, monAttackMax);
            document.getElementById("attack").style.display= "inline";
            document.getElementById("myCharacter").style.display= "inline";
            document.getElementById("bossFightSkip").style.display= "none";
        }
    }
    else if (level === 16) {
    	deleteAllButtons();
    	clearScreen(2, 16);
    	document.getElementById("bossFightSkip").style.display= "inline";
        if (click === 0) {
            document.getElementById("pic").src = "img/none.jpg";
            document.getElementById("info").innerHTML= "Stop right where you are kid!";
        }
        if (click === 1) {
            document.getElementById("pic").src = "img/" + yourRace + " " + yourClass + ".jpg";
            document.getElementById("info").innerHTML= "Huh?"
        }
        if (click === 2) {
            document.getElementById("pic").src = "img/DM.jpg";
            document.getElementById("info").innerHTML= "You have gone too far! I was being kind cause i really didn't belive you'd come this far... I have to put an end to this madness.";
        }
        if (click === 3) {
            document.getElementById("pic").src = "img/" + yourRace + " " + yourClass + ".jpg";
            document.getElementById("info").innerHTML= "Don't you saw the city burning, Seyfendi? What Riur's doing to people is madness, now get out of my way!"
        }
        if (click === 4) {
            document.getElementById("pic").src = "img/DM.jpg";
            document.getElementById("info").innerHTML= "I can't let you stop Lord Riur, sorry kid, i'll have to do this! *Seyfendi zaps at you, you feel weak (your atack fell.)*";
            attackMin= Math.floor(attackMin/2);
            document.getElementById("p2").innerHTML= "Your Attack: " + attackMin;
        }
        if (click === 5) {
            enemie= "Seyfendi";
            monHp= enemieData(enemie, "hp");
            monFullHp= monHp;
            monSpeed= enemieData(enemie, "speed");
            monAttackMin= enemieData(enemie, "attackMin");
            monAttackMax= enemieData(enemie, "attackMax");
            monAttack= attackConvert(monAttackMin, monAttackMax);
            document.getElementById("attack").style.display= "inline";
            document.getElementById("myCharacter").style.display= "inline";
            document.getElementById("bossFightSkip").style.display= "none";
        }
    }
    else if (level === 20) {
    	deleteAllButtons();
    	clearScreen(2, 16);
    	document.getElementById("bossFightSkip").style.display= "inline";
        if (click === 0) {
            document.getElementById("pic").src = "img/" + yourRace + " " + yourClass + ".jpg";
            document.getElementById("info").innerHTML= "So this is it, Riur's castle..."
        }
        if (click === 1) {
            document.getElementById("pic").src = "img/Riur.jpg";
            document.getElementById("info").innerHTML= "What?! Prince... I must admit i am suprised you've come this far. Now i can finally kill the last member of the royal family!";
        }
        if (click === 2) {
            document.getElementById("pic").src = "img/" + yourRace + " " + yourClass + ".jpg";
            document.getElementById("info").innerHTML= "Bring it on!"
        }
        if (click === 3) {
            enemie= "Riur";
            monHp= enemieData(enemie, "hp");
            monFullHp= monHp;
            monSpeed= enemieData(enemie, "speed");
            monAttackMin= enemieData(enemie, "attackMin");
            monAttackMax= enemieData(enemie, "attackMax");
            monAttack= attackConvert(monAttackMin, monAttackMax);
            document.getElementById("attack").style.display= "inline";
            document.getElementById("myCharacter").style.display= "inline";
            document.getElementById("bossFightSkip").style.display= "none";
        }
    }
}
function bossFightSkip() {
    click = click + 1;
    bossFight();
}
function credits() {
	deleteAllButtons();
	clearScreen(2, 16);
    document.getElementById("info").innerHTML= "<p style= 'color: yellow; font-size: larger;'>You made it! You saved the city and became the new king. People cheer you as you walk into your castle.<br>*Thanks for playing :D!*<br>-Kürek Lahmacun-</p>"
    document.getElementById("picStory").src= "img/end.jpg";    
    document.getElementById("picStory").style.display= "inline";
    document.getElementById("p1").innerHTML="";
    document.getElementById("pic").src= "img/" + yourRace + " " + yourClass + ".jpg";
}