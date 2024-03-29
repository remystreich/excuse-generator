
async function submitChoice() {
    let choice = document.getElementById('choice').value
    let logArea = document.getElementById('result')
    logArea.className = "text-black fs-3"
    if (choice == ""){
        logArea.innerHTML = "Sélectionnez un motif"
        logArea.className = "text-danger fs-2 fw-bold"
    }
    else {
    let excuses = await fetch(`https://excuser-three.vercel.app/v1/excuse/${choice}`)
    excuses = await excuses.json()
    
    const url = 'https://google-translate1.p.rapidapi.com/language/translate/v2';
    const options = {
        method: 'POST',
        headers: {
            'content-type': 'application/x-www-form-urlencoded',
            'Accept-Encoding': 'application/gzip',
            'X-RapidAPI-Key': '3f39adb57emsh5054d6959be2cc8p19e6dejsnd6ba520cf234',
            'X-RapidAPI-Host': 'google-translate1.p.rapidapi.com'
        },
        body: new URLSearchParams({
            q: excuses[0].excuse,
            target: 'fr',
            source: 'en'
        })
    };
    
    try {
        const response = await fetch(url, options);
        const result = await response.json();
        console.log(result);
        logArea.innerHTML = result.data.translations[0].translatedText
    } catch (error) {
        console.error(error);
        logArea.innerHTML = excuses[0].excuse
    }
}
}


