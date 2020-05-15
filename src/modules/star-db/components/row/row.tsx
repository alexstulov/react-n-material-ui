import React from 'react';
import './row.css';

const Row = ({ left, right }: { left: React.ReactNode, right: React.ReactNode }) => {
    return (
        <div className="row mb-2">
            <div className="col-md-6">{left}</div>
            <div className="col-md-6">{right}</div>
        </div>
    );
};

export default Row;