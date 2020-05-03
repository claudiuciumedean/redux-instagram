import React from 'react';
import { Link } from 'react-router';

const Wrapper = (props) => (
    <main>
        <a href="/view/post" className="post-photo">Post a photo!</a>
        <h1><Link to='/'>Snapstagram</Link></h1>
        {React.cloneElement(props.children, props)}
    </main>
);

export default Wrapper;