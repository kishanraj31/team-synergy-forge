import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, Code, Database, Network, Terminal, Cpu, Shield } from "lucide-react";
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
  const navigate = useNavigate();
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
        return "bg-cyan-900/30 text-cyan-400 border border-cyan-400/30";
      case "completed":
        return "bg-green-900/30 text-green-400 border border-green-400/30";
      case "on-hold":
        return "bg-yellow-900/30 text-yellow-400 border border-yellow-400/30";
      default:
        return "bg-gray-900/30 text-gray-400 border border-gray-400/30";
    }
  };

  const getProgressPercentage = (completed: number, total: number) => {
    return total > 0 ? Math.round((completed / total) * 100) : 0;
  };

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
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white font-mono">System Dashboard</h1>
            <p className="text-gray-300 mt-1 font-mono">Neural network status: ONLINE | Last sync: {new Date().toLocaleTimeString()}</p>
          </div>
          <Button 
            onClick={() => navigate("/new-project")}
            className="tech-button bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-mono"
          >
            <Plus className="mr-2 h-4 w-4" />
            New Project
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <Card key={project.id} className="tech-card hover-lift cursor-pointer transition-all duration-300">
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <div className="space-y-1">
                    <CardTitle className="text-lg text-white font-mono">{project.name}</CardTitle>
                    <CardDescription className="text-gray-300 font-mono text-sm">{project.description}</CardDescription>
                  </div>
                  <Badge className={`${getStatusColor(project.status)} font-mono text-xs`}>
                    {project.status.toUpperCase()}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-cyan-400 font-mono">Progress</span>
                      <span className="font-medium text-white font-mono">
                        {project.completedTasks}/{project.tasksCount} tasks
                      </span>
                    </div>
                    <div className="w-full bg-gray-800 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-cyan-500 to-blue-500 h-2 rounded-full transition-all duration-500"
                        style={{
                          width: `${getProgressPercentage(project.completedTasks, project.tasksCount)}%`
                        }}
                      />
                    </div>
                    <div className="text-xs text-gray-400 font-mono">
                      {getProgressPercentage(project.completedTasks, project.tasksCount)}% complete
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center text-sm pt-2 border-t border-gray-800">
                    <span className="text-cyan-400 font-mono">
                      {project.teamMembers} team member{project.teamMembers !== 1 ? 's' : ''}
                    </span>
                    {project.dueDate && (
                      <span className="text-blue-400 font-mono text-xs">
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
            <h3 className="text-lg font-medium text-white mb-2 font-mono">No Active Projects</h3>
            <p className="text-gray-300 mb-4 font-mono">Initialize your first neural network process</p>
            <Button 
              onClick={() => navigate("/new-project")}
              className="tech-button bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-mono"
            >
              <Plus className="mr-2 h-4 w-4" />
              Create Project
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;