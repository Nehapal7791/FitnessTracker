import { 
  EllipsisVerticalIcon, 
  MapPinIcon, 
  UserIcon, 
  ClockIcon, 
  FireIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';

interface Activity {
  id: number;
  title: string;
  subtitle: string;
  startTime: string;
  endTime: string;
  location: string;
  instructor: string;
  type: 'workout' | 'diet' | 'other';
  duration?: number; // in minutes
  calories?: number;
  completed?: boolean;
  progress?: number; // percentage of completion
  details?: string[];
}

interface ActivityCardProps {
  activity: Activity;
}

const ActivityCard = ({ activity }: ActivityCardProps) => {
  // Calculate color scheme based on activity type
  const getTypeStyles = (type: string) => {
    switch(type) {
      case 'workout':
        return {
          bg: 'bg-orange-50',
          border: 'border-orange-500',
          text: 'text-orange-800',
          progress: 'bg-gradient-to-r from-orange-500 to-pink-500',
          badge: 'bg-orange-100 text-orange-800',
          icon: 'text-orange-500'
        };
      case 'diet':
        return {
          bg: 'bg-pink-50',
          border: 'border-pink-500',
          text: 'text-pink-800',
          progress: 'bg-gradient-to-r from-pink-500 to-purple-500',
          badge: 'bg-pink-100 text-pink-800',
          icon: 'text-pink-500'
        };
      default:
        return {
          bg: 'bg-gray-50',
          border: 'border-orange-300',
          text: 'text-gray-800',
          progress: 'bg-orange-400',
          badge: 'bg-gray-100 text-gray-800',
          icon: 'text-orange-400'
        };
    }
  };

  const typeStyles = getTypeStyles(activity.type);
  const duration = activity.duration ? `${activity.duration} min` : '';
  
  return (
    <Link to={`/workout/${activity.id}`} className="block group transition-all duration-200 hover:scale-[1.01] md:hover:scale-[1.005]">
      <div className={`
        rounded-lg overflow-hidden border shadow-sm
        ${typeStyles.bg} border-gray-200
        transition-all duration-200
        hover:shadow-md md:hover:shadow-lg
      `}>
        <div className="flex flex-col sm:flex-row">
          {/* Time column */}
          <div className="p-4 text-sm flex flex-row sm:flex-col justify-between sm:justify-start sm:w-24 md:w-28 lg:w-32 border-b sm:border-b-0 sm:border-r border-gray-200">
            <div>
              <div className="font-semibold">{activity.startTime}</div>
              <div className="text-gray-500">{activity.endTime}</div>
            </div>
            <div className="flex flex-row sm:flex-col sm:mt-3 items-end sm:items-start">
              {activity.duration && (
                <div className="flex items-center text-xs text-gray-500 mr-3 sm:mr-0">
                  <ClockIcon className="w-3 h-3 mr-1" />
                  <span>{duration}</span>
                </div>
              )}
              {activity.calories && (
                <div className="flex items-center text-xs text-gray-500 mt-0 sm:mt-1">
                  <FireIcon className="w-3 h-3 mr-1" />
                  <span>{activity.calories} cal</span>
                </div>
              )}
            </div>
          </div>
          
          {/* Content column */}
          <div className={`
            flex-1 p-4 md:p-5 lg:p-6 border-l-4
            ${typeStyles.border}
            relative
          `}>
            <div className="flex justify-between items-start">
              <div>
                <div className="flex items-center">
                  <h3 className="font-medium text-base">{activity.title}</h3>
                  {activity.completed && (
                    <CheckCircleIcon className="w-4 h-4 ml-2 text-orange-500" />
                  )}
                </div>
                <p className="text-sm text-gray-600">{activity.subtitle}</p>
              </div>
              <div className="flex items-center">
                {activity.type === 'workout' && activity.progress !== undefined && (
                  <div className="mr-3 flex items-center">
                    <div className="w-12 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className={`h-full ${typeStyles.progress}`} 
                        style={{ width: `${activity.progress}%` }}
                      ></div>
                    </div>
                    <span className="text-xs text-gray-500 ml-1">{activity.progress}%</span>
                  </div>
                )}
                <button className="p-1 hover:bg-gray-100 rounded-full">
                  <EllipsisVerticalIcon className="w-5 h-5 text-gray-400" />
                </button>
              </div>
            </div>
            
            {activity.details && activity.details.length > 0 && (
              <div className="mt-2 space-x-2 flex flex-wrap">
                {activity.details.map((detail, index) => (
                  <span 
                    key={index}
                    className={`text-xs px-2 py-1 rounded-full ${typeStyles.badge} mt-1`}
                  >
                    {detail}
                  </span>
                ))}
              </div>
            )}
            
            <div className="mt-3 space-y-1">
              <div className="flex items-center text-sm text-gray-500">
                <MapPinIcon className={`w-4 h-4 mr-2 ${typeStyles.icon}`} />
                <span>{activity.location}</span>
              </div>
              <div className="flex items-center text-sm text-gray-500">
                <UserIcon className={`w-4 h-4 mr-2 ${typeStyles.icon}`} />
                <span>{activity.instructor}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ActivityCard;
