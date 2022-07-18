import axios from 'axios';

const DeleteBlock = ({ documentId }) => {
    const localhost = process.env.REACT_APP_LOCALHOST_URL
    const deleteTicket = async () => {
        const response = await axios.delete(`${localhost}/tickets/${documentId}`);
        const success = (response.status === 200);
        if (success) window.location.reload()
    }

    return (
        <div className="delete-block">
            <div className="delete-icon" onClick={deleteTicket}>✖</div>
        </div>
    );
}

export default DeleteBlock;