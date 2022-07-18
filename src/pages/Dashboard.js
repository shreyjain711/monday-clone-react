import axios from "axios"
import TicketCard from "../components/TicketCard"
import CategoriesContext from "../context";
import { useState, useEffect, useContext } from "react";

const Dashboard = () => {
    const [tickets, setTickets] = useState([])
    const { categories, setCategories } = useContext(CategoriesContext)
    const localhost = process.env.REACT_APP_LOCALHOST_URL

    useEffect(() => {
        const func = async () => {
            const response = await axios.get(`${localhost}/tickets`)
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