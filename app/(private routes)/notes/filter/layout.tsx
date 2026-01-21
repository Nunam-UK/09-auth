

interface FilterLayoutProps {
  children: React.ReactNode;
  sidebar: React.ReactNode; 
}

export default function FilterLayout({ children, sidebar }: FilterLayoutProps) {
  return (
    <div style={{ display: 'flex', gap: '20px' }}>
      <aside>
        {sidebar}
      </aside>
      <section style={{ flex: 1 }}>
        {children}
      </section>
    </div>
  );
}