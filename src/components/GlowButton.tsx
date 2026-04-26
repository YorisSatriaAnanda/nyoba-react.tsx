import React, { useRef } from 'react';

interface GlowButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  as?: any;
  [key: string]: any;
}

const GlowButton: React.FC<GlowButtonProps> = ({ 
  children, 
  className = '', 
  onClick, 
  type = "button", 
  as: Component = "button",
  ...props 
}) => {
  const ref = useRef<HTMLElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    ref.current.style.setProperty('--x', `${x}px`);
    ref.current.style.setProperty('--y', `${y}px`);
  };

  return (
    <Component
      ref={ref}
      onMouseMove={handleMouseMove}
      onClick={onClick}
      type={Component === "button" ? type : undefined}
      className={`glow-button ${className}`}
      {...props}
    >
      <span className="relative z-10">{children}</span>
    </Component>
  );
};

export default GlowButton;
