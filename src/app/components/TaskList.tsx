interface Task {
    _id: string;
    title: string;
    description: string;
  }
  
  interface TaskListProps {
    tasks: Task[];
  }
  
  export default function TaskList({ tasks }: TaskListProps) {
    return (
      <ul className="space-y-4">
        {tasks.map((task) => (
          <li key={task._id} className="p-4 bg-white rounded-lg shadow-md">
            <h3 className="text-lg font-semibold">{task.title}</h3>
            <p>{task.description}</p>
          </li>
        ))}
      </ul>
    );
  }
  