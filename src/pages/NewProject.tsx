import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { apiService } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { 
  ArrowLeft, 
  Code, 
  Database, 
  Network, 
  Terminal, 
  Cpu, 
  Shield, 
  Zap, 
  Users, 
  Calendar,
  FileText,
  Settings,
  Globe,
  Smartphone,
  Server,
  Brain,
  Rocket
} from "lucide-react";

interface ProjectTemplate {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  category: string;
  features: string[];
}

const NewProject = () => {
  const [selectedTemplate, setSelectedTemplate] = useState<string>("");
  const [projectName, setProjectName] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [projectCategory, setProjectCategory] = useState("");
  const [teamSize, setTeamSize] = useState("");
  const [priority, setPriority] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const projectTemplates: ProjectTemplate[] = [
    {
      id: "web-app",
      name: "Web Application",
      description: "Full-stack web application with modern UI",
      icon: <Globe className="w-6 h-6" />,
      category: "Web Development",
      features: ["React/Vue Frontend", "Node.js Backend", "Database Integration", "API Development"]
    },
    {
      id: "mobile-app",
      name: "Mobile Application",
      description: "Cross-platform mobile app development",
      icon: <Smartphone className="w-6 h-6" />,
      category: "Mobile Development",
      features: ["React Native/Flutter", "iOS & Android", "Push Notifications", "Offline Support"]
    },
    {
      id: "api-service",
      name: "API Service",
      description: "RESTful API and microservices architecture",
      icon: <Server className="w-6 h-6" />,
      category: "Backend Development",
      features: ["REST/GraphQL APIs", "Authentication", "Rate Limiting", "Documentation"]
    },
    {
      id: "data-analysis",
      name: "Data Analysis",
      description: "Data processing and analytics platform",
      icon: <Database className="w-6 h-6" />,
      category: "Data Science",
      features: ["Data Pipeline", "Visualization", "Machine Learning", "Reports"]
    },
    {
      id: "ai-project",
      name: "AI/ML Project",
      description: "Artificial intelligence and machine learning solution",
      icon: <Brain className="w-6 h-6" />,
      category: "Artificial Intelligence",
      features: ["Model Training", "Data Processing", "Prediction Engine", "Model Deployment"]
    },
    {
      id: "devops",
      name: "DevOps Pipeline",
      description: "CI/CD and infrastructure automation",
      icon: <Settings className="w-6 h-6" />,
      category: "DevOps",
      features: ["CI/CD Pipeline", "Containerization", "Monitoring", "Auto-scaling"]
    }
  ];

  const categories = [
    "Web Development",
    "Mobile Development", 
    "Backend Development",
    "Data Science",
    "Artificial Intelligence",
    "DevOps",
    "Game Development",
    "Blockchain",
    "IoT",
    "Other"
  ];

  const priorities = [
    { value: "low", label: "Low Priority", color: "bg-green-900/30 text-green-400 border-green-400/30" },
    { value: "medium", label: "Medium Priority", color: "bg-yellow-900/30 text-yellow-400 border-yellow-400/30" },
    { value: "high", label: "High Priority", color: "bg-orange-900/30 text-orange-400 border-orange-400/30" },
    { value: "critical", label: "Critical Priority", color: "bg-red-900/30 text-red-400 border-red-400/30" }
  ];

  const teamSizes = [
    { value: "1-3", label: "1-3 members" },
    { value: "4-6", label: "4-6 members" },
    { value: "7-10", label: "7-10 members" },
    { value: "11-20", label: "11-20 members" },
    { value: "20+", label: "20+ members" }
  ];

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleTemplateSelect = (templateId: string) => {
    setSelectedTemplate(templateId);
    const template = projectTemplates.find(t => t.id === templateId);
    if (template) {
      setProjectCategory(template.category);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Check if user is authenticated
      const token = localStorage.getItem('authToken');
      if (!token) {
        toast({
          title: "Authentication Required",
          description: "Please log in to create a project.",
          variant: "destructive",
        });
        navigate("/login");
        return;
      }

      // Create project via API
      const response = await apiService.createProject({
        name: projectName,
        description: projectDescription,
      });

      if (response.success) {
        toast({
          title: "Project Created Successfully",
          description: `"${projectName}" has been initialized in the neural network.`,
        });
        
        navigate("/projects", { replace: true });
      } else {
        throw new Error(response.message || 'Failed to create project');
      }
    } catch (error: any) {
      console.error('Project creation error:', error);
      toast({
        title: "Project Creation Failed",
        description: error.message || "Unable to initialize project. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const selectedTemplateData = projectTemplates.find(t => t.id === selectedTemplate);

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
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              onClick={() => navigate("/dashboard")}
              className="text-cyan-400 hover:text-cyan-300 hover:bg-cyan-400/10 font-mono"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              BACK_TO_DASHBOARD
            </Button>
          </div>
          <div className="text-right">
            <h1 className="text-3xl font-bold text-white font-mono">Project Initialization</h1>
            <p className="text-gray-300 mt-1 font-mono">Neural network: READY | Status: ONLINE</p>
          </div>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid gap-8 lg:grid-cols-2">
            {/* Project Templates */}
            <div className="space-y-6">
              <Card className="tech-card">
                <CardHeader>
                  <CardTitle className="text-xl text-white font-mono flex items-center space-x-2">
                    <Rocket className="w-5 h-5 text-cyan-400" />
                    <span>SELECT_TEMPLATE</span>
                  </CardTitle>
                  <CardDescription className="text-gray-300 font-mono">
                    Choose a project template to initialize your neural network process
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-3">
                    {projectTemplates.map((template) => (
                      <div
                        key={template.id}
                        onClick={() => handleTemplateSelect(template.id)}
                        className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-300 hover-lift ${
                          selectedTemplate === template.id
                            ? 'border-cyan-400 bg-cyan-400/10'
                            : 'border-gray-600 hover:border-cyan-400/50 bg-black/50'
                        }`}
                      >
                        <div className="flex items-start space-x-3">
                          <div className={`p-2 rounded-lg ${
                            selectedTemplate === template.id ? 'bg-cyan-400/20' : 'bg-gray-800'
                          }`}>
                            <div className="text-cyan-400">{template.icon}</div>
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="text-white font-mono font-semibold">{template.name}</h3>
                            <p className="text-gray-300 text-sm font-mono mt-1">{template.description}</p>
                            <div className="flex flex-wrap gap-1 mt-2">
                              {template.features.map((feature, index) => (
                                <Badge key={index} variant="secondary" className="text-xs font-mono bg-gray-800 text-gray-300">
                                  {feature}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Project Details Form */}
            <div className="space-y-6">
              <Card className="tech-card">
                <CardHeader>
                  <CardTitle className="text-xl text-white font-mono flex items-center space-x-2">
                    <FileText className="w-5 h-5 text-cyan-400" />
                    <span>PROJECT_DETAILS</span>
                  </CardTitle>
                  <CardDescription className="text-gray-300 font-mono">
                    Configure your project parameters and specifications
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="projectName" className="text-cyan-400 font-mono text-sm">
                          PROJECT_NAME
                        </Label>
                        <Input
                          id="projectName"
                          value={projectName}
                          onChange={(e) => setProjectName(e.target.value)}
                          placeholder="Enter project name..."
                          className="tech-border bg-black/50 text-white placeholder-gray-500 border-2 border-gray-600 focus:border-cyan-400 focus:ring-cyan-400/20 font-mono"
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="projectDescription" className="text-cyan-400 font-mono text-sm">
                          DESCRIPTION
                        </Label>
                        <Textarea
                          id="projectDescription"
                          value={projectDescription}
                          onChange={(e) => setProjectDescription(e.target.value)}
                          placeholder="Describe your project goals and requirements..."
                          className="tech-border bg-black/50 text-white placeholder-gray-500 border-2 border-gray-600 focus:border-cyan-400 focus:ring-cyan-400/20 font-mono min-h-[100px]"
                          required
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="category" className="text-cyan-400 font-mono text-sm">
                            CATEGORY
                          </Label>
                          <Select value={projectCategory} onValueChange={setProjectCategory}>
                            <SelectTrigger className="tech-border bg-black/50 text-white border-2 border-gray-600 focus:border-cyan-400 font-mono">
                              <SelectValue placeholder="Select category" />
                            </SelectTrigger>
                            <SelectContent className="bg-black border-gray-600">
                              {categories.map((category) => (
                                <SelectItem key={category} value={category} className="text-white font-mono">
                                  {category}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="priority" className="text-cyan-400 font-mono text-sm">
                            PRIORITY
                          </Label>
                          <Select value={priority} onValueChange={setPriority}>
                            <SelectTrigger className="tech-border bg-black/50 text-white border-2 border-gray-600 focus:border-cyan-400 font-mono">
                              <SelectValue placeholder="Select priority" />
                            </SelectTrigger>
                            <SelectContent className="bg-black border-gray-600">
                              {priorities.map((p) => (
                                <SelectItem key={p.value} value={p.value} className="text-white font-mono">
                                  {p.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="teamSize" className="text-cyan-400 font-mono text-sm">
                          TEAM_SIZE
                        </Label>
                        <Select value={teamSize} onValueChange={setTeamSize}>
                          <SelectTrigger className="tech-border bg-black/50 text-white border-2 border-gray-600 focus:border-cyan-400 font-mono">
                            <SelectValue placeholder="Select team size" />
                          </SelectTrigger>
                          <SelectContent className="bg-black border-gray-600">
                            {teamSizes.map((size) => (
                              <SelectItem key={size.value} value={size.value} className="text-white font-mono">
                                {size.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    {/* Selected Template Info */}
                    {selectedTemplateData && (
                      <div className="p-4 bg-cyan-400/10 border border-cyan-400/30 rounded-lg">
                        <h4 className="text-cyan-400 font-mono text-sm mb-2">SELECTED_TEMPLATE</h4>
                        <div className="flex items-center space-x-2">
                          <div className="text-cyan-400">{selectedTemplateData.icon}</div>
                          <span className="text-white font-mono">{selectedTemplateData.name}</span>
                        </div>
                        <p className="text-gray-300 text-sm font-mono mt-1">{selectedTemplateData.description}</p>
                      </div>
                    )}

                    {/* Requirements status */}
                    <div className="p-3 bg-gray-800/50 rounded-lg text-xs font-mono text-gray-400">
                      <div className="text-cyan-400 mb-2">REQUIREMENTS CHECKLIST:</div>
                      <div className={selectedTemplate ? 'text-green-400' : 'text-red-400'}>
                        {selectedTemplate ? '✓' : '✗'} Select a project template
                      </div>
                      <div className={projectName ? 'text-green-400' : 'text-red-400'}>
                        {projectName ? '✓' : '✗'} Enter project name
                      </div>
                      <div className={projectDescription ? 'text-green-400' : 'text-red-400'}>
                        {projectDescription ? '✓' : '✗'} Enter project description
                      </div>
                    </div>

                    <div className="flex space-x-4 pt-4">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => navigate("/dashboard")}
                        className="flex-1 tech-button border-gray-600 text-gray-300 hover:text-white hover:border-cyan-400 font-mono"
                      >
                        CANCEL
                      </Button>
                      <Button
                        type="submit"
                        disabled={isLoading || !projectName || !projectDescription || !selectedTemplate}
                        className="flex-1 tech-button bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-mono font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isLoading ? (
                          <div className="flex items-center space-x-2">
                            <div className="w-4 h-4 border-2 border-cyan-400/30 border-t-cyan-400 rounded-full animate-spin"></div>
                            <span>INITIALIZING...</span>
                          </div>
                        ) : (
                          <div className="flex items-center space-x-2">
                            <span>CREATE_PROJECT</span>
                            <Zap className="w-4 h-4" />
                          </div>
                        )}
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewProject;
