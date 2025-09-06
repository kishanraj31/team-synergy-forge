import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { apiService } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Eye, EyeOff, Mail, Lock, Cpu, Shield, Zap, Terminal, Code, Database, Network } from "lucide-react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [emailValid, setEmailValid] = useState(false);
  const [passwordValid, setPasswordValid] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    setIsVisible(true);
  }, []);

  useEffect(() => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setEmailValid(emailRegex.test(email));
  }, [email]);

  useEffect(() => {
    setPasswordValid(password.length >= 6);
  }, [password]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await apiService.login({
        email,
        password,
      });

      if (response.success && response.data?.token) {
        // Store auth token
        localStorage.setItem('authToken', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        
        toast({
          title: "Login successful",
          description: "Welcome to SynergySphere!",
        });
        navigate("/dashboard");
      } else {
        throw new Error(response.message || 'Login failed');
      }
    } catch (error: any) {
      console.error('Login error:', error);
      toast({
        title: "Login failed",
        description: error.message || "Please check your credentials and try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black relative overflow-hidden">
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

      <div className={`w-full max-w-md relative z-10 ${isVisible ? 'animate-slide-up' : 'opacity-0'}`}>
        <Card className="tech-card shadow-2xl border-0 hover-lift bg-black/80 backdrop-blur-sm">
          <CardHeader className="text-center space-y-6 pt-8">
            <div className="mx-auto w-20 h-20 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center shadow-lg tech-glow">
              <Cpu className="w-10 h-10 text-white" />
            </div>
            <div className="space-y-3">
              <CardTitle className="text-4xl font-bold text-white font-mono">
                SynergySphere
              </CardTitle>
              <CardDescription className="text-gray-300 text-lg font-mono">
                Access the neural network
              </CardDescription>
              <div className="flex items-center justify-center space-x-4 text-xs text-gray-400 font-mono">
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse-slow"></div>
                  <span>SECURE</span>
                </div>
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
                  <span>ENCRYPTED</span>
                </div>
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
                  <span>FAST</span>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-8 px-8 pb-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-3">
                <Label htmlFor="email" className="text-cyan-400 font-mono text-sm flex items-center space-x-2">
                  <Mail className="w-4 h-4" />
                  <span>USER_ID</span>
                </Label>
                <div className="relative">
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="user@domain.com"
                    className={`tech-border bg-black/50 text-white placeholder-gray-500 border-2 transition-all duration-300 ${
                      emailValid 
                        ? 'border-cyan-400 focus:border-cyan-300 focus:ring-cyan-400/20' 
                        : 'border-gray-600 focus:border-cyan-400 focus:ring-cyan-400/20'
                    } pl-10`}
                    required
                  />
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-cyan-400" />
                  {emailValid && (
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-green-400 animate-scale-in">
                      <Shield className="w-5 h-5" />
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-3">
                <Label htmlFor="password" className="text-cyan-400 font-mono text-sm flex items-center space-x-2">
                  <Lock className="w-4 h-4" />
                  <span>ACCESS_KEY</span>
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className={`tech-border bg-black/50 text-white placeholder-gray-500 border-2 transition-all duration-300 ${
                      passwordValid 
                        ? 'border-cyan-400 focus:border-cyan-300 focus:ring-cyan-400/20' 
                        : 'border-gray-600 focus:border-cyan-400 focus:ring-cyan-400/20'
                    } pl-10 pr-10`}
                    required
                  />
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-cyan-400" />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-cyan-400 hover:text-cyan-300 transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                  {passwordValid && (
                    <div className="absolute right-8 top-1/2 transform -translate-y-1/2 w-5 h-5 text-green-400 animate-scale-in">
                      <Shield className="w-5 h-5" />
                    </div>
                  )}
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full tech-button bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-mono font-semibold py-3 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none" 
                disabled={isLoading || !emailValid || !passwordValid}
              >
                {isLoading ? (
                  <div className="flex items-center space-x-3">
                    <div className="w-5 h-5 border-2 border-cyan-400/30 border-t-cyan-400 rounded-full animate-spin"></div>
                    <span>INITIALIZING...</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2">
                    <span>CONNECT</span>
                    <Zap className="w-4 h-4" />
                  </div>
                )}
              </Button>
            </form>
            <div className="mt-8 text-center space-y-4">
              <Link 
                to="/forgot-password" 
                className="text-sm text-cyan-400 hover:text-cyan-300 transition-colors duration-200 hover:underline font-mono"
              >
                RECOVER_ACCESS_KEY
              </Link>
              <div className="text-sm text-gray-300">
                <span className="font-mono">Don't have an account? </span>
                <Link 
                  to="/signup" 
                  className="font-semibold text-blue-400 hover:text-blue-300 hover:underline transition-colors duration-200 font-mono"
                >
                  REGISTER_NODE
                </Link>
              </div>
              
              {/* Tech Status Indicators */}
              <div className="pt-4 border-t border-gray-800">
                <div className="flex items-center justify-center space-x-6 text-xs text-gray-400 font-mono">
                  <div className="flex items-center space-x-1">
                    <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse-slow"></div>
                    <span>ENCRYPTED</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
                    <span>SECURE</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
                    <span>ONLINE</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;