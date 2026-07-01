interface UserStatProps {
  label: string;
  count: number;
}

const UserStat = ({ label, count }: UserStatProps) => (
  <div className="flex-1 flex flex-col items-center gap-1">
    <span className="text-xs font-semibold tracking-widest text-muted-foreground">{label}</span>
    <span className="text-primary font-semibold">{count}</span>
  </div>
);

export { UserStat };
