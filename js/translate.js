async function translate(data="hello",to = "hi"){
    const supported_codes=["ar","bn","gu","hi","kn","ml","pa","sd","ta","te","ur"];
    if ( (supported_codes.includes(to.toLowerCase())) == false)
        return data;
    // https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=hi&dt=t&q=hello
    let url = "https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl="+to+"&dt=t&q="+data;
    // let url = `https://an-translate.azurewebsites.net/api/translate?to=${to}&data=${data}`;

    let respData = fetch(url, {
        method: 'GET',
        mode: "no-cors",
        headers: { 'Content-Type': 'application/json' }
    })
    .then((response) => {
        let data = response.json();
        if (data[0][0] != null)
            return data[0][0][0]
    })
    .catch((error) => {
        console.error('Error:', error);
        return data;
    });

    return respData;
}

let backupNodeValues = [];

function nativeTreeWalker() {
    var walker = document.createTreeWalker(
        document.body,
        NodeFilter.SHOW_TEXT,
        null,
        false
    );

    var node;
    var textNodes = [];

    while(node = walker.nextNode()) {
        textNodes.push(node);
    }
    return textNodes;
}

function backupTranslation(){
    var walker = document.createTreeWalker(
        document.body,
        NodeFilter.SHOW_TEXT,
        null,
        false
    );

    var node;

    while(node = walker.nextNode()) {
        backupNodeValues.push(node.textContent);
    }
}

function restoreBackupTranslation(){
    let nodes = nativeTreeWalker();
    for(var i=0; i<nodes; i++) {
        nodes.textContent = backupNodeValues[i];
    }
}

async function translatePage(_to = "hi"){
    let data = nativeTreeWalker();
    data.forEach(async (node)=>{
        if (node.textContent.trim() != ''){
            node.textContent = await translate(node.textContent.trim(), _to);
        }
    })
}
