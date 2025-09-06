import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Project {
  id: string;
  name: string;
  description: string;
  status: "active" | "completed" | "on-hold";
  tasksCount: number;
  completedTasks: number;
  teamMembers: number;
  dueDate?: string;
}

const Dashboard = () => {
  const [projects] = useState<Project[]>([
    {
      id: "1",
      name: "Website Redesign",
      description: "Complete overhaul of company website",
      status: "active",
      tasksCount: 12,
      completedTasks: 8,
      teamMembers: 5,
      dueDate: "2024-02-15"
    },
    {
      id: "2",
      name: "Mobile App Development",
      description: "Native iOS and Android app",
      status: "active",
      tasksCount: 24,
      completedTasks: 6,
      teamMembers: 8,
      dueDate: "2024-03-30"
    },
    {
      id: "3",
      name: "Marketing Campaign",
      description: "Q1 digital marketing strategy",
      status: "completed",
      tasksCount: 8,
      completedTasks: 8,
      teamMembers: 3,
    }
  ]);

  const getStatusColor = (status: Project["status"]) => {
    switch (status) {
      case "active":
        return "bg-accent text-accent-foreground";
      case "completed":
        return "bg-success text-success-foreground";
      case "on-hold":
        return "bg-muted text-muted-foreground";
      default:
        return "bg-secondary text-secondary-foreground";
    }
  };

  const getProgressPercentage = (completed: number, total: number) => {
    return total > 0 ? Math.round((completed / total) * 100) : 0;
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground mt-1">Welcome back! Here's what's happening with your projects.</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90">
          <Plus className="mr-2 h-4 w-4" />
          New Project
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <Card key={project.id} className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <CardTitle className="text-lg">{project.name}</CardTitle>
                  <CardDescription>{project.description}</CardDescription>
                </div>
                <Badge className={getStatusColor(project.status)}>
                  {project.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Progress</span>
                    <span className="font-medium">
                      {project.completedTasks}/{project.tasksCount} tasks
                    </span>
                  </div>
                  <div className="w-full bg-secondary rounded-full h-2">
                    <div
                      className="bg-accent h-2 rounded-full transition-all duration-300"
                      style={{
                        width: `${getProgressPercentage(project.completedTasks, project.tasksCount)}%`
                      }}
                    />
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {getProgressPercentage(project.completedTasks, project.tasksCount)}% complete
                  </div>
                </div>
                
                <div className="flex justify-between items-center text-sm">
                  <span className="text-muted-foreground">
                    {project.teamMembers} team member{project.teamMembers !== 1 ? 's' : ''}
                  </span>
                  {project.dueDate && (
                    <span className="text-muted-foreground">
                      Due {new Date(project.dueDate).toLocaleDateString()}
                    </span>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {projects.length === 0 && (
        <div className="text-center py-12">
          <h3 className="text-lg font-medium text-muted-foreground mb-2">No projects yet</h3>
          <p className="text-muted-foreground mb-4">Create your first project to get started</p>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Create Project
          </Button>
        </div>
      )}
    </div>
  );
};

export default Dashboard;