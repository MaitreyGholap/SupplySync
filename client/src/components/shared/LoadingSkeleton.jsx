export default function LoadingSkeleton({ width = '100%', height = '20px', className = '', rounded = '8px' }) {
  return (
    <div
      className={`skeleton ${className}`}
      style={{ width, height, borderRadius: rounded }}
    />
  );
}
