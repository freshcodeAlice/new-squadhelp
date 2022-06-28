import React from 'react';


const Transations = (props) => {

    const {data} = props;

    const tableBody = data ? data.map(({date, title, status, amount}) => {
        return (
            <tr>
                <td>{date}</td>
                <td>{title}</td>
                <td>{status}</td>
                <td>{amount}</td>
            </tr>
        )
    }) : "There is no transactions here";


    return (
        <div>
            <table>
                <thead>
                    <th>
                        <td>
                            Transaction Date
                        </td>
                        <td>
                            Contest
                        </td>
                        <td>
                            Income/expence
                        </td>
                        <td>
                            Transaction Amount
                        </td>
                    </th>
                </thead>
                <tbody>
                    {tableBody}
                </tbody>
            </table>
        </div>
    )
}

export default Transations