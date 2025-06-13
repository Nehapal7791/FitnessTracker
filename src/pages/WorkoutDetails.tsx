import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeftIcon, ClockIcon, FireIcon, CheckCircleIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';

// Mock workout data
const mockWorkouts = {
  1: {
    id: 1,
    title: 'Mathematics',
    subtitle: 'Chapter 1: Introduction',
    description: 'Complete workout focused on core strength and cardio.',
    startTime: '11:35',
    endTime: '13:05',
    location: 'Room 5-216',
    instructor: 'Brooklyn Williamson',
    calories: 350,
    duration: 45,
    exercises: [
      { id: 1, name: 'Push-ups', sets: 3, reps: 15, completed: false },
      { id: 2, name: 'Squats', sets: 4, reps: 12, completed: false },
      { id: 3, name: 'Plank', sets: 3, reps: 60, isTime: true, completed: false },
      { id: 4, name: 'Jumping Jacks', sets: 3, reps: 20, completed: false },
    ],
    type: 'workout'
  },
  3: {
    id: 3,
    title: 'Geography',
    subtitle: 'Chapter 2: Economy USA',
    description: 'High intensity interval training for maximum fat burn.',
    startTime: '15:10',
    endTime: '16:40',
    location: 'Room 1-402',
    instructor: 'Jenny Alexander',
    calories: 420,
    duration: 30,
    exercises: [
      { id: 1, name: 'Burpees', sets: 3, reps: 10, completed: false,isTime: true },
      { id: 2, name: 'Mountain Climbers', sets: 3, reps: 30, completed: false,isTime: false },
      { id: 3, name: 'Kettlebell Swings', sets: 3, reps: 15, completed: false,isTime: true },
      { id: 4, name: 'Box Jumps', sets: 4, reps: 12, completed: false,isTime: false },
    ],
    type: 'workout'
  }
};

const WorkoutDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const numericId = Number(id);
   
  const workout = mockWorkouts[numericId as keyof typeof mockWorkouts];
  
  const [exercises, setExercises] = useState(workout?.exercises || []);
   
  if (!workout) {
    return (
      <div className="p-4 flex flex-col items-center justify-center h-screen">
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-2">Workout Not Found</h2>
          <p className="text-gray-600 mb-4">The workout you're looking for doesn't exist.</p>
          <button 
            onClick={() => navigate('/')}
            className="px-4 py-2 bg-green-500 text-white rounded-md"
          >
            Return to Calendar
          </button>
        </div>
      </div>
    );
  }
  
  // Toggle exercise completion
  const toggleExercise = (exerciseId: number) => {
    setExercises(prevExercises => 
      prevExercises.map(exercise => 
        exercise.id === exerciseId 
          ? { ...exercise, completed: !exercise.completed } 
          : exercise
      )
    );
  };
  
  // Calculate completion percentage
  const completedExercises = exercises.filter(ex => ex.completed).length;
  const completionPercentage = (completedExercises / exercises.length) * 100;
  
  return (
    <div className="bg-gradient-to-br from-white to-orange-50 min-h-screen w-full">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-500 to-pink-500 text-white p-4 shadow-md">
        <div className="flex items-center mb-6">
          <button 
            onClick={() => navigate(-1)}
            className="mr-4 p-1 rounded-full hover:bg-white/10 transition-colors"
          >
            <ArrowLeftIcon className="w-6 h-6" />
          </button>
          <h1 className="text-xl font-semibold">Workout Details</h1>
        </div>
        
        <h2 className="text-2xl font-bold mb-2">{workout.title}</h2>
        <p className="text-pink-100">{workout.subtitle}</p>
        
        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center">
            <ClockIcon className="w-5 h-5 mr-2 text-orange-200" />
            <span>{workout.duration} min</span>
          </div>
          <div className="flex items-center">
            <FireIcon className="w-5 h-5 mr-2 text-pink-200" />
            <span>{workout.calories} cal</span>
          </div>
        </div>
      </div>
      
      {/* Workout Progress */}
      <div className="p-4 border-b border-orange-100 bg-white shadow-sm">
        <div className="flex justify-between items-center mb-2">
          <h3 className="font-medium text-orange-800">Progress</h3>
          <span className="text-sm text-pink-600 font-medium">
            {completedExercises}/{exercises.length} exercises
          </span>
        </div>
        <div className="w-full bg-orange-100 rounded-full h-3">
          <div 
            className="bg-gradient-to-r from-orange-400 to-pink-400 h-3 rounded-full shadow-sm" 
            style={{ width: `${completionPercentage}%` }}
          ></div>
        </div>
      </div>
      
      {/* Exercise List */}
      <div className="p-4">
        <h3 className="font-medium mb-4 text-xl bg-gradient-to-r from-orange-500 to-pink-500 text-transparent bg-clip-text">Exercises</h3>
        
        <div className="space-y-4">
          {exercises.map((exercise) => (
            <div 
              key={exercise.id}
              className={`p-4 border rounded-lg shadow-sm transition-all ${exercise.completed ? 'bg-gradient-to-r from-orange-50 to-pink-50 border-orange-200' : 'bg-white border-orange-100'}`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="font-medium mb-1 text-orange-800">{exercise.name}</h4>
                  <p className="text-sm text-orange-600">
                    {exercise.sets} sets &times; {exercise.reps} {exercise.isTime !== undefined && exercise.isTime ? 'sec' : 'reps'}
                  </p>
                </div>
                <button 
                  onClick={() => toggleExercise(exercise.id)}
                  className={`p-2 rounded-full transition-colors ${exercise.completed ? 'text-orange-500' : 'text-gray-300 border border-orange-200 hover:bg-orange-50'}`}
                >
                  <CheckCircleIcon className="w-6 h-6" />
                </button>
              </div>
            </div>
          ))}
        </div>
        
        {/* Complete Workout Button */}
        <button 
          className="w-full py-3 bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white rounded-lg font-medium mt-6 shadow-md transition-colors"
        >
          Complete Workout
        </button>
      </div>
    </div>
  );
};

export default WorkoutDetails;
