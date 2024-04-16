// TasksList.jsx

import React from 'react';
import TextActivityTracker from './TextActivityTracker';
import CardActivityTracker from './CardActivityTracker';
import CardMyTasks from './CardMyTasks';
import moment from 'moment';


const styles = {
  tasksListContainer: {
    width: '100%',
    height: '98%',
  },
};

const TasksList = ({ showCardTaskParent, toggleCardTaskParent, tasks }) => {
  console.log('tasks2', tasks)
  const convertTasksToEvents = (tasks) => {
    if (!tasks || tasks.length === 0) {
      return []; // Return an empty array if tasks is null or empty
    }
  
    return tasks.map(task => {
      return {
        id: task.id,
        title: task.subject,
        start: task.start_date,
        end: task.due_date,
        // You can add more properties here as needed
      };
    });
  };
  
  const events = convertTasksToEvents(tasks);
  console.log('events1', events)
  
  return (
    <div style={styles.tasksListContainer}>
      <TextActivityTracker />
      <CardActivityTracker events={events} />
      <CardMyTasks 
        showCardTaskParent={showCardTaskParent}
        toggleCardTaskParent={toggleCardTaskParent}
        tasks={tasks}
      />
    </div>
  );
};

export default TasksList;