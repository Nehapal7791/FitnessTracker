import { useState } from 'react';
import { format, subDays } from 'date-fns';
import { ArrowUpIcon, ArrowDownIcon, ScaleIcon, FireIcon } from '@heroicons/react/24/outline';

// Mock progress data - in a real app this would come from an API/context
const generateMockData = () => {
  const today = new Date();
  return [
    {
      date: format(today, 'yyyy-MM-dd'),
      weight: 75.5,
      calories: 1850,
      workoutsCompleted: 1,
      workoutMinutes: 45,
      stepsCount: 8500,
      waterIntake: 6
    },
    {
      date: format(subDays(today, 1), 'yyyy-MM-dd'),
      weight: 76.2,
      calories: 2050,
      workoutsCompleted: 1,
      workoutMinutes: 30,
      stepsCount: 7200,
      waterIntake: 5
    },
    {
      date: format(subDays(today, 2), 'yyyy-MM-dd'),
      weight: 76.2,
      calories: 1920,
      workoutsCompleted: 1,
      workoutMinutes: 60,
      stepsCount: 9100,
      waterIntake: 8
    },
    {
      date: format(subDays(today, 3), 'yyyy-MM-dd'),
      weight: 76.5,
      calories: 2100,
      workoutsCompleted: 0,
      workoutMinutes: 0,
      stepsCount: 6800,
      waterIntake: 4
    },
    {
      date: format(subDays(today, 4), 'yyyy-MM-dd'),
      weight: 76.7,
      calories: 1980,
      workoutsCompleted: 1,
      workoutMinutes: 55,
      stepsCount: 8900,
      waterIntake: 7
    },
    {
      date: format(subDays(today, 5), 'yyyy-MM-dd'),
      weight: 77.0,
      calories: 2200,
      workoutsCompleted: 1,
      workoutMinutes: 45,
      stepsCount: 7500,
      waterIntake: 6
    },
    {
      date: format(subDays(today, 6), 'yyyy-MM-dd'),
      weight: 77.2,
      calories: 2150,
      workoutsCompleted: 0,
      workoutMinutes: 0,
      stepsCount: 5200,
      waterIntake: 5
    },
  ];
};

// Progress metrics with trends
const ProgressTracker = () => {
  const [progressData] = useState(generateMockData());
  const [activeTab, setActiveTab] = useState('overview'); // 'overview', 'weight', 'activity'
  
  // Get today's and yesterday's data for comparison
  const todayData = progressData[0];
  const yesterdayData = progressData[1];
  
  // Calculate week totals and averages
  const weekSummary = progressData.reduce(
    (acc, day) => {
      return {
        totalWorkouts: acc.totalWorkouts + day.workoutsCompleted,
        totalWorkoutMinutes: acc.totalWorkoutMinutes + day.workoutMinutes,
        totalSteps: acc.totalSteps + day.stepsCount,
        totalWater: acc.totalWater + day.waterIntake,
        avgCalories: acc.avgCalories + day.calories / 7,
      };
    },
    { totalWorkouts: 0, totalWorkoutMinutes: 0, totalSteps: 0, totalWater: 0, avgCalories: 0 }
  );
  
  // Calculate weight change
  const startWeight = progressData[progressData.length - 1].weight;
  const currentWeight = progressData[0].weight;
  const weightDiff = startWeight - currentWeight;
  const weightChange = weightDiff > 0 
    ? { value: weightDiff.toFixed(1), trend: 'down', color: 'text-green-500' }
    : { value: Math.abs(weightDiff).toFixed(1), trend: 'up', color: 'text-red-500' };
  
  return (
    <div className="p-4 sm:p-6 lg:p-8 w-full max-w-full mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold mb-1 bg-gradient-to-r from-orange-500 to-pink-500 text-transparent bg-clip-text">Progress Tracker</h1>
        <p className="text-orange-600">{format(new Date(), 'MMMM d, yyyy')}</p>
      </div>
      
      {/* Tabs */}
      <div className="flex space-x-1 bg-gradient-to-r from-orange-100 to-pink-100 p-1 rounded-lg mb-6 shadow-sm max-w-md mx-auto md:mx-0">
        <button 
          className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${activeTab === 'overview' 
            ? 'bg-white shadow-sm text-orange-600' 
            : 'text-gray-600 hover:bg-white/50'}`}
          onClick={() => setActiveTab('overview')}
        >
          Overview
        </button>
        <button 
          className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${activeTab === 'weight' 
            ? 'bg-white shadow-sm text-orange-600' 
            : 'text-gray-600 hover:bg-white/50'}`}
          onClick={() => setActiveTab('weight')}
        >
          Weight
        </button>
        <button 
          className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${activeTab === 'activity' 
            ? 'bg-white shadow-sm text-orange-600' 
            : 'text-gray-600 hover:bg-white/50'}`}
          onClick={() => setActiveTab('activity')}
        >
          Activity
        </button>
      </div>
      
      {activeTab === 'overview' && (
        <>
          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-gradient-to-br from-orange-50 to-pink-50 rounded-lg p-4 border border-orange-100 shadow-sm">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-sm text-orange-600 mb-1 font-medium">Current Weight</h3>
                  <div className="text-2xl font-bold text-orange-800">{todayData.weight} <span className="text-sm font-normal">kg</span></div>
                </div>
                <div className="p-2 bg-white rounded-full shadow-sm">
                  <ScaleIcon className="w-5 h-5 text-orange-500" />
                </div>
              </div>
              <div className={`flex items-center mt-2 text-sm ${weightChange.trend === 'down' ? 'text-pink-500' : 'text-orange-500'}`}>
                {weightChange.trend === 'down' ? (
                  <ArrowDownIcon className="w-4 h-4 mr-1" />
                ) : (
                  <ArrowUpIcon className="w-4 h-4 mr-1" />
                )}
                <span>{weightChange.value} kg this week</span>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-pink-50 to-orange-50 rounded-lg p-4 border border-pink-100 shadow-sm">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-sm text-pink-600 mb-1 font-medium">Avg. Calories</h3>
                  <div className="text-2xl font-bold text-pink-800">{Math.round(weekSummary.avgCalories)} <span className="text-sm font-normal">kcal</span></div>
                </div>
                <div className="p-2 bg-white rounded-full shadow-sm">
                  <FireIcon className="w-5 h-5 text-pink-500" />
                </div>
              </div>
              <div className="text-sm text-pink-600 mt-2 font-medium">
                {Math.round(todayData.calories)} kcal today
              </div>
            </div>
          </div>
          
          {/* Weekly Summary */}
          <div className="bg-gradient-to-r from-orange-50 to-pink-50 rounded-lg p-4 md:p-6 mb-6 shadow-md border border-orange-100">
            <h2 className="font-medium bg-gradient-to-r from-orange-600 to-pink-600 text-transparent bg-clip-text mb-3 text-lg md:text-xl">Weekly Summary</h2>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <div className="text-xs text-orange-600 mb-1 font-medium">Workouts</div>
                <div className="text-xl font-semibold text-orange-800">{weekSummary.totalWorkouts}</div>
              </div>
              
              <div>
                <div className="text-xs text-pink-600 mb-1 font-medium">Active Time</div>
                <div className="text-xl font-semibold text-pink-800">{weekSummary.totalWorkoutMinutes} <span className="text-sm font-normal">min</span></div>
              </div>
              
              <div>
                <div className="text-xs text-orange-600 mb-1 font-medium">Total Steps</div>
                <div className="text-xl font-semibold text-orange-800">{(weekSummary.totalSteps).toLocaleString()}</div>
              </div>
              
              <div>
                <div className="text-xs text-pink-600 mb-1 font-medium">Water Intake</div>
                <div className="text-xl font-semibold text-pink-800">{weekSummary.totalWater} <span className="text-sm font-normal">glasses</span></div>
              </div>
            </div>
          </div>
          
          {/* Daily Comparison */}
          <div className="border border-orange-100 rounded-lg overflow-hidden shadow-md bg-white">
            <div className="bg-gradient-to-r from-orange-100 to-pink-100 p-4 md:p-5 border-b border-orange-200">
              <h2 className="font-medium text-orange-800 md:text-lg">Today vs. Yesterday</h2>
            </div>
            
            <div className="divide-y divide-orange-100">
              <div className="flex justify-between p-4 hover:bg-orange-50 transition-colors">
                <span className="text-orange-700">Steps</span>
                <div className="flex items-center">
                  <span className="font-medium mr-2 text-gray-800">{todayData.stepsCount.toLocaleString()}</span>
                  {todayData.stepsCount > yesterdayData.stepsCount ? (
                    <ArrowUpIcon className="w-4 h-4 text-orange-500" />
                  ) : (
                    <ArrowDownIcon className="w-4 h-4 text-pink-500" />
                  )}
                </div>
              </div>
              
              <div className="flex justify-between p-4 hover:bg-orange-50 transition-colors">
                <span className="text-orange-700">Workout Time</span>
                <div className="flex items-center">
                  <span className="font-medium mr-2 text-gray-800">{todayData.workoutMinutes} min</span>
                  {todayData.workoutMinutes > yesterdayData.workoutMinutes ? (
                    <ArrowUpIcon className="w-4 h-4 text-orange-500" />
                  ) : (
                    <ArrowDownIcon className="w-4 h-4 text-pink-500" />
                  )}
                </div>
              </div>
              
              <div className="flex justify-between p-4 hover:bg-orange-50 transition-colors">
                <span className="text-pink-700">Calories</span>
                <div className="flex items-center">
                  <span className="font-medium mr-2 text-gray-800">{todayData.calories} kcal</span>
                  {todayData.calories < yesterdayData.calories ? (
                    <ArrowDownIcon className="w-4 h-4 text-orange-500" />
                  ) : (
                    <ArrowUpIcon className="w-4 h-4 text-pink-500" />
                  )}
                </div>
              </div>
              
              <div className="flex justify-between p-4 hover:bg-orange-50 transition-colors">
                <span className="text-pink-700">Water</span>
                <div className="flex items-center">
                  <span className="font-medium mr-2 text-gray-800">{todayData.waterIntake} glasses</span>
                  {todayData.waterIntake > yesterdayData.waterIntake ? (
                    <ArrowUpIcon className="w-4 h-4 text-orange-500" />
                  ) : (
                    <ArrowDownIcon className="w-4 h-4 text-pink-500" />
                  )}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
      
      {activeTab === 'weight' && (
        <div className="text-center py-12 md:py-24 bg-gradient-to-br from-white to-orange-50 rounded-lg shadow-sm border border-orange-100 max-w-4xl mx-auto">
          <p className="text-orange-600 font-medium md:text-lg">Weight tracking chart will be displayed here</p>
          <p className="text-sm md:text-base text-pink-500 mt-3">Feature coming soon</p>
          <div className="mt-6 flex justify-center">
            <div className="w-32 md:w-48 h-1 md:h-2 bg-gradient-to-r from-orange-300 to-pink-300 rounded-full"></div>
          </div>
        </div>
      )}
      
      {activeTab === 'activity' && (
        <div className="text-center py-12 md:py-24 bg-gradient-to-br from-white to-pink-50 rounded-lg shadow-sm border border-pink-100 max-w-4xl mx-auto">
          <p className="text-pink-600 font-medium md:text-lg">Activity tracking charts will be displayed here</p>
          <p className="text-sm md:text-base text-orange-500 mt-3">Feature coming soon</p>
          <div className="mt-6 flex justify-center">
            <div className="w-32 md:w-48 h-1 md:h-2 bg-gradient-to-r from-pink-300 to-orange-300 rounded-full"></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProgressTracker;