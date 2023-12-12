import type { RequestHandler } from './$types';
import { NEWS_API_KEY, PALM_API_KEY } from '$env/static/private'
import { TextServiceClient } from "@google-ai/generativelanguage"
import { GoogleAuth } from "google-auth-library"


export const GET: RequestHandler = async ( {params, url}) => {
    const options: ResponseInit =  {
        status: 200,
    }
    let news_key = NEWS_API_KEY
    let palm_key = PALM_API_KEY

    ;
    ;
    const MODEL_NAME = "models/text-bison-001";

    
    // let locations = await fetch(`http://127.0.0.1:8000/api/location?text=` + JSON.stringify(await query)).then((res) => res.json());
    // console.log(locations)

    const client = new TextServiceClient({
    authClient: new GoogleAuth().fromAPIKey(palm_key),
    });

    const text = `You will be given a information about a new story that comes in the following format: "Title: title of the news story, Description: a brief description of the news story, Content: the beginning of the news story, truncated at 200 characters" Your job is to identify the most likely location that the news story is concerning, such as the country, state, or city. Try to be as specific as possible. Then, provide the approximate latitude and longitude coordinates of the location identified. Output the results in the following format: "Location: the location identified, Latitude: the latitude coordinate of the location, Longitude: the longitude coordinate of the location"`
    
    const examples = [
        {
            input: {
                content: `Title: 2 seriously injured after SUV crash in Leesburg, Description: Parts of southbound Battlefield Parkway were closed Saturday evening while officials investigated the scene and cleanup took place.  Police in Leesburg say they are continuing the investigation and ask anyone with information to contact Officer M. Hackney at 703-771-4515 or by emailing mhackney@leesburgva.gov., Content : Police in Leesburg, Virginia, say two adults were seriously injured on Saturday evening after a vehicle struck a light pole and caught fire along Battlefield Parkway.  Officers responded to reports of the collision at around 5:30 p.m., according to a news release.`
            },
            output: {
                content: `Location: Lessburg, Virginia, Latitude: 39.09878142324659, Longitude: -77.52712206322721`
            }
        },
        {
            input: {
                content: `Title: Japanese tech giant Rakuten plans to launch proprietary AI model within next two months, Description: Rakuten, the fintech-to-e-commerce giant, plans to launch its own large language model within the next two months, CEO Hiroshi “Mickey” Mikitani, told CNBC., Content: Japan’s Rakuten plans to launch its own artificial intelligence language model within the next two months, its CEO told CNBC in an interview that aired Monday.It comes as the fintech-to-e-commerce giant looks to join other technology firms developing the rapidly growing technology.`
            },
            output: {
                content: `Location: Tokyo, Japan, Latitude: 35.613083664564435, Longitude: 139.6310797595144`
            }
        },
        {
            input: {
                content: `Title: Taylor Swift eyes down Bills players ahead of Chiefs game, Description: Taylor Swift appeared at Arrowhead Stadium to support her boyfriend, Travis Kelce, as the team took on the Buffalo Bills on Sunday, and before the network cameras got to see her in the suite, it was the Buffalo Bills who got the first look. Content: NFL Network’s James Palmer was in the Bills’ tunnel as the team prepared to go out on the field. Trailing behind them, clomping down the ramp, was Swift. She was in a black pea coat and a sweater, hoping to see the Chiefs get back in the win column.`
            },
            output: {
                content: `Location: Kansas City, Missouri, Latitude: 39.049180629243466, Longitude: -94.4838942613914`
            }
        },
        {
            input: {
                content: `Title: Montgomery Co. teacher on leave for pro-Palestinian email signature, complaint alleges, Description: A filing from the Council on American Islamic Relations released Friday alleges that another Montgomery County, Maryland, teacher has been placed on leave after expressing support for Palestinians during the ongoing Israel-Hamas war., Content: The organization says that Hajur El-Haggan, a teacher at Argyle Middle School who identifies as Muslim and is of Egyptian national origin, was placed on leave for a quote included in her email signature.“From the river to the sea, Palestine will be free,” El-Haggan’s signature reads, according to the complaint to the Equal Employment Opportunity Commission.`
            },
            output: {
                content: `Location: Silver Spring, Maryland, Latitude: 39.08979480828748, Longitude: -77.04887038952681`
            }
        },
        {
            input: {
                content: `Title: Iowa man arrested in the death of a Nebraska priest, Description: He was assaulted “during an invasion at the rectory,” archdiocese says., Content: OMAHA, Neb. -- A man has been arrested in the stabbing death of a Catholic priest who was attacked over the weekend in a church rectory in a small Nebraska community, authorities said.`
            },
            output: {
                content: `Location: Fort Calhoun, Nebraska, Latitude: 41.4587843307788, Longitude: -96.02456776356534`
            }
        },
    ]
    let query = await fetch(`https://newsapi.org/v2/top-headlines?apiKey=${news_key}&language=en`).then((res) =>res.json()).then(async (res) => {
        for (let i = 0; i < res.articles.length; i++) {
            let article = res.articles[i];
            article.locations = await client.generateText({
                // required, which model to use to generate the result
            model: MODEL_NAME,
            // optional, 0.0 always uses the highest-probability result
            temperature: 1,
            // optional, how many candidate results to generate
            candidateCount: 1,
            // optional, safety settings
            // safetySettings: [{"category":"HARM_CATEGORY_DEROGATORY","threshold":"BLOCK_NONE"},{"category":"HARM_CATEGORY_TOXICITY","threshold":"BLOCK_NONE"},{"category":"HARM_CATEGORY_VIOLENCE","threshold":"BLOCK_NONE"},{"category":"HARM_CATEGORY_SEXUAL","threshold":"BLOCK_NONE"},{"category":"HARM_CATEGORY_MEDICAL","threshold":"BLOCK_NONE"},{"category":"HARM_CATEGORY_DANGEROUS","threshold":"BLOCK_NONE"}],
            safetySettings: [{"category":"HARM_CATEGORY_DEROGATORY","threshold":"BLOCK_ONLY_HIGH"},{"category":"HARM_CATEGORY_TOXICITY","threshold":"BLOCK_ONLY_HIGH"},{"category":"HARM_CATEGORY_VIOLENCE","threshold":"BLOCK_ONLY_HIGH"},{"category":"HARM_CATEGORY_SEXUAL","threshold":"BLOCK_ONLY_HIGH"},{"category":"HARM_CATEGORY_MEDICAL","threshold":"BLOCK_ONLY_HIGH"},{"category":"HARM_CATEGORY_DANGEROUS","threshold":"BLOCK_ONLY_HIGH"}],
            prompt: {
                text: `${text}\nComplete this task for the following news story:\nTitle: ${article.title}, Description: ${article.description}, Content: ${article.content}`,
            },
            })
            if (article.locations[0].candidates.length  == 0) {
                res.articles.splice(i, 1);
            }
            else if (article.locations[0].candidates[0].output.split(": ")[4] in ["None", "0"]) {
                res.articles.splice(i, 1);
            }
        }
        return res
    }).then((res) => {return JSON.stringify(res, null, 2)})


    return new Response(JSON.stringify(await query), options)
};