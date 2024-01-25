import type { RequestHandler } from './$types';
import { PB_PASS } from '$env/static/private'
import PocketBase from 'pocketbase';


export const GET: RequestHandler = async () => {
    console.log("test")
    function sleep(ms: number) {
        return new Promise(resolve => setTimeout(resolve, ms));
      }
    const options: ResponseInit =  {
        status: 200,
    }

    const pb = new PocketBase('http://127.0.0.1:8090'); 
    let pw = PB_PASS
    const authData = await pb.admins.authWithPassword('stevenwang770@gmail.com', pw);
    

    let urls = await pb.collection("news").getFullList({
        fields: "url"
    })
    urls = urls.map( function (item) { return item.url })

    // console.log(urls)

    let locations = await fetch('http://localhost:5173/api/location').then((res) => res.json());
    

    for (const article of JSON.parse(locations).articles) {
        if (!(urls.includes(article.url))) {
            const data = {
                "url": article.url, 
                "location": article.locations[0].candidates[0].output,
                "title": article.title,
                "description": article.description,
                "content": article.content,
                "urlToImage": article.urlToImage
            }
            const record = await pb.collection('news').create(data)
        }
    }

    sleep(600000).then(() => {fetch(`http://localhost:5173/api/test/`)})
    return new Response("hello", options);
};