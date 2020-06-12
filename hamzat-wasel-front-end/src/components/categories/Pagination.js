import React, { Component } from 'react';

export class Pagination extends Component {
    render() {
        const { per_page, total, paginate, nextPage, prevPage, last_page, current_page} = this.props;

        const pageNumbers = [];

        for (let i = 1; i <= Math.ceil(total / per_page); i++) {
            pageNumbers.push(i);
        }

        return (
            <nav>
                <ul className="pagination justify-content-center">
                    <li className="page-item">
                        <button className="page-link"  onClick={() => prevPage()}>Previous</button>
                    </li>
                    {pageNumbers.map(num => (
                        <li className="page-item" key={num}>
                            <button onClick={() => paginate(num)}  className="page-link">{num}</button>
                        </li>
                    ))}
                    <li className="page-item">
                        <button className="page-link" onClick={() => nextPage()}>Next</button>
                    </li>
                </ul>
            </nav>
        )
    }
}

export default Pagination;