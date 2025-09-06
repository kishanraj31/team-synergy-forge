import { useState } from "react";
import { Plus, Search, Filter, Code, Database, Network, Terminal, Cpu, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Project {
  id: string;
  name: string;
  description: string;
  status: "active" | "completed" | "on-hold";
  tasksCount: number;
  completedTasks: number;
  teamMembers: number;
  tags: string[];
  manager: string;
  dueDate?: string;
}

const Projects = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  
  const [projects] = useState<Project[]>([
    {
      id: "1",
      name: "Website Redesign",
      description: "Complete overhaul of company website with modern design and improved UX",
      status: "active",
      tasksCount: 12,
      completedTasks: 8,
      teamMembers: 5,
      tags: ["Design", "Frontend", "UX"],
      manager: "Sarah Johnson",
      dueDate: "2024-02-15"
    },
    {
      id: "2",
      name: "Mobile App Development",
      description: "Native iOS and Android app for customer engagement",
      status: "active",
      tasksCount: 24,
      completedTasks: 6,
      teamMembers: 8,
      tags: ["Mobile", "iOS", "Android"],
      manager: "Mike Chen",
      dueDate: "2024-03-30"
    },
    {
      id: "3",
      name: "Marketing Campaign",
      description: "Q1 digital marketing strategy and content creation",
      status: "completed",
      tasksCount: 8,
      completedTasks: 8,
      teamMembers: 3,
      tags: ["Marketing", "Content"],
      manager: "Emily Davis",
    },
    {
      id: "4",
      name: "Database Migration",
      description: "Migrate from legacy system to new cloud infrastructure",
      status: "on-hold",
      tasksCount: 15,
      completedTasks: 3,
      teamMembers: 4,
      tags: ["Backend", "Database", "Cloud"],
      manager: "Alex Rodriguez",
      dueDate: "2024-04-20"
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

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         project.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesStatus = statusFilter === "all" || project.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

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
            <h1 className="text-3xl font-bold text-white font-mono">Project Management</h1>
            <p className="text-gray-300 mt-1 font-mono">Neural network project control center</p>
          </div>
          <Button className="tech-button bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-mono">
            <Plus className="mr-2 h-4 w-4" />
            New Project
          </Button>
        </div>

        <div className="flex gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-cyan-400 h-4 w-4" />
            <Input
              placeholder="Search projects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 tech-border bg-black/50 text-white placeholder-gray-500 border-2 border-gray-600 focus:border-cyan-400 focus:ring-cyan-400/20"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-48 tech-border bg-black/50 text-white border-2 border-gray-600 focus:border-cyan-400">
              <Filter className="mr-2 h-4 w-4 text-cyan-400" />
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent className="bg-black border border-gray-600">
              <SelectItem value="all" className="text-white hover:bg-gray-800">All Projects</SelectItem>
              <SelectItem value="active" className="text-white hover:bg-gray-800">Active</SelectItem>
              <SelectItem value="completed" className="text-white hover:bg-gray-800">Completed</SelectItem>
              <SelectItem value="on-hold" className="text-white hover:bg-gray-800">On Hold</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.map((project) => (
            <Card key={project.id} className="tech-card hover-lift cursor-pointer transition-all duration-300">
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <div className="space-y-1">
                    <CardTitle className="text-lg text-white font-mono">{project.name}</CardTitle>
                    <CardDescription className="line-clamp-2 text-gray-300 font-mono text-sm">{project.description}</CardDescription>
                  </div>
                  <Badge className={`${getStatusColor(project.status)} font-mono text-xs`}>
                    {project.status.toUpperCase()}
                  </Badge>
                </div>
                <div className="flex flex-wrap gap-1 mt-2">
                  {project.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs border-cyan-400/30 text-cyan-400 font-mono">
                      {tag}
                    </Badge>
                  ))}
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
                  
                  <div className="space-y-2 text-sm pt-2 border-t border-gray-800">
                    <div className="flex justify-between">
                      <span className="text-cyan-400 font-mono">Manager:</span>
                      <span className="font-medium text-white font-mono">{project.manager}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-cyan-400 font-mono">Team:</span>
                      <span className="text-white font-mono">{project.teamMembers} member{project.teamMembers !== 1 ? 's' : ''}</span>
                    </div>
                    {project.dueDate && (
                      <div className="flex justify-between">
                        <span className="text-cyan-400 font-mono">Due date:</span>
                        <span className="text-blue-400 font-mono">{new Date(project.dueDate).toLocaleDateString()}</span>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-12">
            <h3 className="text-lg font-medium text-white mb-2 font-mono">
              {projects.length === 0 ? "No Active Projects" : "No projects match your search"}
            </h3>
            <p className="text-gray-300 mb-4 font-mono">
              {projects.length === 0 ? "Initialize your first neural network project" : "Try adjusting your search or filter criteria"}
            </p>
            {projects.length === 0 && (
              <Button className="tech-button bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-mono">
                <Plus className="mr-2 h-4 w-4" />
                Create Project
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Projects;