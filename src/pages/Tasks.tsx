import { useState } from "react";
import { Plus, Calendar, User, AlertCircle, Code, Database, Network, Terminal, Cpu, Shield } from "lucide-react";
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
        return "bg-red-900/30 text-red-400 border border-red-400/30";
      case "medium":
        return "bg-yellow-900/30 text-yellow-400 border border-yellow-400/30";
      case "low":
        return "bg-green-900/30 text-green-400 border border-green-400/30";
      default:
        return "bg-gray-900/30 text-gray-400 border border-gray-400/30";
    }
  };

  const getStatusColor = (status: Task["status"]) => {
    switch (status) {
      case "todo":
        return "bg-gray-900/30 text-gray-400 border border-gray-400/30";
      case "in-progress":
        return "bg-cyan-900/30 text-cyan-400 border border-cyan-400/30";
      case "done":
        return "bg-green-900/30 text-green-400 border border-green-400/30";
      default:
        return "bg-gray-900/30 text-gray-400 border border-gray-400/30";
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
    <Card className="mb-3 tech-card hover-lift transition-all duration-300 cursor-pointer">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-sm font-medium line-clamp-2 text-white font-mono">{task.title}</CardTitle>
          <Badge className={`${getPriorityColor(task.priority)} font-mono text-xs`}>
            {task.priority.toUpperCase()}
          </Badge>
        </div>
        {task.description && (
          <CardDescription className="text-xs line-clamp-2 text-gray-300 font-mono">
            {task.description}
          </CardDescription>
        )}
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-1">
              <User className="h-3 w-3 text-cyan-400" />
              <span className="text-cyan-400 font-mono">{task.project}</span>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Avatar className="h-6 w-6">
                <AvatarImage src={task.assignee.avatar} alt={task.assignee.name} />
                <AvatarFallback className="text-xs bg-cyan-900/30 text-cyan-400">{task.assignee.initials}</AvatarFallback>
              </Avatar>
              <span className="text-xs text-gray-300 font-mono">{task.assignee.name}</span>
            </div>
            
            {task.dueDate && (
              <div className={`flex items-center gap-1 text-xs font-mono ${isOverdue(task.dueDate) ? 'text-red-400' : 'text-blue-400'}`}>
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
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Enhanced Tech Background Elements */}
      <div className="absolute inset-0 matrix-bg circuit-pattern">
        {/* Animated Tech Dots */}
        <div className="absolute top-10 left-10 w-2 h-2 bg-cyan-400 rounded-full animate-pulse-slow"></div>
        <div className="absolute top-20 right-20 w-1 h-1 bg-green-400 rounded-full animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-20 left-20 w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-10 right-10 w-2 h-2 bg-purple-400 rounded-full animate-pulse-slow" style={{ animationDelay: '3s' }}></div>
        <div className="absolute top-1/2 left-1/4 w-1 h-1 bg-cyan-400 rounded-full animate-pulse-slow" style={{ animationDelay: '4s' }}></div>
        <div className="absolute top-1/3 right-1/4 w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse-slow" style={{ animationDelay: '5s' }}></div>
        <div className="absolute bottom-1/3 right-1/3 w-1 h-1 bg-blue-400 rounded-full animate-pulse-slow" style={{ animationDelay: '6s' }}></div>
        
        {/* Circuit Grid Lines */}
        <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-40"></div>
        <div className="absolute top-3/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-green-400 to-transparent opacity-40"></div>
        <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-blue-400 to-transparent opacity-40"></div>
        <div className="absolute top-0 right-1/4 w-px h-full bg-gradient-to-b from-transparent via-purple-400 to-transparent opacity-40"></div>
        <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent opacity-20"></div>
        <div className="absolute top-0 left-1/2 w-px h-full bg-gradient-to-b from-transparent via-green-400/50 to-transparent opacity-20"></div>
        
        {/* Floating Tech Icons */}
        <div className="absolute top-1/4 left-1/4 text-cyan-400 opacity-30 animate-float">
          <Code className="w-8 h-8" />
        </div>
        <div className="absolute top-1/3 right-1/3 text-green-400 opacity-30 animate-float" style={{ animationDelay: '2s' }}>
          <Database className="w-6 h-6" />
        </div>
        <div className="absolute bottom-1/3 left-1/3 text-blue-400 opacity-30 animate-float" style={{ animationDelay: '4s' }}>
          <Network className="w-7 h-7" />
        </div>
        <div className="absolute bottom-1/4 right-1/4 text-purple-400 opacity-30 animate-float" style={{ animationDelay: '6s' }}>
          <Terminal className="w-5 h-5" />
        </div>
        <div className="absolute top-1/2 right-1/6 text-cyan-400 opacity-25 animate-float" style={{ animationDelay: '8s' }}>
          <Cpu className="w-6 h-6" />
        </div>
        <div className="absolute bottom-1/4 left-1/6 text-green-400 opacity-25 animate-float" style={{ animationDelay: '10s' }}>
          <Shield className="w-5 h-5" />
        </div>
        
        {/* Data Flow Lines */}
        <div className="absolute top-1/6 left-1/6 w-32 h-px bg-gradient-to-r from-cyan-400/60 to-transparent opacity-50 animate-dataFlow"></div>
        <div className="absolute top-2/3 right-1/6 w-24 h-px bg-gradient-to-l from-green-400/60 to-transparent opacity-50 animate-dataFlow" style={{ animationDelay: '3s' }}></div>
        <div className="absolute top-1/2 left-1/12 w-px h-20 bg-gradient-to-b from-blue-400/60 to-transparent opacity-50 animate-dataFlow" style={{ animationDelay: '6s' }}></div>
      </div>

      <div className="relative z-10 p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-white font-mono">Task Management</h1>
            <p className="text-gray-300 mt-1 font-mono">Neural network task control center</p>
          </div>
          <Button className="tech-button bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-mono">
            <Plus className="mr-2 h-4 w-4" />
            New Task
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* To Do Column */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-semibold text-white font-mono">TO DO</h2>
              <Badge variant="outline" className="border-gray-600 text-gray-400 font-mono">{getColumnTasks("todo").length}</Badge>
            </div>
            <div className="space-y-3">
              {getColumnTasks("todo").map((task) => (
                <TaskCard key={task.id} task={task} />
              ))}
              {getColumnTasks("todo").length === 0 && (
                <div className="text-center py-8 text-gray-400">
                  <p className="text-sm font-mono">No tasks to do</p>
                </div>
              )}
            </div>
          </div>

          {/* In Progress Column */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-semibold text-white font-mono">IN PROGRESS</h2>
              <Badge variant="outline" className="border-cyan-400/30 text-cyan-400 font-mono">{getColumnTasks("in-progress").length}</Badge>
            </div>
            <div className="space-y-3">
              {getColumnTasks("in-progress").map((task) => (
                <TaskCard key={task.id} task={task} />
              ))}
              {getColumnTasks("in-progress").length === 0 && (
                <div className="text-center py-8 text-gray-400">
                  <p className="text-sm font-mono">No tasks in progress</p>
                </div>
              )}
            </div>
          </div>

          {/* Done Column */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-semibold text-white font-mono">DONE</h2>
              <Badge variant="outline" className="border-green-400/30 text-green-400 font-mono">{getColumnTasks("done").length}</Badge>
            </div>
            <div className="space-y-3">
              {getColumnTasks("done").map((task) => (
                <TaskCard key={task.id} task={task} />
              ))}
              {getColumnTasks("done").length === 0 && (
                <div className="text-center py-8 text-gray-400">
                  <p className="text-sm font-mono">No completed tasks</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tasks;