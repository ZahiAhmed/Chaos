import './ServerCard.css'

const ServerCard = ({server}) => {
    return (
        <div className="server-card">
            <h3>{server.serverName}</h3>
        </div>
    )
}

export default ServerCard;