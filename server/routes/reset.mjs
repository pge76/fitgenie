import express from "express";
import db from "../db/conn.mjs";

const router = express.Router();
const COLLECTION_EXERCISES = "exercises"

router.get("/", async (req, res) => {
    let collection = await db.collection(COLLECTION_EXERCISES);
    await collection.deleteMany();
    let entries =
        [
            { name: "Squat to Pushup", exerciseType: "strength", difficulty: "easy", mainMuscleGroup: "chest", repetitionPerSet: "1", durationPerRep: "20", setsPerExercise: "2" },
            { name: "Pushup", exerciseType: "strength", difficulty: "easy", mainMuscleGroup: "chest", repetitionPerSet: "8", durationPerRep: "3", setsPerExercise: "3" },
            { name: "Pushup",weight:"paralletes" , exerciseType: "strength", difficulty: "easy", mainMuscleGroup: "chest", repetitionPerSet: "8", durationPerRep: "3", setsPerExercise: "3" },
            { name: "Decline Pushup", exerciseType: "strength", difficulty: "easy", mainMuscleGroup: "chest", repetitionPerSet: "6", durationPerRep: "3", setsPerExercise: "3" },
            { name: "Pushup", exerciseType: "strength", difficulty: "medium", mainMuscleGroup: "chest", repetitionPerSet: "8", durationPerRep: "3", setsPerExercise: "4" },
            { name: "Pushup", exerciseType: "strength", difficulty: "medium", mainMuscleGroup: "chest", repetitionPerSet: "8", durationPerRep: "3", setsPerExercise: "4" },
            { name: "Pushup",weight:"paralletes", exerciseType: "strength", difficulty: "hard", mainMuscleGroup: "chest", repetitionPerSet: "8", durationPerRep: "3", setsPerExercise: "5" },
            { name: "Pushup", exerciseType: "strength", difficulty: "hard", mainMuscleGroup: "chest", repetitionPerSet: "8", durationPerRep: "3", setsPerExercise: "5" },
            { name: "Shoulder Tap", exerciseType: "strength", difficulty: "easy", mainMuscleGroup: "chest", repetitionPerSet: "10", durationPerRep: "2", setsPerExercise: "3" },
            { name: "Shoulder Tap", exerciseType: "strength", difficulty: "medium", mainMuscleGroup: "chest", repetitionPerSet: "15", durationPerRep: "2", setsPerExercise: "3" },
            { name: "Shoulder Tap", exerciseType: "strength", difficulty: "hard", mainMuscleGroup: "chest", repetitionPerSet: "20", durationPerRep: "2", setsPerExercise: "3" },
            { name: "Squat", exerciseType: "strength", difficulty: "easy", mainMuscleGroup: "legs", repetitionPerSet: "1", durationPerRep: "20", setsPerExercise: "4" },
            { name: "Burpee Navy", exerciseType: "strength", difficulty: "hard", mainMuscleGroup: "all", repetitionPerSet: "5", durationPerRep: "15", setsPerExercise: "1", goal: true, description: "1 - plank, 2 - press, 3 - knee left, 4 - press, 5 - knee right, 6 - press, 7 - plank, 8 - up, fist on hips" },
            { name: "Burpee", exerciseType: "strength", difficulty: "hard", mainMuscleGroup: "all", repetitionPerSet: "6", durationPerRep: "5", setsPerExercise: "1"},
            { name: "Free Hang", exerciseType: "strength", difficulty: "easy", mainMuscleGroup: "arms", repetitionPerSet: "1", durationPerRep: "11", setsPerExercise: "3", goal: true },
            { name: "High Knees", exerciseType: "cardio", difficulty: "easy", mainMuscleGroup: "legs", repetitionPerSet: "1", durationPerRep: "20", setsPerExercise: "3" },
            { name: "High Knees", exerciseType: "cardio", difficulty: "medium", mainMuscleGroup: "legs", repetitionPerSet: "1", durationPerRep: "30", setsPerExercise: "3" },
            { name: "Biceps Extension (Front)", exerciseType: "strength", difficulty: "easy", mainMuscleGroup: "arms", repetitionPerSet: "1", durationPerRep: "20", setsPerExercise: "1" },
            { name: "Biceps Extension (Side)", exerciseType: "strength", difficulty: "easy", mainMuscleGroup: "arms", repetitionPerSet: "1", durationPerRep: "20", setsPerExercise: "1" },
            { name: "Biceps Extension (Up)", exerciseType: "strength", difficulty: "easy", mainMuscleGroup: "shoulders", repetitionPerSet: "1", durationPerRep: "20", setsPerExercise: "1" },
            { name: "Scissors (Up/Down)", exerciseType: "strength", difficulty: "easy", mainMuscleGroup: "shoulders", repetitionPerSet: "1", durationPerRep: "20", setsPerExercise: "1" },
            { name: "Scissors (Left/Right)", exerciseType: "strength", difficulty: "easy", mainMuscleGroup: "shoulders", repetitionPerSet: "1", durationPerRep: "20", setsPerExercise: "1" },
            { name: "Biceps Curls", weight: "10kg Dumbbell", exerciseType: "strength", difficulty: "easy", mainMuscleGroup: "arms", repetitionPerSet: "10", durationPerRep: "2", setsPerExercise: "3" },
            { name: "Biceps Hammer Curls", weight: "10kg Dumbbell", exerciseType: "strength", difficulty: "easy", mainMuscleGroup: "arms", repetitionPerSet: "10", durationPerRep: "3", setsPerExercise: "3" },
            { name: "Biceps Reverse Curls", weight: "10kg Dumbbell", exerciseType: "strength", difficulty: "easy", mainMuscleGroup: "arms", repetitionPerSet: "6", durationPerRep: "3", setsPerExercise: "3" },
            { name: "Biceps Curls", weight: "12,5kg Dumbbell", exerciseType: "strength", difficulty: "medium", mainMuscleGroup: "arms", repetitionPerSet: "10", durationPerRep: "3", setsPerExercise: "3" },
            { name: "Shrugs", weight: "12,5kg Dumbbell", exerciseType: "strength", difficulty: "easy", mainMuscleGroup: "arms", repetitionPerSet: "10", durationPerRep: "3", setsPerExercise: "3" },
            { name: "Deadlifts", weight: "12,5kg Dumbbell", exerciseType: "strength", difficulty: "easy", mainMuscleGroup: "back", repetitionPerSet: "10", durationPerRep: "3", setsPerExercise: "3" },
            { name: "Lie Down Chest Press", weight: "20kg Dumbbell", exerciseType: "strength", difficulty: "easy", mainMuscleGroup: "chest", repetitionPerSet: "1", durationPerRep: "30", setsPerExercise: "3" },
            { name: "Standing Horizontal Press", weight: "12,5kg Dumbbell", exerciseType: "strength", difficulty: "easy", mainMuscleGroup: "arms", repetitionPerSet: "1", durationPerRep: "30", setsPerExercise: "3" },
            { name: "Cross Body Fly's", weight: "10,0kg Dumbbell", exerciseType: "strength", difficulty: "easy", mainMuscleGroup: "arms", repetitionPerSet: "1", durationPerRep: "20", setsPerExercise: "3" },
            { name: "Lateral Raises", weight: "10kg Dumbbell", exerciseType: "strength", difficulty: "easy", mainMuscleGroup: "shoulders", repetitionPerSet: "5", durationPerRep: "3", setsPerExercise: "3" },
            { name: "Triceps Extensions", weight: "10kg Dumbbell", exerciseType: "strength", difficulty: "easy", mainMuscleGroup: "arms", repetitionPerSet: "10", durationPerRep: "3", setsPerExercise: "3", doubleSided: true },
            { name: "Upright Rows", weight: "10kg Dumbbell", exerciseType: "strength", difficulty: "easy", mainMuscleGroup: "shoulders", repetitionPerSet: "6", durationPerRep: "3", setsPerExercise: "3" },
            { name: "Arnold Press", weight: "10kg Dumbbell", exerciseType: "strength", difficulty: "easy", mainMuscleGroup: "shoulders", repetitionPerSet: "6", durationPerRep: "3", setsPerExercise: "3" },
            { name: "Climber", exerciseType: "cardio", difficulty: "easy", mainMuscleGroup: "core", repetitionPerSet: "1", durationPerRep: "20", setsPerExercise: "3" },
            { name: "Toe Tap Hops", exerciseType: "cardio", difficulty: "easy", mainMuscleGroup: "legs", repetitionPerSet: "1", durationPerRep: "20", setsPerExercise: "3" },
            { name: "Climber", exerciseType: "cardio", difficulty: "medium", mainMuscleGroup: "core", repetitionPerSet: "1", durationPerRep: "30", setsPerExercise: "3" },
            { name: "Climber", exerciseType: "cardio", difficulty: "hard", mainMuscleGroup: "core", repetitionPerSet: "1", durationPerRep: "40", setsPerExercise: "3" },
            { name: "Russian Twists", exerciseType: "strength", difficulty: "easy", mainMuscleGroup: "core", repetitionPerSet: "10", durationPerRep: "4", setsPerExercise: "3" },
            { name: "Jumping Jacks", exerciseType: "cardio", difficulty: "easy", mainMuscleGroup: "all", repetitionPerSet: "1", durationPerRep: "20", setsPerExercise: "3" },
            { name: "Jumping Jacks", exerciseType: "cardio", difficulty: "medium", mainMuscleGroup: "all", repetitionPerSet: "1", durationPerRep: "30", setsPerExercise: "3" },
            { name: "Jumping Jacks", exerciseType: "cardio", difficulty: "hard", mainMuscleGroup: "all", repetitionPerSet: "1", durationPerRep: "40", setsPerExercise: "3" },
            { name: "Squad Hold", exerciseType: "active_rest", difficulty: "easy", mainMuscleGroup: "legs", repetitionPerSet: "1", durationPerRep: "10", setsPerExercise: "1" },
            { name: "Side Leg Hold", exerciseType: "active_rest", difficulty: "easy", mainMuscleGroup: "legs", repetitionPerSet: "1", durationPerRep: "10", setsPerExercise: "1", doubleSided: true },
            { name: "Side Leg Raise", exerciseType: "strength", difficulty: "easy", mainMuscleGroup: "legs", repetitionPerSet: "10", durationPerRep: "3", setsPerExercise: "2", doubleSided: true },
            { name: "Arm Circles", exerciseType: "strength", difficulty: "easy", mainMuscleGroup: "shoulders", repetitionPerSet: "20", durationPerRep: "2", setsPerExercise: "3" },
            { name: "Raised Arm (Hold)", exerciseType: "active_rest", difficulty: "easy", mainMuscleGroup: "arms", repetitionPerSet: "1", durationPerRep: "10", setsPerExercise: "1" },
            { name: "Raised Arm (Hold)", exerciseType: "active_rest", difficulty: "easy", mainMuscleGroup: "shoulders", repetitionPerSet: "1", durationPerRep: "10", setsPerExercise: "1" },
            { name: "Crunches", exerciseType: "strength", difficulty: "easy", mainMuscleGroup: "core", repetitionPerSet: "1", durationPerRep: "30", setsPerExercise: "2" },
            { name: "High Crunches", exerciseType: "strength", difficulty: "easy", mainMuscleGroup: "core", repetitionPerSet: "1", durationPerRep: "30", setsPerExercise: "2" },
            { name: "Heel Taps", exerciseType: "strength", difficulty: "easy", mainMuscleGroup: "core", repetitionPerSet: "1", durationPerRep: "30", setsPerExercise: "2" },
            { name: "Bridges", exerciseType: "strength", difficulty: "easy", mainMuscleGroup: "core", repetitionPerSet: "1", durationPerRep: "30", setsPerExercise: "3" },
            { name: "Knee Rolls", exerciseType: "strength", difficulty: "easy", mainMuscleGroup: "core", repetitionPerSet: "1", durationPerRep: "30", setsPerExercise: "3" },
            { name: "Bridges (1 Leg)", exerciseType: "strength", difficulty: "easy", mainMuscleGroup: "core", repetitionPerSet: "1", durationPerRep: "20", setsPerExercise: "3", doubleSided: true },
            { name: "Bridges (Hold)", exerciseType: "active_rest", difficulty: "easy", mainMuscleGroup: "core", repetitionPerSet: "1", durationPerRep: "10", setsPerExercise: "1" },
            { name: "Side Plank (Hold)", exerciseType: "active_rest", difficulty: "easy", mainMuscleGroup: "core", repetitionPerSet: "1", durationPerRep: "10", setsPerExercise: "1", doubleSided: true },
            { name: "Butt Kicks", exerciseType: "cardio", difficulty: "easy", mainMuscleGroup: "legs", repetitionPerSet: "1", durationPerRep: "30", setsPerExercise: "3" },
            { name: "Punches", exerciseType: "cardio", difficulty: "easy", mainMuscleGroup: "arms", repetitionPerSet: "1", durationPerRep: "30", setsPerExercise: "3" },
            { name: "Plank Raised (Hold)", exerciseType: "active_rest", difficulty: "easy", mainMuscleGroup: "core", repetitionPerSet: "1", durationPerRep: "10", setsPerExercise: "1" },
            { name: "Plank Raised (Hold)", exerciseType: "strength", difficulty: "medium", mainMuscleGroup: "core", repetitionPerSet: "1", durationPerRep: "30", setsPerExercise: "2" },
            { name: "Plank Lowered (Hold)", exerciseType: "strength", difficulty: "medium", mainMuscleGroup: "core", repetitionPerSet: "1", durationPerRep: "30", setsPerExercise: "2" },
            { name: "Squat", exerciseType: "strength", difficulty: "easy", mainMuscleGroup: "legs", repetitionPerSet: "1", durationPerRep: "20", setsPerExercise: "3" },
            { name: "Squat", exerciseType: "strength", difficulty: "medium", mainMuscleGroup: "legs", repetitionPerSet: "1", durationPerRep: "30", setsPerExercise: "3" },
            { name: "Squat", exerciseType: "strength", difficulty: "hard", mainMuscleGroup: "legs", repetitionPerSet: "1", durationPerRep: "40", setsPerExercise: "3" },
            { name: "Lunge", exerciseType: "strength", difficulty: "medium", mainMuscleGroup: "legs", repetitionPerSet: "5", durationPerRep: "3", setsPerExercise: "3", doubleSided: true },
            { name: "Knee Elbow Crunch (2x)", exerciseType: "strength", difficulty: "easy", mainMuscleGroup: "core", repetitionPerSet: "5", durationPerRep: "4", setsPerExercise: "3" },
            { name: "Situp Punches (2x)", exerciseType: "strength", difficulty: "easy", mainMuscleGroup: "core", repetitionPerSet: "6", durationPerRep: "4", setsPerExercise: "3" },
            { name: "Sitting Punches (2x)", exerciseType: "strength", difficulty: "easy", mainMuscleGroup: "core", repetitionPerSet: "1", durationPerRep: "20", setsPerExercise: "3" },
            { name: "Hollow Hold", exerciseType: "strength", difficulty: "easy", mainMuscleGroup: "core", repetitionPerSet: "1", durationPerRep: "20", setsPerExercise: "3" },
            { name: "Hops on the Spot", exerciseType: "cardio", difficulty: "easy", mainMuscleGroup: "calves", repetitionPerSet: "1", durationPerRep: "20", setsPerExercise: "3" },
            { name: "Calf Raises", exerciseType: "strength", difficulty: "easy", mainMuscleGroup: "calves", repetitionPerSet: "20", durationPerRep: "2", setsPerExercise: "3" },
            { name: "Calf Raise Hold", exerciseType: "strength", difficulty: "easy", mainMuscleGroup: "calves", repetitionPerSet: "1", durationPerRep: "30", setsPerExercise: "3" },
            { name: "Calf Raise Hold", exerciseType: "active_rest", difficulty: "easy", mainMuscleGroup: "calves", repetitionPerSet: "1", durationPerRep: "10", setsPerExercise: "1" },
            { name: "Reverse Angels", exerciseType: "strength", difficulty: "easy", mainMuscleGroup: "back", repetitionPerSet: "10", durationPerRep: "3", setsPerExercise: "3" },
            { name: "Swimmers", exerciseType: "strength", difficulty: "easy", mainMuscleGroup: "back", repetitionPerSet: "12", durationPerRep: "4", setsPerExercise: "3" },
            { name: "W-Extensions", exerciseType: "strength", difficulty: "easy", mainMuscleGroup: "back", repetitionPerSet: "12", durationPerRep: "4", setsPerExercise: "3" },
            { name: "Back Arches", exerciseType: "strength", difficulty: "easy", mainMuscleGroup: "back", repetitionPerSet: "12", durationPerRep: "4", setsPerExercise: "3" },
            { name: "MTB Fahren", exerciseType: "cardio_outdoor", difficulty: "easy", mainMuscleGroup: "legs", repetitionPerSet: "1", durationPerRep: "3600", setsPerExercise: "1" },
            { name: "Jogging", exerciseType: "cardio_outdoor", difficulty: "hard", mainMuscleGroup: "legs", repetitionPerSet: "1", durationPerRep: "1800", setsPerExercise: "1" },
            { name: "Head Tilt Up", exerciseType: "warmup", difficulty: "easy", mainMuscleGroup: "shoulders", repetitionPerSet: "8", durationPerRep: "3", setsPerExercise: "1" },
            { name: "Head Tilt Side", exerciseType: "warmup", difficulty: "easy", mainMuscleGroup: "shoulders", repetitionPerSet: "8", durationPerRep: "3", setsPerExercise: "1" },
            { name: "Head Rotate Side", exerciseType: "warmup", difficulty: "easy", mainMuscleGroup: "shoulders", repetitionPerSet: "8", durationPerRep: "3", setsPerExercise: "1" },
            { name: "Shoulder Rotate", exerciseType: "warmup", difficulty: "easy", mainMuscleGroup: "shoulders", repetitionPerSet: "8", durationPerRep: "3", setsPerExercise: "1" },
            { name: "Jack w/ Leg Up", exerciseType: "warmup", difficulty: "easy", mainMuscleGroup: "all", repetitionPerSet: "8", durationPerRep: "3", setsPerExercise: "1" },
            { name: "Side Jack", exerciseType: "warmup", difficulty: "easy", mainMuscleGroup: "all", repetitionPerSet: "8", durationPerRep: "3", setsPerExercise: "1" },
            { name: "Raise Arms (alternating)", exerciseType: "warmup", difficulty: "easy", mainMuscleGroup: "shoulders", repetitionPerSet: "8", durationPerRep: "3", setsPerExercise: "1" },
            { name: "Arm Circles (narrow)", exerciseType: "warmup", difficulty: "easy", mainMuscleGroup: "shoulders", repetitionPerSet: "1", durationPerRep: "20", setsPerExercise: "1" },
            { name: "Arm Circles (wide)", exerciseType: "warmup", difficulty: "easy", mainMuscleGroup: "shoulders", repetitionPerSet: "1", durationPerRep: "20", setsPerExercise: "1" },
            { name: "Side Arm Raises", exerciseType: "warmup", difficulty: "easy", mainMuscleGroup: "shoulders", repetitionPerSet: "1", durationPerRep: "20", setsPerExercise: "1" },
            { name: "Hip/Torso Rotations", exerciseType: "warmup", difficulty: "easy", mainMuscleGroup: "core", repetitionPerSet: "8", durationPerRep: "3", setsPerExercise: "1" },
            { name: "Torso Rotation", exerciseType: "warmup", difficulty: "easy", mainMuscleGroup: "core", repetitionPerSet: "8", durationPerRep: "3", setsPerExercise: "1" },
            { name: "Hops on the Spot", exerciseType: "warmup", difficulty: "easy", mainMuscleGroup: "legs", repetitionPerSet: "1", durationPerRep: "20", setsPerExercise: "1" },
            { name: "Half Jacks", exerciseType: "warmup", difficulty: "easy", mainMuscleGroup: "legs", repetitionPerSet: "1", durationPerRep: "20", setsPerExercise: "1" },
            { name: "Side-to-side Hops (alternating legs)", exerciseType: "warmup", difficulty: "easy", mainMuscleGroup: "legs", repetitionPerSet: "1", durationPerRep: "20", setsPerExercise: "1" },
            { name: "Side-to-side Hops (Feet together)", exerciseType: "warmup", difficulty: "easy", mainMuscleGroup: "legs", repetitionPerSet: "1", durationPerRep: "20", setsPerExercise: "1" },
            { name: "Chest Expansions", exerciseType: "warmup", difficulty: "easy", mainMuscleGroup: "chest", repetitionPerSet: "1", durationPerRep: "20", setsPerExercise: "1" },
            { name: "Hip Rotations", exerciseType: "warmup", difficulty: "easy", mainMuscleGroup: "core", repetitionPerSet: "10", durationPerRep: "3", setsPerExercise: "1" },
            { name: "Light Punches", exerciseType: "warmup", difficulty: "easy", mainMuscleGroup: "shoulders", repetitionPerSet: "1", durationPerRep: "30", setsPerExercise: "1" },
            { name: "Low Front Kick", exerciseType: "warmup", difficulty: "easy", mainMuscleGroup: "legs", repetitionPerSet: "1", durationPerRep: "30", setsPerExercise: "1" },
            { name: "Low Turning Kick", exerciseType: "warmup", difficulty: "easy", mainMuscleGroup: "legs", repetitionPerSet: "1", durationPerRep: "30", setsPerExercise: "1" },
            { name: "Jumping Jacks", exerciseType: "challenge", difficulty: "hard", mainMuscleGroup: "all", repetitionPerSet: "1", durationPerRep: "120", setsPerExercise: "1" },
            { name: "Alt Arm/Leg Raises on Knees", exerciseType: "challenge", difficulty: "hard", mainMuscleGroup: "all", repetitionPerSet: "50", durationPerRep: "3", setsPerExercise: "1" },
            { name: "Boat Pose Hold ", exerciseType: "challenge", difficulty: "hard", mainMuscleGroup: "core", repetitionPerSet: "1", durationPerRep: "60", setsPerExercise: "1" },
            { name: "Wall Sit ", exerciseType: "challeng", difficulty: "hard", mainMuscleGroup: "legs", repetitionPerSet: "1", durationPerRep: "180", setsPerExercise: "1" },
            { name: "Climber Taps ", exerciseType: "challeng", difficulty: "hard", mainMuscleGroup: "legs", repetitionPerSet: "50", durationPerRep: "2", setsPerExercise: "1" },
            { name: "Superman Stretch Hold", exerciseType: "challenge", difficulty: "hard", mainMuscleGroup: "back", repetitionPerSet: "1", durationPerRep: "60", setsPerExercise: "1" },
            { name: "Rings Incline Pull", weight: "Rings", exerciseType: "strength", difficulty: "easy", mainMuscleGroup: "back", repetitionPerSet: "10", durationPerRep: "4", setsPerExercise: "3" },
            { name: "Rings Triceps Push (standing)", weight: "Rings", exerciseType: "strength", difficulty: "easy", mainMuscleGroup: "arms", repetitionPerSet: "10", durationPerRep: "3", setsPerExercise: "3" },
            { name: "Rings Support Hold", weight: "Rings", exerciseType: "strength", difficulty: "easy", mainMuscleGroup: "shoulders", repetitionPerSet: "1", durationPerRep: "10", setsPerExercise: "1" },
        ];
    await collection.insertMany(entries);
});

export default router;