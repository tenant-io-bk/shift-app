type PhoneWrapperProps = {
  children: React.ReactNode;
  className?: string;
  dark?: boolean;
};

export default function PhoneWrapper({ children, className = '', dark = false }: PhoneWrapperProps) {
  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'var(--paper-2)',
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        padding: '40px 0 60px',
      }}
    >
      <div
        className={`phone-shell ${className}`}
        style={{
          background: dark ? 'var(--ink)' : 'var(--paper)',
          position: 'relative',
        }}
      >
        {children}
      </div>
      <style>{`
        @media (max-width: 430px) {
          .phone-shell {
            width: 100vw !important;
            min-height: 100vh !important;
            border-radius: 0 !important;
            box-shadow: none !important;
          }
        }
      `}</style>
    </div>
  );
}
