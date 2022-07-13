import TicketCard from "../components/TicketCard"

const Dashboard = () => {
    const tickets = [
        {
            category: 'Q2 2022',
            color: 'red',
            title: 'Buildspace DAO Project',
            owner: 'Buildspace',
            avatar: 'https://buildspace.so/_next/image?url=https%3A%2F%2Fcdn.buildspace.so%2Fcourses%2Fjavascript-dao%2Fposter-normal.png&w=1920&q=75',
            status: 'Yet to start',
            priority: 8,
            progress: 30,
            description: 'The no-code DAO making course',
            timestamp: '2022-06-11T09:42:12+0000'
        },
        {
            category: 'Q3 2022',
            color: 'blue',
            title: 'Buildspace Flow Chain NFT Project',
            owner: 'Buildspace',
            avatar: 'https://buildspace.so/_next/image?url=https%3A%2F%2Fcdn.buildspace.so%2Fcourses%2Fflow-nft%2Fposter-normal.png&w=1920&q=75',
            status: 'Yet to start',
            priority: 2,
            progress: 10,
            description: 'Learn Cadence and build an NFT collection on Flow! This is a short and async weekend project for curious devs that want to get started on Flow.',
            timestamp: '2022-08-11T19:42:12+0000'
        },
    ];

    const uniqueCategories = [
        ...new Set(tickets?.map(({category}) => category))
    ]
    console.log(uniqueCategories);
    return (
        <div className="dashboard">
            <h1>My Projects</h1>
            <div className="ticket-container">
                <TicketCard />
            </div>
        </div>
    );
}

export default Dashboard;