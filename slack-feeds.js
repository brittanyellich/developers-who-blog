const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');

const csvFilePath = path.join(__dirname, 'developersrss.csv');
const companiesCsvFilePath = path.join(__dirname, 'companiesrss.csv');

async function getFeedsFromCsv(filePath) {
    return new Promise((resolve, reject) => {
        const feeds = [];
        fs.createReadStream(filePath).pipe(csv())
            .on('data', (row) => {
                feeds.push(row);
            })
            .on('end', () => {
                resolve(feeds);
            })
            .on('error', (err) => {
                reject(err);
            });
    });
}

async function main() {
    console.log("DEVELOPER FEEDS")
    const feeds = await getFeedsFromCsv(csvFilePath);
    for (const feed of feeds) {
        console.log(`/feed subscribe ${feed.RssLink}`)
    }

    console.log("COMPANY FEEDS")
    const companyFeeds = await getFeedsFromCsv(companiesCsvFilePath);
    for (const feed of companyFeeds) {
        console.log(`/feed subscribe ${feed.RssLink}`)
    }
}


main()