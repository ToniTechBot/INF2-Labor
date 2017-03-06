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

  function addProcent(){

  }

}