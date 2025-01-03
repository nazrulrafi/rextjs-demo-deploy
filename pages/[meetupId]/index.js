import { MongoClient, ObjectId } from 'mongodb';
import MeetupDetail from '../../components/meetups/MeetupDetail';

function MeetupDetails(props) {
    return (
        <MeetupDetail
            image={props.meetupData.image}
            title={props.meetupData.title}
            address={props.meetupData.address}
            description={props.meetupData.description}
        />
    );
}

export async function getStaticPaths() {
    const client = await MongoClient.connect(
        'mongodb+srv://nazrulrafi:nJhGdosohk5s2kkZ@cluster0.1cyjj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
    );
    const db = client.db();
    const meetupsCollection = db.collection('meetups');

    const meetups = await meetupsCollection.find({}, { _id: 1 }).toArray();

    client.close();

    return {
        fallback: 'blocking', // Make sure the page is blocked until all static pages are built
        paths: meetups.map((meetup) => ({
            params: { meetupId: meetup._id.toString() },
        })),
    };
}

export async function getStaticProps(context) {
    const meetupId = context.params.meetupId;

    const client = await MongoClient.connect(
        'mongodb+srv://nazrulrafi:nJhGdosohk5s2kkZ@cluster0.1cyjj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
    );
    const db = client.db();
    const meetupsCollection = db.collection('meetups');

    const selectedMeetup = await meetupsCollection.findOne({
        _id: new ObjectId(meetupId),
    });

    client.close();

    if (!selectedMeetup) {
        return {
            notFound: true, // Return a 404 if the meetup is not found
        };
    }

    return {
        props: {
            meetupData: {
                id: selectedMeetup._id.toString(),
                title: selectedMeetup.title,
                address: selectedMeetup.address,
                image: selectedMeetup.image,
                description: selectedMeetup.description,
            },
        },
    };
}

export default MeetupDetails;
