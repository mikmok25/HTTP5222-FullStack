import { useEffect, useState } from "react";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";
import WorkoutDetails from "../components/WorkoutDetails";
import WorkoutForm from "../components/WorkoutForm";

const Home = () => {
  const { workouts, dispatch } = useWorkoutsContext();
  const [isPending, setIsPending] = useState(true);
  const [selectedWorkout, setSelectedWorkout] = useState(null);

  useEffect(() => {
    setTimeout(() => {
      const fetchWorkouts = async () => {
        const response = await fetch("http://localhost:4000/api/workouts");
        const data = await response.json();
        if (response.ok) {
          dispatch({ type: "SET_WORKOUTS", payload: data });
        }
        setIsPending(false);
      };
      fetchWorkouts();
    }, 3000);
  }, [dispatch]);

  return (
    <>
      <div className="home">
        <div className="workouts">
          {isPending && <div>Loading</div>}
          {workouts &&
            workouts.map((workout) => (
              <WorkoutDetails key={workout._id} workout={workout} setSelectedWorkout={setSelectedWorkout}/>
            ))}
        </div>
        <WorkoutForm selectedWorkout={selectedWorkout} />
      </div>

    </>
  );
};

export default Home;
