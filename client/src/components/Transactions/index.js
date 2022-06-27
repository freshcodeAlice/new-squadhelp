import React from 'react';


const Transations = (props) => {

    const {data} = props;


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
                    {/* {data && data.map(transObject => {

                    })} */}
                </thead>
            </table>
        </div>
    )
}

export default Transations