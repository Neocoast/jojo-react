import BoringAvatar from 'boring-avatars';

const COLORS = ['#00686c', '#32c2b9', '#edecb3', '#fad928', '#ff9915'];

interface AvatarProps {
  name: string;
  size?: number | string;
  className?: string;
  preserveAspectRatio?: string;
}

const Avatar = ({
  name, size = 40, className, preserveAspectRatio,
}: AvatarProps) => (
  <BoringAvatar
    name={name}
    size={size}
    variant="beam"
    colors={COLORS}
    square
    className={className}
    preserveAspectRatio={preserveAspectRatio}
  />
);

export { Avatar };
