import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to login page for now
    // Later this can check for authentication state
    navigate("/login");
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Welcome to SynergySphere</h1>
        <p className="text-xl text-muted-foreground">Redirecting to login...</p>
      </div>
    </div>
  );
};

export default Index;
