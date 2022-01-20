
contract WandName {
  string[] actionAdjectives = ["adrift","advancing","aerial","amplifying","animate","ascending","ascending","augmenting","budding","burgeoning","changing","climbing","collapsing","crescent","decreasing","descending","developing","diminishing","drifting","ebbing","elevated","emerging","enlarging","expanding","express","flapping","fleet","floating","flourishing","fluttering","flying","free","gesturing","gliding","growing","hollow","hovering","increasing","inflated","light","living","lofty","loose","lowering","maturing","migrating","mobile","mushrooming","plumed","plunging","roaming","sailing","settling","shifting","sinking","sliding","slipping","soaring","spiraling","spreading","sprouting","stepping","stirring","streaming","stretching","subsiding","surging","swelling","swimming","swooping","thriving","tottering","towering","tumbling","viable","volatile","voyaging","wafting","waning","waving","waxing","winging","zooming"];
  string[] adjectives = ["dazzling","mirrorlike","cloudy","nontranslucent","nontransparent","coarse","nubilous","obscure","moist","dense","leaden","gleaming","opaque","glistening","glittering","moonlit","humid","dark","igneous","fierce","misty","phosphorescent","mucky","damp","Fiery","flaming","flaring","murky","fervid","flashing","dark","aglow","dim","light","fluid","alight","lighted","aqueous","foggy","relucent","auroral","bawdy","gloomy","resplendent","burnished","beaming","robust","dewy","glossy","fulgent","funky","illuminated","enveloped","illumined","glowing","incandescent","luminous","lustrous","mushy","shimmering","dusky","ablaze","feverish","shiny","indefinite","marshy","shrouded","enthusiastic","emulsified","natural","inflamed","intense","fuzzy","golden","nebulous","bleary","glaring","clouded","burning","blurred","silvery","hazy","febrile","brilliant","blazing","heated","heavy","hot","overcast","polished","radiant","rough","somber","sparkling","spirited","sullen","sunless","sunlit","sunny","twinkling","vaporous","vivid","waterlike"];
  string[] nouns = ["obscurity","heavens","band","billow","globe","bowl","wandering star","celestial sphere","rack","orb","vault","colure","circlet","compass","island universe","revolution","empyrean","mist","universe","star system","heavens","world","ring","meridian","ether","entry","nature","perimeter","frost","opening","Milky Way","equator","orbit","smog","gloom","gate","spiral galaxy","macrocosm","irregular galaxy","cloud","overcast","pother","lid","hoop","entrance","pressure","coil","periphery","puff","scud","star cluster","fog","asteroid","fogginess","galaxy","horoscope","vault of heaven","luminous body","veil","cosmos","steam","creation","aureole","cycle","murk","earth","darkness","planetoid","halo","astrometry","sphere","vapor","disk","sky","azure","smoke","microcosm","film","crown","star","doorway","haze","disc","belt","round","terrene","dimness","elliptical galaxy","wheel","circuit","cirque","corona","ecliptic","enclosure","full turn","gateway","haziness","heavenly body","horizon","nebula","air"];

  function generateWandName(uint randomSeed) public returns (string memory wandName) {
    string memory actionAdjective = actionAdjectives[randomSeed % actionAdjectives.length];
    string memory adjective = adjectives[randomSeed % adjectives.length];
    string memory noun = nouns[randomSeed % nouns.length];
    string memory space = " ";

    wandName = string(abi.encodePacked(actionAdjective, space, adjective, space, noun));

    return wandName;
  }
}

