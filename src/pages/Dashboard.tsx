import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import ServiceCard from "@/components/ServiceCard";
import { 
  Server, 
  Database, 
  Container, 
  Cpu, 
  Network,
  Shield
} from "lucide-react";

const Dashboard = () => {
  const navigate = useNavigate();
  const [selectedService, setSelectedService] = useState<string | null>(null);

  const services = [
    {
      id: "vm",
      title: "Create a VM",
      description: "Launch virtual machines with custom configurations",
      icon: Server,
      action: () => navigate("/configuration"),
      disabled: false
    },
    {
      id: "database",
      title: "Database Services",
      description: "Managed database solutions",
      icon: Database,
      action: () => navigate("/configuration"),
      disabled: true
    },
    {
      id: "kubernetes",
      title: "Kubernetes",
      description: "Container orchestration platform",
      icon: Container,
      action: () => navigate("/configuration"),
      disabled: true
    },
    {
      id: "compute",
      title: "Compute Engine",
      description: "Scalable computing resources",
      icon: Cpu,
      action: () => navigate("/configuration"),
      disabled: true
    },
    {
      id: "api",
      title: "API & Services",
      description: "Application programming interfaces",
      icon: Network,
      action: () => navigate("/configuration"),
      disabled: true
    },
    {
      id: "security",
      title: "Security Center",
      description: "Cloud security management",
      icon: Shield,
      action: () => navigate("/control"),
      disabled: true
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto p-8">
      <div className="mb-12">
        <h1 className="text-4xl font-extrabold text-primary mb-4 mt-8">Welcome!</h1>
      </div>

      <div className="bg-card p-8 rounded-2xl shadow-lg mb-10">
        <h2 className="text-3xl font-bold text-foreground mb-6 border-b border-muted pb-2">
          Survey Description
        </h2>
        <div className="space-y-6 text-muted-foreground text-base leading-relaxed">
          <p>
            This survey is part of an academic research project for the <strong>Applied Research Project</strong> module at <strong>Douglas College</strong>. The purpose of this study is to explore how <strong>gamification</strong> influences users' environmentally conscious decision-making in <strong>cloud computing environments</strong>.
          </p>

          <p>
            In this version, you will interact with a <strong>gamified cloud deployment dashboard</strong>. Your task is to <strong>create a virtual machine (VM)</strong> suitable for storing a <strong>1GB file</strong>. The dashboard includes gamification elements such as <strong>points, badges, levels</strong>, and <strong>progress indicators</strong> designed to guide and motivate your decisions.
          </p>

          <p>
            Please complete the task as you naturally would, relying on the interface and feedback mechanisms provided.
          </p>

          <p>
            All responses will remain completely confidential. Participation is entirely voluntary, and you may withdraw your data at any time by contacting us. By continuing and submitting your responses, you provide <strong>informed consent</strong> to participate in this study.
          </p>

          <p>
            Your data will be used exclusively for educational and research purposes within this course. It will be securely stored in accordance with academic research ethics. No personal or identifying information will be collected or disclosed.
          </p>

          <p className="text-center font-semibold text-primary">
            Thank you for your valuable time and thoughtful participation.
          </p>
        </div>
      </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
  <ServiceCard
    key={service.id}
    title={service.title}
    description={service.description}
    icon={service.icon}
    isActive={selectedService === service.id}
    disabled={service.disabled} // pass to child
    onClick={() => {
      if (service.disabled) return; // prevent action
      setSelectedService(service.id);
      setTimeout(() => service.action(), 200);
    }}
  />
))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;