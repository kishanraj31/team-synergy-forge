import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, Search, Filter, Code, Database, Network, Terminal, Cpu, Shield, Trash2, AlertTriangle } from "lucide-react";
import { apiService } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Project {
  _id: string;
  name: string;
  description: string;
  createdBy: {
    _id: string;
    username: string;
    email: string;
  };
  members: Array<{
    _id: string;
    username: string;
    email: string;
  }>;
  createdAt: string;
  updatedAt: string;
}

const Projects = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [completionPercentages, setCompletionPercentages] = useState<{[key: string]: number}>({});
  const navigate = useNavigate();
  const { toast } = useToast();

  // Fetch projects from API
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setIsLoading(true);
        const response = await apiService.getProjects();
        
        if (response.success && response.data) {
          const data = response.data as any;
          if (data.projects && Array.isArray(data.projects)) {
            setProjects(data.projects);
            // Load completion percentages for all projects
            loadCompletionPercentages(data.projects);
          }
        } else {
          console.error('Failed to fetch projects:', response.message);
          toast({
            title: "Failed to load projects",
            description: "Could not fetch your projects. Please try again.",
            variant: "destructive",
          });
        }
      } catch (error: any) {
        console.error('Error fetching projects:', error);
        toast({
          title: "Error loading projects",
          description: error.message || "An error occurred while loading projects.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchProjects();
  }, [toast]);

  // Refresh projects when page becomes visible (e.g., returning from new project page)
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        refreshProjects();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, []);

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesSearch;
  });

  // Refresh projects after creating a new one
  const refreshProjects = async () => {
    try {
      const response = await apiService.getProjects();
      if (response.success && response.data) {
        const data = response.data as any;
        if (data.projects && Array.isArray(data.projects)) {
          setProjects(data.projects);
        }
      }
    } catch (error) {
      console.error('Error refreshing projects:', error);
    }
  };

  // Delete project function
  const handleDeleteProject = async (projectId: string, projectName: string) => {
    if (!window.confirm(`Are you sure you want to delete "${projectName}"? This action cannot be undone.`)) {
      return;
    }

    try {
      const response = await apiService.deleteProject(projectId);
      
      if (response.success) {
        toast({
          title: "Project Deleted",
          description: `"${projectName}" has been permanently removed from the neural network.`,
        });
        
        // Refresh the projects list
        await refreshProjects();
      } else {
        throw new Error(response.message || 'Failed to delete project');
      }
    } catch (error: any) {
      console.error('Delete project error:', error);
      toast({
        title: "Delete Failed",
        description: error.message || "Unable to delete project. Please try again.",
        variant: "destructive",
      });
    }
  };

  // Calculate completion percentage for a project
  const calculateCompletionPercentage = async (projectId: string): Promise<number> => {
    try {
      const response = await apiService.getProjectWithTasks(projectId);
      if (response.success && response.data) {
        const data = response.data as any;
        const tasks = data.tasks || [];
        
        if (tasks.length === 0) {
          return 0; // No tasks means 0% completion
        }
        
        const completedTasks = tasks.filter((task: any) => task.status === 'Done').length;
        return Math.round((completedTasks / tasks.length) * 100);
      }
    } catch (error) {
      console.error('Error calculating completion percentage:', error);
    }
    return 0;
  };

  // Load completion percentages for all projects
  const loadCompletionPercentages = async (projects: Project[]) => {
    const percentages: {[key: string]: number} = {};
    
    // Calculate percentages for all projects in parallel
    const promises = projects.map(async (project) => {
      const percentage = await calculateCompletionPercentage(project._id);
      percentages[project._id] = percentage;
    });
    
    await Promise.all(promises);
    setCompletionPercentages(percentages);
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
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-white font-mono">Project Management</h1>
            <p className="text-gray-300 mt-1 font-mono">Neural network project control center</p>
          </div>
          <Button 
            onClick={() => navigate("/new-project")}
            className="tech-button bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-mono"
          >
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
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 border-2 border-cyan-400/30 border-t-cyan-400 rounded-full animate-spin"></div>
              <span className="text-cyan-400 font-mono">Loading projects...</span>
            </div>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredProjects.map((project) => (
              <Card key={project._id} className="tech-card hover-lift transition-all duration-300">
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <div className="space-y-1 flex-1">
                      <CardTitle className="text-lg text-white font-mono">{project.name}</CardTitle>
                      <CardDescription className="line-clamp-2 text-gray-300 font-mono text-sm">
                        {project.description || 'No description provided'}
                      </CardDescription>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className="bg-cyan-900/30 text-cyan-400 border border-cyan-400/30 font-mono text-xs">
                        ACTIVE
                      </Badge>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteProject(project._id, project.name);
                        }}
                        className="text-red-400 hover:text-red-300 hover:bg-red-900/20 p-2 h-8 w-8"
                        title="Delete project"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {/* Completion Progress Bar */}
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-cyan-400 font-mono text-sm">Progress:</span>
                        <span className="text-white font-mono text-sm font-medium">
                          {completionPercentages[project._id] || 0}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-800 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-cyan-500 to-blue-500 h-2 rounded-full transition-all duration-500"
                          style={{ width: `${completionPercentages[project._id] || 0}%` }}
                        ></div>
                      </div>
                    </div>
                    
                    <div className="space-y-2 text-sm pt-2 border-t border-gray-800">
                      <div className="flex justify-between">
                        <span className="text-cyan-400 font-mono">Created by:</span>
                        <span className="font-medium text-white font-mono">{project.createdBy.username}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-cyan-400 font-mono">Team:</span>
                        <span className="text-white font-mono">
                          {project.members.length} member{project.members.length !== 1 ? 's' : ''}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-cyan-400 font-mono">Created:</span>
                        <span className="text-blue-400 font-mono">
                          {new Date(project.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {filteredProjects.length === 0 && (
          <div className="text-center py-12">
            <h3 className="text-lg font-medium text-white mb-2 font-mono">
              {projects.length === 0 ? "No Active Projects" : "No projects match your search"}
            </h3>
            <p className="text-gray-300 mb-4 font-mono">
              {projects.length === 0 ? "Initialize your first neural network project" : "Try adjusting your search or filter criteria"}
            </p>
            {projects.length === 0 && (
              <Button 
                onClick={() => navigate("/new-project")}
                className="tech-button bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-mono"
              >
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