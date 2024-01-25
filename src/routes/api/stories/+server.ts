import type { RequestHandler } from './$types';
import PocketBase from 'pocketbase';
import { PB_PASS } from '$env/static/private'



export const GET: RequestHandler = async () => {
    const options: ResponseInit =  {
        status: 200,
    }

    const pb = new PocketBase('http://127.0.0.1:8090'); 
    let pw = PB_PASS
    const authData = await pb.admins.authWithPassword('stevenwang770@gmail.com', pw);
    console.log("stories");

    const records = await pb.collection('news').getList();
    const stories = records.items

    return new Response(JSON.stringify(stories), options);
};