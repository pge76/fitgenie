const PlanConfig = {
    // all durations in seconds
    workout_duration: 40 * 60,
    stretch_duration: 5 * 60,
    warmup_duration: 8 * 60,
    pause_after_exercise: 30,
    short_pause_after_exercise: 3,
    pause_after_warmup_exercise: 5,
    active_rest_after: ["cardio"],
    nr_of_hard_exercises: 0,
    nr_of_medium_exercises: 2,
    workout_time_hack: 0.66,
    sort_exercises: ["all", "legs", "chest", "back", "shoulders", "calves", "arms", "core"]
}

function createWarmup(exercises) {
    let warmup = [];

    let duration = 0;
    let warmUpExercises = exercises.filter(e => e.exerciseType === "warmup");
    addMessage(warmup, "prepare for warmup", 15, duration);
    duration += 15;
    while (duration <= PlanConfig.warmup_duration) {
        let e = getRandomExerciseNoDoublesInPlan(warmUpExercises, warmup); // first add all unique exercises
        if (e != null) { // if no more without doubles can be found
            duration += addWarmup(warmup, e, PlanConfig.pause_after_warmup_exercise, duration);
            //console.log(duration, PlanConfig.warmup_duration)
        } else { // add duplicates
            e = getRandomExercise(warmUpExercises);
            duration += addWarmup(warmup, e, PlanConfig.pause_after_warmup_exercise, duration);
            //console.log(duration, PlanConfig.warmup_duration)
        }
    }
    addMessage(warmup, "warmup finished", 15, duration);
    duration += 15;
    console.log(warmup)
    return [ warmup, duration ];
}

function createListOfWorkoutExercises(allExercises, workoutExercises) {
    //console.log("add goals")
    let list = allExercises.filter(e => e.goal === true);

    // console.log("add hard")
    for (let i = PlanConfig.nr_of_hard_exercises; i--;) {
        let e = getRandomExerciseNoDoublesInList(workoutExercises.filter(e => e.difficulty === "hard"), list);
        if (e != null) {
            list.push(e);
        }
    }

    // console.log("add medium")
    for (let i = PlanConfig.nr_of_medium_exercises; i--;) {
        let e = getRandomExerciseNoDoublesInList(workoutExercises.filter(e => e.difficulty === "medium"), list);
        if (e != null) {
            list.push(e);
        }
    }

    // console.log("add 1 easy for each musclegroups")
    let e = getRandomExerciseNoDoublesInList(workoutExercises.filter(e => e.mainMuscleGroup === "all" && e.difficulty === "easy"), list); if (e) list.push(e);
    e = getRandomExerciseNoDoublesInList(workoutExercises.filter(e => e.mainMuscleGroup === "back" && e.difficulty === "easy"), list); if (e) list.push(e);
    e = getRandomExerciseNoDoublesInList(workoutExercises.filter(e => e.mainMuscleGroup === "arms" && e.difficulty === "easy"), list); if (e) list.push(e);
    e = getRandomExerciseNoDoublesInList(workoutExercises.filter(e => e.mainMuscleGroup === "calves" && e.difficulty === "easy"), list); if (e) list.push(e);
    e = getRandomExerciseNoDoublesInList(workoutExercises.filter(e => e.mainMuscleGroup === "legs" && e.difficulty === "easy"), list); if (e) list.push(e);
    e = getRandomExerciseNoDoublesInList(workoutExercises.filter(e => e.mainMuscleGroup === "core" && e.difficulty === "easy"), list); if (e) list.push(e);
    e = getRandomExerciseNoDoublesInList(workoutExercises.filter(e => e.mainMuscleGroup === "chest" && e.difficulty === "easy"), list); if (e) list.push(e);
    e = getRandomExerciseNoDoublesInList(workoutExercises.filter(e => e.mainMuscleGroup === "shoulders" && e.difficulty === "easy"), list); if (e) list.push(e);


    let totalTime = list.map(e => e.repetitionPerSet * e.durationPerRep * e.setsPerExercise).reduce((a, b) => a + b, 0);
    console.log("non optional time: ", totalTime / 60 + "m " + totalTime % 60 + "s");

    let allowedMaxTime = (PlanConfig.workout_duration - PlanConfig.warmup_duration - PlanConfig.stretch_duration) * PlanConfig.workout_time_hack;
    console.log("allowed time: ", allowedMaxTime / 60 + "m " + allowedMaxTime % 60 + "s");

    // until max allowed time, fill with easy exercises
    while (totalTime < allowedMaxTime) {
        e = getRandomExerciseNoDoublesInList(workoutExercises.filter(e => e.difficulty === "easy"), list); if (e) list.push(e);
        totalTime += e.repetitionPerSet * e.durationPerRep * e.setsPerExercise;
    }
    console.log("total time: ", totalTime / 60 + "m " + totalTime % 60 + "s");
    // add random challenge
    e = getRandomExercise(allExercises.filter(e => e.exerciseType === "challenge")); if (e) list.push(e);

    console.log("workout", list);
    return list;
}

function createWorkout(exercises, startTime) {
    let workoutExercises = createListOfWorkoutExercises(exercises,
        exercises.filter(
            e => e.exerciseType === "cardio" || e.exerciseType === "strength"));
    workoutExercises.sort(function (a, b) {
        if(a.exerciseType === 'challenge') {
            return 1;
        } else if(b.exerciseType === 'challenge') {
            return -1;
        }
        return PlanConfig.sort_exercises.indexOf(a.mainMuscleGroup) - PlanConfig.sort_exercises.indexOf(b.mainMuscleGroup);
    })
    console.log("sorted workout", workoutExercises);

    let workout = [];
    let totalDuration = 0;
    workoutExercises.forEach(e => {
        let duration = addExercise(workout, e, exercises, startTime);
        startTime += duration;
        totalDuration += duration;
    });
    return [ workout, totalDuration ];
}


function addExercise(target, e, exercises, startTime) {
    console.log("add Exercise", e);
    let totalTime = 0;
    let pause = PlanConfig.pause_after_exercise;
    if(e.exerciseType === "cardio") {
        pause = PlanConfig.short_pause_after_exercise; // cardio means, we add an active rest after x seconds, no pause
    }

    for (let i = 0; i < e.setsPerExercise; i++) {
        let randomLeftRight = Math.random() < 0.5;
        if(e.doubleSided === true) {
            target.push({
                step: {
                    name: e.name,
                    side: randomLeftRight?" LEFT": " RIGHT",
                    weight: e.weight,
                    type: e.exerciseType,
                    difficulty: e.difficulty,
                    duration: e.durationPerRep,
                    reps: e.repetitionPerSet,
                    muscleGroup: e.mainMuscleGroup,
                    pause: PlanConfig.short_pause_after_exercise,
                    startTime: startTime + totalTime
                }
            });
            totalTime += (e.durationPerRep * e.repetitionPerSet) + PlanConfig.short_pause_after_exercise;
            target.push({
                step: {
                    name: e.name,
                    side: randomLeftRight?" RIGHT": " LEFT",
                    weight: e.weight,
                    type: e.exerciseType,
                    difficulty: e.difficulty,
                    duration: e.durationPerRep,
                    reps: e.repetitionPerSet,
                    muscleGroup: e.mainMuscleGroup,
                    pause: pause,
                    startTime: startTime + totalTime, // 5 is last pause
                }
            });
            totalTime += (e.durationPerRep * e.repetitionPerSet) + pause;

            if(e.exerciseType === "cardio") {
                let pauseAfterCardio = 3;
                if(i === e.setsPerExercise - 1 ) { // in the last set
                    pauseAfterCardio = 30;
                }
                let ar = getRandomExercise(exercises.filter(e => e.exerciseType === "active_rest"));
                target.push({
                    step: {
                        name: ar.name,
                        weight: ar.weight,
                        type: ar.exerciseType,
                        difficulty: ar.difficulty,
                        duration: ar.durationPerRep,
                        reps: ar.repetitionPerSet,
                        muscleGroup: ar.mainMuscleGroup,
                        pause: pauseAfterCardio,
                        startTime: startTime + totalTime
                    }
                });
                totalTime += (ar.durationPerRep * ar.repetitionPerSet) + pauseAfterCardio;
            }

        } else {
            target.push({
                step: {
                    name: e.name,
                    weight: e.weight,
                    type: e.exerciseType,
                    difficulty: e.difficulty,
                    duration: e.durationPerRep,
                    muscleGroup: e.mainMuscleGroup,
                    reps: e.repetitionPerSet,
                    pause: pause,
                    startTime: startTime + totalTime,
                }
            });
            totalTime += (e.durationPerRep * e.repetitionPerSet) + pause;
            if(e.exerciseType === "cardio") {
                let pauseAfterCardio = PlanConfig.short_pause_after_exercise;
                if(i === e.setsPerExercise - 1 ) { // in the last set
                    pauseAfterCardio = PlanConfig.pause_after_exercise;
                }
                let ar = getRandomExercise(exercises.filter(e => e.exerciseType === "active_rest"));
                target.push({
                    step: {
                        name: ar.name,
                        weight: ar.weight,
                        type: ar.exerciseType,
                        difficulty: ar.difficulty,
                        duration: ar.durationPerRep,
                        muscleGroup: ar.mainMuscleGroup,
                        reps: ar.repetitionPerSet,
                        pause: pauseAfterCardio,
                        startTime: startTime + totalTime,
                    }
                });
                totalTime += (ar.durationPerRep * ar.repetitionPerSet) + pauseAfterCardio;
            }
        }
    }
    return totalTime;
}

function addWarmup(target, e, pause, startTime) {
    console.log("add Warmup", e);
    let totalTime = 0;
    for (let i = 0; i < e.setsPerExercise; i++) {
        totalTime += e.durationPerRep * e.repetitionPerSet;
        target.push({
            step: {
                name: e.name,
                weight: e.weight,
                type: e.exerciseType,
                difficulty: e.difficulty,
                duration: e.durationPerRep,
                reps: e.repetitionPerSet,
                muscleGroup: e.mainMuscleGroup,
                pause: pause,
                startTime: startTime
            }
        });
    }
    return totalTime;
}

function addMessage(target, text, duration, startTime) {
    target.push({
        message: {
            text: text,
            duration: duration,
            startTime: startTime
        }
    })
    return duration;
}


function getRandomExercise(from) {
    //console.log("found random exercise", from, e)
    return from[Math.floor(Math.random() * from.length)];
}

function getRandomExerciseNoDoublesInPlan(from, verify) {
    let existing_exerciseNames = verify.filter(e => e.step != null).map(e => e.step.name);
    let possibleExercises = from.filter(e => !existing_exerciseNames.includes(e.name))
    return getRandomExercise(possibleExercises)
}

function getRandomExerciseNoDoublesInList(from, verify) {
    let existing_exerciseNames = verify.map(e => e.name);

    //console.log("existing exercise names which should not be double", existing_exerciseNames);
    let possibleExercises = from.filter(e => !existing_exerciseNames.includes(e.name))
    //console.log("exercise list to chose from", from);
    //console.log("exercise list to verify against", verify);
    //console.log("found possible exercises to choose from", possibleExercises);

    if (possibleExercises.length === 0) {
        return null;
    } else {
        return getRandomExercise(possibleExercises)
    }
}


export default function PlanGenerator(exercises) {
    console.log("creating plan")
    let [warmup, warmupDuration] = createWarmup(exercises);
    let [workout, workoutDuration] = createWorkout(exercises, warmupDuration);
    let stretching = [];

    const plan = {
        plan: {
            warmup: warmup,
            warmupDuration: warmupDuration,
            workout: workout,
            workoutDuration: workoutDuration,
            stretching: stretching
        }
    }

    console.log(plan)
    return plan;
}
