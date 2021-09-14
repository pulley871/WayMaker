

export const ApplicationsList = ({application}) => {


    return (<>
                    <tr>
                        <td>{application.user.name}</td>
                        <td>{application.user.email}</td>
                        <td>{application.user.address} || {application.user.zipCode}</td>
                        <td>{application.user.instrument}</td>
                        <td>{application.description}</td>
                    </tr>
    
    
     </>)
}