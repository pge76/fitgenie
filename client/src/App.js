import React from "react";

// We use Route in order to define the different routes of our application
import { Route, Routes } from "react-router-dom";

import MainMenu from "./components/mainmenu";
import ExerciseList from "./components/exerciseList";
import Plan from "./components/plan";
import Create from "./components/create";
import Empty from "./components/empty";
import { Container } from 'react-bootstrap';

const App = () => {
    return (
        <div>
            <MainMenu />
            <Container>
                <Routes>
                    <Route exact path="/" element={< Empty />} />
                    <Route exact path="/exercises" element={<ExerciseList />} />
                    <Route exact path="/plans" element={<Plan />} />
                    <Route path="/create" element={<Create />} />
                </Routes>
            </Container >
        </div>
    );
};

export default App;