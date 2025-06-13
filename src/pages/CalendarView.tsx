import { useState } from 'react';
import { format, addDays, startOfToday, eachDayOfInterval, startOfWeek, isSameDay } from 'date-fns';
import { 
  ChevronLeftIcon, 
  ChevronRightIcon, 
  EllipsisVerticalIcon, 
  MapPinIcon, 
  UserIcon,
  FireIcon,
  ClockIcon
} from '@heroicons/react/24/outline';
import ActivityCard from '../components/calendar/ActivityCard';
import DailyProgress from '../components/calendar/DailyProgress';

// Types for activity data
interface Activity {
  id: number;
  title: string;
  subtitle: string;
  startTime: string;
  endTime: string;
  location: string;
  instructor: string;
  type: 'workout' | 'diet' | 'other';
  date: Date;
  duration?: number; // in minutes
  calories?: number;
  completed?: boolean;
  progress?: number; // percentage of completion
  details?: string[];
}

// Mock data for activities
const generateMockActivities = (date: Date): Activity[] => {
  const baseActivities: Omit<Activity, 'id' | 'date'>[] = [
    {
      title: 'Morning Workout',
      subtitle: 'Cardio & Strength',
      startTime: '07:00',
      endTime: '08:00',
      location: 'Gym',
      instructor: 'Alex Johnson',
      type: 'workout',
      duration: 60,
      calories: 320,
      completed: true,
      progress: 100,
      details: ['Push-ups', 'Squats', 'Planks']
    },
    {
      title: 'Meal Plan',
      subtitle: 'Lunch - High Protein',
      startTime: '12:30',
      endTime: '13:00',
      location: 'Cafeteria',
      instructor: 'Nutritionist',
      type: 'diet',
      calories: 650,
      completed: true
    },
    {
      title: 'Evening Run',
      subtitle: '5K Training',
      startTime: '18:00',
      endTime: '18:45',
      location: 'Park',
      instructor: 'Running Coach',
      type: 'workout',
      duration: 45,
      calories: 420,
      completed: false,
      progress: 0,
      details: ['Warm-up', 'Distance Run', 'Cool-down']
    },
    {
      title: 'Strength Training',
      subtitle: 'Core & Upper Body',
      startTime: '19:30',
      endTime: '20:30',
      location: 'Home',
      instructor: 'Self-guided',
      type: 'workout',
      duration: 60,
      calories: 280,
      completed: false,
      progress: 0,
      details: ['Sit-ups', 'Push-ups', 'Pull-ups', 'Crunches']
    }
  ];

  return baseActivities.map((activity, index) => ({
    ...activity,
    id: index + 1,
    date: new Date(date)
  }));
};

const CalendarView = () => {
  const today = startOfToday();
  const [selectedDate, setSelectedDate] = useState(today);
  const [currentWeek, setCurrentWeek] = useState(startOfWeek(today, { weekStartsOn: 1 })); // Start week on Monday
  
  // Generate days for current week view
  const weekDays = eachDayOfInterval({
    start: currentWeek,
    end: addDays(currentWeek, 6)
  });

  // Go to previous week
  const previousWeek = () => {
    setCurrentWeek(prevWeek => addDays(prevWeek, -7));
  };

  // Go to next week
  const nextWeek = () => {
    setCurrentWeek(prevWeek => addDays(prevWeek, 7));
  };
 
  const dailyActivities = generateMockActivities(selectedDate);

  return (
    <div className="p-4 sm:p-6 bg-white h-full w-full"> 
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-orange-500 to-pink-500 text-transparent bg-clip-text">
              {format(selectedDate, 'dd')}
            </h2>
            <div className="flex flex-col sm:flex-row sm:gap-2">
              <span className="text-lg font-medium text-orange-700">{format(selectedDate, 'EEEE')}</span>
              <span className="text-orange-500">{format(selectedDate, 'MMMM yyyy')}</span>
            </div>
          </div>
          {isSameDay(selectedDate, today) && (
            <span className="inline-block mt-1 px-3 py-1 bg-gradient-to-r from-orange-50 to-orange-100 text-orange-700 rounded-full text-sm font-medium">
              Today
            </span>
          )}
        </div>
        <div className="flex items-center space-x-2">
          <button className="px-4 py-2 bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white rounded-lg text-sm font-medium transition-colors shadow-md">
            Add Workout
          </button>
        </div>
      </div>
       
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <button 
            onClick={previousWeek} 
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            aria-label="Previous week"
          >
            <ChevronLeftIcon className="w-5 h-5 text-orange-600" />
          </button>
          <h3 className="text-sm font-medium text-gray-700">
            {format(weekDays[0], 'MMMM yyyy')}
          </h3>
          <button 
            onClick={nextWeek} 
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            aria-label="Next week"
          >
            <ChevronRightIcon className="w-5 h-5 text-gray-600" />
          </button>
        </div>
        
        {/* Day selector - responsive */}
        <div className="grid grid-cols-7 gap-1 text-center bg-gradient-to-r from-orange-50 to-pink-50 rounded-xl p-1 sm:p-2 shadow-md">
          {weekDays.map((day) => {
            const isSelected = isSameDay(day, selectedDate);
            const isToday = isSameDay(day, today);
            
            return (
              <button
                key={day.toString()}
                onClick={() => setSelectedDate(day)}
                className={`p-0.5 sm:p-1 rounded-lg transition-all duration-200 ${isSelected ? 'bg-gradient-to-br from-orange-400 to-pink-500 shadow-md transform scale-100' : 'bg-gray-50 hover:bg-orange-100'}`}
              >
                <div className={`text-[10px] xs:text-xs font-medium mb-0.5 sm:mb-1 ${isSelected ? 'text-white' : 'text-orange-600'}`}>
                  {format(day, 'EEE')}
                </div>
                <div className={`
                  w-7 h-7 xs:w-8 xs:h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 mx-auto rounded-full flex items-center justify-center text-sm sm:text-base
                  ${isSelected ? 'bg-white text-orange-600 font-bold' : ''}
                  ${isToday && !isSelected ? 'border-2 border-orange-400 text-orange-600 bg-orange-50' : ''}
                  ${!isToday && !isSelected ? 'text-gray-700' : ''}
                `}>
                  {format(day, 'd')}
                </div>
              </button>
            );
          })}
        </div>
      </div>
      
      {/* Tab navigation */}
      <div className="flex overflow-x-auto border-b border-orange-200 mb-6 pb-px hide-scrollbar">
        <button className="text-sm font-medium text-orange-600 pb-2 px-4 border-b-2 border-orange-500 whitespace-nowrap">Today</button>
        <button className="text-sm font-medium text-gray-200 pb-2 px-4 whitespace-nowrap hover:text-orange-700 transition-colors">Upcoming</button>
        <button className="text-sm font-medium text-gray-200 pb-2 px-4 whitespace-nowrap hover:text-orange-700 transition-colors">Completed</button>
        <div className="flex-1"></div>
        <button className="p-2 hover:bg-orange-100 rounded-full transition-colors">
          <EllipsisVerticalIcon className="w-5 h-5 text-orange-500" />
        </button>
      </div>
      
      {/* Exercise Highlight Card - Move this outside the component in a real app */}
      <div className="bg-gradient-to-r from-orange-50 to-pink-50 rounded-xl p-4 mb-6 border border-orange-200 shadow-md">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-semibold text-orange-800 text-lg">Today's Focus</h3>
          <div className="flex items-center gap-3">
            <div className="flex items-center text-xs text-orange-600">
              <ClockIcon className="w-4 h-4 mr-1" />
              <span>45 min</span>
            </div>
            <div className="flex items-center text-xs text-orange-600">
              <FireIcon className="w-4 h-4 mr-1" />
              <span>320 cal</span>
            </div>
            <span className="text-xs text-white bg-gradient-to-r from-orange-400 to-pink-500 px-3 py-1 rounded-full font-medium shadow-sm">Strength</span>
          </div>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4">
          {[
            { name: 'Push-ups', sets: 3, reps: 15, completed: true },
            { name: 'Squats', sets: 4, reps: 12, completed: true },
            { name: 'Planks', sets: 3, reps: "60s", completed: true },
            { name: 'Sit-ups', sets: 3, reps: 20, completed: false }
          ].map((exercise, index) => (
            <div key={index} className={`p-4 rounded-lg ${exercise.completed ? 'bg-white text-orange-900 shadow-md' : 'bg-orange-100/50 text-orange-700'} border ${exercise.completed ? 'border-orange-200' : 'border-orange-300'}`}>
              <p className="text-sm font-semibold">{exercise.name}</p>
              <p className="text-xs text-orange-600 mt-1">{exercise.sets} × {exercise.reps}</p>
            </div>
          ))}
        </div>
      </div>
       
      <DailyProgress date={selectedDate} />
       
      <h3 className="font-semibold text-gray-800 mt-8 mb-4">Schedule</h3>
      <div className="space-y-4">
        {dailyActivities.length > 0 ? (
          dailyActivities.map(activity => (
            <ActivityCard key={`${activity.id}-${activity.date.getTime()}`} activity={activity} />
          ))
        ) : (
          <div className="text-center py-8 rounded-lg border border-gray-200 bg-gray-50">
            <p className="text-gray-500">No activities scheduled for today</p>
            <button className="mt-2 text-sm text-green-600 font-medium hover:text-green-700 transition-colors">+ Add Activity</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CalendarView;
