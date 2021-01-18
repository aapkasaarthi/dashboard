let storage;

async function init(accounts) {

    document.getElementById("userAddress").innerText = trimAdd(accounts[0]);

    web3.getBalance(accounts[0]).then((balance)=>{
        document.querySelector("#userBalance").innerText = cleanWei(balance)+" ETH";
    })

    refreshUI();
}

async function refreshUI(){

    showAccessors()
    setup3Box(web3.provider).then(()=>{
        showStoredFiles();
    });

    storage = IpfsHttpClientLite({apiUrl: 'https://ipfs.infura.io:5001'})

    $("#ipfsFile").on("change", function() {
        var reader = new FileReader();
        reader.onload = function (e) {
            console.log("Uploading")
            await injectScript('./js/lib/buffer@5.2.1.js');
            const magic_array_buffer_converted_to_buffer = buffer.Buffer(reader.result);
            storage.add(magic_array_buffer_converted_to_buffer, (err, result) => {
                console.log(err, result);
                if (!err){
                    sendIPFSPinningRequests(result[0].hash);
                    storeFile(result[0].hash);
                    // setTimeout(window.location.reload, 20000);
                }
                else{
                    console.log(err);
                }
            })
        }
        reader.readAsArrayBuffer(this.files[0]);
    })
}

async function showStoredFiles(){

    const getHtml = (title = "", text = "", data) => {
        return `
        <a class='vacancy-item' href="https://ipfs.io/ipfs/${data}" target="blank"> \
        <div class='vacancy-title'>${title}</div> \
        <div class='vacancy-text'>${text}</div> \
        <div class='vacancy-arrow'> \
        <svg xmlns='http://www.w3.org/2000/svg' width='8' height='12' viewBox='0 0 8 12'> \
            <polygon points='0 10.59 4.58 6 0 1.41 1.41 0 7.41 6 1.41 12'></polygon> \
        </svg> \
        </div> \
        </a> \
        `
    };

    let nodeListElement = document.getElementById('fileList');
    const fileList = await space.private.get('files');
    console.log(fileList);
    if (Boolean(fileList)===true){
        fileList.forEach((file)=>{
            nodeListElement.innerHTML += getHtml(trimhash(file),'Click to download', file);
        });
        document.querySelector('#tasksTitle').innerText = 'Here are your stored files.';
    }
    else {
        document.querySelector('#tasksTitle').innerText = 'No files found.';
    }
}

async function showAccessors(){
    let query = `
    {
        approvals(where: {from:"0x707ac3937a9b31c225d8c240f5917be97cab9f20", state:true}) {
          to
        }
      }
    `;

    const getHtml = (add = "", text = "") => {
        return `
        <a class='vacancy-item' onclick="openInExplorer('${add}')"> \
        <div class='vacancy-title'>${trimAdd(add)}</div> \
        <div class='vacancy-text'>${text}</div> \
        <div class='vacancy-arrow'> \
        <svg xmlns='http://www.w3.org/2000/svg' width='8' height='12' viewBox='0 0 8 12'> \
            <polygon points='0 10.59 4.58 6 0 1.41 1.41 0 7.41 6 1.41 12'></polygon> \
        </svg> \
        </div> \
        </a> \
        `
    };

    querySubgraph(query).then((response)=>{
        console.log(response);
        response.approvals.forEach(approval => {
            document.querySelector('#allowed').innerHTML += getHtml(approval.to,'Can Access');;
        });
    })
    .catch((err)=>{
        // console.error(err);
        handleError(err);
    })
}
