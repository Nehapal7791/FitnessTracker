import { format } from 'date-fns';
import { CheckCircleIcon, XCircleIcon, PlusCircleIcon } from '@heroicons/react/24/outline';

interface DailyProgressProps {
  date: Date;
}

// Expanded mock data types
interface WorkoutExercise {
  id: string;
  name: string;
  completed: boolean;
  sets?: number;
  reps?: number;
}

interface MealPlan {
  id: string;
  name: string;
  time: string;
  completed: boolean;
  calories?: number;
}

const DailyProgress = ({ date }: DailyProgressProps) => {
  // Mock progress data (in a real app, this would come from API/context)
  const progressData = {
    workout: {
      total: 5,
      completed: 3,
      exercises: [
        { id: 'ex1', name: 'Push-ups', completed: true, sets: 3, reps: 15 },
        { id: 'ex2', name: 'Squats', completed: true, sets: 4, reps: 12 },
        { id: 'ex3', name: 'Plank', completed: true, sets: 3, reps: 60 },
        { id: 'ex4', name: 'Lunges', completed: false, sets: 3, reps: 10 },
        { id: 'ex5', name: 'Pull-ups', completed: false, sets: 3, reps: 8 },
      ] as WorkoutExercise[]
    },
    diet: {
      total: 3,
      completed: 2,
      meals: [
        { id: 'meal1', name: 'Breakfast', time: '08:00', completed: true, calories: 450 },
        { id: 'meal2', name: 'Lunch', time: '13:00', completed: true, calories: 650 },
        { id: 'meal3', name: 'Dinner', time: '19:00', completed: false, calories: 550 },
      ] as MealPlan[]
    },
    water: {
      target: 8, // 8 glasses
      consumed: 5,
      schedule: Array.from({ length: 8 }, (_, i) => ({
        id: `water${i+1}`,
        time: `${Math.floor(8 + i * 1.5)}:00`,
        consumed: i < 5
      }))
    }
  };

  // Calculate percentages
  const workoutPercent = (progressData.workout.completed / progressData.workout.total) * 100;
  const dietPercent = (progressData.diet.completed / progressData.diet.total) * 100;
  const waterPercent = (progressData.water.consumed / progressData.water.target) * 100;

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
      <div className="bg-gradient-to-r from-green-50 to-blue-50 p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h3 className="font-medium text-gray-800">Daily Progress</h3>
          <span className="text-sm text-gray-500 font-medium">{format(date, 'EEEE, dd MMM yyyy')}</span>
        </div>
      </div>
      
      <div className="p-4 space-y-6">
        {/* Workout Progress */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <h4 className="font-medium text-gray-800">Workout Progress</h4>
            <span className="text-sm font-medium text-gray-700 bg-green-100 px-2 py-1 rounded-full">
              {progressData.workout.completed}/{progressData.workout.total} completed
            </span>
          </div>
          
          <div className="w-full bg-gray-100 rounded-full h-2.5 mb-4">
            <div 
              className="bg-green-500 h-2.5 rounded-full transition-all duration-300" 
              style={{ width: `${workoutPercent}%` }}
            ></div>
          </div>
          
          <div className="space-y-2 max-h-40 overflow-y-auto pr-1">
            {progressData.workout.exercises.map(exercise => (
              <div 
                key={exercise.id} 
                className={`flex items-center justify-between p-2 rounded-md border ${exercise.completed ? 'bg-green-50 border-green-200' : 'bg-gray-50 border-gray-200'}`}
              >
                <div className="flex items-center">
                  {exercise.completed ? 
                    <CheckCircleIcon className="w-5 h-5 text-green-500 mr-2" /> :
                    <XCircleIcon className="w-5 h-5 text-gray-300 mr-2" />
                  }
                  <span className="text-sm">{exercise.name}</span>
                </div>
                <span className="text-xs text-gray-500">{exercise.sets} × {exercise.reps}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Diet Progress */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <h4 className="font-medium text-gray-800">Diet Plan</h4>
            <span className="text-sm font-medium text-gray-700 bg-blue-100 px-2 py-1 rounded-full">
              {progressData.diet.completed}/{progressData.diet.total} meals
            </span>
          </div>
          
          <div className="w-full bg-gray-100 rounded-full h-2.5 mb-4">
            <div 
              className="bg-blue-500 h-2.5 rounded-full transition-all duration-300" 
              style={{ width: `${dietPercent}%` }}
            ></div>
          </div>
          
          <div className="space-y-2">
            {progressData.diet.meals.map(meal => (
              <div 
                key={meal.id} 
                className={`flex items-center justify-between p-2 rounded-md border ${meal.completed ? 'bg-blue-50 border-blue-200' : 'bg-gray-50 border-gray-200'}`}
              >
                <div className="flex items-center">
                  {meal.completed ? 
                    <CheckCircleIcon className="w-5 h-5 text-blue-500 mr-2" /> :
                    <XCircleIcon className="w-5 h-5 text-gray-300 mr-2" />
                  }
                  <div>
                    <span className="text-sm block">{meal.name}</span>
                    <span className="text-xs text-gray-500">{meal.time}</span>
                  </div>
                </div>
                <span className="text-xs font-medium text-gray-500">{meal.calories} cal</span>
              </div>
            ))}
          </div>
        </div>

        {/* Water Intake */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <h4 className="font-medium text-gray-800">Water Intake</h4>
            <span className="text-sm font-medium text-gray-700 bg-cyan-100 px-2 py-1 rounded-full">
              {progressData.water.consumed}/{progressData.water.target} glasses
            </span>
          </div>
          
          <div className="relative w-full bg-gray-100 rounded-lg h-6 mb-2 overflow-hidden">
            <div 
              className="bg-cyan-500 h-full transition-all duration-300" 
              style={{ width: `${waterPercent}%` }}
            ></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-xs font-medium text-gray-700">
                {progressData.water.consumed} of {progressData.water.target} glasses
              </span>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2 mt-3">
            {progressData.water.schedule.map((glass, idx) => (
              <button 
                key={glass.id}
                className={`flex items-center justify-center rounded-full w-8 h-8 border ${glass.consumed ? 'bg-cyan-100 border-cyan-300 text-cyan-600' : 'bg-gray-50 border-gray-200 text-gray-400'}`}
              >
                {idx + 1}
              </button>
            ))}
            <button className="flex items-center justify-center rounded-full w-8 h-8 bg-gray-50 border border-gray-200">
              <PlusCircleIcon className="w-5 h-5 text-gray-400" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DailyProgress;
