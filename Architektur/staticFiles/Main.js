

// http handling

function send_data(){
    const formData = new FormData();
    document.getElementById("fourth_view").style.display="None";
    document.getElementById("third_view").style.display="inline"; // wieder third view anzeigen für Ladebalken

    var user_emotion = document.getElementById("emotion_dropdown").value;
    var user_age = document.getElementById("age_dropdown").value;

    formData.append("emotion", user_emotion);
    formData.append("age", user_age);


    var xhr = new XMLHttpRequest();
    xhr.open("POST", "/api_banking");
    xhr.send(formData);


    xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
            response = xhr.responseText;
            document.getElementById("banking_recommendation").innerHTML=response;
            document.getElementById("product_info").innerHTML=product_descriptions[response];
            document.getElementById("offering_link").setAttribute("href", offering_links[response]);
            document.getElementById("third_view").style.display="None";
            document.getElementById("fifth_view").style.display="inline";
        }
      }
    
}


// camera input handling

async function start_camera () {
    // DOM manipulation part
    document.getElementById("first_view").style.display="None";
    document.getElementById("second_view").style.display="inline";


    // ================================== //
    // functional part
   	let stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
	document.getElementById("video").srcObject = stream;
};

function take_picture() {



   	document.getElementById("canvas").getContext('2d').drawImage(document.getElementById("video"), 0, 0, document.getElementById("canvas").width, document.getElementById("canvas").height);
 

}

function send_img() {
    let image_base64 = document.querySelector("#canvas").toDataURL('image/jpeg').replace(/^data:image\/jpeg;base64,/, ""); 
    document.getElementById("second_view").style.display="None";
    document.getElementById("third_view").style.display="inline"; // temporarily changed for live server !!!
    var xhr = new XMLHttpRequest(),
        data = image_base64;

    xhr.open("POST", "/api");

    xhr.send(data);


    xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
            response = xhr.responseText;
            response = JSON.parse(response);
            console.log(response);


            //document.getElementById("age_response").innerHTML=response[1];
            //document.getElementById("emotion_response").innerHTML=response[0];
            //document.getElementById("fourth_big_result").innerHTML="Emotion: "+response[0]+", Age:"+response[1];

            var dropdown_emotion = document.getElementById("emotion_dropdown");
            for (var i=0; i<dropdown_emotion.options.length; i++){
                if (dropdown_emotion.options[i].value == response[0]){
                    dropdown_emotion.options[i].selected = true;
                    break;
                }
            }

            var dropdown_age = document.getElementById("age_dropdown");
            for (var i=0; i<dropdown_age.options.length; i++){
                if (dropdown_age.options[i].value == response[1]){
                    dropdown_age.options[i].selected = true;
                    break;
                }
            }

            change_big_display_fourth()

            document.getElementById("third_view").style.display="None";
            document.getElementById("fourth_view").style.display="inline";

        }
    }
}

function change_big_display_fourth(){
    document.getElementById("fourth_big_result").innerHTML="Emotion: "+document.getElementById("emotion_dropdown").options[document.getElementById("emotion_dropdown").selectedIndex].text+", Alter:"+document.getElementById("age_dropdown").options[document.getElementById("age_dropdown").selectedIndex].text;
}


let products = ["Girokonto","Gemeinschaftskonto","Kreditkarte","Tagesgeldkonto","Sparplan","Bausparplan",
"Edelmetall Depot","Aktien Depot","Aktiensparplan","ETF Sparplan","Privatkredit","Umschuldung","Immobilienfinanzierung",
"Immobilien","Hebel Zertifikate","Crypto","Lebensversicherung","Rentenversicherung","NFT","Berufsunfähigkeitsversicherung",
"Crypto, Hebel Zertifikate","Immobilien, Bausparvertrag","Gemeinschaftskonto, Tagesgeldkonto","NFT, Crypto","Staatsanleihen","Bausparvertrag, Aktien Sparplan"];


// zu jedem Produkt hier noch eine Info ergänzen
let product_descriptions = {
    "Girokonto":"Ein Girokonto ist ein kostenloses Bankkonto, das jeder Person zur Verfügung steht. Es ermöglicht das Empfangen und Überweisen von Geld, das Abheben von Bargeld an Automaten sowie das Bezahlen von Rechnungen und Einkäufen mit einer Bankkarte oder einer EC-Karte. Meistens wird eine kostenlose Visa- oder Mastercard-Debitkarte ausgegeben, die das Abheben von Bargeld und das Bezahlen von Einkäufen ermöglicht. Einige Banken bieten zusätzliche Funktionen wie das Online-Banking, Kreditkarten und Scheckbücher an.",
    "Gemeinschaftskonto":"Ein Gemeinschaftskonto, auch als Partnerschaftskonto bezeichnet, ist ein Bankkonto, das von zwei oder mehreren Personen gemeinsam genutzt wird. Es ermöglicht es allen Inhabern, Geld auf das Konto einzuzahlen, abzuheben und Überweisungen vorzunehmen. Es ist besonders nützlich für Paare oder Geschäftspartner, die gemeinsam Finanzen verwalten möchten. Oft erfordert es eine gemeinsame Unterschrift, um Transaktionen durchzuführen. Einige Banken bieten auch die Möglichkeit, separate Zugriffsrechte für jeden Inhaber festzulegen.",
    "Kreditkarte":"Eine Kreditkarte ist eine Zahlungskarte, mit der man Einkäufe tätigen und Bargeld abheben kann, ohne das Geld sofort bereitzustellen. Der Karteninhaber hat dadurch einen Kreditrahmen zur Verfügung, den er in Anspruch nehmen kann. Die Bank berechnet in der Regel für die Nutzung des Kredits einen monatlichen Zins und der Karteninhaber muss einen Teil des aufgenommenen Kredits jeden Monat zurückzahlen. Es gibt unterschiedliche Arten von Kreditkarten, wie z.B. charge cards, die die monatliche Abrechnung des gesamten ausgegebenen Betrags verlangen, oder revolving credit cards, die es erlauben, einen Teil des Kredits von Monat zu Monat weiterzuführen.",
    "Tagesgeldkonto":"Ein Tagesgeldkonto ist eine Art von Sparkonto, das dem Kunden eine flexible Möglichkeit bietet, Geld anzusparen und jederzeit darauf zugreifen zu können. Es unterscheidet sich von einem herkömmlichen Sparbuch, da es die Möglichkeit gibt, Geld jederzeit ohne vorherige Ankündigung ein- oder auszahlen zu können. Im Gegensatz dazu sind Sparbücher häufig mit einer Kündigungsfrist oder anderen Einschränkungen verbunden. Tagesgeldkonten bieten normalerweise einen höheren Zins als Girokonten und Sparbücher, weil das Geld der Bank für einen kurzen Zeitraum zur Verfügung steht. Es kann online oder in einer Filiale eröffnet werden, meistens sind sie kostenlos und es gibt keine Mindestanlagesumme.",
    "Sparplan":"Ein Sparplan ist ein Produkt, das es ermöglicht regelmäßig Geld auf ein Konto einzuzahlen, um langfristig für ein bestimmtes Ziel zu sparen. Einige Banken bieten Sparpläne an, die in regelmäßigen Abständen (z.B. monatlich) festgelegte Beträge automatisch von einem Girokonto einziehen und auf ein Tages- oder Festgeldkonto einzahlen. Andere Sparpläne sind an Aktien oder Investmentfonds gebunden und ermöglichen es, regelmäßig in diese zu investieren. In der Regel gibt es keine feste Laufzeit und keine Mindestanlagesumme, es kann jederzeit flexibel und unkompliziert eingezahlt oder ausgezahlt werden. Ein Sparplan ist eine gute Möglichkeit für Sparer, die ein langfristiges Ziel haben und das Sparen automatisch in ihren monatlichen Budget integrieren möchten.",
    "Bausparplan":"Ein Bausparvertrag ist eine Art von Sparplan, der speziell dafür entwickelt wurde, um den Erwerb oder die Finanzierung eines Eigenheims zu unterstützen. Es ist ein langfristiger Vertrag, bei dem der Kunde regelmäßig Geld einzahlt, meist über einen Zeitraum von mehreren Jahren. Im Gegenzug gewährt die Bausparkasse dem Kunden eine Bauspardarlehen zu besonders günstigen Konditionen, wenn es Zeit ist, ein Haus zu kaufen oder zu bauen.",
    "Edelmetall Depot":"Ein Edelmetall-Depot ist ein Produkt, das es ermöglicht, Edelmetalle wie Gold, Silber, Platin oder Palladium zu kaufen und zu lagern. Diese Edelmetalle werden dann als Vermögenswerte auf einem Depotkonto geführt, ähnlich wie Aktien oder Fonds auf einem Wertpapierdepot. Edelmetalle gelten als sicherer Hafen in unsicheren Zeiten und bieten eine Möglichkeit für Anleger, ihr Vermögen vor Inflation und Währungsrisiken zu schützen. Ein Edelmetall-Depot kann bei Banken oder spezialisierten Edelmetallhändlern eröffnet werden. ",
    "Aktien Depot":"Ein Aktien-Depot ist ein Produkt, das es ermöglicht, Aktien an der Börse zu kaufen und zu verkaufen und diese als Vermögenswerte auf einem Depotkonto zu halten. Es ermöglicht es Anlegern, in Unternehmen zu investieren und von deren Wertsteigerungen oder Dividenden zu profitieren. Es gibt unterschiedliche Arten von Aktien, wie z.B. Einzelaktien, ETFs (Exchange-Traded Funds) oder Investmentfonds, die über ein Aktiendepot gekauft werden können.",
    "Aktiensparplan":"Ein Aktiensparplan ist eine Möglichkeit, regelmäßig in Aktien zu investieren. Es handelt sich dabei um eine Kombination aus einem Sparplan und einem Aktiendepot, bei dem man regelmäßig, z.B. monatlich, einen festgelegten Betrag in eine oder mehrere Aktien oder ETFs (Exchange Traded Funds) einzahlt. Im Gegensatz zum einmaligen Kauf von Aktien ermöglicht es ein Aktiensparplan Anlegern, langfristig und kontinuierlich in Aktien zu investieren und somit auch von kleinen Beträgen zu profitieren.",
    "ETF Sparplan":"Ein ETF-Sparplan ist eine Möglichkeit, regelmäßig in ETFs (Exchange-Traded Funds) zu investieren. ETFs sind Investmentfonds, die an der Börse gehandelt werden und eine Mischung aus verschiedenen Aktien, Anleihen oder Rohstoffen enthalten können. Ein ETF-Sparplan ermöglicht es Anlegern, regelmäßig, z.B. monatlich, einen festgelegten Betrag in einen oder mehrere ETFs einzuzahlen. Durch den regelmäßigen Einzahlung und den Kauf von ETFs zu unterschiedlichen Kursen, kann man sogenannte 'Cost Averaging' Effekt nutzen und das Risiko minimieren. Ein ETF-Sparplan kann bei Banken oder Online-Brokern eröffnet werden, es gibt in der Regel keine feste Laufzeit und keine Mindestanlagesumme.",
    "Privatkredit":"Ein Privatkredit ist ein Kredit, den eine Bank oder ein anderer Finanzdienstleister an eine Privatperson vergibt. Dieser Kredit wird normalerweise für kurzfristige Bedürfnisse wie z.B. Konsumgüter, Renovierungen, Urlaub, oder eine größere Anschaffung verwendet. Es handelt sich dabei um eine unbesicherte Art des Kredits, das heißt keine Sicherheiten in Form von Vermögensgegenständen oder einer Grundschuld werden gefordert, sondern die Kreditwürdigkeit des Antragsstellers wird geprüft. Der Kreditnehmer muss also in der Regel seine Einkommenssituation nachweisen und wenn nötig, einen Bürgen benennen. Der Kreditbetrag, die Laufzeit und die Zinsen werden im Kreditvertrag festgelegt, und die monatlichen Raten sind in der Regel gleichbleibend.",
    "Umschuldung":"Eine Umschuldung ist ein Prozess, bei dem bestehende Kredite oder Verbindlichkeiten durch einen neuen Kredit abgelöst werden, um die Konditionen zu verbessern oder die Tilgung zu vereinfachen. Dies kann bedeuten, dass ein Kreditnehmer einen neuen Kredit zu besseren Zinsbedingungen aufnimmt und dadurch die monatlichen Raten senkt, die Tilgungsdauer verlängert oder die Anzahl der Kredite reduziert. Eine Umschuldung kann auch dazu verwendet werden, um einen bestehenden Kredit abzulösen, der aufgrund von Zahlungsproblemen oder verschlechterten finanziellen Verhältnissen schwer zu bedienen ist.",
    "Immobilienfinanzierung":"Eine Immobilienfinanzierung ist ein Finanzierungsprodukt, das von Banken und anderen Finanzinstituten angeboten wird, um den Kauf oder die Renovierung einer Immobilie zu ermöglichen. Es handelt sich hierbei um eine Art von langfristigem Kredit, der in der Regel über einen Zeitraum von 15 bis 30 Jahren abbezahlt wird. Die Art der Immobilienfinanzierung variiert je nach Anbieter und individuellen Bedürfnissen des Kunden. Es gibt zum Beispiel annuitätendarlehen, die eine gleichbleibende monatliche Rate aufweisen, Tilgungsdarlehen, die eine höhere Tilgung und geringere Zinsen haben oder auch kombinierte Darlehen, die sowohl Tilgung als auch Zinsen beinhalten.",
    "Immobilien":"Eine Immobilie ist ein Gebäude oder ein Grundstück, das als Vermögenswert betrachtet wird. Sie kann entweder als Wohnraum oder als Investitionsmöglichkeit dienen. Immobilien können in verschiedenen Formen vorliegen wie zum Beispiel: Eigentumswohnungen, Eigenheime, Mehrfamilienhäuser, Wohnanlagen, Gewerbeimmobilien, Bürogebäude, Einzelhandelsgeschäfte, usw.",
    "Hebel Zertifikate":"Hebelzertifikate ermöglichen es Anlegern, mit einem geringeren Kapitaleinsatz eine höhere Wertentwicklung von Basiswerten wie Aktien, Indizes, Währungen oder Rohstoffe zu erzielen, als es bei einer direkten Investition der Fall wäre. Hebelzertifikate arbeiten durch die Verwendung von Krediten oder Derivaten, um einen Hebel (oder Leverage) auf die Kursentwicklung des Basiswerts auszuüben. Dies bedeutet, dass eine kleine Änderung des Kurses des Basiswerts zu einer viel größeren Änderung des Wertes des Zertifikats führen kann.",
    "Crypto":"Crypto, auch Kryptowährungen genannt, sind digitale Währungen, die auf Kryptographie basieren, um Sicherheit und Kontrolle der Währungen zu gewährleisten. Die erste und bekannteste Kryptowährung ist Bitcoin, aber es gibt mittlerweile Tausende von Kryptowährungen, die auf verschiedenen Blockchain-Systemen aufgebaut sind. Einige Banken und Finanzinstitute bieten mittlerweile Dienstleistungen im Zusammenhang mit Kryptowährungen an, wie z.B. den Kauf und Verkauf von Kryptowährungen, die Aufbewahrung in 'Cold Wallets' (nicht mit dem internet verbundene Wallet), sowie Beratung und Anlageberatung. Es ist jedoch wichtig zu beachten, dass Kryptowährungen sehr volatil sind und das Investieren in Kryptowährungen ein höheres Risiko birgt, als traditionelle Anlageformen. ",
    "Lebensversicherung":"Eine Lebensversicherung bietet eine finanzielle Absicherung im Todesfall des Versicherungsnehmers und kann je nach Produkt auch lebenslange Rente bieten. In der Regel zahlt der Versicherungsnehmer regelmäßig Prämien an die Versicherungsgesellschaft und im Todesfall des Versicherungsnehmers wird ein vereinbarter Betrag (Versicherungssumme) an die im Vertrag benannten Begünstigten ausgezahlt. Einige Lebensversicherungen bieten auch die Möglichkeit, während der Laufzeit der Versicherung angesammelte Überschüsse in Form von Bonuszahlungen auszahlen zu lassen.",
    "Rentenversicherung":"Es handelt sich hierbei um eine langfristige Anlagemöglichkeit, bei der der Versicherungsnehmer regelmäßig Prämien einzahlt und im Gegenzug im Alter eine lebenslange Rente erhält. Es gibt verschiedene Arten von Rentenversicherungen, wie z.B. die kapitalbildende Rentenversicherung, bei der ein Teil der Prämien in verschiedene Anlageformen investiert wird und ein Teil in die Rentenversicherung selbst, oder die fondgebundene Rentenversicherung, bei der die Prämien vollständig in Investmentfonds angelegt werden. Rentenversicherungen bieten eine Möglichkeit, sich eine zusätzliche Altersversorgung aufzubauen und sind eine gute Ergänzung zur gesetzlichen Rentenversicherung.",
    "NFT":"NFT, oder 'Non-Fungible Token' ist eine Art von digitalen Vermögenswerten, die auf der Blockchain-Technologie aufgebaut sind. Im Gegensatz zu fungible Token wie Bitcoin, die austauschbar sind und durch ihre Einheitlichkeit definiert sind, sind NFTs einzigartig und nicht austauschbar. NFTs werden hauptsächlich verwendet, um digitale Inhalte wie Kunstwerke, Musik, Videos, virtuelle Güter und sogar Tweets als einzigartige und verifizierbare Vermögenswerte zu tokenisieren und zu verkaufen. Sie ermöglichen es Eigentümern, ihre digitalen Werke auf eine Weise zu schützen, die ihnen vorher nicht möglich war und ermöglichen auch den Käufern, die Echtheit und die Einzigartigkeit des erworbenen digitalen Kunstwerks zu bestätigen.",
    "Berufsunfähigkeitsversicherung":"Eine Berufsunfähigkeitsversicherung Es bietet eine finanzielle Absicherung im Falle, dass der Versicherungsnehmer durch Krankheit oder Unfall dauerhaft unfähig ist, seinen Beruf auszuüben. In der Regel zahlt der Versicherungsnehmer regelmäßig Prämien an die Versicherungsgesellschaft und im Falle einer Berufsunfähigkeit erhält der Versicherungsnehmer eine monatliche Rente. Die Höhe der Rente und die Bedingungen für die Rentenzahlungen werden im Versicherungsvertrag festgelegt.",
    "Crypto, Hebel Zertifikate":"Kryptowährungen sind digitale Währungen, die auf Kryptographie basieren und dezentralisiert sind. Sie werden oft als alternative Währungen zu traditionellen Währungen wie dem US-Dollar oder dem Euro betrachtet. Einige der bekanntesten Kryptowährungen sind Bitcoin, Ethereum und Ripple.\nHebelzertifikate sind Finanzinstrumente, die es Anlegern ermöglichen, mit einem Hebel (einem bestimmten Faktor) von ihrem eingesetzten Kapital zu profitieren. Das bedeutet, dass Anleger mit einem kleinen Kapital eine größere Position auf einen Basiswert einnehmen können. Hebelzertifikate können sowohl auf Kryptowährungen als auch auf andere Vermögenswerte wie Aktien oder Indizes ausgegeben werden.",
    "Immobilien, Bausparvertrag":"Immobilien sind Grundstücke und Gebäude, die als Anlageobjekt gekauft werden können. Sie können sowohl zur Eigennutzung als auch zur Vermietung genutzt werden und können in Form von Eigentumswohnungen, Häusern oder Gewerbeimmobilien erworben werden. Investitionen in Immobilien gelten als sicher und stabil, können jedoch auch hohe Anfangs- und laufende Kosten sowie eine hohe Verantwortung mit sich bringen.\nEin Bausparvertrag ist eine langfristige Sparform, bei der der Sparer regelmäßig Geld einzahlt und dafür später ein zinsgünstiges Baudarlehen erhält. Der Vertrag besteht aus zwei Phasen: der Ansparphase und der Tilgungsphase. In der Ansparphase zahlt der Sparer regelmäßig einen bestimmten Betrag ein und erhält hierfür eine Prämie. In der Tilgungsphase kann der Sparer das angesparte Kapital in Form eines zinsgünstigen Baudarlehens für die Finanzierung eines Bauvorhabens verwenden. Bauspardarlehen sind in Deutschland und einigen anderen Ländern sehr beliebt und werden oft als eine Art von staatlicher Förderung betrachtet.",
    "Gemeinschaftskonto, Tagesgeldkonto":"Ein Gemeinschaftskonto ist ein Bankkonto, das von mehreren Personen gemeinsam genutzt wird. Es wird oft von Ehepaaren, Geschäftspartnern oder Familienmitgliedern genutzt und ermöglicht es den Inhabern, gemeinsam über das Geld auf dem Konto zu verfügen. Einige Banken erfordern, dass alle Kontoinhaber über das Konto verfügen dürfen, während andere Banken es erfordern, dass alle Kontoinhaber die Zustimmung der anderen Kontoinhaber einholen müssen, bevor sie über das Geld verfügen können.\nEin Tagesgeldkonto ist ein Bankkonto, bei dem das Geld jederzeit ohne Kündigungsfrist verfügbar ist und das täglich verfügbar ist. Es bietet eine höhere Verzinsung als ein normales Girokonto, aber niedriger als ein Festgeldkonto. Tagesgeldkonten eignen sich für Anleger, die ihr Geld jederzeit zur Verfügung haben möchten, aber trotzdem von einer höheren Verzinsung profitieren möchten. Es ist eine flexible und sichere Anlagemöglichkeit.",
    "NFT, Crypto":"NFT, oder non-fungible token, sind digitale Zertifikate, die die Einzigartigkeit und Unveräußerlichkeit eines digitalen Kunstwerks oder anderer digitaler Güter darstellen. NFTs werden auf der Blockchain-Technologie aufgebaut und ermöglichen es Künstlern und Schöpfern, ihre Werke zu monetarisieren und zu verkaufen. NFTs ermöglichen es auch Käufern, die Echtheit und Einzigartigkeit eines digitalen Kunstwerks zu überprüfen und sicherzustellen, dass sie tatsächlich das Original besitzen.\nKryptowährungen sind digitale Währungen, die auf Kryptographie basieren und dezentralisiert sind. Sie werden oft als alternative Währungen zu traditionellen Währungen wie dem US-Dollar oder dem Euro betrachtet. Einige der bekanntesten Kryptowährungen sind Bitcoin, Ethereum und Ripple. Kryptowährungen können verwendet werden, um Waren und Dienstleistungen zu kaufen, als Anlageform oder als Mittel für Zahlungen und Überweisungen im Internet.",
    "Staatsanleihen":"Staatsanleihen, auch als 'Regierungsbindungen' bezeichnet, sind Schuldverschreibungen, die von Regierungen ausgegeben werden, um Geld aufzunehmen. Sie geben dem Anleger das Recht, eine feste Verzinsung und die Rückzahlung des geliehenen Kapitals zu einem festgelegten Zeitpunkt zu erhalten. Staatsanleihen werden in der Regel von Zentralbanken, institutionellen Anlegern und privaten Anlegern gekauft. Sie gelten als eine relativ sichere Anlagemöglichkeit, da sie von Regierungen ausgegeben werden und somit von der Bonität des jeweiligen Landes abhängig sind.",
    "Bausparvertrag, Aktien Sparplan":"Ein Bausparvertrag ist eine langfristige Sparform, bei der der Sparer regelmäßig Geld einzahlt und dafür später ein zinsgünstiges Baudarlehen erhält. Der Vertrag besteht aus zwei Phasen: der Ansparphase und der Tilgungsphase. In der Ansparphase zahlt der Sparer regelmäßig einen bestimmten Betrag ein und erhält hierfür eine Prämie. In der Tilgungsphase kann der Sparer das angesparte Kapital in Form eines zinsgünstigen Baudarlehens für die Finanzierung eines Bauvorhabens verwenden. Bauspardarlehen sind in Deutschland und einigen anderen Ländern sehr beliebt und werden oft als eine Art von staatlicher Förderung betrachtet.\nEin Aktien-Sparplan ist eine regelmäßige Sparform, bei der Anleger regelmäßig einen bestimmten Betrag in Aktien eines Unternehmens oder eines Aktienindexes investieren. Aktien-Sparpläne ermöglichen es Anlegern, automatisch in Aktien zu investieren und so von langfristigen Kurssteigerungen zu profitieren. Sie sind geeignet für Anleger, die langfristig in Aktien investieren möchten und keine großen Summen auf einmal anlegen können oder wollen."
};

let offering_links = {"Girokonto":"https://www.deutsche-bank.de/pk/konto-und-karte/konten-im-ueberblick/konten-im-vergleich.html","Gemeinschaftskonto":"https://service.commerzbank.de/wie-eroeffne-ich-ein-gemeinschaftskonto/​","Kreditkarte":"https://www.commerzbank.de/konten-zahlungsverkehr/produkte/kreditkarten/​","Tagesgeldkonto":"https://service.commerzbank.de/wie-eroeffne-ich-ein-gemeinschaftskonto/","Sparplan":"https://www.deutsche-bank.de/pk/kredit-und-immobilien/eigenheim/bauspar-angebote.html​","Bausparplan":"https://www.deutsche-bank.de/pk/kredit-und-immobilien/eigenheim/bauspar-angebote.html​",
"Edelmetall Depot":"https://www.commerzbank.de/de/hauptnavigation/kunden/kursinfo/sorten_edel/edelmetalle/edelmetall.html​","Aktien Depot":"https://www.deutsche-bank.de/pk/sparen-und-anlegen/geldanlage-online/depot.html​","Aktiensparplan":"https://www.deutsche-bank.de/pk/kredit-und-immobilien/eigenheim/bauspar-angebote.html​","ETF Sparplan":"---","Privatkredit":"https://www.deutsche-bank.de/pk/kredit-und-immobilien/kredit/privatkredit.html​","Umschuldung":"---","Immobilienfinanzierung":"https://www.commerzbank.de/kredit-finanzierung/wissen/baufinanzierung/immobiliensuche/​",
"Immobilien":"https://www.commerzbank.de/kredit-finanzierung/wissen/baufinanzierung/immobiliensuche/​","Hebel Zertifikate":"https://www.commerzbank.de/portal/de/privatkunden/sparen-anlegen/produkte/wertpapiere/zertifikate/zertifikate.html​","Crypto":"https://crypto.com/","Lebensversicherung":"https://www.commerzbank.de/vorsorgen-versichern/produkte/versicherungen/risikolebensversicherung/​","Rentenversicherung":"https://www.commerzbank.de/vorsorgen-versichern/produkte/altersvorsorge/privatrente/​","NFT":"https://crypto.com/","Berufsunfähigkeitsversicherung":"https://www.deutsche-bank.de/pk/versichern-und-vorsorgen/gesundheit-und-pflege/einkommensabsicherung.html​",
"Crypto, Hebel Zertifikate":"https://crypto.com/​","Immobilien, Bausparvertrag":"https://www.commerzbank.de/kredit-finanzierung/wissen/baufinanzierung/immobiliensuche/​","Gemeinschaftskonto, Tagesgeldkonto":"https://service.commerzbank.de/wie-eroeffne-ich-ein-gemeinschaftskonto/​","NFT, Crypto":"https://crypto.com/​","Staatsanleihen":"https://www.deutsche-bank.de/marktdaten/maerkte/anleihen.html/​","Bausparvertrag, Aktien Sparplan":"https://www.deutsche-bank.de/pk/kredit-und-immobilien/eigenheim/bauspar-angebote.html​"};
