import axios from "axios"
import TicketCard from "../components/TicketCard"
import CategoriesContext from "../context";
import { useState, useEffect, useContext } from "react";

const Dashboard = () => {
    // const tickets = [
    //     {
    //         category: 'Q2 2022',
    //         title: 'Buildspace DAO Project',
    //         owner: 'Buildspace',
    //         avatar: 'https://buildspace.so/_next/image?url=https%3A%2F%2Fcdn.buildspace.so%2Fcourses%2Fjavascript-dao%2Fposter-normal.png&w=1920&q=75',
    //         status: 'Yet to start',
    //         priority: 8,
    //         progress: 30,
    //         description: 'The no-code DAO making course',
    //         timestamp: '2022-06-11T09:42:12+0000'
    //     },
    //     {
    //         category: 'Q2 2022',
    //         title: 'Buildspace Flow Chain NFT Project',
    //         owner: 'Buildspace',
    //         avatar: 'https://buildspace.so/_next/image?url=https%3A%2F%2Fcdn.buildspace.so%2Fcourses%2Fflow-nft%2Fposter-normal.png&w=1920&q=75',
    //         status: 'Yet to start',
    //         priority: 2,
    //         progress: 10,
    //         description: 'Learn Cadence and build an NFT collection on Flow! This is a short and async weekend project for curious devs that want to get started on Flow.',
    //         timestamp: '2022-05-11T19:42:12+0000'
    //     },
    //     {
    //         category: 'Q3 2022',
    //         title: 'Buildspace Flow Chain NFT Project',
    //         owner: 'Buildspace',
    //         avatar: 'https://buildspace.so/_next/image?url=https%3A%2F%2Fcdn.buildspace.so%2Fcourses%2Fflow-nft%2Fposter-normal.png&w=1920&q=75',
    //         status: 'Yet to start',
    //         priority: 2,
    //         progress: 10,
    //         description: 'Learn Cadence and build an NFT collection on Flow! This is a short and async weekend project for curious devs that want to get started on Flow.',
    //         timestamp: '2022-08-11T19:42:12+0000'
    //     },
    // ];

    const [tickets, setTickets] = useState([])
    const { categories, setCategories } = useContext(CategoriesContext)

    useEffect(() => {
        const func = async () => {
            const response = await axios.get('http://localhost:8000/tickets')
            const dataObject = response.data.data;
            const arrOfKeys = Object.keys(dataObject)
            const arrOfValues = Object.values(dataObject)
            console.log(dataObject, arrOfKeys, arrOfValues)

            const formattedArray = []
            arrOfKeys.forEach((key, index) => {
                const formattedData = {...arrOfValues[index]}
                formattedData['documentId'] = key
                formattedArray.push(formattedData);
            })

            setTickets(formattedArray)
        }
        func();
    }, [])

    useEffect(() => {
        setCategories([...new Set(tickets?.map(({category}) => category))])
    }, [tickets])

    // const uniqueCategories = [
    //     ...new Set(tickets?.map(({category}) => category))
    // ]

    const colors = [
        'rgb(255, 186, 186)',
        'rgb(255, 223, 186)',
        'rgb(255, 255, 186)',
        'rgb(186, 255, 201)',
        'rgb(186, 255, 255)',
    ]
    
    return (
        <div className="dashboard">
            <h1>My Projects</h1>
            <div className="ticket-container">
                {tickets && categories?.map((uniqueCategory, categoryIndex) => (
                    <div key={categoryIndex}>
                        <h3>{uniqueCategory}</h3>
                        {
                            tickets.filter(ticket => ticket.category === uniqueCategory).map((filteredTicket, ticketIndex) => {
                                // console.log('dbg1', uniqueCategory, categoryIndex, filteredTicket, ticketIndex, tickets.length)
                                return (
                                <TicketCard 
                                    id={ticketIndex} 
                                    color={colors[categoryIndex % colors.length]} 
                                    ticket={filteredTicket}
                                />
                            )})
                        }
                    </div>
                ))}
                <TicketCard />
            </div>
        </div>
    );
}

export default Dashboard;