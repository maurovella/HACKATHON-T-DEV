export default function Error({type, message}) {
    
    switch (type) {
        case 'Project_Error':
            message = 'Error while trying to fetch the Project'
        default:
            message = message || "Error Occurred While Getting Data";
    }
        

    return (
        <div className="section section-center text-center">
            <h2>{message}</h2>
        </div>
    )
}