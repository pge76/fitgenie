import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Row, Col, Form, ToggleButton, ToggleButtonGroup, InputGroup } from 'react-bootstrap';

export default function Create() {
    const [form, setForm] = useState({
        name: "",
        weight: "",
        difficulty: "easy",
        exerciseType: "warmup",
        mainMuscleGroup: "all",
        durationPerRep: "1",
        repetitionPerSet: "1",
        setsPerExercise: "1",
        doubleSided: false,
        goal: false,
        description: ""
    });

    const navigate = useNavigate();

    const onDifficultyChange = e => {
        updateForm({ difficulty: e })
    }

    const onExerciseTypeChange = e => {
        updateForm({ exerciseType: e })
    }

    const onMuscleGroupChange = e => {
        updateForm({ mainMuscleGroup: e })
    }


    function updateForm(value) {
        return setForm((prev) => {
            return { ...prev, ...value };
        });
    }


    const difficulty = [
        { name: 'Easy', value: 'easy', variant: 'outline-success' },
        { name: 'Medium', value: 'medium', variant: 'outline-warning' },
        { name: 'Hard', value: 'hard', variant: 'outline-danger' },
    ];

    const exerciseType = [
        { name: 'Warmup', value: 'warmup' },
        { name: 'Strength', value: 'strength' },
        { name: 'Cardio', value: 'cardio' },
        { name: 'Cardio Outdoor', value: 'cardio_outdoor' },
        { name: 'Challenge', value: 'challenge' },
        { name: 'Active Rest', value: 'active_rest' },
        { name: 'Stretching', value: 'stretching' },
    ];

    const muscleGroup = [
        { name: 'All', value: 'all' },
        { name: 'Legs', value: 'legs' },
        { name: 'Shoulders', value: 'shoulders' },
        { name: 'Back', value: 'back' },
        { name: 'Chest', value: 'chest' },
        { name: 'Calves', value: 'calves' },
        { name: 'Arms', value: 'arms' },
        { name: 'Core', value: 'core' },
    ];

    function clearForm() {
        setForm({
            name: "",
            weight: "",
            difficulty: "Easy",
            exerciseType: "",
            mainMuscleGroup: "",
            durationPerRep: "1",
            repetitionPerSet: "1",
            setsPerExercise: "1",
            doubleSided: "",
            goal: "",
            description: ""
        });
    }

    async function onSubmit(e) {
        e.preventDefault();

        const newExercise = { ...form };
        await fetch("http://localhost:5000/exercise", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newExercise),
        })
            .catch(error => {
                window.alert(error);
            });
        clearForm();
        navigate("/exercises");
    }
    return (
        <Form onSubmit={onSubmit}>
            <Row className="mb-5">
                <Col xs={2}>
                    <label htmlFor="exerciseName" className="form-label">Name</label>
                </Col>
                <Col>
                    <input
                        type="text"
                        className="form-control"
                        id="exerciseName"
                        value={form.name}
                        placeholder="Pushup"
                        onChange={(e) => updateForm({ name: e.target.value })}
                    />
                </Col>
            </Row>
            <Row className="mb-5">
                <Col xs={2}>
                    <label htmlFor="exerciseWeight" className="form-label">Weight</label>
                </Col>
                <Col>
                    <input
                        type="text"
                        className="form-control"
                        id="exerciseWeight"
                        value={form.weight}
                        placeholder="10kg Dumbbell"
                        onChange={(e) => updateForm({ weight: e.target.value })}
                    />
                </Col>
            </Row>
            <Row className="mb-5">
                <Col xs={2}>
                    <div className="label">Difficulty</div>
                </Col>
                <Col>
                    <ToggleButtonGroup onChange={onDifficultyChange} name="difficulty" style={{ width: 100 + '%' }} value={form.difficulty}>
                        {
                            difficulty.map(
                                (option) => (
                            <ToggleButton
                                key={option.value}
                                id={`difficulty-${option.value}`}
                                value={option.value}
                                variant={option.variant}
                            >
                                {option.name}
                            </ToggleButton>

                        ))}
                    </ToggleButtonGroup>
                </Col >
            </Row >
            <Row className="mb-5">
                <Col xs={2}>
                    <div className="label">Exercise Type</div>
                </Col>
                <Col>
                    <ToggleButtonGroup onChange={onExerciseTypeChange} name="exerciseType" style={{ width: 100 + '%' }} value={form.exerciseType}>
                        {
                            exerciseType.map(
                                (option) => (
                            <ToggleButton
                                key={option.value}
                                id={`exerciseType-${option.value}`}
                                value={option.value}
                                variant="outline-secondary"
                            >
                                {option.name}
                            </ToggleButton>

                        ))}
                    </ToggleButtonGroup>
                </Col >
            </Row >
            <Row className="mb-5">
                <Col xs={2}>
                    <div className="label">Main Musclegroup</div>
                </Col>
                <Col className="btn-group">
                    <ToggleButtonGroup onChange={onMuscleGroupChange} name="muscleGroup" style={{ width: 100 + '%' }} value={form.mainMuscleGroup}>
                        {
                            muscleGroup.map(
                                (option) => (
                            <ToggleButton
                                key={option.value}
                                id={`muscleGroup-${option.value}`}
                                value={option.value}
                                variant="outline-secondary"
                            >
                                {option.name}
                            </ToggleButton>

                        ))}
                    </ToggleButtonGroup>
                </Col >
            </Row >
            <Row className="mb-3">
                <Col xs={2}>
                </Col>
                <Col>
                    <InputGroup className="mb-3">
                        <InputGroup.Text id="label1">Duration per Rep (s)</InputGroup.Text>
                        <Form.Control value={form.durationPerRep} placeholder="1" id="basic-url" aria-describedby="label1" onChange={(e) => updateForm({ durationPerRep: e.target.value })} />
                        <InputGroup.Text id="label1">Reps per Set (#)</InputGroup.Text>
                        <Form.Control value={form.repetitionPerSet} placeholder="1" id="basic-url" aria-describedby="label2" onChange={(e) => updateForm({ repetitionPerSet: e.target.value })} />
                        <InputGroup.Text id="label1">Sets per Exercise (#)</InputGroup.Text>
                        <Form.Control value={form.setsPerExercise} placeholder="1" id="basic-url" aria-describedby="label3" onChange={(e) => updateForm({ setsPerExercise: e.target.value })} />
                    </InputGroup>
                </Col>
            </Row>
            <Row className="mb-3">
                <Col xs={2}>
                    Doublesided
                </Col>
                <Col>
                    <Form.Check
                        type="switch"
                        id="doublesided"
                        checked={form.doubleSided}
                        onChange={(e) => updateForm({ doubleSided: e.target.checked })}
                    ></Form.Check>

                </Col>
            </Row>
            <Row className="mb-3">
                <Col xs={2}>
                    Goal
                </Col>
                <Col>
                    <Form.Check
                        type="switch"
                        id="goal"
                        checked={form.goal}
                        onChange={(e) => updateForm({ goal: e.target.checked })}
                    ></Form.Check>
                </Col>
            </Row>
            <Row>
                <Col>
                    <input
                        type="submit"
                        value="Create exercise"
                        className="btn btn-primary"
                    />
                </Col>
                <Col>
                    <input
                        type="button"
                        value="Clear Form"
                        className="btn btn-warning"
                        onClick={clearForm}
                    />
                </Col>
            </Row>
        </Form >
    );
}