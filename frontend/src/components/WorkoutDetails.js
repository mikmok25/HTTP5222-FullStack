import { useWorkoutsContext } from "../hooks/useWorkoutsContext"

// date fns
import formatDistanceToNow from 'date-fns/formatDistanceToNow';

const WorkoutDetails = ({ workout, setSelectedWorkout }) => {
    const { dispatch } = useWorkoutsContext();

    const handleClick = async () => {
        const response = await fetch('http://localhost:4000/api/workouts/' + workout._id, {
            method: 'DELETE'
        });
        const data = await response.json();
        if(response.ok) {
            dispatch({type: 'DELETE_WORKOUT', payload: data});
        }
    }

    const handleUpdate = () => {
        setSelectedWorkout(workout); // Set the selected workout for editing
      };
    


    return (
        <div className="workout-details">
            <h4>{workout.title}</h4>
            <p><strong>Load (kg): </strong> {workout.load}</p>
            <p><strong>Reps: </strong> {workout.reps}</p>
            <p>{formatDistanceToNow(new Date(workout.createdAt), { addSuffix: true })}</p>
            <span className="material-symbols-outlined delete-btn" onClick={handleClick}>delete</span>
            <span className="material-symbols-outlined update-btn" onClick={handleUpdate}>update</span>
        </div>
    )
}

export default WorkoutDetails;