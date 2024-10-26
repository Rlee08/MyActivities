import React, {useState, useEffect, useRef} from 'react';
import { MoreVertical, PlayCircle, PauseCircle, Plus, ChevronDown, X } from 'lucide-react';
import './ActivityTracker.css';
import AboutPage from './AboutPage';

const ActivityCard = ({ title = "Activity Title", initialGoalTime = "" , initialTagColor = null}) => {
  const [isRunning, setIsRunning] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [activityTitle, setActivityTitle] = useState(title);
  const [goalTime, setGoalTime] = useState(initialGoalTime);
  const [tagColor, setTagColor] = useState(initialTagColor);
  const [isColorPickerOpen, setIsColorPickerOpen] = useState(false);
  const editRef = useRef(null);
  const [history, setHistory] = useState([]);
  const [totalSessions, setTotalSessions] = useState(0);
  const [currentSessionStart, setCurrentSessionStart] = useState(null);

  // Temporary state for editing
  const [tempTitle, setTempTitle] = useState(activityTitle);
  const [tempGoalTime, setTempGoalTime] = useState(goalTime);
  const [tempTagColor, setTempTagColor] = useState(tagColor);

  const colorPickerRef = useRef(null);

  const tagColors = [
    '#FF0000', // Red
    '#FFA500', // Orange
    '#FFFF00', // Yellow
    '#00FF00', // Green
    '#0000FF', // Blue
    '#800080', // Purple
    '#FFC0CB', // Pink
  ];

  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => {
        setElapsedTime((prevTime) => prevTime + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (editRef.current && !editRef.current.contains(event.target)) {
        setIsEditOpen(false);
        setIsColorPickerOpen(false);
        // Reset temporary state when closing without saving
        setTempTitle(activityTitle);
        setTempGoalTime(goalTime);
        setTempTagColor(tagColor);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [activityTitle, goalTime, tagColor]);
  
  const toggleTimer = () => {
    const now = new Date();
    if (!isRunning) {
      setCurrentSessionStart(now);
    } else {
      const newSession = {
        start: currentSessionStart,
        end: now
      };
      setHistory(prevHistory => [newSession, ...prevHistory].slice(0, 3));
      setTotalSessions(prevTotal => prevTotal + 1);
    }
    setIsRunning(!isRunning);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const formatHistoryTime = (date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const formatHistoryDate = (date) => {
    return date.toLocaleDateString([], { month: 'numeric', day: 'numeric' });
  };

  const toggleEdit = () => {
    setIsEditOpen(!isEditOpen);
    setTempTitle(activityTitle);
    setTempGoalTime(goalTime);
  };

  const toggleColorPicker = () => {
    setIsColorPickerOpen(!isColorPickerOpen);
  };

  const handleSave = () => {
    setActivityTitle(tempTitle);
    setGoalTime(tempGoalTime);
    setTagColor(tempTagColor);
    setIsEditOpen(false);
    setIsColorPickerOpen(false);
  };
  
  return(
  <div className="activity-card p-4 text-white relative flex flex-col h-full">
    {/* {!isEditOpen ? (
      <> */}
    <div className="flex justify-between items-center mb-2">
      <div className="flex items-center">
        {tagColor && (
          <div className="w-4 h-4 rounded-full mr-2" style={{ backgroundColor: tagColor }}></div>
        )}
        <h2 className="text-lg font-normal">{activityTitle}</h2>
      </div>
      <MoreVertical size={20} className="cursor-pointer" onClick={toggleEdit}/>
    </div>
    <p className="text-sm mb-4">Goal Time: {goalTime}</p>
    <div className="flex justify-between items-center mb-4">
      <span className="text-sm">Elapsed Time:</span>
      <div className="flex items-center">
        <span className="text-4xl sm:text-3xl">{formatTime(elapsedTime)}</span>
      </div>
    </div>
    <div className="text-sm mb-2">History ({totalSessions}):</div>
    {history.map((session, index) => (
      <div key={index} className="text-xs mb-1">
        {formatHistoryDate(session.start)} {formatHistoryTime(session.start)}-{formatHistoryTime(session.end)}
      </div>
    ))}
    <div className="absolute bottom-4 right-4">
      {isRunning ? (
        <PauseCircle size={32} className="text-green-500 cursor-pointer" onClick={toggleTimer} />
      ) : (
        <PlayCircle size={32} className="text-blue-500 cursor-pointer" onClick={toggleTimer} />
      )}
    </div>
  {/* </>
    ) : ( */}
  {isEditOpen &&(
        <div ref={editRef} className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full activity-card rounded-lg shadow-lg p-4">
          <div className="flex justify-between items-center mb-4">
            <input 
              type="text" 
              value={tempTitle}
              onChange={(e) => setTempTitle(e.target.value)}
              className="bg-gray-600 text-white px-2 py-1 rounded w-full mr-2"
            />
            <div className="relative">
                <button
                  onClick={toggleColorPicker}
                  className="flex items-center bg-gray-600 rounded px-2 py-1 cursor-pointer"
                >
                  <span className="mr-1">Tag</span>
                  <ChevronDown size={16} />
                </button>
                {isColorPickerOpen && (
                  <div 
                    ref={colorPickerRef}
                    className="absolute right-0 mt-2 p-2 bg-gray-700 rounded shadow-lg"
                    style={{width: '40px'}}
                  >
                    {tagColors.map((color, index) => (
                      <div
                        key={index}
                        className="w-6 h-6 rounded-full mb-2 cursor-pointer"
                        style={{ backgroundColor: color }}
                        onClick={() => {
                          setTempTagColor(color);
                          setIsColorPickerOpen(false);
                        }}
                      />
                    ))}
                  </div>
                )}
              </div>
              <X size={20} className="cursor-pointer" onClick={() => setIsEditOpen(false)} />
            </div>
          <div className="mb-4">
            <label className="block text-sm mb-1">Goal Time:</label>
            <input 
              type="text" 
              value={tempGoalTime}
              placeholder="HH:MM"
              onChange={(e) => setTempGoalTime(e.target.value)}
              className="bg-gray-600 text-white px-2 py-1 rounded w-full"
            />
          </div>
          <button 
            onClick={handleSave}
            className="bg-green-500 text-white px-4 py-2 rounded w-full"
          >
            Save Changes
          </button>
        </div>
    )}
  </div>
  );
};

  const ActivityTracker = () => {
    const [activities, setActivities] = useState([
      { id: 1, title: "Activity Title", goalTime: "" },
    ]);

    const [isNewActivityDialogOpen, setIsNewActivityDialogOpen] = useState(false);
    const [newActivityTitle, setNewActivityTitle] = useState("");
    const [newActivityGoalTime, setNewActivityGoalTime] = useState("");
    const [activeTab, setActiveTab] = useState("activities");

    const newActivityDialogRef = useRef(null);

    useEffect(() => {
      const handleClickOutside = (event) => {
        if (newActivityDialogRef.current && !newActivityDialogRef.current.contains(event.target)) {
          closeNewActivityDialog();
        }
      };
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, []);

    const clearInputFields = () => {
      setNewActivityTitle("");
      setNewActivityGoalTime("");
    };

    const closeNewActivityDialog = () => {
      setIsNewActivityDialogOpen(false);
      clearInputFields();
    };

    const addActivity = () => {
      if (newActivityTitle && newActivityGoalTime) {
        const newActivity = {
          id: activities.length + 1,
          title: newActivityTitle,
          goalTime: newActivityGoalTime
        };
        setActivities([...activities, newActivity]);
        closeNewActivityDialog();
      }
    };

    const renderActivities = () => (
      <div className="w-full max-w-4xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {activities.map(activity => (
            <ActivityCard key={activity.id} title={activity.title} initialGoalTime={activity.goalTime} />
          ))}
        </div>
      </div>
    );

    const renderCalendar = () => (
      <div className="w-full max-w-4xl mx-auto">
        <div className="text-white mt-6 mb-6">Calendar View (Not yet implemented)</div>
        <div className="mb-6">
          <img src="/images/Calendar_example.jpg" alt="calendar example" className="w-full max-w-4xl mx-auto" />
        </div>
      </div>
    );
    
  return(
  <div className="bg-custom-bg min-h-screen text-white">
    <header className="bg-custom-darker p-4 flex justify-between items-center">
      <h1 className="text-3xl font-bold hidden sm:block">MyActivities</h1>
      <div className="flex items-center space-x-2 sm:space-x-4">
        <div 
          className={`text-sm sm:text-base px-2 sm:px-4 py-2 rounded-t-lg cursor-pointer ${activeTab === 'activities' ? 'bg-custom-bg' : ''}`}
          onClick={() => setActiveTab('activities')}
        >
          Activities
        </div>
        <div className="w-px h-6 bg-gray-600 mx-4"></div>
        <div 
          className={`text-sm sm:text-base cursor-pointer ${activeTab === 'calendar' ? 'bg-custom-bg px-2 sm:px-4 py-2 rounded-t-lg' : ''}`}
          onClick={() => setActiveTab('calendar')}
        >
          Calendar View
        </div>
        <div className="w-px h-6 bg-gray-600 mx-4"></div>
        <div 
          className={`text-sm sm:text-base cursor-pointer ${activeTab === 'about' ? 'bg-custom-bg px-2 sm:px-4 py-2 rounded-t-lg' : ''}`}
          onClick={() => setActiveTab('about')}
        >
          About
        </div>
      </div>
    </header>

    <main className="p-4">
      {activeTab === 'activities' && renderActivities()}
      {activeTab === 'calendar' && renderCalendar()}
      {activeTab === 'about' && <AboutPage />}
    </main>
    
    {/* <main className="p-4 flex justify-center">
      <div className="w-full max-w-4xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {activities.map(activity => (
            <ActivityCard key={activity.id} title={activity.title} initialGoalTime={activity.goalTime} />
          ))}
        </div>
      </div>
    </main> */}
    
    <button className="fixed bottom-4 right-4 bg-white text-gray-800 rounded-full p-2" onClick={() => setIsNewActivityDialogOpen(true)} >
      <Plus size={24} />
    </button>
    {isNewActivityDialogOpen && (
      <div 
        ref={newActivityDialogRef}
        className="fixed bottom-20 right-10 w-96 activity-card rounded-lg shadow-lg p-4"
      >
        <div className="flex justify-between items-center mb-4">
          <input 
            type="text" 
            value={newActivityTitle}
            onChange={(e) => setNewActivityTitle(e.target.value)}
            placeholder="Activity Title"
            className="bg-gray-600 text-white px-2 py-1 rounded w-full mr-2"
          />
          <X size={20} className="cursor-pointer" onClick={closeNewActivityDialog} />
        </div>
        <div className="mb-4">
          <label className="block text-sm mb-1">Goal time:</label>
          <input 
            type="text" 
            value={newActivityGoalTime}
            onChange={(e) => setNewActivityGoalTime(e.target.value)}
            placeholder="HH:MM"
            className="bg-gray-600 text-white px-2 py-1 rounded w-full"
          />
        </div>
        <button 
          onClick={addActivity}
          className="bg-green-500 text-white px-4 py-2 rounded w-full"
        >
          Add Activity
        </button>
      </div>
    )}
  </div>
  );
};

export default ActivityTracker;