import React, { useState } from 'react';
import Header from "./components/Header";
import MainContent from "./components/MainContent";

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

function App() {

    const [ loading, setLoading ] = useState(false);

    return (
        <div className="App">
            <Header loading={loading}></Header>
            <MainContent onLoadingChange={(isLoading: boolean) => setLoading(isLoading)}></MainContent>
        </div>
    );
}

export default App;
