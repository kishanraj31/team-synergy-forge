import { useState } from "react";
import { Plus, Search, Filter } from "lucide-react";
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

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         project.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesStatus = statusFilter === "all" || project.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Projects</h1>
          <p className="text-muted-foreground mt-1">Manage and track all your team projects</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90">
          <Plus className="mr-2 h-4 w-4" />
          New Project
        </Button>
      </div>

      <div className="flex gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search projects..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-48">
            <Filter className="mr-2 h-4 w-4" />
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Projects</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
            <SelectItem value="on-hold">On Hold</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredProjects.map((project) => (
          <Card key={project.id} className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <CardTitle className="text-lg">{project.name}</CardTitle>
                  <CardDescription className="line-clamp-2">{project.description}</CardDescription>
                </div>
                <Badge className={getStatusColor(project.status)}>
                  {project.status}
                </Badge>
              </div>
              <div className="flex flex-wrap gap-1 mt-2">
                {project.tags.map((tag) => (
                  <Badge key={tag} variant="outline" className="text-xs">
                    {tag}
                  </Badge>
                ))}
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
                
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Manager:</span>
                    <span className="font-medium">{project.manager}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Team:</span>
                    <span>{project.teamMembers} member{project.teamMembers !== 1 ? 's' : ''}</span>
                  </div>
                  {project.dueDate && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Due date:</span>
                      <span>{new Date(project.dueDate).toLocaleDateString()}</span>
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
          <h3 className="text-lg font-medium text-muted-foreground mb-2">
            {projects.length === 0 ? "No projects yet" : "No projects match your search"}
          </h3>
          <p className="text-muted-foreground mb-4">
            {projects.length === 0 ? "Create your first project to get started" : "Try adjusting your search or filter criteria"}
          </p>
          {projects.length === 0 && (
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Create Project
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

export default Projects;