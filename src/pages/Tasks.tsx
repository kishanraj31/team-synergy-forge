import { useState } from "react";
import { Plus, Calendar, User, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface Task {
  id: string;
  title: string;
  description?: string;
  status: "todo" | "in-progress" | "done";
  priority: "low" | "medium" | "high";
  assignee: {
    name: string;
    avatar?: string;
    initials: string;
  };
  project: string;
  dueDate?: string;
  createdAt: string;
}

const Tasks = () => {
  const [tasks] = useState<Task[]>([
    {
      id: "1",
      title: "Design homepage mockups",
      description: "Create wireframes and high-fidelity mockups for the new homepage",
      status: "in-progress",
      priority: "high",
      assignee: { name: "Sarah Johnson", initials: "SJ" },
      project: "Website Redesign",
      dueDate: "2024-01-20",
      createdAt: "2024-01-10"
    },
    {
      id: "2",
      title: "Implement user authentication",
      description: "Set up login/signup functionality with JWT tokens",
      status: "todo",
      priority: "high",
      assignee: { name: "Mike Chen", initials: "MC" },
      project: "Mobile App Development",
      dueDate: "2024-01-25",
      createdAt: "2024-01-12"
    },
    {
      id: "3",
      title: "Write technical documentation",
      description: "Document API endpoints and integration guidelines",
      status: "todo",
      priority: "medium",
      assignee: { name: "Alex Rodriguez", initials: "AR" },
      project: "Mobile App Development",
      dueDate: "2024-02-01",
      createdAt: "2024-01-08"
    },
    {
      id: "4",
      title: "Create social media content",
      description: "Design posts for Instagram and LinkedIn campaigns",
      status: "done",
      priority: "medium",
      assignee: { name: "Emily Davis", initials: "ED" },
      project: "Marketing Campaign",
      createdAt: "2024-01-05"
    },
    {
      id: "5",
      title: "Set up analytics tracking",
      description: "Implement Google Analytics and custom event tracking",
      status: "in-progress",
      priority: "low",
      assignee: { name: "Sarah Johnson", initials: "SJ" },
      project: "Website Redesign",
      dueDate: "2024-01-30",
      createdAt: "2024-01-15"
    },
    {
      id: "6",
      title: "Review design system",
      description: "Audit and update component library documentation",
      status: "todo",
      priority: "low",
      assignee: { name: "Mike Chen", initials: "MC" },
      project: "Website Redesign",
      createdAt: "2024-01-16"
    }
  ]);

  const getPriorityColor = (priority: Task["priority"]) => {
    switch (priority) {
      case "high":
        return "bg-destructive text-destructive-foreground";
      case "medium":
        return "bg-accent text-accent-foreground";
      case "low":
        return "bg-muted text-muted-foreground";
      default:
        return "bg-secondary text-secondary-foreground";
    }
  };

  const getStatusColor = (status: Task["status"]) => {
    switch (status) {
      case "todo":
        return "bg-secondary text-secondary-foreground";
      case "in-progress":
        return "bg-accent text-accent-foreground";
      case "done":
        return "bg-success text-success-foreground";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const getColumnTasks = (status: Task["status"]) => {
    return tasks.filter(task => task.status === status);
  };

  const isOverdue = (dueDate?: string) => {
    if (!dueDate) return false;
    return new Date(dueDate) < new Date();
  };

  const TaskCard = ({ task }: { task: Task }) => (
    <Card className="mb-3 hover:shadow-md transition-shadow cursor-pointer">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-sm font-medium line-clamp-2">{task.title}</CardTitle>
          <Badge className={getPriorityColor(task.priority)}>
            {task.priority}
          </Badge>
        </div>
        {task.description && (
          <CardDescription className="text-xs line-clamp-2">
            {task.description}
          </CardDescription>
        )}
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-1">
              <User className="h-3 w-3" />
              <span className="text-muted-foreground">{task.project}</span>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Avatar className="h-6 w-6">
                <AvatarImage src={task.assignee.avatar} alt={task.assignee.name} />
                <AvatarFallback className="text-xs">{task.assignee.initials}</AvatarFallback>
              </Avatar>
              <span className="text-xs text-muted-foreground">{task.assignee.name}</span>
            </div>
            
            {task.dueDate && (
              <div className={`flex items-center gap-1 text-xs ${isOverdue(task.dueDate) ? 'text-destructive' : 'text-muted-foreground'}`}>
                {isOverdue(task.dueDate) && <AlertCircle className="h-3 w-3" />}
                <Calendar className="h-3 w-3" />
                <span>{new Date(task.dueDate).toLocaleDateString()}</span>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Tasks</h1>
          <p className="text-muted-foreground mt-1">Kanban board for task management</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90">
          <Plus className="mr-2 h-4 w-4" />
          New Task
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* To Do Column */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-semibold">To Do</h2>
            <Badge variant="outline">{getColumnTasks("todo").length}</Badge>
          </div>
          <div className="space-y-3">
            {getColumnTasks("todo").map((task) => (
              <TaskCard key={task.id} task={task} />
            ))}
            {getColumnTasks("todo").length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                <p className="text-sm">No tasks to do</p>
              </div>
            )}
          </div>
        </div>

        {/* In Progress Column */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-semibold">In Progress</h2>
            <Badge variant="outline">{getColumnTasks("in-progress").length}</Badge>
          </div>
          <div className="space-y-3">
            {getColumnTasks("in-progress").map((task) => (
              <TaskCard key={task.id} task={task} />
            ))}
            {getColumnTasks("in-progress").length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                <p className="text-sm">No tasks in progress</p>
              </div>
            )}
          </div>
        </div>

        {/* Done Column */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-semibold">Done</h2>
            <Badge variant="outline">{getColumnTasks("done").length}</Badge>
          </div>
          <div className="space-y-3">
            {getColumnTasks("done").map((task) => (
              <TaskCard key={task.id} task={task} />
            ))}
            {getColumnTasks("done").length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                <p className="text-sm">No completed tasks</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tasks;