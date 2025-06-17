import { useState } from 'react';
import { format } from 'date-fns';
import { CheckCircleIcon, PlusIcon } from '@heroicons/react/24/outline';

// Mock meal data
const initialMeals = [
  {
    id: 1,
    name: 'Breakfast',
    time: '08:00',
    calories: 450,
    protein: 25,
    carbs: 45,
    fat: 15,
    completed: false,
    items: [
      { id: 1, name: 'Oatmeal with berries', completed: false },
      { id: 2, name: 'Greek yogurt', completed: false },
      { id: 3, name: 'Protein shake', completed: false }
    ]
  },
  {
    id: 2,
    name: 'Lunch',
    time: '13:00',
    calories: 650,
    protein: 40,
    carbs: 60,
    fat: 20,
    completed: false,
    items: [
      { id: 1, name: 'Grilled chicken breast', completed: false },
      { id: 2, name: 'Quinoa', completed: false },
      { id: 3, name: 'Mixed vegetables', completed: false },
      { id: 4, name: 'Avocado', completed: false }
    ]
  },
  {
    id: 3,
    name: 'Dinner',
    time: '19:00',
    calories: 550,
    protein: 35,
    carbs: 40,
    fat: 18,
    completed: false,
    items: [
      { id: 1, name: 'Salmon fillet', completed: false },
      { id: 2, name: 'Brown rice', completed: false },
      { id: 3, name: 'Steamed broccoli', completed: false }
    ]
  },
];

const DietPlan = () => {
  const [meals, setMeals] = useState(initialMeals);
  const [waterIntake, setWaterIntake] = useState(3); // Default 3 glasses consumed
  const targetWater = 8; // Target 8 glasses per day
  
  // Toggle meal item completion
  const toggleMealItem = (mealId: number, itemId: number) => {
    setMeals(prevMeals => {
      return prevMeals.map(meal => {
        if (meal.id === mealId) {
          const updatedItems = meal.items.map(item => {
            if (item.id === itemId) {
              return { ...item, completed: !item.completed };
            }
            return item;
          });
          
          // Check if all items are completed
          const allCompleted = updatedItems.every(item => item.completed);
          
          return { 
            ...meal, 
            items: updatedItems,
            completed: allCompleted
          };
        }
        return meal;
      });
    });
  };
  
  // Add a glass of water
  const addWaterGlass = () => {
    if (waterIntake < targetWater) {
      setWaterIntake(prev => prev + 1);
    }
  };
  
  // Calculate total nutrition for the day
  const totalNutrition = meals.reduce(
    (acc, meal) => {
      return {
        calories: acc.calories + meal.calories,
        protein: acc.protein + meal.protein,
        carbs: acc.carbs + meal.carbs,
        fat: acc.fat + meal.fat
      };
    },
    { calories: 0, protein: 0, carbs: 0, fat: 0 }
  );
  
  // Calculate completion percentage
  const completedMeals = meals.filter(meal => meal.completed).length;
  const completionPercentage = (completedMeals / meals.length) * 100;
  
  return (
    <div className="p-4 sm:p-6 lg:p-8 w-full mx-auto">
      <div className="w-full bg-gradient-to-br from-white to-white-700 min-h-screen">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-1 bg-gradient-to-r from-orange-500 to-pink-500 text-transparent bg-clip-text">Diet Plan</h1>
        <p className="text-orange-600">{format(new Date(), 'EEEE, MMMM d, yyyy')}</p>
      </div>
      
      {/* Nutrition Summary */}
      <div className="bg-gradient-to-r from-orange-50 to-pink-50 rounded-lg p-4 md:p-6 mb-6 shadow-md">
        <h2 className="text-lg font-semibold mb-3 text-orange-800">Daily Nutrition</h2>
        
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="bg-white p-3 rounded-md shadow-sm">
            <div className="text-sm text-gray-500 mb-1">Calories</div>
            <div className="text-xl text-gray-500 font-bold">{totalNutrition.calories} <span className="text-sm font-normal">kcal</span></div>
          </div>
          
          <div className="bg-white p-3 rounded-md shadow-sm">
            <div className="text-sm text-gray-500 mb-1">Protein</div>
            <div className="text-xl text-gray-500 font-bold">{totalNutrition.protein} <span className="text-sm font-normal">g</span></div>
          </div>
          
          <div className="bg-white p-3 rounded-md shadow-sm">
            <div className="text-sm text-gray-500 mb-1">Carbs</div>
            <div className="text-xl text-gray-500 font-bold">{totalNutrition.carbs} <span className="text-sm font-normal">g</span></div>
          </div>
          
          <div className="bg-white p-3 rounded-md shadow-sm">
            <div className="text-sm text-gray-500 mb-1">Fat</div>
            <div className="text-xl text-gray-500 font-bold">{totalNutrition.fat} <span className="text-sm font-normal">g</span></div>
          </div>
        </div>
      </div>
      
      {/* Progress Tracking */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-lg font-semibold text-orange-800">Meals Progress</h2>
          <span className="text-sm font-medium text-orange-600">{completedMeals}/{meals.length} completed</span>
        </div>
        <div className="bg-gray-200 h-2.5 rounded-full overflow-hidden">
          <div 
            className="bg-gradient-to-r from-orange-500 to-pink-500 h-full rounded-full transition-all duration-300" 
            style={{ width: `${completionPercentage}%` }}
          ></div>
        </div>
      </div>
      
      {/* Water Intake */}
      <div className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-lg p-4 md:p-6 mb-6 shadow-md">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-lg font-semibold text-pink-800">Water Intake</h2>
          <span className="text-sm font-medium text-pink-600">{waterIntake}/{targetWater} glasses</span>
        </div>
        
        <div className="flex flex-wrap gap-1.5 mb-4">
          {Array.from({ length: targetWater }).map((_, index) => (
            <div 
              key={index} 
              className={`h-8 w-8 sm:w-10 rounded-full transition-all duration-300 ${index < waterIntake ? 'bg-gradient-to-r from-purple-400 to-pink-400' : 'bg-gray-200'}`}
            ></div>
          ))}
        </div>
        
        <button 
          onClick={addWaterGlass}
          className="w-full py-2.5 bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white rounded-md flex items-center justify-center shadow-md transition-all"
          disabled={waterIntake >= targetWater}
        >
          <PlusIcon className="w-5 h-5 mr-1" />
          <span>Add Glass</span>
        </button>
      </div>
      
      {/* Main content with two-column layout on desktop */}
      <div className="lg:flex lg:gap-6">
        {/* Meals List */}
        <div className="lg:w-8/12">
        <h2 className="font-semibold mb-4 text-xl bg-gradient-to-r from-orange-500 to-pink-500 text-transparent bg-clip-text">Today's Meals</h2>
        
        <div className="space-y-4">
          {meals.map((meal) => (
            <div 
              key={meal.id}
              className={`border rounded-lg overflow-hidden shadow-sm ${meal.completed ? 'bg-gradient-to-r from-orange-50 to-pink-50 border-orange-200' : 'border-gray-200'}`}
            >
              <div className="flex justify-between items-center p-4 border-b border-gray-100">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium text-orange-700">{meal.name}</h3>
                  <p className="text-sm text-orange-500">{meal.time} • {meal.calories} kcal</p>
                </div>
                <div className={`p-1 rounded-full ${meal.completed ? 'text-orange-500' : 'text-gray-300'}`}>
                  <CheckCircleIcon className="w-6 h-6" />
                </div>
              </div>
              
              <div className="p-4">
                <h4 className="text-sm text-orange-600 mb-2 font-medium">Food Items</h4>
                <div className="space-y-2">
                  {meal.items.map((item) => (
                    <div 
                      key={item.id}
                      className="flex items-center justify-between p-2 hover:bg-orange-50 rounded-lg cursor-pointer transition-colors"
                      onClick={() => toggleMealItem(meal.id, item.id)}
                    >
                      <span className={`${item.completed ? 'line-through text-orange-300' : 'text-gray-700'}`}>
                        {item.name}
                      </span>
                      <div className={`p-1 rounded-full ${item.completed ? 'text-orange-500' : 'text-gray-300 border border-orange-200'}`}>
                        <CheckCircleIcon className="w-5 h-5" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
        
        {/* Additional nutritional info or recommendations for desktop */}
        <div className="mt-6 lg:mt-0 lg:w-4/12 lg:flex lg:flex-col">
          <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-lg p-4 md:p-6 mb-6 shadow-md lg:sticky lg:top-4">
            <h2 className="text-lg font-semibold mb-3 text-blue-800">Nutritional Tips</h2>
            <div className="space-y-4">
              <div className="bg-white p-3 rounded-md shadow-sm">
                <h3 className="text-sm font-medium text-gray-700 mb-1">Stay Hydrated</h3>
                <p className="text-xs text-gray-500">Remember to drink water throughout the day to maintain optimal hydration.</p>
              </div>
              <div className="bg-white p-3 rounded-md shadow-sm">
                <h3 className="text-sm font-medium text-gray-700 mb-1">Protein Intake</h3>
                <p className="text-xs text-gray-500">Aim for 0.8-1g of protein per pound of body weight for muscle recovery.</p>
              </div>
              <div className="bg-white p-3 rounded-md shadow-sm">
                <h3 className="text-sm font-medium text-gray-700 mb-1">Balanced Meals</h3>
                <p className="text-xs text-gray-500">Include protein, complex carbs, and healthy fats in each meal for balanced nutrition.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
};

export default DietPlan;