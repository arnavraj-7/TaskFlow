import { toast } from "sonner"

export const toaster = (message, color = "success") => {
  const colorStyles = {
    success: {
      background: "linear-gradient(135deg, #1f2937 0%, #065f46 50%, #047857 100%)", // Dark green gradient
      borderLeft: "5px solid #10b981",
      borderTop: "1px solid rgba(16, 185, 129, 0.3)",
      color: "#ecfdf5",
      boxShadow: "0 0 20px rgba(16, 185, 129, 0.15), 0 8px 32px rgba(0, 0, 0, 0.4)",
    },
    error: {
      background: "linear-gradient(135deg, #1f2937 0%, #7f1d1d 50%, #991b1b 100%)", // Dark red gradient  
      borderLeft: "5px solid #ef4444",
      borderTop: "1px solid rgba(239, 68, 68, 0.3)",
      color: "#fef2f2",
      boxShadow: "0 0 20px rgba(239, 68, 68, 0.15), 0 8px 32px rgba(0, 0, 0, 0.4)",
    },
    warning: {
      background: "linear-gradient(135deg, #1f2937 0%, #92400e 50%, #b45309 100%)", // Dark orange gradient
      borderLeft: "5px solid #f59e0b",
      borderTop: "1px solid rgba(245, 158, 11, 0.3)",
      color: "#fffbeb",
      boxShadow: "0 0 20px rgba(245, 158, 11, 0.15), 0 8px 32px rgba(0, 0, 0, 0.4)",
    },
    info: {
      background: "linear-gradient(135deg, #1f2937 0%, #1e3a8a 50%, #1d4ed8 100%)", // Dark blue gradient
      borderLeft: "5px solid #3b82f6",
      borderTop: "1px solid rgba(59, 130, 246, 0.3)",
      color: "#eff6ff",
      boxShadow: "0 0 20px rgba(59, 130, 246, 0.15), 0 8px 32px rgba(0, 0, 0, 0.4)",
    },
    purple: {
      background: "linear-gradient(135deg, #1f2937 0%, #581c87 50%, #6b21a8 100%)", // Dark purple gradient
      borderLeft: "5px solid #8b5cf6",
      borderTop: "1px solid rgba(139, 92, 246, 0.3)",
      color: "#faf5ff",
      boxShadow: "0 0 20px rgba(139, 92, 246, 0.15), 0 8px 32px rgba(0, 0, 0, 0.4)",
    }
  };

  toast.success(`${message}`, {
    duration: 3500,
    style: {
      ...colorStyles[color],
      borderRadius: "16px",
      padding: "18px 24px",
      backdropFilter: "blur(16px)",
      border: "1px solid rgba(255, 255, 255, 0.08)",
      fontSize: "15px",
      fontWeight: "600",
      maxWidth: "420px",
      minWidth: "300px",
      fontFamily: "system-ui, -apple-system, sans-serif",
      letterSpacing: "0.025em",
      lineHeight: "1.4",
      position: "relative",
      overflow: "hidden",
    },
    className: "toast-custom",
  });
};

// Usage Examples with Recommended Colors:

// For adding todo:
// toaster("Task added successfully! 🎉", "success");

// For deleting todo:  
// toaster("Task deleted! 🗑️", "error");

// For completing todo:
// toaster("Task completed! ✅", "purple");

// For updating todo:
// toaster("Task updated! ✏️", "info");

// For errors:
// toaster("Something went wrong! ❌", "error");

// For warnings:
// toaster("Please fill all fields! ⚠️", "warning");

// For welcome message:
// toaster("Welcome to TaskFlow! 🚀✨", "info");