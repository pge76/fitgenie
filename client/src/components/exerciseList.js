import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Row, Col, FormCheck } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { BsPencilSquare, BsTrash } from "react-icons/bs";

const Exercise = (props) => (
    <tr>
        <td>{props.exercise.name}</td>
        <td>{props.exercise.weight}</td>
        <td>{props.exercise.difficulty}</td>
        <td>{props.exercise.exerciseType}</td>
        <td>{props.exercise.mainMuscleGroup}</td>
        <td>{props.exercise.durationPerRep}|{props.exercise.repetitionPerSet}|{props.exercise.setsPerExercise}</td>
        <td><FormCheck
            name="goal"
            checked={props.exercise.goal}
            readOnly={true}
            disabled={true}
        /></td>
        <td><FormCheck
            name="doublesided"
            checked={props.exercise.doubleSided}
            readOnly={true}
            disabled={true}
        /></td>
        <td>
            <LinkContainer to={"/edit/" + props.exercise._id}>
                <Button className="btn btn-success"><BsPencilSquare /></Button>
            </LinkContainer>
            <Button className="btn btn-danger" onClick={() => {
                props.deleteExercise(props.exercise._id);
            }}><BsTrash /></Button>
        </td>
    </tr >
);

export default function ExerciseList() {
    const [exercises, setExercises] = useState([]);

    async function getExercises() {
        const response = await fetch(`http://localhost:5000/exercise/`);

        if (!response.ok) {
            const message = `An error occurred: ${response.statusText}`;
            window.alert(message);
            return;
        }

        const exercises = await response.json();
        setExercises(exercises);
    }

    useEffect(() => {
        getExercises();
    }, [exercises.length]);

    // This method will delete a record
    async function deleteExercise(id) {
        await fetch(`http://localhost:5000/exercise/${id}`, {
            method: "DELETE"
        });

        const newExercises = exercises.filter((el) => el._id !== id);
        setExercises(newExercises);
    }

    async function resetDatabase() {
        await fetch(`http://localhost:5000/reset`, {
            method: "GET"
        });

        getExercises();
    }

    // This method will map out the records on the table
    function exerciseList() {
        return exercises.map((exercise) => {
            return (
                <Exercise
                    exercise={exercise}
                    deleteExercise={() => deleteExercise(exercise._id)}
                    key={exercise._id}
                />
            );
        });
    }

    // This following section will display the table with the records of individuals.
    return (
        <div>
            <h3>Exercise List</h3>
            <Row>
                <Col>
                    <table className="table table-dark table-striped" style={{ marginTop: 20 }}>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Weight</th>
                                <th>Difficulty</th>
                                <th>Exercisetype</th>
                                <th>Main Musclegroup</th>
                                <th>Trainingset</th>
                                <th>Goal</th>
                                <th>Doublesided</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>{exerciseList()}</tbody>
                    </table>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Link className="btn btn-primary" to="/create">Create</Link>
                </Col>
                <Col>
                    <Button className="btn btn-danger" onClick={() => { resetDatabase() }}>Reset Database</Button>
                </Col>
            </Row>
        </div>
    );
}