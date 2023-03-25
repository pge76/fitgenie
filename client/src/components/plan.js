import React, {useEffect, useState} from "react";
import { Button, Row, Col, Table } from 'react-bootstrap';
import useSound from 'use-sound';

import startMp3 from '../assets/start.mp3';
import pauseMp3 from '../assets/pause.mp3';
import beepMp3 from '../assets/beep.mp3';

import PlanGenerator from '../service/plan-generator'

export default function Plan() {
    const [plan, setPlan] = useState([]);
    const [duration, setDuration]  = useState(0);
    const [started, setStarted] = useState(false);
    const [planEntry, setPlanEntry]  = useState({});
    const [nextPlanEntry, setNextPlanEntry] = useState({});
    const [showPlan, setShowPlan] = useState(false);
    const [startSound] = useSound(startMp3);
    const [pauseSound] = useSound(pauseMp3);
    const [beepSound]  = useSound(beepMp3);

    async function createPlan() {
        const response = await fetch(`http://localhost:5000/exercise/`);
        if (!response.ok) {
            const message = `An error occurred: ${response.statusText}`;
            window.alert(message);
            return;
        }

        const exercises = await response.json();
        setPlan(PlanGenerator(exercises))

    }

    function updatePlanEntry(duration) {

        if((plan.plan.warmupDuration + plan.plan.workoutDuration) - duration < 0) {
            stopPlan();
        }


        let warmupSteps = plan.plan.warmup;
        let workoutSteps = plan.plan.workout;
        //console.log(warmupSteps);
        for (let i=0; i< warmupSteps.length; i++) {
            let step = warmupSteps[i];
            let startTime = 0;
            if(step.message) {
                startTime = step.message.startTime;
            } else {
                startTime = step.step.startTime;
            }
            //console.log("message/step: " + duration + "s elapsed vs. " + startTime);
            if(startTime < duration ) {
                //console.log("found step at starttime: " + startTime);
                if(warmupSteps[i+1]) {
                    setNextPlanEntry(warmupSteps[i+1]);
                } else {
                    setNextPlanEntry(workoutSteps[0]);
                }
                setPlanEntry(warmupSteps[i]);
            }
            if(startTime === duration) {
                startSound();
            }
        }
        for (let i=0; i< workoutSteps.length; i++) {
            let step = workoutSteps[i];
            let startTime;
            if(step.message) {
                startTime = step.message.startTime;
            } else {
                startTime = step.step.startTime;
            }
            //console.log("message/step: " + duration + "s elapsed vs. " + startTime);
            if(startTime < duration ) {
                //console.log("found step at starttime: " + startTime);
                if(workoutSteps[i+1]) {
                    setNextPlanEntry(workoutSteps[i+1]);
                } else {
                    setNextPlanEntry(null);
                }
                setPlanEntry(workoutSteps[i]);
            }
            if(startTime === duration) {
                startSound();
            }

        }


    }

    useEffect(() => {
        let interval = 0;
        if(started) {
            updatePlanEntry(duration);
            interval = setInterval(() => {
                setDuration((prevDuration) => prevDuration+=1);
            }, 1000);
        } else if (!started) {
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [started, duration]);
    function startPlan() {
        startSound();
        setStarted(true);
    }

    function stopPlan() {
        setStarted(false);
    }

    function resetPlan() {
        setStarted(false);
        setDuration(0);
        setPlanEntry(null);
        setNextPlanEntry(null);
    }

    function renderTime(startTime, repduration, reps) {

        // duration == elapsed time in the workout in seconds
        // startTime == time, when this exercise should start in seconds in a workout
        // repDuration == time for 1 rep of this exercise

        let elapsed = duration - startTime;
        let endTime = repduration * reps;
        let repStr;
        let currentRep = Math.floor((duration - startTime) / repduration) + 1;
        let repSeconds = Math.floor((duration - startTime) % repduration);
        let seconds;


        if(repSeconds === 0 && currentRep > 1 && currentRep <= reps) {
            beepSound()
        }

        if(elapsed > endTime) {
            repStr = "Pause ";
            seconds = elapsed - endTime;
            //console.log("paused ",duration, elapsed, endTime, seconds );
        } else {
            if(currentRep <= reps && reps > 1) {
                repStr = "Rep " + currentRep;
                seconds = repSeconds;
                //console.log("rep ", currentRep, elapsed, endTime, seconds );
            } else {
                repStr = "";
                seconds = repSeconds;
                //console.log("rep 1", currentRep, elapsed, endTime, seconds );
            }
        }
        if(elapsed === endTime) {
            if(planEntry.step && planEntry.step.type !== 'warmup') {
                pauseSound();
            }
        }

        return (
            <Row>
                <Col>
                    <span>{ repStr }</span>
                </Col>
                <Col>
                    <span>{((Math.floor(seconds / 60))+ Math.pow(10, 2) + "").slice(1) }:{ (seconds % 60 + 100).toString().slice(-2) }</span>
                </Col>
            </Row>
        )
    }
   function renderStep() {
        if(planEntry != null) {
            if(planEntry.message != null) {
                return (
                    <Row>
                        <Col className="h1">{planEntry.message.text} {planEntry.message.duration}s</Col>
                        <Col>{ renderTime(planEntry.message.startTime, planEntry.message.duration, 1) }</Col>
                    </Row>
            )
            } else if(planEntry.step != null) {


                return (
                    <>
                    <Row>
                        <Col xs={8} className="h1">{planEntry.step.name}</Col>
                        <Col xs={4} className="h1" align="right">{ renderTime(planEntry.step.startTime, planEntry.step.duration, planEntry.step.reps) }</Col>
                    </Row>
                    <Row>
                        <Col xs={4} className="h3">{planEntry.step.reps > 1?planEntry.step.reps + " x ": " "}{planEntry.step.duration}s</Col>
                        <Col xs={2} className="h3">{planEntry.step.weight}</Col>
                    </Row>
                    </>
                )
            }
        }
    }

    function renderSimpleTime(time) {
        return (
            <>
                { ((Math.floor(time / 60))+ Math.pow(10, 2) + "").slice(1) }:{ (time % 60 + 100).toString().slice(-2) }
            </>
        )
    }

    function renderTotalTime() {
        if(plan.plan) {
            return (
                <>
                    <h2>{ renderSimpleTime((plan.plan.warmupDuration + plan.plan.workoutDuration) - duration) }</h2>
                </>
            )
        }
    }
    function renderNextStep() {
        if(nextPlanEntry != null) {
            if(nextPlanEntry.message != null) {
                return (
                    <>
                        <div><h5>Next: {nextPlanEntry.message.text} {nextPlanEntry.message.duration}s</h5></div>
                    </>
                )
            } else if(nextPlanEntry.step != null) {
                return (
                    <>
                        <Row>
                            <Col xs={8} className="h1">{nextPlanEntry.step.name}</Col>
                        </Row>
                        <Row>
                            <Col xs={4} className="h3">{nextPlanEntry.step.reps > 1?nextPlanEntry.step.reps + " x ": " "}{nextPlanEntry.step.duration}s</Col>
                            <Col xs={2} className="h3">{nextPlanEntry.step.weight}</Col>
                        </Row>
                    </>
                )
            }
        }
    }

    function showPlanButton() {
        setShowPlan(!showPlan);
    }

    function getDifficultyColor(step) {
        if(step && step.step && step.step.difficulty) {
            if(step.step.difficulty === "easy") {
                return {backgroundColor: 'PaleGreen'};
            }
            if(step.step.difficulty === "medium") {
                return {backgroundColor: 'LightGoldenRodYellow'};
            }
            if(step.step.difficulty === "hard") {
                return {backgroundColor: 'LightPink'};
            }
        }

    }

    function getNeededGear() {
        //console.log("weights: ", plan.plan.workout.map(e => e.step.weight));
        //console.log("weights: ", plan.plan.workout.map(e => e.step.weight).filter((v,i,a)=> v && a.indexOf(v) === i));

        return (
            <>
            <b>Needed Gear: </b>
            {plan.plan.workout.map(e => e.step.weight).filter((v,i,a)=> v && a.indexOf(v) === i).join(", ")}
            </>
        )

    }

    function doShowPlan() {
        let warmupSteps = plan.plan.warmup;
        let workoutSteps = plan.plan.workout;
        console.log(warmupSteps);
        let result = warmupSteps.map((step) => {
            if(step.message) {
                return <tr>
                    <td colSpan={3}>{step.message.text}</td>
                    <td colSpan={1}>{step.message.duration}s</td>
                    <td colSpan={1}></td>
                    <td colSpan={2}></td>
                    <td colSpan={1}></td>
                    <td colSpan={2}></td>
                    <td colSpan={1}></td>
                    <td colSpan={1}>{renderSimpleTime(step.message.startTime)}</td>
                </tr>
            } else {
                return <tr>
                    <td colSpan={3}>{step.step.name}</td>
                    <td colSpan={1}>{step.step.duration}s</td>
                    <td colSpan={1}>{step.step.reps}</td>
                    <td colSpan={1}>{step.step.side}</td>
                    <td colSpan={1}>{step.step.difficulty} {step.step.muscleGroup}</td>
                    <td colSpan={1}>{step.step.pause}s</td>
                    <td colSpan={2}>{step.step.type}</td>
                    <td colSpan={1}>{step.step.weight}</td>
                    <td colSpan={1}>{renderSimpleTime(step.step.startTime)}</td>

                </tr>
            }
        });
        console.log("result", result);
        result.push(workoutSteps.map((step) => {
            if(step.message) {
                return <tr><td colSpan={3}>{step.message.text}</td></tr>
            } else {
                return <tr>
                    <td colSpan={3}>{step.step.name}</td>
                    <td colSpan={1}>{step.step.duration}s</td>
                    <td colSpan={1}>{step.step.reps}</td>
                    <td colSpan={1}>{step.step.side}</td>
                    <td colSpan={1}>{step.step.difficulty} {step.step.muscleGroup}</td>
                    <td colSpan={1}>{step.step.pause}s</td>
                    <td colSpan={2}>{step.step.type}</td>
                    <td colSpan={1}>{step.step.weight}</td>
                    <td colSpan={1}>{renderSimpleTime(step.step.startTime)}</td>
                </tr>
            }
        }));
        return (
            <Table striped>
                <tbody>
                {result}
                </tbody>
            </Table>
        );

    }

    return (
        <div>
            <h3>Exercise List</h3>
            <Row>
                <Col xs={1}>
                    <Button onClick={createPlan}>Create Plan</Button>
                </Col>
                <Col xs={1}>
                    {plan.plan != null ? <Button className="btn-success" onClick={startPlan}>Start Plan</Button>: ''}
                </Col>
                <Col xs={1}>
                    {plan.plan != null ? <Button className="btn-danger" onClick={stopPlan}>Stop Plan</Button>: ''}
                </Col>
                <Col xs={1}>
                    {plan.plan != null ? <Button className="btn-warning" onClick={resetPlan}>Reset Plan</Button>: ''}
                </Col>
                <Col xs={1}>
                    {plan.plan != null ? <Button className="btn-warning" onClick={showPlanButton}>Show Plan</Button>: ''}
                </Col>
                <Col xs={7} align="right">
                    { renderTotalTime()}
                </Col>
            </Row>
            <Row className="mt-4">
                <Col>
                    { plan.plan != null ? getNeededGear() : ""}
                </Col>
            </Row>
            <Row className="mt-4 ">
                <Col xs={12} style={getDifficultyColor(planEntry)}>
                    { renderStep() }
                </Col>
            </Row>
            <Row className="mt-4">
                <Col  xs={5} style={getDifficultyColor(nextPlanEntry)}>
                    { renderNextStep() }
                </Col>
            </Row>
            <Row>
                <Col xs={12}>
                    { showPlan ? doShowPlan(): <></>}

                </Col>
            </Row>
        </div>
    );
}