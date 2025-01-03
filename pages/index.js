import MeetupList from "../components/meetups/MeetupList";
import {MongoClient} from "mongodb";


export default function HomePage(props) {
    return (
         <MeetupList meetups={props.meetups} />
    )
}


export async function getStaticProps() {
    const client = await MongoClient.connect("mongodb+srv://nazrulrafi:nJhGdosohk5s2kkZ@cluster0.1cyjj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");
    const db = client.db();
    const meetupsCollection = db.collection('meetups');
    const meetups = await meetupsCollection.find().toArray();
    client.close();
    return {
        props:{
            meetups: meetups.map((meetup)=>(
                {
                    title:meetup.title,
                    image:meetup.image,
                    address:meetup.address,
                    id:meetup._id.toString()
                }
            ))
        },
        revalidate: 10
    }
}

















