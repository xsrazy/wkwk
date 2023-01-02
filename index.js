const fetch = require('node-fetch');
const FormData = require('form-data');
const ethers = require('ethers');
const { faker } = require('@faker-js/faker');


const generateIndoName = () => {
    const randomName = faker.name.findName().toLowerCase();
    const random1 = faker.word.adjective().toLowerCase();
    const random2 = faker.word.adverb().toLowerCase();
    return random2.replace(/\s/g, "").toLowerCase() + randomName.replace(/\s/g, "")
};

const cookieHelpers = (arrayCookie) => {
    let newCookie = '';
    for (let index = 0; index < arrayCookie.length; index++) {
        const element = arrayCookie[index];
        if (index < arrayCookie.length - 1) {
            newCookie += element.split(';')[0] + '; ';
        } else {
            newCookie += element.split(';')[0];
        }

    }
    return newCookie
};

const getCookie = (reff) => new Promise((resolve, reject) => {
    fetch('https://temzu.com/airdrop?'+reff, {
        headers: {
            'authority': 'temzu.com',
            'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
            'accept-language': 'id-ID,id;q=0.9',
            'sec-ch-ua': '"Not?A_Brand";v="8", "Chromium";v="108", "Google Chrome";v="108"',
            'sec-ch-ua-mobile': '?0',
            'sec-ch-ua-platform': '"macOS"',
            'sec-fetch-dest': 'document',
            'sec-fetch-mode': 'navigate',
            'sec-fetch-site': 'none',
            'sec-fetch-user': '?1',
            'upgrade-insecure-requests': '1',
            'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36'
        }
    })
        .then(res => {
            const cookie = cookieHelpers(res.headers.raw()['set-cookie']);
            resolve(cookie)
        })
        .catch(err => reject(err))

});

const get = (address, nickname, cookie, reff) => new Promise((resolve, reject) => {
    console.log(address, nickname)
    var form = new FormData();
    form.append('waddress', address);
    form.append('nickname', nickname);
    form.append('mpassw', 'Coegsekali1');
    form.append('gsmtype', 'airdrop');

    fetch('https://temzu.com/cpubot.php', {
        method: 'POST',
        headers: {
            'authority': 'temzu.com',
            'accept': '*/*',
            'accept-language': 'id-ID,id;q=0.9',
            'origin': 'https://temzu.com',
            'referer': 'https://temzu.com/airdrop?'+reff,
            'sec-ch-ua': '"Not?A_Brand";v="8", "Chromium";v="108", "Google Chrome";v="108"',
            'sec-ch-ua-mobile': '?0',
            'sec-ch-ua-platform': '"macOS"',
            'sec-fetch-dest': 'empty',
            'sec-fetch-mode': 'cors',
            'sec-fetch-site': 'same-origin',
            'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36',
            'x-requested-with': 'XMLHttpRequest',
            'cookie': cookie
        },
        body: form
    })
        .then(res => res.text())
        .then(res => resolve(res))
        .catch(err => reject(err))

});

(async () => {
    const reffMu = 'xsrazy'
    while(true){
        const getCookieResult = await getCookie(reffMu);
        const name = generateIndoName();
        const wallet = ethers.Wallet.createRandom()
        const getResult = await get(wallet.address, name, getCookieResult, reffMu);
        console.log(getResult)
    }
    

})();
