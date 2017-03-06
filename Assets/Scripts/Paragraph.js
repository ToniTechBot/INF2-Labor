﻿public class Paragraph {
  var txt: String;
  var visited:boolean;
  var optionCount:int;
  var optionArray:Array;
  var battleEncounter:boolean;
  // Für weitere Abschnitte
  var extraPGCheck: boolean = false;
  var extraPG: Array;


  // Erstellt einen neuen Paragraphen
  function Paragraph(txt:String) {
    this.txt = txt;
    optionCount = 1;
    optionArray = [];
    extraPG = [];
    // kann vielleicht weg
    battleEncounter = false;
  }

  function Paragraph(txt:String, battle:boolean) {
      this.txt = txt;
      optionCount = 1;
      optionArray = [];
      extraPG = [];
      // kann vielleicht weg
      battleEncounter = true;
  }

  // Fügt eine Antwortoption hinzu, die mit einem Abschnitt verknüpft ist
  function addOption(optionTxt:String, requirements:String, nextPG:Paragraph) {
    var option: Hashtable = new Hashtable();
    option["optionTxt"] = optionTxt;
    option["requirements"] = requirements;
    option["nextPG"] = nextPG;
    optionCount++;
    optionArray.push(option);
  }


  // Fügt eine Antwortoption hinzu, die basierend auf einer festgelegten Wahrscheinlichkeit den nächsten Abschnitt errechnen lässt
  function addOption(optionTxt:String, requirements:String, nextPG1:Paragraph, nextPG2:Paragraph, percent:int) {
      var option: Hashtable = new Hashtable();
      var percentageRoll:int = Random.Range(1, 101);
      if (percentageRoll<=(100-percent)){
          option["nextPG1"] = nextPG1;
          Debug.Log("NextPG1 ausgewählt. Wahrscheinlichkeit: "+(100-percent)+" Würfelergebnis: "+percentageRoll);
      }
      else {
          option["nextPG1"] = nextPG2;
          Debug.Log("NextPG2 ausgewählt. Wahrscheinlichkeit: "+(100-percent)+" Würfelergebnis: "+percentageRoll);
      }

      option["optionTxt"] = optionTxt;
      option["requirements"] = requirements;
      optionCount++;
      optionArray.push(option);
  }



  // fügt einen weiteren Textteil hinzu
  // das ist bei langen Texten sinnvoll!
  function addExtraPG(extraPGTxt: String) {
        extraPGCheck = true;
        extraPG.push(extraPGTxt);
  }



      // Konstruktor?
      var enemeyStrength:int = 8;
      var enemyArmor:int = 0;
      var enemyHP:int = 14;

      // Aus anderem Skript einlesen
      var heroStrength:int = 12;
      var heroArmor:int = 0;
      var heroHP:int = 30;

      function battleRound(type:String){
          var roll20 = Random.Range(1, 21);
          var damage1:int;
          var damage2:int;

          if (heroStrength+roll20>=40){
              damage1 = 0;
              damage2 = 6;
          }else if(heroStrength+roll20>=35){
              damage1 = 0;
              damage2 = 5;
          }else if(heroStrength+roll20>=30){
              damage1 = 1;
              damage2 = 4;
          }else if(heroStrength+roll20>=25){
              damage1 = 1;
              damage2 = 3;
          }else if(heroStrength+roll20>=20){
              damage1 = 2;
              damage2 = 3;
          }else if(heroStrength+roll20>=15){
              damage1 = 2;
              damage2 = 2;
          }else if(heroStrength+roll20>=10){
              damage1 = 3;
              damage2 = 1;
          }else if(heroStrength+roll20>=5){
              damage1 = 4;
              damage2 = 1;
          }else{
              damage1 = 4;
              damage2 = 0;
          }
      
          if(type=="enemy"){
              enemyHP-=damage1-enemyArmor;
              heroHP-=damage2-heroArmor;

              return "Dein Gegner fügt dir "+(damage2-heroArmor)+" Schaden zu. Er nimmt dabei "+(damage1-enemyArmor)+" Schaden und hat noch "+enemyHP+" Lebenspunkte übrig.";
          }else{
              heroHP-=damage1-heroArmor;
              enemyHP-=damage2-enemyArmor;
              return "Du fügst deinem Gegner "+(damage2-enemyArmor)+" Schaden zu. Du nimmt dabei "+(damage1-heroArmor)+" Schaden. Dein Gegner hat "+enemyHP+" Lebenspunkte übrig.";
          }
      }


      function fight(){
          while(heroHP<=0||enemyHP<=0){
              battleRound("hero");
              if (heroHP<=0||enemyHP<=0){
                  battleRound("enemy");
              }else{
                  break;
              }
          }
      }

}