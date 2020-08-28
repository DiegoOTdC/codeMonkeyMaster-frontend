import React from "react"
import { Spinner, Table } from "react-bootstrap"

export default function CompletedExercises(props){
    const exercisesCompleted = props.exerciseData
    console.log("exercises test", exercisesCompleted)

    if(exercisesCompleted === []){
        return <Spinner animation="border" variant="warning" />;
    }

    const displayExercises = exercisesCompleted.map(exercise => {
        const methodCompleted = () => {
            if(exercise.exerciseId === 1){
                return "Map()"
            } else if(exercise.exerciseId === 2){
                return "Filter()"
            } else if(exercise.exerciseId === 3){
                return "Find()"
            } else if(exercise.exerciseId === 4){
                return "Pop()"
            } else if(exercise.exerciseId === 5){
                return "Push()"
            } else if(exercise.exerciseId === 6){
                return "Shift()"
            } else if(exercise.exerciseId === 7){
                return "unShift()"
            } else if(exercise.exerciseId === 8){
                return "Sort()"
            }
        }

        const time = exercise.timeTaken
        ? exercise.timeTaken
        : "N/A"

        return (
            <tr key={exercise.exerciseId}>
                <td>
                    {methodCompleted()}
                </td>
                <td>
                    {exercise.quizQuestionId}
                </td>
                <td>
                    {time}
                </td>
            </tr>
        )
    })

    return (
        <Table>
            <thead>
                <tr>
                    <th>
                        Completed Methods:
                    </th>
                    <th>
                        Number Completed:
                    </th>
                    <th>
                        Time Taken(Code it yourself):
                    </th>
                </tr>
            </thead>
            <tbody>
                {displayExercises}
            </tbody>
        </Table>
    )
}