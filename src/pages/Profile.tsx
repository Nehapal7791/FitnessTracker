import { useState, type JSX } from 'react';
import { 
  ChevronRightIcon, 
  UserCircleIcon,
  BellIcon,
  CogIcon,
  QuestionMarkCircleIcon, 
  DocumentTextIcon,
  ArrowLeftOnRectangleIcon 
} from '@heroicons/react/24/outline';

// Mock user data
const mockUser = {
  name: 'Alex Johnson',
  email: 'alex.johnson@example.com',
  memberSince: 'January 2023',
  profileImage: null, // URL would go here if we had an image
  height: 175, // in cm
  weight: 75.5, // in kg
  goals: {
    weeklyWorkouts: 4,
    dailyCalories: 2000,
    dailyWaterIntake: 8, // glasses
    targetWeight: 73 // in kg
  }
};

const ProfileSection = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="mb-6">
    <h2 className="text-lg font-semibold mb-2 text-orange-800">{title}</h2>
    <div className="bg-white rounded-lg overflow-hidden border border-orange-100 shadow-sm">
      {children}
    </div>
  </div>
);

const ProfileLink = ({ 
  icon, 
  title, 
  description = '', 
  onClick 
}: { 
  icon: JSX.Element; 
  title: string; 
  description?: string; 
  onClick: () => void 
}) => (
  <div 
    className="flex items-center justify-between p-4 cursor-pointer hover:bg-orange-50 active:bg-orange-100 transition-colors"
    onClick={onClick}
  >
    <div className="flex items-center">
      <div className="text-orange-500 mr-3">
        {icon}
      </div>
      <div>
        <div className="font-medium">{title}</div>
        {description && <div className="text-sm text-gray-500">{description}</div>}
      </div>
    </div>
    <ChevronRightIcon className="w-5 h-5 text-gray-400" />
  </div>
);

interface UserData {
  name: string;
  email: string;
  height: number;
  weight: number;
}

const Profile = () => {
  const [isEditingGoals, setIsEditingGoals] = useState(false);
  const [goals, setGoals] = useState(mockUser.goals);
  const [userData, setUserData] = useState<UserData>({
    name: mockUser.name,
    email: mockUser.email,
    height: mockUser.height,
    weight: mockUser.weight
  });
  
  const handleSaveGoals = () => {
    // In a real app, would save to API/backend here
    setIsEditingGoals(false);
  };
  
  const handleUpdateGoal = (key: keyof typeof goals, value: number) => {
    setGoals(prev => ({ ...prev, [key]: value }));
  };
  
  const updateUserData = (key: keyof typeof userData, value: number) => {
    setUserData(prev => ({ ...prev, [key]: value }));
  };
  
  const navigateToPage = (page: string) => {
    // In a real app, would navigate to the page
    console.log(`Navigating to ${page}`);
  };
  
  return (
    <div className="p-4 sm:p-6 lg:p-8 w-full max-w-full mx-auto">
      <div className="bg-white p-4 md:p-6 shadow-sm rounded-b-lg">
        <div className="flex items-center">
          <div className="h-16 w-16 bg-gray-200 rounded-full flex items-center justify-center mr-4 overflow-hidden">
            {mockUser.profileImage ? (
              <img src={mockUser.profileImage} alt={mockUser.name} className="w-full h-full object-cover" />
            ) : (
              <UserCircleIcon className="w-10 h-10 text-gray-400" />
            )}
          </div>
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-pink-500 text-transparent bg-clip-text">{mockUser.name}</h1>
            <p className="text-orange-600">{mockUser.email}</p>
            <p className="text-sm text-orange-400">Member since {mockUser.memberSince}</p>
          </div>
        </div>
      </div>
      
      <div className="p-4 md:p-6">
        {/* Main content with two-column layout on desktop */}
        <div className="lg:flex lg:gap-6">
          <div className="lg:w-8/12 space-y-6">
            {/* Stats Overview */}
            <ProfileSection title="My Stats">
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4 gap-3 md:gap-4">
                <div className="bg-gradient-to-r from-pink-50 to-orange-50 p-3 rounded-lg shadow-sm">
                  <div className="text-sm text-orange-600 font-medium">Height</div>
                  <div className="text-lg font-bold text-orange-800">{mockUser.height} cm</div>
                </div>
                <div className="bg-gradient-to-r from-pink-50 to-orange-50 p-3 rounded-lg shadow-sm">
                  <div className="text-sm text-orange-600 font-medium">Weight</div>
                  <div className="text-lg font-bold text-orange-800">{mockUser.weight} kg</div>
                </div>
                <div className="bg-gradient-to-r from-orange-50 to-pink-50 p-3 rounded-lg shadow-sm">
                  <div className="text-sm text-orange-600 font-medium">BMI</div>
                  <div className="text-lg font-bold text-orange-800">
                    {(mockUser.weight / Math.pow(mockUser.height/100, 2)).toFixed(1)}
                  </div>
                </div>
                <div className="bg-gradient-to-r from-pink-50 to-orange-50 p-3 rounded-lg shadow-sm">
                  <div className="text-sm text-orange-600 font-medium">Target Weight</div>
                  <div className="text-lg font-bold text-orange-800">{goals.targetWeight} kg</div>
                </div>
              </div>
            </ProfileSection>
        
            {/* Fitness Goals */}
            <ProfileSection title="Fitness Goals">
              <div className="p-4 md:p-6">
                {isEditingGoals ? (
                  <div className="space-y-4 md:grid md:grid-cols-2 md:gap-6 md:space-y-0">
                    <div>
                      <label className="block text-sm text-orange-600 mb-1 font-medium">Weekly Workouts</label>
                      <input 
                        type="number" 
                        value={goals.weeklyWorkouts}
                        onChange={(e) => handleUpdateGoal('weeklyWorkouts', parseInt(e.target.value))}
                        className="border border-orange-200 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-orange-700 mb-1">Height (cm)</label>
                      <div className="relative">
                        <input
                          type="number"
                          value={userData.height}
                          onChange={(e) => updateUserData('height', parseInt(e.target.value) || 0)}
                          className="w-full p-2 pl-3 pr-3 border border-orange-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 bg-white shadow-sm"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm text-orange-600 mb-1 font-medium">Daily Water (glasses)</label>
                      <input 
                        type="number" 
                        value={goals.dailyWaterIntake}
                        onChange={(e) => handleUpdateGoal('dailyWaterIntake', parseInt(e.target.value))}
                        className="border border-orange-200 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-orange-700 mb-1">Weight (kg)</label>
                      <div className="relative">
                        <input
                          type="number"
                          value={userData.weight}
                          onChange={(e) => updateUserData('weight', parseFloat(e.target.value) || 0)}
                          className="w-full p-2 pl-3 pr-3 border border-orange-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 bg-white shadow-sm"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm text-orange-600 mb-1 font-medium">Daily Calories</label>
                      <input 
                        type="number" 
                        value={goals.dailyCalories}
                        onChange={(e) => handleUpdateGoal('dailyCalories', parseInt(e.target.value))}
                        className="border border-orange-200 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-orange-600 mb-1 font-medium">Target Weight (kg)</label>
                      <input 
                        type="number" 
                        value={goals.targetWeight}
                        onChange={(e) => handleUpdateGoal('targetWeight', parseFloat(e.target.value))}
                        className="border border-orange-200 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        step="0.1"
                      />
                    </div>
                    <div className="flex items-end justify-end md:col-span-2">
                      <button 
                        onClick={handleSaveGoals}
                        className="bg-gradient-to-r from-orange-500 to-pink-500 text-white px-4 py-2 rounded-md hover:from-orange-600 hover:to-pink-600 active:from-orange-700 active:to-pink-700 transition-all"
                      >
                        Save Changes
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="divide-y divide-gray-100">
                      <div className="flex justify-between p-4">
                        <span className="text-orange-600">Weekly Workouts</span>
                        <span className="font-medium text-orange-800">{goals.weeklyWorkouts}</span>
                      </div>
                      <div className="flex justify-between p-4">
                        <span className="text-orange-600">Daily Calories</span>
                        <span className="font-medium text-orange-800">{goals.dailyCalories} kcal</span>
                      </div>
                      <div className="flex justify-between p-4">
                        <span className="text-orange-600">Daily Water Intake</span>
                        <span className="font-medium text-orange-800">{goals.dailyWaterIntake} glasses</span>
                      </div>
                      <div className="flex justify-between p-4">
                        <span className="text-orange-600">Target Weight</span>
                        <span className="font-medium text-orange-800">{goals.targetWeight} kg</span>
                      </div>
                    </div>
                    <div className="p-4 border-t border-gray-100">
                      <button 
                        className="w-full py-2.5 bg-gradient-to-r from-orange-400 to-pink-400 text-white rounded-lg font-medium shadow-md hover:from-orange-500 hover:to-pink-500 transition-colors"
                        onClick={() => setIsEditingGoals(true)}
                      >
                        Edit Goals
                      </button>
                    </div>
                  </>
                )}
              </div>
            </ProfileSection>
        
          </div>
          <div className="lg:w-4/12 space-y-6 mt-6 lg:mt-0">
            {/* Settings */}
            <ProfileSection title="Account Settings">
              <div className="divide-y divide-gray-100">
                <ProfileLink 
                  icon={<UserCircleIcon className="w-6 h-6" />} 
                  title="Personal Information" 
                  description="Update your personal details"
                  onClick={() => navigateToPage('personal-info')}
                />
                <ProfileLink 
                  icon={<BellIcon className="w-6 h-6" />} 
                  title="Notifications" 
                  description="Manage your notification preferences"
                  onClick={() => navigateToPage('notifications')}
                />
                <ProfileLink 
                  icon={<CogIcon className="w-6 h-6" />} 
                  title="Preferences" 
                  description="Customize your app experience"
                  onClick={() => navigateToPage('preferences')}
                />
                <ProfileLink 
                  icon={<QuestionMarkCircleIcon className="w-6 h-6" />} 
                  title="Help & Support" 
                  description="Get assistance with the app"
                  onClick={() => navigateToPage('help')}
                />
                <ProfileLink 
                  icon={<DocumentTextIcon className="w-6 h-6" />} 
                  title="Terms & Privacy" 
                  description="Review our policies"
                  onClick={() => navigateToPage('terms')}
                />
                <ProfileLink 
                  icon={<ArrowLeftOnRectangleIcon className="w-6 h-6" />} 
                  title="Sign Out" 
                  onClick={() => navigateToPage('logout')}
                />
              </div>
            </ProfileSection>
        
            {/* Help & Support */}
            <ProfileSection title="Help & Support">
              <div className="divide-y divide-gray-100">
                <ProfileLink 
                  icon={<QuestionMarkCircleIcon className="w-6 h-6" />} 
                  title="FAQs" 
                  onClick={() => navigateToPage('faqs')}
                />
                <ProfileLink 
                  icon={<DocumentTextIcon className="w-6 h-6" />} 
                  title="Terms of Service" 
                  onClick={() => navigateToPage('terms')}
                />
                <ProfileLink 
                  icon={<ArrowLeftOnRectangleIcon className="w-6 h-6" />} 
                  title="Log Out" 
                  onClick={() => console.log('Logging out')}
                />
              </div>
            </ProfileSection>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
