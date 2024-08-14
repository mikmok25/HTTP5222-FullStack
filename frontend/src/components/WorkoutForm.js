import { useState, useEffect } from "react";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";

const WorkoutForm = ({ selectedWorkout }) => {
  const { dispatch } = useWorkoutsContext();
  const [title, setTitle] = useState("");
  const [load, setLoad] = useState("");
  const [reps, setReps] = useState("");
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);

  // Populate form fields with selected workout details when it's set
  useEffect(() => {
    if (selectedWorkout) {
      setTitle(selectedWorkout.title);
      setLoad(selectedWorkout.load);
      setReps(selectedWorkout.reps);
    } else {
      setTitle("");
      setLoad("");
      setReps("");
    }
  }, [selectedWorkout]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const workout = { title, load, reps };

    const response = selectedWorkout
      ? await fetch('http://localhost:4000/api/workouts/' + selectedWorkout._id, {
          method: 'PATCH',
          body: JSON.stringify(workout),
          headers: {
            'Content-Type': 'application/json'
          }
        })
      : await fetch('http://localhost:4000/api/workouts/create', {
          method: 'POST',
          body: JSON.stringify(workout),
          headers: {
            'Content-Type': 'application/json'
          }
        });

    const data = await response.json();
    if (!response.ok) {
      setError(data.error);
      setEmptyFields(data.emptyFields);
    } else {
      setTitle('');
      setLoad('');
      setReps('');
      setError(null);
      setEmptyFields([]);
      console.log(selectedWorkout ? 'Workout updated' : 'New workout added', data);

      dispatch({
        type: selectedWorkout ? 'UPDATE_WORKOUT' : 'CREATE_WORKOUT',
        payload: data
      });
    }
  };

  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>{selectedWorkout ? 'Edit Workout' : 'Add a New Workout'}</h3>

      <label>Exercise Title:</label>
      <input
        type="text"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
        className={emptyFields.includes('title') ? 'error' : ''}
      />

      <label>Load (in kg):</label>
      <input
        type="number"
        onChange={(e) => setLoad(e.target.value)}
        value={load}
        className={emptyFields.includes('load') ? 'error' : ''}
      />

      <label>Reps:</label>
      <input
        type="number"
        onChange={(e) => setReps(e.target.value)}
        value={reps}
        className={emptyFields.includes('reps') ? 'error' : ''}
      />

      <button type="submit">{selectedWorkout ? 'Update Workout' : 'Add Workout'}</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default WorkoutForm;
