import SSContentDetail from './SSContentDetail.js';
import SSContentList from './SSContentList.js';
import React from 'react';
import SSContentUpdate from './SSContentUpdate.js';


const SSManageContent = () =>{
    return(
        <div>
            <h1>hellooo</h1>
            <SSContentList/>
            <SSContentDetail/>
            <SSContentUpdate/>
        </div>
    );
}

export default SSManageContent;