import React from 'react'
import './Pagination.css'

export default function Pagination() {
    return (
        <div className="pagination">  
            <ul className="pagination-list">
                <li className="pagination-list-item icon">
                    <a href="#">Previous</a>
                </li>
                <li className="pagination-list-item"><a href="#">1</a></li>
                <li className="pagination-list-item"><a href="#">2</a></li>
                <li className="pagination-list-item"><a href="#">3</a></li>
                <li className="pagination-list-item"><a href="#">4</a></li>
                <li className="pagination-list-item"><a href="#">5</a></li>
                <li className="pagination-list-item"><a href="#">6</a></li>
                <li className="pagination-list-item"><a href="#">7</a></li>
                <li className="pagination-list-item"><a href="#">8</a></li>
                <li className="pagination-list-item"><a href="#">9</a></li>
                <li className="pagination-list-item"><a href="#">10</a></li>
                <li className="pagination-list-item icon">
                    <a href="#">Next</a>
                </li>
            </ul>
        </div>
    )
}
